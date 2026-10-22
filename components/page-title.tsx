import { ViewTransition } from "react"

export default function PageTitle({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <ViewTransition name={`title-${name}`} share="text-morph" default="none">
      <h1 className="text-sm font-medium">{children}</h1>
    </ViewTransition>
  )
}
