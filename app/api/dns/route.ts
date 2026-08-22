import { NextResponse } from "next/server";
import { inspectDns } from "@/lib/services/network";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");
  const type = searchParams.get("type") || "A";

  if (!domain) {
    return NextResponse.json(
      { error: "Query parameter 'domain' is required (e.g. ?domain=wolrdpulse.app)" },
      { status: 400 }
    );
  }

  try {
    const result = await inspectDns(domain, type);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to inspect DNS" },
      { status: 500 }
    );
  }
}
