import { NextResponse } from "next/server";

import { assertLeadStorageWritable, getErrorMessage } from "@/lib/server/lead-store";
import { getLeadPrivacySalt } from "@/lib/server/request-metadata";

export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const checks = {
    leadPrivacySalt: {
      status: "ok" as "ok" | "failed",
      message: "Lead privacy salt is configured.",
    },
    leadStorage: {
      status: "ok" as "ok" | "failed",
      message: "Lead storage is writable.",
    },
  };
  let statusCode = 200;

  try {
    getLeadPrivacySalt();
  } catch (error) {
    statusCode = 503;
    checks.leadPrivacySalt = {
      status: "failed",
      message: getErrorMessage(error),
    };
  }

  try {
    await assertLeadStorageWritable();
  } catch (error) {
    statusCode = 503;
    checks.leadStorage = {
      status: "failed",
      message: getErrorMessage(error),
    };
  }

  return NextResponse.json(
    {
      status: statusCode === 200 ? "ok" : "failed",
      service: "pdamcore-marketing-web",
      checks,
      timestamp: new Date().toISOString(),
    },
    {
      status: statusCode,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    },
  );
}
