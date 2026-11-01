import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import "./fonts/fallbacks.css"
import { Geist, GeistMono, GeistSerifRegular } from "./fonts/site"
import ThemeProvider from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toast"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  appleWebApp: {
    title: site.name,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    creator: site.handle,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        GeistMono.variable,
        GeistSerifRegular.variable,
        "font-sans",
        Geist.variable
      )}
    >
      <head>
        {/* Hides the intro before first paint outside the homepage, for returning visitors and reduced motion. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(location.pathname!=="/"||localStorage.getItem("intro-seen")||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{"[data-intro]{display:none}"}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
