"use client"

import { ViewTransition } from "react"

import { enterWallpaper, exitWallpaper } from "@/lib/view-transitions"

// Crossfades a wallpaper in place when it appears or goes away. The
// "wallpaper" class only switches off the browser's default crossfade.
export default function WallpaperTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransition
      enter="wallpaper"
      exit="wallpaper"
      default="none"
      onEnter={enterWallpaper}
      onExit={exitWallpaper}
    >
      {children}
    </ViewTransition>
  )
}
