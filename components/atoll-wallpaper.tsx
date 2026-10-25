export default function AtollWallpaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none mt-10 flex justify-center md:fixed md:inset-y-0 md:right-0 md:left-1/2 md:mt-0 md:items-start md:justify-end md:p-6"
    >
      <div className="aspect-1890/1380 max-h-full w-full max-w-3xl bg-muted-foreground/25 [mask:url(/atoll.svg)_center/contain_no-repeat]" />
    </div>
  )
}
