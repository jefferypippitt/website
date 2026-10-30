import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Wallpaper from "@/components/wallpaper"
import IntroOverlay from "@/features/intro/components/intro-overlay"

export const revalidate = 86400

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col gap-10 p-6">
      <IntroOverlay />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Wallpaper />
      <Footer />
    </div>
  )
}
