import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  assertLeadStorageWritable,
  storeLead,
  type StoredContactLead,
} from "@/lib/server/lead-store";

let storageDir = "";

describe("lead store", () => {
  afterEach(async () => {
    delete process.env.LEAD_STORAGE_DIR;

    if (storageDir) {
      await rm(storageDir, { recursive: true, force: true });
      storageDir = "";
    }
  });

  it("writes contact leads as JSONL entries by date and source", async () => {
    storageDir = await mkdtemp(join(tmpdir(), "pdamcore-leads-"));
    process.env.LEAD_STORAGE_DIR = storageDir;

    const lead: StoredContactLead = {
      schemaVersion: 1,
      trackingId: "KONTAK-20260619-ABC12345",
      source: "contact",
      submittedAt: "2026-06-19T01:00:00.000Z",
      request: {
        ipHash: "ip-hash",
        userAgent: "vitest",
        referrer: "http://127.0.0.1:3000/kontak",
        requestFingerprint: "request-fingerprint",
      },
      data: {
        nama: "Rani Putri",
        instansi: "Perumdam Tirta Contoh",
        whatsapp: "6289512728534",
        pesan: "Kami ingin membahas demo PDAMCore.",
        persetujuan: "on",
      },
    };

    await storeLead(lead);

    const fileContent = await readFile(
      join(storageDir, "2026-06-19-contact.jsonl"),
      "utf8",
    );

    expect(fileContent.trim()).toBe(JSON.stringify(lead));
  });

  it("verifies lead storage is writable without leaving probe files", async () => {
    storageDir = await mkdtemp(join(tmpdir(), "pdamcore-leads-"));
    process.env.LEAD_STORAGE_DIR = storageDir;

    await expect(assertLeadStorageWritable()).resolves.toBe(storageDir);
    await expect(readdir(storageDir)).resolves.toEqual([]);
  });
});
