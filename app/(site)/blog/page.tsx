import type { Metadata } from "next"
import Link from "next/link"
import { ViewTransition } from "react"

import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import { getPosts } from "@/lib/posts"

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts by Jeffery Pippitt on building for the web.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function Page() {
  const posts = await getPosts()

  return (
    <PageTransition>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <PageTitle name="blog">Blog</PageTitle>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="inline-flex gap-4 transition-opacity hover:opacity-70"
                >
                  <span className="shrink-0 font-mono">
                    {post.metadata.date.slice(0, 4)}
                  </span>
                  <ViewTransition
                    name={`title-post-${post.slug}`}
                    share="text-morph"
                    default="none"
                  >
                    <span className="text-foreground">
                      {post.metadata.title}
                    </span>
                  </ViewTransition>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageTransition>
  )
}
