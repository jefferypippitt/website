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
      className="inline-grid whitespace-nowrap max-sm:grid max-sm:w-fit"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {frameworks.map((item) => (
        <span
          key={item.name}
          aria-hidden
          className="invisible col-start-1 row-start-1"
        >
          {item.name}
        </span>
      ))}
      <RollingText id={framework.name} className="col-start-1 row-start-1">
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
