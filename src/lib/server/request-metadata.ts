import { createHash } from "node:crypto";

import { headers } from "next/headers";

const DEFAULT_PRIVACY_SALT = "pdamcore-marketing-web";
const MIN_PRODUCTION_SALT_LENGTH = 24;
const MAX_HEADER_LENGTH = 240;

export interface RequestMetadata {
  ipHash: string;
  userAgent: string;
  referrer: string;
  requestFingerprint: string;
}

function truncateHeader(value: string | null): string {
  return (value ?? "").trim().slice(0, MAX_HEADER_LENGTH);
}

export function getLeadPrivacySalt(): string {
  const configuredSalt = process.env.LEAD_PRIVACY_SALT?.trim();

  if (configuredSalt) {
    if (
      process.env.NODE_ENV === "production" &&
      configuredSalt.length < MIN_PRODUCTION_SALT_LENGTH
    ) {
      throw new Error(
        "LEAD_PRIVACY_SALT must be at least 24 characters in production.",
      );
    }

    return configuredSalt;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("LEAD_PRIVACY_SALT is required in production.");
  }

  return DEFAULT_PRIVACY_SALT;
}

function hashValue(value: string): string {
  const salt = getLeadPrivacySalt();

  return createHash("sha256")
    .update(`${salt}:${value}`)
    .digest("hex")
    .slice(0, 32);
}

function getClientIp(headerValue: string | null): string {
  if (!headerValue) {
    return "unknown";
  }

  const [firstIp] = headerValue.split(",");

  return firstIp?.trim() || "unknown";
}

export async function getRequestMetadata(): Promise<RequestMetadata> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const realIp = requestHeaders.get("x-real-ip");
  const cfConnectingIp = requestHeaders.get("cf-connecting-ip");
  const userAgent = truncateHeader(requestHeaders.get("user-agent"));
  const referrer = truncateHeader(requestHeaders.get("referer"));
  const clientIp = getClientIp(cfConnectingIp ?? realIp ?? forwardedFor);
  const ipHash = hashValue(clientIp);

  return {
    ipHash,
    userAgent,
    referrer,
    requestFingerprint: hashValue(`${clientIp}:${userAgent}`),
  };
}
