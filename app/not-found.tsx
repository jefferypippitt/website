import Link from "next/link"

import { Button } from "@/components/ui/button"

// Renders outside the (site) layout, so there's no navbar or footer here.
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="font-pixel text-7xl">404</h1>
      <div className="flex flex-col gap-1 text-sm text-muted-foreground">
        <p>The page you’re looking for has wandered off, but don’t worry!</p>
        <p>Let’s get you back on track.</p>
      </div>
      <Button
        nativeButton={false}
        render={<Link href="/" transitionTypes={["nav-back"]} />}
      >
        Back to home
      </Button>
    </main>
  )
}
