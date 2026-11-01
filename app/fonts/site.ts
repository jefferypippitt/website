// Subset fonts: each .woff2 holds only the characters in its unicode-range.
// Each font is a core face (ASCII, common punctuation, and any character the
// old preloaded file covered that the site uses, like ° and ′ on About;
// preloaded unless `preload: false`) plus an extended face in the same family
// that only downloads when a page uses one of its characters. The fallback
// faces are in fallbacks.css; next/font's own fallback generation is off.
import localFont from "next/font/local"

export const Geist = localFont({
  src: "./geist-core.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-sans",
  fallback: ["Geist Fallback"],
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20-7E, U+A0, U+A9, U+2013-2014, U+2018-2019, U+201C-201D, U+2026" }],
})

export const GeistExtended = localFont({
  src: "./geist-extended.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-sans-extended",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "Geist" },
    { prop: "unicode-range", value: "U+A1-A8, U+AA-AC, U+AE-113, U+116-12B, U+12E-137, U+139-13E, U+141-148, U+14A-14D, U+150-17E, U+2032, U+2212" },
  ],
})

export const GeistMono = localFont({
  src: "./geist-mono-core.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-mono",
  fallback: ["Geist Mono Fallback"],
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20-7E, U+A0, U+A9, U+B0, U+2013-2014, U+2018-2019, U+201C-201D, U+2026, U+2032" }],
})

export const GeistMonoExtended = localFont({
  src: "./geist-mono-extended.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-mono-extended",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "GeistMono" },
    { prop: "unicode-range", value: "U+A1-A8, U+AA-AC, U+AE-AF, U+B1-113, U+116-12B, U+12E-131, U+134-137, U+139-13E, U+141-148, U+14A-14D, U+150-17E, U+2212" },
  ],
})

export const GeistSerifRegular = localFont({
  src: "./geist-serif-core.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-geist-serif-regular",
  fallback: ["GeistSerifRegular Fallback", "Times New Roman", "Times", "serif"],
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20-5D, U+5F-7E, U+A0, U+A9, U+2013-2014, U+2018-2019, U+201C-201D, U+2026" }],
})

export const GeistSerifRegularExtended = localFont({
  src: "./geist-serif-extended.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-geist-serif-regular-extended",
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: "font-family", value: "GeistSerifRegular" },
    { prop: "unicode-range", value: "U+A1, U+A5-A8, U+AA-AB, U+AE-B0, U+B4, U+B6-B8, U+BA-BB, U+BF-113, U+116-12B, U+12E-137, U+139-13E, U+141-148, U+14C-14D, U+150-165, U+168-17E, U+2212" },
  ],
})
