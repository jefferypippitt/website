import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"

export const ogSize = { width: 1200, height: 630 }

const fonts = join(process.cwd(), "node_modules/geist/dist/fonts")
const geist = await readFile(join(fonts, "geist-sans/Geist-Medium.ttf"))
const geistMono = await readFile(
  join(fonts, "geist-mono/GeistMono-Regular.ttf")
)

export function renderOgImage({
  title,
  subtitle,
  meta,
}: {
  title: string
  subtitle: string
  meta: string
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#0a0a0a",
        color: "#fafafa",
        fontFamily: "Geist",
      }}
    >
      <div style={{ fontSize: 72 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 36, color: "#a1a1a1" }}>{subtitle}</div>
        <div
          style={{ fontSize: 28, color: "#a1a1a1", fontFamily: "Geist Mono" }}
        >
          {meta}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: geist, weight: 500 },
        { name: "Geist Mono", data: geistMono, weight: 400 },
      ],
    }
  )
}
