const DEFAULT_MIN_FORM_AGE_MS = 1_200;
const DEFAULT_MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const IP_WINDOW_MS = 15 * 60 * 1_000;
const WHATSAPP_WINDOW_MS = 60 * 60 * 1_000;
const MAX_IP_SUBMISSIONS = 5;
const MAX_WHATSAPP_SUBMISSIONS = 3;

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

interface RateLimitRule {
  key: string;
  max: number;
  windowMs: number;
}

export interface SubmissionGuardInput {
  honeypot: string;
  formStartedAt: string;
  requestFingerprint: string;
  whatsapp: string;
  nowMs?: number;
}

export type SubmissionGuardReason =
  | "honeypot"
  | "too_fast"
  | "stale_form"
  | "rate_limited";

export type SubmissionGuardResult =
  | { allowed: true }
  | {
      allowed: false;
      reason: SubmissionGuardReason;
      message: string;
      silent: boolean;
    };

const buckets = new Map<string, RateLimitBucket>();

function parsePositiveInteger(value: string | undefined, fallback: number): number {
  const parsed = Number(value);

  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getFormAgeMs(formStartedAt: string, nowMs: number): number | null {
  const startedAt = Number(formStartedAt);

  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return null;
  }

  return nowMs - startedAt;
}

function isRateLimited(rule: RateLimitRule, nowMs: number): boolean {
  const current = buckets.get(rule.key);

  if (!current || current.resetAt <= nowMs) {
    buckets.set(rule.key, {
      count: 1,
      resetAt: nowMs + rule.windowMs,
    });

    return false;
  }

  if (current.count >= rule.max) {
    return true;
  }

  current.count += 1;
  buckets.set(rule.key, current);

  return false;
}

function pruneExpiredBuckets(nowMs: number): void {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= nowMs) {
      buckets.delete(key);
    }
  }
}

export function evaluateSubmissionGuard(
  input: SubmissionGuardInput,
): SubmissionGuardResult {
  const nowMs = input.nowMs ?? Date.now();

  if (input.honeypot.trim()) {
    return {
      allowed: false,
      reason: "honeypot",
      message: "Permintaan diterima.",
      silent: true,
    };
  }

  const formAgeMs = getFormAgeMs(input.formStartedAt, nowMs);
  const minFormAgeMs = parsePositiveInteger(
    process.env.LEAD_FORM_MIN_AGE_MS,
    DEFAULT_MIN_FORM_AGE_MS,
  );
  const maxFormAgeMs = parsePositiveInteger(
    process.env.LEAD_FORM_MAX_AGE_MS,
    DEFAULT_MAX_FORM_AGE_MS,
  );

  if (formAgeMs !== null && formAgeMs < minFormAgeMs) {
    return {
      allowed: false,
      reason: "too_fast",
      message:
        "Pengiriman terlalu cepat. Periksa kembali isian lalu kirim ulang.",
      silent: false,
    };
  }

  if (formAgeMs !== null && formAgeMs > maxFormAgeMs) {
    return {
      allowed: false,
      reason: "stale_form",
      message:
        "Sesi form sudah kedaluwarsa. Muat ulang halaman lalu kirim kembali.",
      silent: false,
    };
  }

  pruneExpiredBuckets(nowMs);

  const rules: RateLimitRule[] = [
    {
      key: `ip:${input.requestFingerprint}`,
      max: MAX_IP_SUBMISSIONS,
      windowMs: IP_WINDOW_MS,
    },
    {
      key: `wa:${input.whatsapp}`,
      max: MAX_WHATSAPP_SUBMISSIONS,
      windowMs: WHATSAPP_WINDOW_MS,
    },
  ];

  if (rules.some((rule) => isRateLimited(rule, nowMs))) {
    return {
      allowed: false,
      reason: "rate_limited",
      message:
        "Terlalu banyak percobaan pengiriman. Coba lagi beberapa menit lagi atau hubungi WhatsApp PDAMCore.",
      silent: false,
    };
  }

  return { allowed: true };
}

export function resetSubmissionGuardForTests(): void {
  buckets.clear();
}
