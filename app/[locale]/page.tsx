import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getDictionary } from "@/lib/i18n";
import { i18n } from "@/middleware";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  const ogImageUrl = "https://wolrdpulse.app/opengraph-image";

  return {
    title: t?.metadata?.title || "WolrdPulse — MCP Server for Real-Time Cloud Status, DNS & SSL | AI DevOps Telemetry",
    description: t?.metadata?.description,
    openGraph: {
      title: t?.metadata?.title,
      description: t?.metadata?.description,
      url: `https://wolrdpulse.app/${locale}`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "WolrdPulse — Real-Time Cloud Telemetry MCP Server" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t?.metadata?.title,
      description: t?.metadata?.description,
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
  return <HomeClient t={t} locale={locale} />;
}
