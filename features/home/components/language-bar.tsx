"use client"

import { useEffect, useRef, useState } from "react"

import RollingText from "@/components/rolling-text"

type Segment = {
  name: string
  color: string | null
  percent: string
  ticks: number
}

export default function LanguageBar({ segments }: { segments: Segment[] }) {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  // Pointer position along the bar in ticks, only while hovering or dragging
  const [pointer, setPointer] = useState<number | null>(null)

  // Each tick knows which language it belongs to, so a pointer position maps
  // straight to a language
  const owners = segments.flatMap((segment, i) =>
    Array.from({ length: segment.ticks }, () => i)
  )

  // Clear a pending settle if the bar unmounts
  useEffect(() => () => clearTimeout(timer.current), [])

  // Return to the top language once the pointer or finger has left
  function settle(delay: number) {
    setPointer(null)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setIndex(0), delay)
  }

  function scrub(event: React.PointerEvent<HTMLDivElement>) {
    clearTimeout(timer.current)
    const rect = event.currentTarget.getBoundingClientRect()
    const position = ((event.clientX - rect.left) / rect.width) * owners.length
    setPointer(position)
    const tick = Math.floor(position)
    setIndex(owners[Math.min(Math.max(tick, 0), owners.length - 1)])
  }

  const active = segments[index]

  // Sound-bar meter: ticks near the pointer rise up to 1.65x, falling off
  // with distance. A fixed per-tick level keeps the peak jagged like audio.
  function scale(i: number) {
    if (pointer === null) return 1
    const distance = i + 0.5 - pointer
    const falloff = Math.exp(-(distance * distance) / 18)
    const level = 0.7 + 0.3 * Math.abs(Math.sin(i * 2.3))
    return 1 + 0.65 * falloff * level
  }

  return (
    <>
      {/* Hover to scrub with a mouse; on touch, tap to jump or press and
          drag, while vertical swipes still scroll the page. Screen readers
          get the list below instead. */}
      <div
        aria-hidden
        className="flex h-5 touch-pan-y items-center gap-[3px]"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          scrub(event)
        }}
        onPointerMove={scrub}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") settle(500)
        }}
        onPointerUp={(event) => {
          if (event.pointerType !== "mouse") settle(1500)
        }}
        onPointerCancel={() => settle(1500)}
      >
        {owners.map((owner, i) => (
          <span
            key={i}
            className={`h-3 w-0.5 bg-muted-foreground transition-[opacity,transform] duration-200 ease-out ${owner === index ? "opacity-100" : "opacity-30"}`}
            style={{
              backgroundColor: segments[owner].color ?? undefined,
              transform: `scaleY(${scale(i)})`,
            }}
          />
        ))}
      </div>
      <span aria-hidden className="ml-1">
        <RollingText id={active.name}>
          {active.name}{" "}
          <span className="font-mono text-foreground">{active.percent}</span>
        </RollingText>
      </span>
      <ul className="sr-only">
        {segments.map((segment) => (
          <li key={segment.name}>
            {segment.name} {segment.percent}
          </li>
        ))}
      </ul>
    </>
  )
}
