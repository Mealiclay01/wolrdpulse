import { NextRequest, NextResponse } from "next/server";
import tls from "tls";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain parameter is required" }, { status: 400 });
  }

  // Clean domain input
  const cleanDomain = domain.replace(/^(https?:\/\/)/, '').split('/')[0];

  try {
    const certInfo = await new Promise((resolve, reject) => {
      const socket = tls.connect({
        host: cleanDomain,
        port: 443,
        servername: cleanDomain,
        rejectUnauthorized: false,
      }, () => {
        const cert = socket.getPeerCertificate(true);
        socket.end();
        if (!cert || Object.keys(cert).length === 0) {
          reject(new Error("No certificate found"));
          return;
        }
        resolve({
          subject: cert.subject,
          issuer: cert.issuer,
          valid_from: cert.valid_from,
          valid_to: cert.valid_to,
          fingerprint: cert.fingerprint,
          serialNumber: cert.serialNumber,
          daysRemaining: Math.floor((new Date(cert.valid_to).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        });
      });

      socket.on('error', (err) => {
        reject(err);
      });
      
      socket.setTimeout(5000, () => {
        socket.destroy();
        reject(new Error("Connection timeout"));
      });
    });

    return NextResponse.json(certInfo);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch SSL certificate" }, { status: 500 });
  }
}
