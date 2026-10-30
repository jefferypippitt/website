"use client"

import { useToggleTheme } from "@/components/theme-provider"
import { Kbd } from "@/components/ui/kbd"

export default function ThemeHint() {
  const toggleTheme = useToggleTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer type-caption text-muted-foreground"
    >
      (Press <Kbd>d</Kbd> to switch theme)
    </button>
  )
}
