// Subset fonts: each .woff2 holds only the characters in its unicode-range.
// Each font is a core face (ASCII and common punctuation, preloaded unless
// `preload: false`) plus an extended face in the same family that only
// downloads when a page uses one of its characters. The fallback faces are in
// fallbacks.css; next/font's own fallback generation is off.
import localFont from "next/font/local"

export const JetBrainsMono = localFont({
  src: "./jetbrains-mono-core.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-jetbrains-mono",
  fallback: ["JetBrains Mono Fallback"],
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20-7E, U+A0, U+A9, U+2013-2014, U+2018-2019, U+201C-201D, U+2026" }],
})

export const JetBrainsMonoExtended = localFont({
  src: "./jetbrains-mono-extended.woff2",
  weight: "400 600",
  style: "normal",
  variable: "--font-jetbrains-mono-extended",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "JetBrainsMono" },
    { prop: "unicode-range", value: "U+A1-A8, U+AA-131, U+134-17F, U+2032, U+2212" },
  ],
})
