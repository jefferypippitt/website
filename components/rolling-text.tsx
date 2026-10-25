"use client"

import { AnimatePresence, MotionConfig, motion } from "motion/react"

// Rolls the old text up and out as the new text rolls in from below, keyed
// by `id`. Shared by the framework loop and the language bar so every
// changing label on the home page moves the same way.
export default function RollingText({
  id,
  className,
  children,
}: {
  id: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <span
        className={`relative inline-flex overflow-y-clip whitespace-nowrap ${className ?? ""}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={id}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
          >
            {children}
          </motion.span>
        </AnimatePresence>
      </span>
    </MotionConfig>
  )
}
