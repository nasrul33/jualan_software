import { createHash } from "node:crypto";

import { headers } from "next/headers";

const DEFAULT_PRIVACY_SALT = "pdamcore-marketing-web";
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

function hashValue(value: string): string {
  const salt = process.env.LEAD_PRIVACY_SALT ?? DEFAULT_PRIVACY_SALT;

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
