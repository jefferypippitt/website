import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",") ?? [],
  experimental: {
    agentUpgrade: "security",
  },
}

const withMDX = createMDX({
  options: {
    rehypePlugins: [["rehype-pretty-code", { theme: "vesper" }]],
  },
})

export default withMDX(nextConfig)
