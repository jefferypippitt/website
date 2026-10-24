import type { ViewTransitionInstance } from "react"

// Page, wallpaper, and shared title transitions are run from <ViewTransition> callbacks
// instead of CSS. Safari remembers a CSS animation by pseudo-element and
// animation name across view transitions, and React reuses the same names
// on every navigation, so from the second navigation on the old snapshot's
// fade was skipped and the old page sat on top of the new one. Animations
// made here are new each time.

const exitDuration = 150
const enterDuration = 210
const moveDuration = 400
const slideDistance = 16

type Cleanup = () => void

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function cancelAll(animations: Animation[]): Cleanup {
  return () => animations.forEach((animation) => animation.cancel())
}

// Links tag their navigation with "nav-forward" or "nav-back". Browser
// back/forward is tagged by BackTransitions; anything untyped slides back.
function slideFrom(types: string[]) {
  const offset = types.includes("nav-forward") ? slideDistance : -slideDistance
  return [{ translate: `${offset}px` }, { translate: "0" }]
}

const fade = [{ opacity: 0 }, { opacity: 1 }]

// Page content: the old page fades out while sliding away, the new one
// fades in after it while sliding in from the other side.
export function enterPage(
  instance: ViewTransitionInstance,
  types: string[]
): Cleanup | void {
  if (reducedMotion()) return
  return cancelAll([
    instance.new.animate(fade, {
      duration: enterDuration,
      delay: exitDuration,
      easing: "ease-out",
      fill: "both",
    }),
    instance.new.animate(slideFrom(types), {
      duration: moveDuration,
      easing: "ease-in-out",
      fill: "both",
    }),
  ])
}

export function exitPage(
  instance: ViewTransitionInstance,
  types: string[]
): Cleanup | void {
  if (reducedMotion()) return
  // Leaving slides the opposite way the new page arrives from.
  const slideTo = slideFrom(
    types.includes("nav-forward") ? ["nav-back"] : ["nav-forward"]
  )
  return cancelAll([
    instance.old.animate(fade, {
      duration: exitDuration,
      easing: "ease-in",
      direction: "reverse",
      fill: "both",
    }),
    instance.old.animate(slideTo, {
      duration: moveDuration,
      easing: "ease-in-out",
      direction: "reverse",
      fill: "both",
    }),
  ])
}

// Shared titles: where each one was on screen just before it unmounted. Its
// layout effect cleanup runs while it's still in the DOM and before Next.js
// scrolls the new page, so this matches the browser's old snapshot.
const titleRects = new Map<string, DOMRect>()

export function rememberTitle(name: string) {
  const element = document.querySelector(`[data-title-morph="${name}"]`)
  if (element) {
    titleRects.set(name, element.getBoundingClientRect())
  }
}

// Glides the shared title's group from the old title's spot to the new
// one's. The browser has already placed the group at the end state, so the
// start is that transform shifted by how far the title moved.
export function morphTitle(
  instance: ViewTransitionInstance,
  name: string
): Cleanup | void {
  const from = titleRects.get(name)
  titleRects.delete(name)
  const element = document.querySelector(`[data-title-morph="${name}"]`)
  if (!from || !element || reducedMotion()) return

  const to = element.getBoundingClientRect()
  const style = instance.group.getComputedStyle()
  const end = new DOMMatrix(style.transform)
  const start = new DOMMatrix()
    .translate(from.left - to.left, from.top - to.top)
    .multiply(end)

  return cancelAll([
    instance.group.animate(
      [
        {
          transform: start.toString(),
          width: `${from.width}px`,
          height: `${from.height}px`,
        },
        { transform: end.toString(), width: style.width, height: style.height },
      ],
      { duration: moveDuration, easing: "ease" }
    ),
  ])
}

// Wallpapers crossfade in place, slower than the page so the backdrop
// settles while the content slides.
export function enterWallpaper(instance: ViewTransitionInstance): Cleanup | void {
  if (reducedMotion()) return
  return cancelAll([
    instance.new.animate(fade, {
      duration: moveDuration,
      delay: exitDuration,
      easing: "ease-out",
      fill: "both",
    }),
  ])
}

export function exitWallpaper(instance: ViewTransitionInstance): Cleanup | void {
  if (reducedMotion()) return
  return cancelAll([
    instance.old.animate(fade, {
      duration: moveDuration,
      easing: "ease-in",
      direction: "reverse",
      fill: "both",
    }),
  ])
}
