import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import ProjectList from "@/features/projects/components/project-list"

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
