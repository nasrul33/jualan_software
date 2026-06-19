"use server";

import { buildDemoWhatsAppMessage, createWhatsAppUrl } from "@/lib/whatsapp";
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
  const trackingId = createTrackingId();
  const whatsappUrl = createWhatsAppUrl(buildDemoWhatsAppMessage(input));

  try {
    await sendDemoWebhook({
      trackingId,
      source: "pdamcore-marketing-web",
      submittedAt: new Date().toISOString(),
      intent: valueOf(formData, "intent") || "demo",
      data: input,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Endpoint demo tidak dapat dihubungi.";

    return {
      status: "error",
      message: `${message} Data sudah tervalidasi; gunakan tombol WhatsApp untuk mengirim detail permintaan demo.`,
      fieldErrors: {},
      trackingId,
      whatsappUrl,
    };
  }

  return {
    status: "success",
    message: DEMO_REQUEST_WEBHOOK_URL
      ? "Permintaan demo berhasil dikirim. Tim PDAMCore akan menindaklanjuti melalui WhatsApp atau email."
      : "Form demo berhasil divalidasi. Untuk respons tercepat, lanjutkan melalui WhatsApp dengan pesan yang sudah terisi otomatis.",
    fieldErrors: {},
    trackingId,
    whatsappUrl,
  };
}
