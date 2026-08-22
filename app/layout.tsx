import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "WolrdPulse | Real-Time Telemetry for AI Agents",
  description: "WolrdPulse is an open-source MCP server that streams live cloud infrastructure status, edge diagnostics, and tech framework releases directly into your LLM's context window. Built for Claude, Cursor, and autonomous agents.",
  keywords: ["MCP Server", "AI Agents", "Cloud Status", "LLM Context", "Cursor IDE", "Claude Desktop", "DevOps Telemetry", "Model Context Protocol", "Anas Rhimi"],
  authors: [{ name: "Anas Rhimi", url: "https://anasrhimi.tech" }],
  creator: "Anas Rhimi",
  openGraph: {
    title: "WolrdPulse | Live Context for AI Agents",
    description: "Stream live AWS, Vercel, and GitHub status directly to your AI agent via Model Context Protocol.",
    url: "https://wolrdpulse.app",
    siteName: "WolrdPulse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "WolrdPulse",
              "operatingSystem": "Web, Windows, macOS, Linux",
              "applicationCategory": "DeveloperApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "WolrdPulse is an open-source Model Context Protocol (MCP) server that provides AI agents with real-time global cloud status, edge diagnostics, and tech releases.",
              "url": "https://wolrdpulse.app",
              "author": {
                "@type": "Person",
                "name": "Anas Rhimi",
                "url": "https://anasrhimi.tech"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
