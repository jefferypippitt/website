import type { Metadata } from "next"
import AtollWallpaper from "@/components/atoll-wallpaper"
import Interests from "@/features/about/components/interests"
import Socials from "@/features/about/components/socials"

export const metadata: Metadata = {
  title: "About",
  description: "About Jeffery Pippitt: socials and interests.",
  alternates: {
    canonical: "/about",
  },
}

export default function Page() {
  return (
    <>
      <div className="relative z-10 flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <h1 className="text-sm font-medium">About Me</h1>
          <p className="font-mono text-sm text-muted-foreground">
            8°43′N 167°44′E
          </p>
        </section>
        <Socials />
        <Interests />
      </div>
      <AtollWallpaper />
    </>
  )
}
