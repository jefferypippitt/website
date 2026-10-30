import { ShieldCheckIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function Callout({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Alert role="note" className="mt-5">
      <ShieldCheckIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  )
}
