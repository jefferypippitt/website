"use client"

import { AnimatePresence, MotionConfig, motion } from "motion/react"

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
