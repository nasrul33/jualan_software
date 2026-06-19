"use server";

import { buildDemoWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
import {
  createInitialDeliveryStatus,
  getErrorMessage,
  storeLead,
} from "@/lib/server/lead-store";
import { getRequestMetadata } from "@/lib/server/request-metadata";
import { evaluateSubmissionGuard } from "@/lib/server/submission-guard";
import {
  demoRequestSchema,
  normalizeIndonesianWhatsappNumber,
  toFieldErrors,
} from "@/lib/validations";
import type { DemoRequestActionState } from "@/types/forms";

const DEMO_REQUEST_WEBHOOK_URL = process.env.DEMO_REQUEST_WEBHOOK_URL ?? "";
const DEMO_REQUEST_WEBHOOK_TOKEN = process.env.DEMO_REQUEST_WEBHOOK_TOKEN ?? "";

function valueOf(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function createTrackingId(): string {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `DEMO-${date}-${suffix}`;
}

async function sendDemoWebhook(payload: Record<string, unknown>): Promise<void> {
  if (!DEMO_REQUEST_WEBHOOK_URL) {
    return;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (DEMO_REQUEST_WEBHOOK_TOKEN) {
    headers.Authorization = `Bearer ${DEMO_REQUEST_WEBHOOK_TOKEN}`;
  }

  const response = await fetch(DEMO_REQUEST_WEBHOOK_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Webhook demo gagal dengan status ${response.status}.`);
  }
}

export async function submitDemoRequest(
  _previousState: DemoRequestActionState,
  formData: FormData,
): Promise<DemoRequestActionState> {
  const result = demoRequestSchema.safeParse({
    nama: valueOf(formData, "nama"),
    instansi: valueOf(formData, "instansi"),
    jabatan: valueOf(formData, "jabatan"),
    whatsapp: valueOf(formData, "whatsapp"),
    email: valueOf(formData, "email"),
    kebutuhan: valueOf(formData, "kebutuhan"),
    jadwal: valueOf(formData, "jadwal"),
    pesan: valueOf(formData, "pesan"),
    persetujuan: valueOf(formData, "persetujuan"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Periksa kembali isian form demo yang ditandai.",
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
  const whatsappUrl = createWhatsAppUrl(buildDemoWhatsAppMessage(input));

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
  const intent = valueOf(formData, "intent") || "demo";
  const delivery = createInitialDeliveryStatus(Boolean(DEMO_REQUEST_WEBHOOK_URL));

  try {
    await storeLead({
      schemaVersion: 1,
      trackingId,
      source: "demo",
      submittedAt,
      request: requestMetadata,
      intent,
      data: input,
    });
    delivery.storage = "stored";
  } catch (error) {
    delivery.errors.push(`storage: ${getErrorMessage(error)}`);
  }

  try {
    await sendDemoWebhook({
      trackingId,
      source: "pdamcore-marketing-web",
      submittedAt,
      intent,
      data: input,
      request: requestMetadata,
    });
    if (DEMO_REQUEST_WEBHOOK_URL) {
      delivery.webhook = "sent";
    }
  } catch (error) {
    delivery.webhook = "failed";
    delivery.errors.push(`webhook: ${getErrorMessage(error)}`);
  }

  if (delivery.storage === "failed" && delivery.webhook !== "sent") {
    console.error("pdamcore_demo_lead_delivery_failed", {
      trackingId,
      errors: delivery.errors,
    });

    return {
      status: "error",
      message:
        "Data sudah tervalidasi, tetapi penyimpanan lead belum tersedia. Gunakan tombol WhatsApp untuk mengirim detail permintaan demo.",
      fieldErrors: {},
      trackingId,
      whatsappUrl,
    };
  }

  return {
    status: "success",
    message:
      delivery.webhook === "failed"
        ? "Permintaan demo sudah tersimpan. Notifikasi otomatis sedang tidak tersedia; gunakan WhatsApp untuk respons tercepat."
        : "Permintaan demo berhasil diterima. Tim PDAMCore akan menindaklanjuti melalui WhatsApp atau email.",
    fieldErrors: {},
    trackingId,
    whatsappUrl,
  };
}
