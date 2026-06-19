"use server";

import { buildContactWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
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
  const trackingId = createTrackingId();
  const whatsappUrl = createWhatsAppUrl(buildContactWhatsAppMessage(input));

  try {
    await sendContactWebhook({
      trackingId,
      source: "pdamcore-marketing-web",
      submittedAt: new Date().toISOString(),
      data: input,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Endpoint kontak tidak dapat dihubungi.";

    return {
      status: "error",
      message: `${message} Data sudah tervalidasi; gunakan tombol WhatsApp untuk mengirim pesan kontak.`,
      fieldErrors: {},
      trackingId,
      whatsappUrl,
    };
  }

  return {
    status: "success",
    message: CONTACT_REQUEST_WEBHOOK_URL
      ? "Pesan berhasil dikirim. Tim PDAMCore akan menindaklanjuti melalui WhatsApp."
      : "Form kontak berhasil divalidasi. Untuk respons tercepat, lanjutkan melalui WhatsApp dengan pesan yang sudah terisi otomatis.",
    fieldErrors: {},
    trackingId,
    whatsappUrl,
  };
}
