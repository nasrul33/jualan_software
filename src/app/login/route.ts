import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { APP_URL } from "@/lib/constants";
import { resolveLoginRedirectUrl } from "@/lib/login-redirect";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest): NextResponse {
  const target = resolveLoginRedirectUrl(APP_URL, request.url);
  const response = NextResponse.redirect(target, 307);

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");

  return response;
}

export { GET as HEAD };
