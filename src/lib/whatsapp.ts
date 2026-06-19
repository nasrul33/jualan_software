import { WHATSAPP_NUMBER } from "@/lib/constants";
import {
  type ContactRequestInput,
  type DemoRequestInput,
  normalizeIndonesianWhatsappNumber,
} from "@/lib/validations";

export function createWhatsAppUrl(
  message: string,
  targetNumber = WHATSAPP_NUMBER,
): string {
  const phone = normalizeIndonesianWhatsappNumber(targetNumber);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatIndonesianWhatsappNumber(
  targetNumber = WHATSAPP_NUMBER,
): string {
  const phone = normalizeIndonesianWhatsappNumber(targetNumber);

  if (!phone.startsWith("62") || phone.length < 5) {
    return targetNumber;
  }

  const national = phone.slice(2);
  const first = national.slice(0, 3);
  const second = national.slice(3, 7);
  const rest = national.slice(7);

  return `+62 ${[first, second, rest].filter(Boolean).join("-")}`;
}

export function buildDemoWhatsAppMessage(input: DemoRequestInput): string {
  return [
    "Halo PDAMCore, saya ingin menjadwalkan demo.",
    "",
    `Nama: ${input.nama}`,
    `Instansi: ${input.instansi}`,
    `Jabatan: ${input.jabatan}`,
    `WhatsApp: ${input.whatsapp}`,
    input.email ? `Email: ${input.email}` : null,
    `Kebutuhan: ${input.kebutuhan}`,
    input.jadwal ? `Jadwal yang diinginkan: ${input.jadwal}` : null,
    input.pesan ? `Pesan tambahan: ${input.pesan}` : null,
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");
}

export function buildContactWhatsAppMessage(input: ContactRequestInput): string {
  return [
    "Halo PDAMCore, saya ingin konsultasi.",
    "",
    `Nama: ${input.nama}`,
    `Instansi: ${input.instansi}`,
    `WhatsApp: ${input.whatsapp}`,
    `Pesan: ${input.pesan}`,
  ].join("\n");
}
