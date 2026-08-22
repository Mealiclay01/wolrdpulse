import { NextResponse } from "next/server";
import { fetchAllCloudStatus, fetchSingleCloudStatus } from "@/lib/services/cloudStatus";

export const dynamic = "force-dynamic";
export const revalidate = 30;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider");

  try {
    if (provider) {
      const status = await fetchSingleCloudStatus(provider);
      if (!status) {
        return NextResponse.json(
          { error: `Provider "${provider}" not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(status);
    }

    const all = await fetchAllCloudStatus();
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      count: all.length,
      services: all,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch cloud status" },
      { status: 500 }
    );
  }
}
