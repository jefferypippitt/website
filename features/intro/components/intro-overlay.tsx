"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  easeInOut,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
} from "motion/react"

const sides = 3
const hold = 0.35
const fade = 0.4
const tail = hold + fade
const secondsPerSide = 0.9

function useSide(progress: MotionValue<number>, index: number) {
  const fill = useTransform(progress, [index, index + 1], [0, 1], {
    ease: easeInOut,
  })
  const value = () => ((index + fill.get()) * 100) / sides
  const head = useTransform(() => split(value())[0])
  const digit = useTransform(() => split(value())[1])
  const bar = useTransform(() =>
    fill.get() === 0 || fill.get() === 1 ? "overline" : "none"
  )
  const opacity = useTransform(
    progress,
    [index, index + 0.1, index + 1 + hold, index + 1 + tail],
    [0, 1, 1, 0]
  )
  return { fill, head, digit, bar, opacity }
}

function split(value: number) {
  if (Number.isInteger(value)) return [`${value}`, ""]
  const text = (Math.floor(value * 10) / 10).toFixed(1)
  return [text.slice(0, -1), text.slice(-1)]
}

const ease = [0.65, 0, 0.35, 1] as const

const blur = { duration: 0.8, ease }

type Point = [number, number]
type Curve = [Point, Point, Point]
type Edge = { from: Curve; to: Curve }

const sail: Curve[] = [
  [
    [212, 675],
    [339, 347],
    [648, 132],
  ],
  [
    [648, 132],
    [764, 375],
    [812, 641],
  ],
  [
    [812, 641],
    [516, 689],
    [212, 675],
  ],
]

function inView(element: Element) {
  const r = element.getBoundingClientRect()
  return r.width > 0 && r.top < innerHeight && r.bottom > 0
}

function measureEdges(triangle: Element, target: Element): Edge[] {
  const s = target.getBoundingClientRect()
  const t = triangle.getBoundingClientRect()
  const bottomLeft: Point = [t.left, t.bottom]
  const apex: Point = [t.left + t.width / 2, t.top]
  const bottomRight: Point = [t.right, t.bottom]
  const straight = (a: Point, b: Point): Curve => [
    a,
    [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2],
    b,
  ]
  const from = [
    straight(bottomLeft, apex),
    straight(apex, bottomRight),
    straight(bottomRight, bottomLeft),
  ]

  return sail.map((curve, i) => ({
    from: from[i],
    to: curve.map(([x, y]) => [
      s.left + (x / 1000) * s.width,
      s.top + (y / 1000) * s.height,
    ]) as Curve,
  }))
}

function MorphPath({
  edge,
  travel,
}: {
  edge: Edge
  travel: MotionValue<number>
}) {
  const d = useTransform(() => {
    const t = travel.get()
    const [a, c, b] = edge.from.map((p, i) => [
      p[0] + (edge.to[i][0] - p[0]) * t,
      p[1] + (edge.to[i][1] - p[1]) * t,
    ])
    return `M${a} Q${c} ${b}`
  })
  return <motion.path d={d} />
}

