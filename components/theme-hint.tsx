"use client"

import { useToggleTheme } from "@/components/theme-provider"
import { Kbd } from "@/components/ui/kbd"

// The footer's hotkey hint, also a button so phones can switch theme by
// tapping it.
export default function ThemeHint() {
  const toggleTheme = useToggleTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer text-xs text-muted-foreground"
    >
      (Press <Kbd>d</Kbd> to switch theme)
    </button>
  )
}
