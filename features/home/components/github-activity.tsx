import { GitGraphIcon } from "lucide-react"

import {
  getContributionCount,
  profileUrl,
} from "@/features/home/github-activity"

export default async function GithubActivity() {
  const count = await getContributionCount()
  if (count === null) return null

  return (
    <p className="flex items-center gap-2 text-sm text-muted-foreground">
      <GitGraphIcon className="size-4 shrink-0" aria-hidden />
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-70"
      >
        <span className="font-mono text-foreground">
          {count.toLocaleString("en-US")}
        </span>{" "}
        contributions
      </a>
    </p>
  )
}
