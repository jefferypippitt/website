import { ogSize, renderOgImage } from "@/lib/og-image"
import { site } from "@/lib/site"

export const alt = site.name
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return renderOgImage({
    title: site.name,
    subtitle: "Building modern web applications.",
    meta: new URL(site.url).host,
  })
}