export default function IntroOverlay() {
  const [done, setDone] = useState(false)
  const [edges, setEdges] = useState<Edge[] | null>(null)
  const triangle = useRef<HTMLDivElement>(null)
  const canoe = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)
  const travel = useMotionValue(0)
  const lines = useMotionValue(1)
  const backdrop = useMotionValue(1)
  const canoeOpacity = useMotionValue(0)
  const name = useTransform(travel, [0, 0.3], [1, 0])
  const pointerEvents = useTransform(() =>
    backdrop.get() < 1 ? "none" : "auto"
  )
  const left = useSide(progress, 0)
  const right = useSide(progress, 1)
  const base = useSide(progress, 2)

  useEffect(() => {
    const root = document.documentElement
    if (root.hasAttribute("data-intro-seen")) return

    let cancelled = false

    async function run() {
      await Promise.all([
        animate(progress, sides + tail, {
          duration: (sides + tail) * secondsPerSide,
          ease: "linear",
        }),
        document.fonts.ready,
      ])
      if (cancelled) return

      try {
        localStorage.setItem("intro-seen", "1")
      } catch {}
      const wallpaper = document.querySelector('[data-wallpaper="home"]')
      if (wallpaper && triangle.current && canoe.current) {
        const local = !inView(wallpaper)
        if (local) canoeOpacity.set(1)
        setEdges(
          measureEdges(triangle.current, local ? canoe.current : wallpaper)
        )
        await Promise.all([
          animate(travel, 1, { duration: 1.1, ease }),
          animate(backdrop, 0, { duration: 0.8, ease }),
        ])
        await Promise.all([
          animate(lines, 0, { duration: 0.5 }),
          animate(canoeOpacity, 0, { duration: 0.5 }),
        ])
        if (cancelled) return
      }
      setDone(true)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [progress, travel, lines, backdrop, canoeOpacity])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          data-intro
          aria-hidden
          exit="out"
          style={{ pointerEvents }}
          variants={{ out: { opacity: 0, transition: blur } }}
          className="fixed inset-0 z-100 flex items-center justify-center [--a:min(78vw,26rem)] in-data-intro-seen:hidden"
        >
          <motion.div
            ref={canoe}
            style={{ opacity: canoeOpacity }}
            className="absolute inset-x-0 bottom-6 mx-auto aspect-square w-[min(100%-3rem,32rem,100svh-3rem)] bg-muted-foreground/25 [mask:url(/canoe.svg)_center/contain_no-repeat]"
          />
          <motion.div
            style={{ opacity: backdrop }}
            className="absolute inset-0 bg-background"
          />
          <motion.div
            variants={{
              out: { filter: "blur(12px)", scale: 1.04, transition: blur },
            }}
            className="relative"
          >
            <div
              ref={triangle}
              className="relative h-[calc(var(--a)*0.866)] w-(--a) -translate-y-[calc(var(--a)*0.866/6)]"
            >
              {!edges && (
                <>
                  <div className="absolute top-full left-0 w-full origin-left -rotate-60">
                    <motion.div
                      style={{ scaleX: left.fill }}
                      className="h-px origin-left bg-foreground"
                    />
                  </div>
                  <div className="absolute top-0 left-1/2 w-full origin-left rotate-60">
                    <motion.div
                      style={{ scaleX: right.fill }}
                      className="h-px origin-left bg-foreground"
                    />
                  </div>
                  <div className="absolute top-full left-full w-full origin-left rotate-180">
                    <motion.div
                      style={{ scaleX: base.fill }}
                      className="h-px origin-left bg-foreground"
                    />
                  </div>
                </>
              )}

              <motion.span
                style={{ opacity: left.opacity }}
                className="absolute top-1/2 left-1/4 -translate-1/2 transform-[rotate(-60deg)_translateY(calc(-50%-0.75rem))] font-mono type-caption text-muted-foreground tabular-nums"
              >
                <motion.span>{left.head}</motion.span>
                <motion.span style={{ textDecorationLine: left.bar }}>
                  {left.digit}
                </motion.span>
                %
              </motion.span>
              <motion.span
                style={{ opacity: right.opacity }}
                className="absolute top-1/2 left-3/4 -translate-1/2 transform-[rotate(60deg)_translateY(calc(-50%-0.75rem))] font-mono type-caption text-muted-foreground tabular-nums"
              >
                <motion.span>{right.head}</motion.span>
                <motion.span style={{ textDecorationLine: right.bar }}>
                  {right.digit}
                </motion.span>
                %
              </motion.span>
              <motion.span
                style={{ opacity: base.opacity }}
                className="absolute top-full left-1/2 -translate-1/2 transform-[translateY(calc(50%+0.75rem))] font-mono type-caption text-muted-foreground tabular-nums"
              >
                <motion.span>{base.head}</motion.span>
                <motion.span style={{ textDecorationLine: base.bar }}>
                  {base.digit}
                </motion.span>
                %
              </motion.span>

              <motion.p
                style={{ opacity: name }}
                className="absolute top-2/3 left-1/2 -translate-1/2 font-serif type-title whitespace-nowrap sm:type-display"
              >
                Jeffery Pippitt
              </motion.p>
            </div>
          </motion.div>

          {edges && (
            <motion.svg
              style={{ opacity: lines }}
              className="fixed inset-0 size-full fill-none stroke-foreground"
            >
              {edges.map((edge, i) => (
                <MorphPath key={i} edge={edge} travel={travel} />
              ))}
            </motion.svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
