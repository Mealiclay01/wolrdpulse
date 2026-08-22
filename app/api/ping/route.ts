import { NextResponse } from "next/server";
import { pingEndpoint } from "@/lib/services/network";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "Query parameter 'url' is required (e.g. ?url=https://api.github.com)" },
      { status: 400 }
    );
  }

  try {
    const result = await pingEndpoint(url);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to ping endpoint" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body.url;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Field 'url' is required in request body" },
        { status: 400 }
      );
    }

    const result = await pingEndpoint(url);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process ping request" },
      { status: 500 }
    );
  }
}
