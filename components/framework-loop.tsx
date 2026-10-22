"use client"

import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { useEffect, useState } from "react"

const frameworks = [
  { name: "Next.js", href: "https://nextjs.org" },
  { name: "Vite", href: "https://vite.dev" },
  { name: "TanStack Start", href: "https://tanstack.com/start" },
  { name: "Astro", href: "https://astro.build" },
]

const word = {
  initial: {},
  animate: { transition: { staggerChildren: 0.015 } },
  exit: { transition: { staggerChildren: 0.015 } },
}

const letter = {
  initial: { y: "100%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "-100%", opacity: 0 },
}

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
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <span
        className="relative inline-flex overflow-x-visible overflow-y-clip"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.a
            key={framework.name}
            href={framework.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={framework.name}
            variants={word}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-muted-foreground hover:text-foreground"
          >
            {framework.name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                aria-hidden
                className="inline-block whitespace-pre"
              >
                {char}
              </motion.span>
            ))}
          </motion.a>
        </AnimatePresence>
      </span>
    </MotionConfig>
  )
}
