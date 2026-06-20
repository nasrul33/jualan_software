import { randomUUID } from "node:crypto";
import { appendFile, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

import type { ContactRequestInput, DemoRequestInput } from "@/lib/validations";
import type { RequestMetadata } from "@/lib/server/request-metadata";

export type LeadSource = "demo" | "contact";

export interface LeadDeliveryStatus {
  storage: "stored" | "failed";
  webhook: "not_configured" | "sent" | "failed";
  errors: string[];
}

interface StoredLeadBase {
  schemaVersion: 1;
  trackingId: string;
  source: LeadSource;
  submittedAt: string;
  request: RequestMetadata;
}

export interface StoredDemoLead extends StoredLeadBase {
  source: "demo";
  intent: string;
  data: DemoRequestInput;
}

export interface StoredContactLead extends StoredLeadBase {
  source: "contact";
  data: ContactRequestInput;
}

export type StoredLead = StoredDemoLead | StoredContactLead;

export function getLeadStorageDir(): string {
  if (process.env.LEAD_STORAGE_DIR) {
    return process.env.LEAD_STORAGE_DIR;
  }

  return process.env.NODE_ENV === "production"
    ? "/app/data/leads"
    : join(process.cwd(), ".data", "leads");
}

function createLeadFileName(source: LeadSource, submittedAt: string): string {
  const date = submittedAt.slice(0, 10);

  return `${date}-${source}.jsonl`;
}

export async function storeLead(lead: StoredLead): Promise<void> {
  const storageDir = getLeadStorageDir();
  const filePath = join(storageDir, createLeadFileName(lead.source, lead.submittedAt));
  const line = `${JSON.stringify(lead)}\n`;

  await mkdir(storageDir, { recursive: true });
  await appendFile(filePath, line, { encoding: "utf8" });
}

export async function assertLeadStorageWritable(): Promise<string> {
  const storageDir = getLeadStorageDir();
  const probePath = join(storageDir, `.healthcheck-${randomUUID()}.tmp`);

  await mkdir(storageDir, { recursive: true });
  await writeFile(probePath, "ok", { encoding: "utf8", flag: "wx" });
  await rm(probePath, { force: true });

  return storageDir;
}

export function createInitialDeliveryStatus(
  webhookConfigured: boolean,
): LeadDeliveryStatus {
  return {
    storage: "failed",
    webhook: webhookConfigured ? "failed" : "not_configured",
    errors: [],
  };
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Terjadi kesalahan internal.";
}
