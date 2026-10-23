import { ViewTransition } from "react"

// Halftone of Kwajalein Atoll, sampled from a Landsat 7 image (public domain).
// The SVG is used as a mask so the dots take the theme's muted color.
// On phones it sits below the content; from md up it's fixed to the top
// right of the screen, within the right half. Render it outside the page's
// PageTransition so it crossfades with the flag star instead of sliding with
// the page.
export default function AtollWallpaper() {
  return (
    <ViewTransition enter="wallpaper" exit="wallpaper" default="none">
      <div
        aria-hidden
        className="pointer-events-none mt-10 flex justify-center md:fixed md:inset-y-0 md:right-0 md:left-1/2 md:mt-0 md:items-start md:justify-end md:p-6"
      >
        <div className="aspect-1890/1380 max-h-full w-full max-w-3xl bg-muted-foreground/25 [mask:url(/atoll.svg)_center/contain_no-repeat]" />
      </div>
    </ViewTransition>
  )
}
