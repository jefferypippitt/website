import type { Metadata } from "next"
import { ArrowRightFromLineIcon } from "lucide-react"
import Link from "next/link"

import FrameworkLoop from "@/components/framework-loop"
import GithubActivity from "@/features/home/components/github-activity"
import TopLanguages from "@/features/home/components/top-languages"

const links = [
  { href: "/about", label: "About Me" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="flex items-center gap-2 text-sm font-medium">
          <ArrowRightFromLineIcon
            className="size-4 text-muted-foreground"
            aria-hidden
          />
          <span>
            Building modern web applications with <FrameworkLoop />
          </span>
        </h1>
      </div>
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-3">
        <GithubActivity />
        <TopLanguages />
      </div>
    </div>
  )
}
