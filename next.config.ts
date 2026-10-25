import createMDX from "@next/mdx"
import { withBotId } from "botid/next/config"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",") ?? [],
  experimental: {
    agentUpgrade: "security",
  },
}

const withMDX = createMDX({})

export default withBotId(withMDX(nextConfig))
