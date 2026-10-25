"use client"

import { useSyncExternalStore } from "react"

function subscribe() {
  return () => {}
}

export default function CurrentYear({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => initial
  )

  return <span className="font-mono">{year}</span>
}
