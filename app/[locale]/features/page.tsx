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

  const title = t?.features?.title
    ? `${t.features.title} | WolrdPulse`
    : "WolrdPulse Features — Cloud Status, DNS, SSL & Edge Latency MCP Tools";
  const description = t?.features?.subtitle
    || "Explore all DevOps telemetry tools: real-time AWS/Vercel/GitHub outage detection, DNS-over-HTTPS resolver, SSL certificate inspector, and edge latency probes for AI coding agents.";
  const ogImageUrl = "https://wolrdpulse.app/opengraph-image";

  const languages: Record<string, string> = {
    'x-default': 'https://wolrdpulse.app/en/features',
  };
  i18n.locales.forEach((l: string) => {
    languages[l] = `https://wolrdpulse.app/${l}/features`;
  });

  return {
    title,
    description,
    alternates: {
      canonical: `https://wolrdpulse.app/${locale}/features`,
      languages,
    },
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
  const faq = [
    [t?.features?.faq1Q, t?.features?.faq1A],
    [t?.features?.faq2Q, t?.features?.faq2A],
    [t?.features?.faq3Q, t?.features?.faq3A],
    [t?.features?.faq4Q, t?.features?.faq4A],
  ].filter((pair) => pair[0] && pair[1]);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <FeaturesClient t={t} locale={locale} />
    </>
  );
}
