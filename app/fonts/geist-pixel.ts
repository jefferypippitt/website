// Subset fonts: each .woff2 holds only the characters in its unicode-range.
// Each font is a core face (ASCII and common punctuation, preloaded unless
// `preload: false`) plus an extended face in the same family that only
// downloads when a page uses one of its characters. The fallback faces are in
// fallbacks.css; next/font's own fallback generation is off.
import localFont from "next/font/local"

export const GeistPixelCircle = localFont({
  src: "./geist-pixel-circle-core.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-geist-pixel-circle",
  preload: false,
  fallback: ["GeistMono", "ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20-7E, U+A0, U+A9, U+2013-2014, U+2018-2019, U+201C-201D, U+2026" }],
})

export const GeistPixelCircleExtended = localFont({
  src: "./geist-pixel-circle-extended.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-geist-pixel-circle-extended",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "GeistPixelCircle" },
    { prop: "unicode-range", value: "U+A1-A8, U+AA-113, U+116-12B, U+12E-137, U+139-13E, U+141-148, U+14C-14D, U+150-165, U+168-17E, U+2032, U+2212" },
  ],
})
