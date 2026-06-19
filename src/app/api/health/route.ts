import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET(): NextResponse {
  return NextResponse.json(
    {
      status: "ok",
      service: "pdamcore-marketing-web",
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
