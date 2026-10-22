import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

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
      <Footer />
    </div>
  )
}
