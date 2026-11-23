import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const i18n = {
  defaultLocale: "en",
  locales: ["ar", "en", "fr", "de", "ru", "zh", "ko", "ja", "es"],
};

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  
  try {
    return matchLocale(languages, locales, i18n.defaultLocale);
  } catch (e) {
    return i18n.defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (host === "www.wolrdpulse.app") {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "wolrdpulse.app";
    return NextResponse.redirect(url, 308);
  }

  // Skip middleware for API, SSE, icons, static files, and Next.js image generation routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/sse") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/opengraph-image") ||
    pathname.startsWith("/twitter-image") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/manifest") ||
    pathname.includes(".") // Matches any file with an extension (robots.txt, sitemap.xml, llms.txt, etc.)
  ) {
    return NextResponse.next();
  }

  // Tool, IDE, status, and guide pages are English-only. Other locale
  // URLs would be the same copy and split the canonical.
  const englishOnly = pathname.match(
    /^\/(ar|fr|de|ru|zh|ko|ja|es)\/(tools|integrations|status|guides)(\/.*)?$/,
  );
  if (englishOnly) {
    const target = pathname.replace(/^\/(ar|fr|de|ru|zh|ko|ja|es)/, "/en");
    return NextResponse.redirect(new URL(`${target}${request.nextUrl.search}`, request.url), 308);
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // One canonical homepage. Negotiating the locale here split / and /en.
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url), 308);
  }

  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: [
    // Skip all internal Next.js paths (_next, static)
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
