"use client"

import { usePathname } from "next/navigation"

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
    <div
      aria-hidden
      className="pointer-events-none flex justify-center md:fixed md:inset-y-0 md:right-0 md:left-1/2 md:-z-10 md:items-start md:justify-end md:p-6"
    >
      <div
        className={`aspect-square max-h-full w-full max-w-lg bg-muted-foreground/25 ${mask}`}
      />
    </div>
  )
}
