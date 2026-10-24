"use client"

import { useLayoutEffect, ViewTransition } from "react"

import { morphTitle, rememberTitle } from "@/lib/view-transitions"

// A title that glides into the title with the same name on the next page,
// like a homepage link label into that page's heading. The child must carry
// data-title-morph={name} so its position can be measured.
export default function TitleMorph({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  useLayoutEffect(() => () => rememberTitle(name), [name])

  return (
    <ViewTransition
      name={`title-${name}`}
      share="text-morph"
      default="none"
      onShare={(instance) => morphTitle(instance, name)}
    >
      {children}
    </ViewTransition>
  )
}
