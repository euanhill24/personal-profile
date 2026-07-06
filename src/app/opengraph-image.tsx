import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Euan Hill — AI Consultant & Technologist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const portrait = await readFile(
    join(process.cwd(), "public/euan-portrait.jpg")
  );
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f5f0e8",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            paddingRight: "60px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#8b7355",
              marginBottom: 28,
            }}
          >
            Portfolio
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 600,
              color: "#1e1914",
              lineHeight: 1.05,
              marginBottom: 32,
            }}
          >
            Euan Hill
          </div>
          <div
            style={{
              width: 96,
              height: 2,
              backgroundColor: "#8b7355",
              marginBottom: 32,
            }}
          />
          <div
            style={{
              fontSize: 30,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5c4d3c",
              marginBottom: 20,
            }}
          >
            AI Consultant &amp; Technologist
          </div>
          <div style={{ fontSize: 24, color: "#8b7355" }}>euanhill.com</div>
        </div>
        <img
          src={portraitSrc}
          alt=""
          width={340}
          height={425}
          style={{
            borderRadius: "32px 8px 32px 8px",
            objectFit: "cover",
            border: "1px solid #d4c5b0",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
