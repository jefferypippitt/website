"use client"

import { ViewTransition } from "react"

import { enterPage, exitPage } from "@/lib/view-transitions"

// The "page" class only switches off the browser's default crossfade; the
// slide and fade run from the callbacks.
export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransition
      enter="page"
      exit="page"
      default="none"
      onEnter={enterPage}
      onExit={exitPage}
    >
      {children}
    </ViewTransition>
  )
}
