import { afterEach, describe, expect, it } from "vitest";

import {
  evaluateSubmissionGuard,
  resetSubmissionGuardForTests,
} from "@/lib/server/submission-guard";

const baseInput = {
  honeypot: "",
  formStartedAt: "1000",
  requestFingerprint: "request-fingerprint",
  whatsapp: "6289512728534",
  nowMs: 3000,
};

describe("submission guard", () => {
  afterEach(() => {
    resetSubmissionGuardForTests();
  });

  it("silently accepts honeypot submissions without processing them", () => {
    const result = evaluateSubmissionGuard({
      ...baseInput,
      honeypot: "filled by bot",
    });

    expect(result).toEqual({
      allowed: false,
      reason: "honeypot",
      message: "Permintaan diterima.",
      silent: true,
    });
  });

  it("rejects submissions sent too quickly after render", () => {
    const result = evaluateSubmissionGuard({
      ...baseInput,
      nowMs: 1100,
    });

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("too_fast");
      expect(result.silent).toBe(false);
    }
  });

  it("rejects stale forms", () => {
    const result = evaluateSubmissionGuard({
      ...baseInput,
      nowMs: 24 * 60 * 60 * 1000 + 3000,
    });

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("stale_form");
    }
  });

  it("rate limits repeated WhatsApp submissions", () => {
    for (let index = 0; index < 3; index += 1) {
      expect(
        evaluateSubmissionGuard({
          ...baseInput,
          requestFingerprint: `request-${index}`,
          nowMs: 3000 + index,
        }),
      ).toEqual({ allowed: true });
    }

    const result = evaluateSubmissionGuard({
      ...baseInput,
      requestFingerprint: "request-4",
      nowMs: 3004,
    });

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.reason).toBe("rate_limited");
    }
  });
});
