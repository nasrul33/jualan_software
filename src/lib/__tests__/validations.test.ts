import { describe, expect, it } from "vitest";

import {
  contactRequestSchema,
  demoRequestSchema,
  normalizeIndonesianWhatsappNumber,
} from "@/lib/validations";
import { formatIndonesianWhatsappNumber } from "@/lib/whatsapp";

describe("demo request validation", () => {
  it("accepts valid Indonesian WhatsApp numbers and normalizes them for WhatsApp links", () => {
    const result = demoRequestSchema.safeParse({
      nama: "Rani Putri",
      instansi: "Perumdam Tirta Contoh",
      jabatan: "Kabag Keuangan",
      whatsapp: "0812-3456-7890",
      email: "rani@example.com",
      kebutuhan: "Demo billing dan akuntansi",
      jadwal: "Senin pagi",
      pesan: "Mohon sertakan alur kasir.",
      persetujuan: "on",
    });

    expect(result.success).toBe(true);
    expect(normalizeIndonesianWhatsappNumber("0812-3456-7890")).toBe(
      "6281234567890",
    );
    expect(formatIndonesianWhatsappNumber("6289512728534")).toBe(
      "+62 895-1272-8534",
    );
  });

  it("rejects incomplete required fields and invalid phone-like input", () => {
    const result = demoRequestSchema.safeParse({
      nama: "A",
      instansi: "",
      jabatan: "",
      whatsapp: "12345",
      email: "bukan-email",
      kebutuhan: "",
      jadwal: "",
      pesan: "x".repeat(1001),
      persetujuan: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.nama?.[0]).toBeDefined();
      expect(errors.instansi?.[0]).toBeDefined();
      expect(errors.whatsapp?.[0]).toBeDefined();
      expect(errors.email?.[0]).toBeDefined();
      expect(errors.pesan?.[0]).toBeDefined();
      expect(errors.persetujuan?.[0]).toBeDefined();
    }
  });
});

describe("contact request validation", () => {
  it("accepts valid contact requests with consent", () => {
    const result = contactRequestSchema.safeParse({
      nama: "Rani Putri",
      instansi: "Perumdam Tirta Contoh",
      whatsapp: "+62 895-1272-8534",
      pesan: "Kami ingin membahas demo PDAMCore untuk billing dan akuntansi.",
      persetujuan: "on",
    });

    expect(result.success).toBe(true);
  });

  it("rejects incomplete contact requests", () => {
    const result = contactRequestSchema.safeParse({
      nama: "A",
      instansi: "",
      whatsapp: "12345",
      pesan: "singkat",
      persetujuan: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      expect(errors.nama?.[0]).toBeDefined();
      expect(errors.instansi?.[0]).toBeDefined();
      expect(errors.whatsapp?.[0]).toBeDefined();
      expect(errors.pesan?.[0]).toBeDefined();
      expect(errors.persetujuan?.[0]).toBeDefined();
    }
  });
});
