"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

import { takePendingScroll } from "@/lib/back-transitions"

// Puts back the scroll position saved for a history entry when browser
// back/forward lands on it (see lib/back-transitions.ts). A layout effect
// runs before the view transition captures the new page, so the page
// animates in already at the right spot.
export default function BackTransitions() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const scroll = takePendingScroll()
    if (scroll !== undefined) {
      window.scrollTo(0, scroll)
    }
  }, [pathname])

  return null
}
