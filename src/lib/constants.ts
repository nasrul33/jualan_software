const DEFAULT_SITE_URL = "https://pdamcore.id";
const DEFAULT_APP_URL = "https://app.pdamcore.id";
const DEFAULT_WHATSAPP_NUMBER = "6289512728534";
const DEFAULT_CONTACT_EMAIL = "info@pdamcore.id";
const DEFAULT_PLAUSIBLE_DOMAIN = "pdamcore.id";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function parseBooleanEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined) {
    return fallback;
  }

  return value === "true";
}

export const SITE_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export const APP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_APP_URL ?? DEFAULT_APP_URL,
);

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;

export const ANALYTICS_ENABLED = parseBooleanEnv(
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED,
  true,
);

export const ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
  process.env.NEXT_PUBLIC_ANALYTICS_ID ??
  "";

export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? DEFAULT_PLAUSIBLE_DOMAIN;

export const SITE_ROUTES = {
  home: "/",
  fitur: "/fitur",
  solusi: "/solusi",
  edukasi: "/edukasi",
  demo: "/demo",
  kontak: "/kontak",
  privacy: "/privacy",
  login: "/login",
} as const;
