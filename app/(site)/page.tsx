import type { Metadata } from "next"
import { ArrowRightFromLineIcon } from "lucide-react"
import Link from "next/link"

import FrameworkLoop from "@/components/framework-loop"
import PageTransition from "@/components/page-transition"
import TitleMorph from "@/components/title-morph"
import GithubActivity from "@/features/home/components/github-activity"

const links = [
  { href: "/about", name: "about", label: "About Me" },
  { href: "/projects", name: "projects", label: "Projects" },
  { href: "/blog", name: "blog", label: "Blog" },
  { href: "/contact", name: "contact", label: "Contact" },
]

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return (
    <PageTransition>
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
              <Link
                href={link.href}
                transitionTypes={["nav-forward"]}
                className="hover:text-foreground"
              >
                <TitleMorph name={link.name}>
                  {/* inline-block: Safari can't snapshot an inline element */}
                  <span data-title-morph={link.name} className="inline-block">
                    {link.label}
                  </span>
                </TitleMorph>
              </Link>
            </li>
          ))}
        </ul>
        <GithubActivity />
      </div>
    </PageTransition>
  )
}
