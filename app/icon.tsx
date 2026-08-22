import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#ffffff",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#000000",
          borderRadius: "8px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      >
        W
      </div>
    ),
    {
      ...size,
    }
  );
}
