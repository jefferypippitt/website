import type { Metadata } from "next"
import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import ProjectList from "@/features/projects/components/project-list"

export const metadata: Metadata = {
  title: "Projects",
  description: "Web projects built by Jeffery Pippitt.",
  alternates: {
    canonical: "/projects",
  },
}

export default function Page() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <PageTitle name="projects">Projects</PageTitle>
          <ProjectList />
        </section>
      </div>
    </PageTransition>
  )
}
