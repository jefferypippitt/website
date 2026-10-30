import type { Metadata } from "next"

import { formatDate, getPost, getPostSlugs } from "@/lib/posts"
import { site } from "@/lib/site"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const { metadata } = await getPost(slug)
  const url = `/blog/${slug}`
  const description = metadata.description ?? site.description

  return {
    title: metadata.title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      siteName: site.name,
      url,
      title: metadata.title,
      description,
      publishedTime: metadata.date,
      authors: [site.name],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { Content, metadata } = await getPost(slug)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="type-title font-medium">{metadata.title}</h1>
        <p className="type-caption text-muted-foreground">
          Published on {formatDate(metadata.date)}
        </p>
      </div>
      <div className="typeset typeset-docs max-w-[42em]">
        <Content />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false
