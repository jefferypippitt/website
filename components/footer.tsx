import { Kbd } from "@/components/ui/kbd"

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4">
      <p className="text-xs text-muted-foreground">
        (Press <Kbd>d</Kbd> to switch theme)
      </p>
    </footer>
  )
}
