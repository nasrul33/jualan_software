"use client";

export type AnalyticsEventName =
  | "cta_demo_click"
  | "cta_whatsapp_click"
  | "cta_proposal_click"
  | "cta_features_click"
  | "cta_login_click"
  | "cta_contact_click"
  | "article_view"
  | "demo_form_success"
  | "contact_form_success";

export type AnalyticsProperties = Record<
  string,
  string | number | boolean | undefined
>;

type CleanAnalyticsProperties = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: CleanAnalyticsProperties },
    ) => void;
    gtag?: (
      event: "event",
      eventName: string,
      options?: CleanAnalyticsProperties,
    ) => void;
  }
}

export function cleanAnalyticsProperties(
  properties: AnalyticsProperties,
): CleanAnalyticsProperties {
  return Object.fromEntries(
    Object.entries(properties).filter((entry): entry is [
      string,
      string | number | boolean,
    ] => entry[1] !== undefined),
  );
}

export function trackEvent(
  eventName: AnalyticsEventName,
  properties: AnalyticsProperties = {},
): void {
  if (typeof window === "undefined") {
    return;
  }

  const cleanProperties = cleanAnalyticsProperties(properties);

  window.plausible?.(eventName, { props: cleanProperties });
  window.gtag?.("event", eventName, cleanProperties);
}
