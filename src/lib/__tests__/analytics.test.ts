import { afterEach, describe, expect, it, vi } from "vitest";

import {
  cleanAnalyticsProperties,
  trackEvent,
  type AnalyticsProperties,
} from "@/lib/analytics";

describe("analytics", () => {
  afterEach(() => {
    window.plausible = undefined;
    window.gtag = undefined;
    vi.restoreAllMocks();
  });

  it("removes undefined properties before sending events", () => {
    const properties: AnalyticsProperties = {
      placement: "hero",
      order: 1,
      enabled: true,
      ignored: undefined,
    };

    expect(cleanAnalyticsProperties(properties)).toEqual({
      placement: "hero",
      order: 1,
      enabled: true,
    });
  });

  it("sends sanitized events to Plausible and GA when available", () => {
    const plausible = vi.fn();
    const gtag = vi.fn();
    window.plausible = plausible;
    window.gtag = gtag;

    trackEvent("cta_demo_click", {
      placement: "hero",
      ignored: undefined,
    });

    expect(plausible).toHaveBeenCalledWith("cta_demo_click", {
      props: { placement: "hero" },
    });
    expect(gtag).toHaveBeenCalledWith("event", "cta_demo_click", {
      placement: "hero",
    });
  });
});
