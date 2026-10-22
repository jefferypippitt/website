import AtollWallpaper from "@/components/atoll-wallpaper"
import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import Interests from "@/features/about/components/interests"
import Socials from "@/features/about/components/socials"

export default function Page() {
  return (
    <PageTransition>
      <AtollWallpaper />
      <div className="relative flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <PageTitle name="about">About Me</PageTitle>
          <p className="font-mono text-sm text-muted-foreground">9°N 168°E</p>
        </section>
        <Socials />
        <Interests />
      </div>
    </PageTransition>
  )
}
