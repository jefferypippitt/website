import { formatDate, getPost, getPostSlugs } from "@/lib/posts"
import { ogSize, renderOgImage } from "@/lib/og-image"
import { site } from "@/lib/site"

export const alt = site.name
export const size = ogSize
export const contentType = "image/png"

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { metadata } = await getPost(slug)

  return renderOgImage({
    title: metadata.title,
    subtitle: site.name,
    meta: formatDate(metadata.date),
  })
}
