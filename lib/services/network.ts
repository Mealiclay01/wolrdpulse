import tls from "tls";

export interface PingResult {
  url: string;
  statusCode: number;
  statusText: string;
  isOk: boolean;
  totalTimeMs: number;
  dnsTimeMs?: number;
  headers: Record<string, string>;
  ipAddress?: string;
  redirectCount: number;
  timestamp: string;
}

export interface DnsAnswer {
  name: string;
  type: number;
  typeName: string;
  TTL: number;
  data: string;
}

export interface DnsResult {
  domain: string;
  recordType: string;
  status: number;
  statusName: string;
  answers: DnsAnswer[];
  authority: DnsAnswer[];
  rawResponseTimeMs: number;
  timestamp: string;
}

export interface SslResult {
  domain: string;
  valid: boolean;
  daysRemaining: number;
  issuer: string;
  subject: string;
  validFrom: string;
  validTo: string;
  fingerprint: string;
  serialNumber?: string;
  timestamp: string;
}

const DNS_TYPE_MAP: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  33: "SRV",
  257: "CAA",
};

const DNS_STATUS_MAP: Record<number, string> = {
  0: "NOERROR (Success)",
  1: "FORMERR (Format Error)",
  2: "SERVFAIL (Server Failure)",
  3: "NXDOMAIN (Non-Existent Domain)",
  4: "NOTIMP (Not Implemented)",
  5: "REFUSED (Query Refused)",
};

/**
 * Validates whether a hostname is blocked to prevent Server-Side Request Forgery (SSRF)
 * Blocks localhost, loopbacks (127.0.0.0/8), cloud metadata (169.254.169.254),
 * and private RFC 1918 networks.
 */
export function isBlockedHost(host: string): boolean {
  const normalized = host.toLowerCase().trim().replace(/:\d+$/, "");

  // Localhost & loopbacks
  if (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "0.0.0.0" ||
    normalized.startsWith("127.")
  ) {
    return true;
  }

  // AWS, GCP, Azure link-local metadata IP
  if (normalized === "169.254.169.254" || normalized.startsWith("169.254.")) {
    return true;
  }

  // Private RFC 1918 subnets
  if (
    normalized.startsWith("10.") ||
    normalized.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(normalized)
  ) {
    return true;
  }

  // Internal and local domain extensions
  if (
    normalized.endsWith(".local") ||
    normalized.endsWith(".internal") ||
    normalized.endsWith(".lan") ||
    normalized.endsWith(".home")
  ) {
    return true;
  }

  return false;
}

export async function pingEndpoint(rawUrl: string): Promise<PingResult> {
  let targetUrl = rawUrl.trim();
  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    const parsed = new URL(targetUrl);
    if (isBlockedHost(parsed.hostname)) {
      throw new Error(`Target host "${parsed.hostname}" is restricted (SSRF protection policy).`);
    }
  } catch (err: any) {
    if (err.message?.includes("SSRF protection")) throw err;
    throw new Error(`Invalid target URL provided: ${rawUrl}`);
  }

  const startTime = performance.now();
  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "WolrdPulse-Agent/1.0 (+https://wolrdpulse.app)",
        Accept: "*/*",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });

    const totalTimeMs = Math.round(performance.now() - startTime);

    const importantHeaders: Record<string, string> = {};
    const keys = [
      "server",
      "content-type",
      "content-length",
      "cf-ray",
      "x-vercel-id",
      "cache-control",
      "strict-transport-security",
    ];

    keys.forEach((k) => {
      const v = response.headers.get(k);
      if (v) importantHeaders[k] = v;
    });

    return {
      url: targetUrl,
      statusCode: response.status,
      statusText: response.statusText,
      isOk: response.ok,
      totalTimeMs,
      headers: importantHeaders,
      redirectCount: response.redirected ? 1 : 0,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    const totalTimeMs = Math.round(performance.now() - startTime);
    return {
      url: targetUrl,
      statusCode: 0,
      statusText: error.message || "Connection Failed",
      isOk: false,
      totalTimeMs,
      headers: {},
      redirectCount: 0,
      timestamp: new Date().toISOString(),
    };
  }
}

export async function inspectDns(
  domain: string,
  recordType: string = "A"
): Promise<DnsResult> {
  const cleanDomain = domain
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .trim();

  if (isBlockedHost(cleanDomain)) {
    throw new Error(`Domain "${cleanDomain}" is restricted from public DNS querying.`);
  }

  const type = recordType.toUpperCase();
  const startTime = performance.now();

  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(
      cleanDomain
    )}&type=${encodeURIComponent(type)}`,
    {
      headers: {
        Accept: "application/dns-json",
      },
      next: { revalidate: 15 },
      signal: AbortSignal.timeout(5000),
    }
  );

  const rawResponseTimeMs = Math.round(performance.now() - startTime);
  if (!res.ok) {
    throw new Error(`Cloudflare DoH returned HTTP ${res.status}`);
  }

  const json = await res.json();

  const mapAnswers = (items?: any[]): DnsAnswer[] => {
    if (!items || !Array.isArray(items)) return [];
    return items.map((a) => ({
      name: a.name,
      type: a.type,
      typeName: DNS_TYPE_MAP[a.type] || `TYPE_${a.type}`,
      TTL: a.TTL,
      data: a.data,
    }));
  };

  return {
    domain: cleanDomain,
    recordType: type,
    status: json.Status,
    statusName: DNS_STATUS_MAP[json.Status] || `CODE_${json.Status}`,
    answers: mapAnswers(json.Answer),
    authority: mapAnswers(json.Authority),
    rawResponseTimeMs,
    timestamp: new Date().toISOString(),
  };
}

export async function inspectSslCertificate(domain: string): Promise<SslResult> {
  const cleanDomain = domain
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .trim();

  if (isBlockedHost(cleanDomain)) {
    throw new Error(`Host "${cleanDomain}" is restricted from TLS probing.`);
  }

  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      {
        host: cleanDomain,
        port: 443,
        servername: cleanDomain,
        rejectUnauthorized: false,
      },
      () => {
        const cert = socket.getPeerCertificate(true);
        socket.end();
        if (!cert || Object.keys(cert).length === 0) {
          reject(new Error("No certificate found"));
          return;
        }

        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.floor(
          (validTo.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        );

        const formatCertField = (field: any, fallback: string): string => {
          if (!field) return fallback;
          if (Array.isArray(field)) return String(field[0] || fallback);
          return String(field);
        };

        const issuerObj = typeof cert.issuer === "object" && cert.issuer !== null ? cert.issuer : {};
        const subjectObj = typeof cert.subject === "object" && cert.subject !== null ? cert.subject : {};

        const issuerString = formatCertField(issuerObj.O || issuerObj.CN, "Unknown Issuer");
        const subjectString = formatCertField(subjectObj.CN, cleanDomain);

        resolve({
          domain: cleanDomain,
          valid: daysRemaining > 0,
          daysRemaining,
          issuer: issuerString,
          subject: subjectString,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          fingerprint: cert.fingerprint,
          serialNumber: cert.serialNumber,
          timestamp: new Date().toISOString(),
        });
      }
    );

    socket.on("error", (err) => {
      reject(err);
    });

    socket.setTimeout(6000, () => {
      socket.destroy();
      reject(new Error("Connection timed out while inspecting TLS certificate"));
    });
  });
}
