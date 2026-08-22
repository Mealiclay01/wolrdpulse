import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import { ThemeProvider } from "next-themes";
import { getDictionary } from "@/lib/i18n";
import { i18n } from "@/middleware";

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
    'x-default': 'https://wolrdpulse.app',
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
    keywords: t?.metadata?.keywords || [],
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
        "url": `https://wolrdpulse.app/${locale}`,
        "name": "WolrdPulse",
        "description": t?.metadata?.description || "Real-time DevOps telemetry and Model Context Protocol (MCP) server.",
        "publisher": {
          "@id": "https://wolrdpulse.app/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://wolrdpulse.app/#organization",
        "name": "WolrdPulse",
        "url": "https://wolrdpulse.app",
        "logo": "https://wolrdpulse.app/icon",
        "sameAs": [
          "https://github.com/Mealiclay01/wolrdpulse",
          "https://github.com/Mealiclay01",
          "https://anasrhimi.tech",
        ],
      },
      {
        "@type": "Person",
        "@id": "https://anasrhimi.tech/#person",
        "name": "Anas Rhimi",
        "jobTitle": "DevOps & Cloud Engineer",
        "url": "https://anasrhimi.tech",
        "sameAs": [
          "https://github.com/Mealiclay01",
          "https://github.com/Mealiclay01/wolrdpulse",
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://wolrdpulse.app/#software",
        "name": "WolrdPulse MCP Server",
        "operatingSystem": "Web, macOS, Windows, Linux",
        "applicationCategory": "DeveloperApplication",
        "license": "https://opensource.org/licenses/MIT",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
        "description": t?.metadata?.description || "Open-source Model Context Protocol server.",
        "url": `https://wolrdpulse.app/${locale}`,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdGraph),
          }}
        />
      </body>
    </html>
  );
}
