import { Kbd } from "@/components/ui/kbd"

export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4">
      <p className="text-xs text-muted-foreground">
        (Press <Kbd>d</Kbd> to switch theme)
      </p>
      <p className="text-xs text-muted-foreground">
        © <span className="font-mono">2026</span> Jeffery Pippitt
      </p>
    </footer>
  )
}
