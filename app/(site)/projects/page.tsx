import type { Metadata } from "next"
import ProjectList from "@/features/projects/components/project-list"
import {
  archivedProjects,
  projects,
} from "@/features/projects/projects-constants"

export const metadata: Metadata = {
  title: "Projects",
  description: "Web projects built by Jeffery Pippitt.",
  alternates: {
    canonical: "/projects",
  },
}

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <h1 className="type-subtitle font-medium">Projects</h1>
        <ProjectList projects={projects} />
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="type-subtitle font-medium">Archived</h2>
        <ProjectList projects={archivedProjects} />
      </section>
    </div>
  )
}
