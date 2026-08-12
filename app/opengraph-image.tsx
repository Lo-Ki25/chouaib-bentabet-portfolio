import { ImageResponse } from "next/og";
import { profile } from "@/lib/data";

export const runtime = "edge";
export const alt = `${profile.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #05070D 0%, #101F5C 45%, #3B6BFF 55%, #8B5CF6 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #6483FF 0%, #8B5CF6 100%)",
              color: "white",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "white" }}>
              {profile.name}
            </span>
            <span style={{ fontSize: 28, color: "#8FA4FF", marginTop: 8 }}>
              Full-Stack Developer · Next.js & TypeScript
            </span>
          </div>
        </div>
        <p style={{ fontSize: 24, color: "#CBD5E1", maxWidth: 800, lineHeight: 1.5 }}>
          Building fast, elegant web products — founder of Netnook, based in Morocco.
        </p>
      </div>
    ),
    { ...size }
  );
}
