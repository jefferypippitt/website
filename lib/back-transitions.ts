import { addTransitionType, startTransition } from "react"

// The parts of the Navigation API used here. TypeScript's DOM types don't
// include it yet.
type HistoryEntry = { index: number; key: string }
type HistoryNavigation = EventTarget & { currentEntry: HistoryEntry | null }
type EntryChangeEvent = Event & { navigationType: string; from: HistoryEntry }

// Scroll position of each history entry, by entry key.
const scrollPositions = new Map<string, number>()
let pendingScroll: number | undefined

// The scroll position to put back once the page for the current history
// entry has rendered. BackTransitions applies it in a layout effect.
export function takePendingScroll() {
  const scroll = pendingScroll
  pendingScroll = undefined
  return scroll
}

// The browser's back/forward buttons fire popstate, and React commits a
// transition started inside popstate synchronously. Synchronous commits
// never run view transitions, so the page swap wouldn't animate. Holding
// the event and sending it again a task later lets Next.js handle it as a
// normal transition, tagged "nav-back" or "nav-forward" by which way the
// history moved.
//
// This has to be installed before Next.js adds its own popstate listener,
// from instrumentation-client.ts. Both listen on window, and iOS Safari can
// run window listeners in the order they were added even when one is a
// capture listener, so installed later Next.js may swap the page instantly
// first.
//
// The delay means the browser would restore scroll before the new page is
// there, so scroll restoration is done here instead: positions are saved per
// history entry and put back before the view transition captures the new
// page. Needs the Navigation API; without it the browser's default behavior
// is left alone.
export function installBackTransitions() {
  const navigation = (window as { navigation?: HistoryNavigation }).navigation
  if (!navigation) {
    return
  }

  history.scrollRestoration = "manual"
  let replaying = false
  let direction: string | undefined

  function savedScroll() {
    const key = navigation?.currentEntry?.key
    return (key && scrollPositions.get(key)) || 0
  }

  window.addEventListener(
    "scroll",
    () => {
      const key = navigation.currentEntry?.key
      if (key) {
        scrollPositions.set(key, window.scrollY)
      }
    },
    { passive: true }
  )

  navigation.addEventListener("currententrychange", (event) => {
    const { navigationType, from } = event as EntryChangeEvent
    const index = navigation.currentEntry?.index
    direction =
      navigationType !== "traverse" || index === undefined
        ? undefined
        : index < from.index
          ? "nav-back"
          : "nav-forward"
  })

  window.addEventListener(
    "popstate",
    (event) => {
      if (replaying) {
        return
      }

      // A swipe-back on iOS has already animated the page swap itself.
      // Playing ours on top of it would show the old page twice, so let
      // Next.js commit it straight away and only restore scroll.
      if (event.hasUAVisualTransition) {
        pendingScroll = savedScroll()
        return
      }

      event.stopImmediatePropagation()

      // By the next task both events have fired, whichever came first.
      setTimeout(() => {
        const type = direction
        direction = undefined
        pendingScroll = savedScroll()
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
    },
    { capture: true }
  )
}
