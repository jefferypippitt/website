import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Wallpaper from "@/components/wallpaper"

// Pages stay static but are re-rendered at most once a day, which keeps the
// footer's year current.
export const revalidate = 86400

// Every page except the 404 gets the navbar and footer.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-[1600px] flex-col gap-10 p-6">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Wallpaper />
      <Footer />
    </div>
  )
}
