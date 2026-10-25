"use client"

import { useEffect, useState } from "react"

import RollingText from "@/components/rolling-text"

const frameworks = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "Vite", href: "https://vite.dev" },
  { name: "TanStack Start", href: "https://tanstack.com/start" },
  { name: "Astro", href: "https://astro.build" },
]

export default function FrameworkLoop() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  // Hovering or focusing the link holds the current framework
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % frameworks.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [paused])

  const framework = frameworks[index]

  return (
    <span
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <RollingText id={framework.name}>
        <a
          href={framework.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground"
        >
          {framework.name}
        </a>
      </RollingText>
    </span>
  )
}
