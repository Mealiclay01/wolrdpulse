import type { Metadata } from "next";
import FeaturesClient from "./FeaturesClient";
import { getDictionary } from "@/lib/i18n";
import { i18n } from "@/middleware";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  const title = `WolrdPulse Features — Cloud Status, DNS, SSL & Edge Latency MCP Tools`;
  const description = t?.features?.subtitle
    || "Explore all DevOps telemetry tools: real-time AWS/Vercel/GitHub outage detection, DNS-over-HTTPS resolver, SSL certificate inspector, and edge latency probes for AI coding agents.";
  const ogImageUrl = "https://wolrdpulse.app/opengraph-image";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wolrdpulse.app/${locale}/features`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "WolrdPulse Features" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return <FeaturesClient t={t} locale={locale} />;
}
