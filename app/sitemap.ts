import type { MetadataRoute } from "next"

import { getPosts } from "@/lib/posts"
import { site } from "@/lib/site"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const pages = ["", "/about", "/projects", "/blog", "/contact"].map(
    (path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })
  )

  const blog = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
  }))

  return [...pages, ...blog]
}
