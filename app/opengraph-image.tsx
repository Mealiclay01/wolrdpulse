import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "WolrdPulse — Real-Time Cloud Telemetry & DevOps MCP Server";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #070a11 0%, #0d1526 50%, #0a1828 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid background lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
          }}
        />
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.3)",
            borderRadius: 8,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#60a5fa", fontSize: 18, fontWeight: 600, letterSpacing: "0.05em" }}>
            MCP Server · Open Source · Free
          </span>
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 860,
          }}
        >
          WolrdPulse
        </div>
        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            lineHeight: 1.4,
            maxWidth: 780,
            marginBottom: 48,
          }}
        >
          Real-Time Cloud Telemetry & DevOps MCP Server for AI Agents
        </div>
        {/* Feature pills */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["AWS Outages", "DNS DoH", "SSL Inspector", "Edge Latency", "Claude · Cursor · Windsurf"].map(
            (label) => (
              <div
                key={label}
                style={{
                  background: "rgba(30,41,59,0.8)",
                  border: "1px solid rgba(71,85,105,0.6)",
                  borderRadius: 8,
                  padding: "8px 18px",
                  color: "#cbd5e1",
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 80,
            fontSize: 22,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          wolrdpulse.app
        </div>
      </div>
    ),
    { ...size }
  );
}
