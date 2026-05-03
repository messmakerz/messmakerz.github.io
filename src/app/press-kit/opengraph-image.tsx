import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MESS Press Kit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Red dot */}
        <div
          style={{
            position: "absolute",
            top: 52,
            left: 64,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#DD3235",
            display: "flex",
          }}
        />

        {/* MESS wordmark */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.05em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            MESS
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#666666",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            PRESS KIT
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: 64,
            right: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#444444", letterSpacing: "0.2em", display: "flex" }}>
            CONCEPT-DRIVEN EVENTS
          </span>
          <span style={{ fontSize: 14, color: "#444444", letterSpacing: "0.15em", display: "flex" }}>
            MESSMAKERZ.COM
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
