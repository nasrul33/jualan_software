"use server";

import { buildContactWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import {
  createInitialDeliveryStatus,
  getErrorMessage,
  storeLead,
} from "@/lib/server/lead-store";
import { getRequestMetadata } from "@/lib/server/request-metadata";
import { evaluateSubmissionGuard } from "@/lib/server/submission-guard";
import {
  contactRequestSchema,
  normalizeIndonesianWhatsappNumber,
  toFieldErrors,
} from "@/lib/validations";
import type { ContactRequestActionState } from "@/types/forms";

const CONTACT_REQUEST_WEBHOOK_URL =
  process.env.CONTACT_REQUEST_WEBHOOK_URL ?? "";
const CONTACT_REQUEST_WEBHOOK_TOKEN =
  process.env.CONTACT_REQUEST_WEBHOOK_TOKEN ?? "";

function valueOf(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function createTrackingId(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `KONTAK-${date}-${suffix}`;
}

async function sendContactWebhook(payload: Record<string, unknown>): Promise<void> {
  if (!CONTACT_REQUEST_WEBHOOK_URL) {
    return;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (CONTACT_REQUEST_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${CONTACT_REQUEST_WEBHOOK_TOKEN}`;
  }

  const response = await fetch(CONTACT_REQUEST_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Webhook kontak gagal dengan status ${response.status}.`);
  }
}

export async function submitContactRequest(
  _previousState: ContactRequestActionState,
  formData: FormData,
): Promise<ContactRequestActionState> {
  const result = contactRequestSchema.safeParse({
    nama: valueOf(formData, "nama"),
    instansi: valueOf(formData, "instansi"),
    whatsapp: valueOf(formData, "whatsapp"),
    pesan: valueOf(formData, "pesan"),
    persetujuan: valueOf(formData, "persetujuan"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Periksa kembali isian form kontak yang ditandai.",
      fieldErrors: toFieldErrors(result.error),
    };
  }

  const input = {
    ...result.data,
    whatsapp: normalizeIndonesianWhatsappNumber(result.data.whatsapp),
  };
  const requestMetadata = await getRequestMetadata();
  const guard = evaluateSubmissionGuard({
    honeypot: valueOf(formData, "company_fax"),
    formStartedAt: valueOf(formData, "formStartedAt"),
    requestFingerprint: requestMetadata.requestFingerprint,
    whatsapp: input.whatsapp,
  });
  const whatsappUrl = createWhatsAppUrl(buildContactWhatsAppMessage(input));

  if (!guard.allowed) {
    if (guard.silent) {
      return {
        status: "success",
        message: guard.message,
        fieldErrors: {},
      };
    }

    return {
      status: "error",
      message: guard.message,
      fieldErrors: {},
      whatsappUrl,
    };
  }

  const trackingId = createTrackingId();
  const submittedAt = new Date().toISOString();
  const delivery = createInitialDeliveryStatus(Boolean(CONTACT_REQUEST_WEBHOOK_URL));

  try {
    await storeLead({
      schemaVersion: 1,
      trackingId,
      source: "contact",
      submittedAt,
      request: requestMetadata,
      data: input,
    });
    delivery.storage = "stored";
  } catch (error) {
    delivery.errors.push(`storage: ${getErrorMessage(error)}`);
  }

  try {
    await sendContactWebhook({
      trackingId,
      source: "pdamcore-marketing-web",
      submittedAt,
      data: input,
      request: requestMetadata,
    });
    if (CONTACT_REQUEST_WEBHOOK_URL) {
      delivery.webhook = "sent";
    }
  } catch (error) {
    delivery.webhook = "failed";
    delivery.errors.push(`webhook: ${getErrorMessage(error)}`);
  }

  if (delivery.storage === "failed" && delivery.webhook !== "sent") {
    console.error("pdamcore_contact_lead_delivery_failed", {
      trackingId,
      errors: delivery.errors,
    });

    return {
      status: "error",
      message:
        "Data sudah tervalidasi, tetapi penyimpanan lead belum tersedia. Gunakan tombol WhatsApp untuk mengirim pesan kontak.",
      fieldErrors: {},
      trackingId,
      whatsappUrl,
    };
  }

  return {
    status: "success",
    message:
      delivery.webhook === "failed"
        ? "Pesan kontak sudah tersimpan. Notifikasi otomatis sedang tidak tersedia; gunakan WhatsApp untuk respons tercepat."
        : "Pesan kontak berhasil diterima. Tim PDAMCore akan menindaklanjuti melalui WhatsApp.",
    fieldErrors: {},
    trackingId,
    whatsappUrl,
  };
}
