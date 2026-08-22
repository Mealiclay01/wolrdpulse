import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "next-themes";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://wolrdpulse.app"),
  title: {
    default: "WolrdPulse | Real-Time Telemetry & DevOps MCP Server for AI Agents",
    template: "%s | WolrdPulse",
  },
  description:
    "WolrdPulse is an open-source Model Context Protocol (MCP) server streaming live cloud outages (AWS, Vercel, GitHub), DNS DoH queries, and SSL certificate verification directly into Claude Desktop and Cursor.",
  keywords: [
    "MCP Server",
    "Model Context Protocol",
    "AI Coding Agents",
    "Claude Desktop MCP",
    "Cursor IDE MCP",
    "Cloud Outage API",
    "AWS Status MCP",
    "Vercel Status API",
    "SSL Certificate Inspector",
    "DNS-over-HTTPS Resolver",
    "DevOps Telemetry",
    "Anas Rhimi",
  ],
  authors: [{ name: "Anas Rhimi", url: "https://anasrhimi.tech" }],
  creator: "Anas Rhimi",
  publisher: "WolrdPulse",
  alternates: {
    canonical: "https://wolrdpulse.app",
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
    title: "WolrdPulse | Real-Time Telemetry MCP Server for AI Agents",
    description:
      "Open-source Model Context Protocol server streaming live cloud outages, edge latency, DNS queries, and SSL verification directly into Claude and Cursor.",
    url: "https://wolrdpulse.app",
    siteName: "WolrdPulse",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WolrdPulse | Real-Time Telemetry MCP Server for AI Agents",
    description:
      "Eliminate AI agent hallucinations during cloud outages with live DevOps context for Claude and Cursor.",
    creator: "@Mealiclay01",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://wolrdpulse.app/#website",
        "url": "https://wolrdpulse.app",
        "name": "WolrdPulse",
        "description": "Real-time DevOps telemetry and Model Context Protocol (MCP) server for autonomous AI agents.",
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
        "description": "Open-source Model Context Protocol server delivering real-time cloud outages, TLS certificate inspection, and DNS propagation to Claude Desktop and Cursor.",
        "url": "https://wolrdpulse.app",
        "author": {
          "@id": "https://anasrhimi.tech/#person",
        },
      },
    ],
  };

  return (
    <html lang="en" dir="ltr" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
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
