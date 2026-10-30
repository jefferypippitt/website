import { GithubDark } from "@/components/ui/svgs/githubDark"
import { GithubLight } from "@/components/ui/svgs/githubLight"
import { Linkedin } from "@/components/ui/svgs/linkedin"
import { LinkedinDark } from "@/components/ui/svgs/linkedinDark"
import { X } from "@/components/ui/svgs/x"
import { XDark } from "@/components/ui/svgs/xDark"

export const socials = [
  {
    label: "GitHub",
    handle: "@jefferypippitt",
    href: "https://github.com/jefferypippitt",
    icon: { light: GithubLight, dark: GithubDark, size: "size-4" },
  },
  {
    label: "X",
    handle: "@jefferypippitt",
    href: "https://x.com/jefferypippitt",
    icon: { light: X, dark: XDark, size: "size-3.5" },
  },
  {
    label: "LinkedIn",
    handle: "@jefferypippitt",
    href: "https://www.linkedin.com/in/jefferypippitt/",
    icon: { light: Linkedin, dark: LinkedinDark, size: "size-3.5" },
  },
]

export const interests = [
  {
    label: "Tech",
    description: "Cooking up web projects and keeping tabs on new tech.",
  },
  { label: "Sports", description: "MMA, soccer, NFL, NBA." },
  {
    label: "Learning",
    description:
      "Building whatever I'm curious about and figuring it out as I go.",
  },
]
