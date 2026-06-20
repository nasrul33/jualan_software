import { afterEach, describe, expect, it, vi } from "vitest";

import { getLeadPrivacySalt } from "@/lib/server/request-metadata";

describe("request metadata environment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses a development-only fallback salt outside production", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("LEAD_PRIVACY_SALT", "");

    expect(getLeadPrivacySalt()).toBe("pdamcore-marketing-web");
  });

  it("requires LEAD_PRIVACY_SALT in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("LEAD_PRIVACY_SALT", "");

    expect(() => getLeadPrivacySalt()).toThrow(
      "LEAD_PRIVACY_SALT is required in production.",
    );
  });

  it("rejects weak production salts", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("LEAD_PRIVACY_SALT", "too-short");

    expect(() => getLeadPrivacySalt()).toThrow(
      "LEAD_PRIVACY_SALT must be at least 24 characters in production.",
    );
  });
});
