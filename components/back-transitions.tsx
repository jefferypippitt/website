"use client"

import { usePathname } from "next/navigation"
import {
  addTransitionType,
  startTransition,
  useEffect,
  useLayoutEffect,
} from "react"

// The parts of the Navigation API used here. TypeScript's DOM types don't
// include it yet.
type HistoryEntry = { index: number; key: string }
type HistoryNavigation = EventTarget & { currentEntry: HistoryEntry | null }
type EntryChangeEvent = Event & { navigationType: string; from: HistoryEntry }

function getNavigation() {
  return (window as { navigation?: HistoryNavigation }).navigation
}

// Scroll position of each history entry, by entry key.
const scrollPositions = new Map<string, number>()
let pendingScroll: number | undefined

// The browser's back/forward buttons fire popstate, and React commits a
// transition started inside popstate synchronously. Synchronous commits
// never run view transitions, so the page swap wouldn't animate. Holding
// the event and sending it again a task later lets Next.js handle it as a
// normal transition, tagged "nav-back" or "nav-forward" by which way the
// history moved.
//
// The delay means the browser would restore scroll before the new page is
// there, so scroll restoration is done here instead: positions are saved per
// history entry and put back in a layout effect, which runs before the view
// transition captures the new page. Needs the Navigation API; without it the
// browser's default behavior is left alone.
export default function BackTransitions() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    if (pendingScroll !== undefined) {
      window.scrollTo(0, pendingScroll)
      pendingScroll = undefined
    }
  }, [pathname])

  useEffect(() => {
    const navigation = getNavigation()
    if (!navigation) {
      return
    }

    const previousRestoration = history.scrollRestoration
    history.scrollRestoration = "manual"
    let replaying = false
    let direction: string | undefined

    function onScroll() {
      const key = navigation?.currentEntry?.key
      if (key) {
        scrollPositions.set(key, window.scrollY)
      }
    }

    function onEntryChange(event: Event) {
      const { navigationType, from } = event as EntryChangeEvent
      const index = navigation?.currentEntry?.index
      direction =
        navigationType !== "traverse" || index === undefined
          ? undefined
          : index < from.index
            ? "nav-back"
            : "nav-forward"
    }

    function onPopState(event: PopStateEvent) {
      if (replaying) {
        return
      }
      event.stopImmediatePropagation()

      // By the next task both events have fired, whichever came first.
      setTimeout(() => {
        const type = direction
        direction = undefined
        const key = navigation?.currentEntry?.key
        pendingScroll = (key && scrollPositions.get(key)) || 0
        replaying = true
        startTransition(() => {
          if (type) {
            addTransitionType(type)
          }
          window.dispatchEvent(
            new PopStateEvent("popstate", { state: event.state })
          )
        })
        replaying = false
      })
    }

    // Capture listeners on window run before Next.js's own listener.
    window.addEventListener("popstate", onPopState, { capture: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    navigation.addEventListener("currententrychange", onEntryChange)
    return () => {
      history.scrollRestoration = previousRestoration
      window.removeEventListener("popstate", onPopState, { capture: true })
      window.removeEventListener("scroll", onScroll)
      navigation.removeEventListener("currententrychange", onEntryChange)
    }
  }, [])

  return null
}
