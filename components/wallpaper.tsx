"use client"

import { usePathname } from "next/navigation"

import WallpaperTransition from "@/components/wallpaper-transition"

// Halftone wallpapers on the same dot grid as the atoll, one per section: a
// Marshallese outrigger canoe on Home, the 24-point star from the flag of
// the Marshall Islands on Projects, a coconut palm on Blog and its posts, and
// a stick chart on Contact. The stick chart is traced from a photo of a
// rebbelib in the Library of Congress (public domain,
// https://www.loc.gov/item/2010586182/). Each SVG is used as a mask so the
// dots take the theme's muted color. Placed like AtollWallpaper; About has
// the atoll, so it's skipped there. Keyed by image, so changing wallpaper
// crossfades in place.
const wallpapers: Record<string, string> = {
  "": "[mask:url(/canoe.svg)_center/contain_no-repeat]",
  projects: "[mask:url(/star.svg)_center/contain_no-repeat]",
  blog: "[mask:url(/palm.svg)_center/contain_no-repeat]",
  contact: "[mask:url(/stick-chart.svg)_center/contain_no-repeat]",
}

export default function Wallpaper() {
  const section = usePathname().split("/")[1]
  const mask = wallpapers[section]

  if (!mask) {
    return null
  }

  return (
    <WallpaperTransition key={mask}>
      <div
        aria-hidden
        className="pointer-events-none flex justify-center md:fixed md:inset-y-0 md:right-0 md:left-1/2 md:-z-10 md:items-start md:justify-end md:p-6"
      >
        <div
          className={`aspect-square max-h-full w-full max-w-lg bg-muted-foreground/25 ${mask}`}
        />
      </div>
    </WallpaperTransition>
  )
}
