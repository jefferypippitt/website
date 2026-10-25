"use client"

import { useSyncExternalStore } from "react"

function subscribe() {
  return () => {}
}

// The server-rendered year can be up to a day stale (pages revalidate daily)
// and follows the server's clock. Once hydrated, this reads the visitor's own
// clock, so the year is right even on New Year's Day.
export default function CurrentYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => initial
  )

  return <span className="font-mono">{year}</span>
}
