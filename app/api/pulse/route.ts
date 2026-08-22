import { NextResponse } from "next/server";
import { fetchLatestReleases, fetchTrendingTopics } from "@/lib/services/techPulse";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export async function GET() {
  try {
    const [releases, trending] = await Promise.all([
      fetchLatestReleases(),
      fetchTrendingTopics(),
    ]);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      releases,
      trending,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch tech pulse" },
      { status: 500 }
    );
  }
}
