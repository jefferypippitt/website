import { ViewTransition } from "react"

// Links tag their navigation with "nav-forward" or "nav-back". Browser
// back/forward carries no type, so the untyped default plays "nav-back".
const navigation = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "nav-back",
}

export default function PageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ViewTransition enter={navigation} exit={navigation} default="none">
      {children}
    </ViewTransition>
  )
}
