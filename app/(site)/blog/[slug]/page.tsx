import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import { formatDate, getPost, getPostSlugs } from "@/lib/posts"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { Content, metadata } = await getPost(slug)

  return (
    <PageTransition>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <PageTitle name={`post-${slug}`}>{metadata.title}</PageTitle>
          <p className="text-sm text-muted-foreground">
            Published on {formatDate(metadata.date)}
          </p>
        </div>
        <div className="typeset typeset-article max-w-[37em]">
          <Content />
        </div>
      </div>
    </PageTransition>
  )
}

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export const dynamicParams = false
