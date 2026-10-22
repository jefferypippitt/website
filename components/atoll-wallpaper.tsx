// Halftone of Kwajalein Atoll, sampled from a Landsat 7 image (public domain).
// The SVG is used as a mask so the dots take the theme's muted color.
export default function AtollWallpaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 flex items-center justify-center p-6 md:justify-end md:p-16"
    >
      <div className="aspect-[1890/1380] max-h-full w-full max-w-5xl bg-muted-foreground/25 [mask:url(/atoll.svg)_center/contain_no-repeat]" />
    </div>
  )
}
