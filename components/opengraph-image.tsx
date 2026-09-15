import { ImageResponse } from "next/og";
import { join } from "path";
import { readFile } from "fs/promises";
import { siteConfig } from "lib/site-config";

export type Props = { title?: string };

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const file = await readFile(join(process.cwd(), "./fonts/Inter-Bold.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f8f4",
          color: "#285447",
          padding: "64px",
        }}
      >
        <div style={{ display: "flex", fontSize: 26 }}>
          {siteConfig.name} · Shenzhen
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            lineHeight: 1.15,
            maxWidth: 1040,
          }}
        >
          {props?.title || "Home health devices. Wholesale sourcing."}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#53685f" }}>
          Product catalog · Samples & MOQ by inquiry · Request a quote
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: Uint8Array.from(file).buffer,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
