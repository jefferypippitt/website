import fs from "node:fs"
import path from "node:path"

export type PostMetadata = {
  title: string
  date: string
}

const postsDirectory = path.join(process.cwd(), "content/blog")

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
}

export async function getPost(slug: string) {
  const post = await import(`@/content/blog/${slug}.mdx`)

  return {
    slug,
    Content: post.default,
    metadata: post.metadata as PostMetadata,
  }
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  })
}

export async function getPosts() {
  const posts = await Promise.all(getPostSlugs().map(getPost))

  return posts.sort((a, b) => b.metadata.date.localeCompare(a.metadata.date))
}
