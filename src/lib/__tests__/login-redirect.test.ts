import { describe, expect, it } from "vitest";

import { resolveLoginRedirectUrl } from "@/lib/login-redirect";

describe("login redirect", () => {
  it("redirects to the configured operational app URL", () => {
    const target = resolveLoginRedirectUrl(
      "https://app.example.test",
      "https://pdamcore.id/login",
    );

    expect(target.toString()).toBe("https://app.example.test/");
  });

  it("preserves incoming query parameters for the operational app", () => {
    const target = resolveLoginRedirectUrl(
      "https://app.example.test/auth",
      "https://pdamcore.id/login?next=%2Fbilling&period=2026-06",
    );

    expect(target.toString()).toBe(
      "https://app.example.test/auth?next=%2Fbilling&period=2026-06",
    );
  });

  it("rejects unsafe non-http protocols", () => {
    expect(() =>
      resolveLoginRedirectUrl("javascript:alert(1)", "https://pdamcore.id/login"),
    ).toThrow("NEXT_PUBLIC_APP_URL must use http or https.");
  });
});
