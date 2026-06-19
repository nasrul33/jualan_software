import { z } from "zod";

const optionalEmailSchema = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? undefined : value),
  z.string().email("Format email tidak valid.").optional(),
);

const optionalTextSchema = (max: number) =>
  z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? undefined : value,
    z.string().trim().max(max).optional(),
  );

function isValidIndonesianWhatsappNumber(value: string): boolean {
  const digits = normalizeIndonesianWhatsappNumber(value);

  return /^628[1-9]\d{7,13}$/.test(digits);
}

export const demoRequestSchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter."),
  instansi: z.string().trim().min(2, "Nama instansi wajib diisi."),
  jabatan: z.string().trim().min(2, "Jabatan wajib diisi."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      isValidIndonesianWhatsappNumber,
      "Nomor WhatsApp Indonesia tidak valid.",
    ),
  email: optionalEmailSchema,
  kebutuhan: z.string().trim().min(5, "Kebutuhan demo wajib dijelaskan."),
  jadwal: optionalTextSchema(120),
  pesan: optionalTextSchema(1000),
  persetujuan: z.literal("on", {
    errorMap: () => ({
      message: "Persetujuan penggunaan data kontak wajib dicentang.",
    }),
  }),
});

export const contactRequestSchema = z.object({
  nama: z.string().trim().min(2, "Nama minimal 2 karakter."),
  instansi: z.string().trim().min(2, "Nama instansi wajib diisi."),
  whatsapp: z
    .string()
    .trim()
    .refine(
      isValidIndonesianWhatsappNumber,
      "Nomor WhatsApp Indonesia tidak valid.",
    ),
  pesan: z.string().trim().min(10, "Pesan minimal 10 karakter.").max(1000),
  persetujuan: z.literal("on", {
    errorMap: () => ({
      message: "Persetujuan penggunaan data kontak wajib dicentang.",
    }),
  }),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;
export type ContactRequestInput = z.infer<typeof contactRequestSchema>;

export type FieldErrors<T extends Record<string, unknown>> = Partial<
  Record<keyof T, string>
>;

export function normalizeIndonesianWhatsappNumber(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("620")) {
    return `62${digits.slice(3)}`;
  }

  if (digits.startsWith("62")) {
    return digits;
  }

  if (digits.startsWith("0")) {
    return `62${digits.slice(1)}`;
  }

  if (digits.startsWith("8")) {
    return `62${digits}`;
  }

  return digits;
}

export function toFieldErrors<T extends Record<string, unknown>>(
  error: z.ZodError<T>,
): FieldErrors<T> {
  const fieldErrors: FieldErrors<T> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (typeof field === "string") {
      const key = field as keyof T;

      if (!fieldErrors[key]) {
        fieldErrors[key] = issue.message;
      }
    }
  }

  return fieldErrors;
}
