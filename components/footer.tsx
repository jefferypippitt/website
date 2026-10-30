import CurrentYear from "@/components/current-year"
import ThemeHint from "@/components/theme-hint"

export default function Footer() {
  return (
    <footer className="flex items-center justify-between gap-4">
      <ThemeHint />
      <p className="type-caption text-muted-foreground">
        © <CurrentYear initial={new Date().getFullYear()} />
      </p>
    </footer>
  )
}
