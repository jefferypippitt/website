import { CodeIcon } from "lucide-react"

import LanguageBar from "@/features/home/components/language-bar"
import { getTopLanguages } from "@/features/home/top-languages"

const ticks = 40

function formatPercent(percent: number) {
  return percent < 0.1 ? "<0.1%" : `${Number(percent.toFixed(1))}%`
}

export default async function TopLanguages() {
  const languages = await getTopLanguages()
  if (!languages?.length) return null

  const counts = languages.map(() => 1)
  const spare = ticks - languages.length
  const exact = languages.map((l) => (l.percent / 100) * spare)
  exact.forEach((value, i) => (counts[i] += Math.floor(value)))
  const left = ticks - counts.reduce((sum, n) => sum + n, 0)
  exact
    .map((value, i) => [value % 1, i])
    .sort((a, b) => b[0] - a[0])
    .slice(0, left)
    .forEach(([, i]) => counts[i]++)

  const segments = languages.map((language, i) => ({
    name: language.name,
    color: language.color,
    percent: formatPercent(language.percent),
    ticks: counts[i],
  }))

  return (
    <div className="flex items-center gap-2 type-body text-muted-foreground">
      <CodeIcon className="size-4 shrink-0" aria-hidden />
      <LanguageBar segments={segments} />
    </div>
  )
}
