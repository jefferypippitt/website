import createMDX from "@next/mdx"
import { withBotId } from "botid/next/config"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Lets a phone on the same network load the dev server at this machine's
  // LAN address, set as DEV_ORIGINS in .env.local (comma-separated). Dev only.
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",") ?? [],
  experimental: {
    agentUpgrade: "security",
  },
}

const withMDX = createMDX({})

// Vercel serves BotID's routes itself; this adds them for local dev too
export default withBotId(withMDX(nextConfig))
