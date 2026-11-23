import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { getDictionary } from "@/lib/i18n";
import { i18n } from "@/middleware";
import { withSearchKeywords } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import {
  AUTHOR_NAME,
  AUTHOR_SAME_AS,
  AUTHOR_URL,
  GITHUB_REPO,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getDictionary(locale);

  // Generate hreflang for all supported locales
  const languages: Record<string, string> = {
    'x-default': 'https://wolrdpulse.app/en',
  };
  
  i18n.locales.forEach((l) => {
    languages[l] = `https://wolrdpulse.app/${l}`;
  });

  return {
    metadataBase: new URL("https://wolrdpulse.app"),
    title: {
      default: t?.metadata?.title || "WolrdPulse | Real-Time Telemetry & DevOps MCP Server for AI Agents",
      template: "%s | WolrdPulse",
    },
    description: t?.metadata?.description || "WolrdPulse is an open-source Model Context Protocol (MCP) server.",
    keywords: withSearchKeywords(t?.metadata?.keywords),
    authors: [{ name: "Anas Rhimi", url: "https://anasrhimi.tech" }],
    creator: "Anas Rhimi",
    publisher: "WolrdPulse",
    alternates: {
      canonical: `https://wolrdpulse.app/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "4WpM2nEjRmdi_hJPVgfoiFL6BLHGo0Kyt_dLvGug5Gw",
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    openGraph: {
      title: t?.metadata?.title || "WolrdPulse | Real-Time Telemetry MCP Server for AI Agents",
      description: t?.metadata?.description || "Open-source Model Context Protocol server.",
      url: `https://wolrdpulse.app/${locale}`,
      siteName: "WolrdPulse",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t?.metadata?.title || "WolrdPulse | Real-Time Telemetry MCP Server for AI Agents",
      description: t?.metadata?.description || "Eliminate AI agent hallucinations during cloud outages.",
      creator: "@Mealiclay01",
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const isRtl = locale === 'ar';

  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://wolrdpulse.app/#website",
        "url": `${SITE_URL}/en`,
        "name": SITE_NAME,
        "description": "Open-source Model Context Protocol (MCP) DevOps telemetry server. Not the World Pulse social app and not the WorldPulse weather product.",
        "keywords": withSearchKeywords(t?.metadata?.keywords).join(", "),
        "publisher": {
          "@id": "https://wolrdpulse.app/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://wolrdpulse.app/#organization",
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": `${SITE_URL}/icon`,
        "sameAs": [GITHUB_REPO, AUTHOR_URL],
      },
      {
        "@type": "Person",
        "@id": "https://anasrhimi.tech/#person",
        "name": AUTHOR_NAME,
        "jobTitle": "DevOps & Cloud Engineer",
        "url": AUTHOR_URL,
        "sameAs": AUTHOR_SAME_AS,
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://wolrdpulse.app/#software",
        "name": SITE_NAME,
        "alternateName": ["WolrdPulse MCP Server", "WolrdPulse AI DevOps Telemetry"],
        "applicationCategory": "DeveloperApplication",
        "applicationSubCategory": "Model Context Protocol (MCP) Server",
        "operatingSystem": "Cross-platform (macOS, Linux, Windows)",
        "featureList": [
          "Real-time AWS, Vercel, and GitHub cloud outage status via get_cloud_status",
          "TLS/SSL certificate expiration and issuer chain inspection via inspect_ssl",
          "DNS-over-HTTPS A, AAAA, CNAME, MX, TXT lookups via query_dns",
          "Synthetic HTTP edge latency and header probes via ping_endpoint",
        ],
        "codeRepository": GITHUB_REPO,
        "license": "https://opensource.org/licenses/MIT",
        "image": "https://wolrdpulse.app/opengraph-image",
        "brand": { "@type": "Brand", "name": "WolrdPulse" },
        "keywords": withSearchKeywords(t?.metadata?.keywords).join(", "),
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-01-01",
          "priceValidUntil": "2027-12-31",
          "url": `https://wolrdpulse.app/${locale}`,
        },
        "description": t?.metadata?.description || "Open-source Model Context Protocol server.",
        "url": `${SITE_URL}/en`,
        "author": {
          "@id": "https://anasrhimi.tech/#person",
        },
      },
    ],
  };

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <JsonLd data={jsonLdGraph} />
      </body>
    </html>
  );
}
