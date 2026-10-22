import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"

export default function Page() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <PageTitle name="contact">Contact</PageTitle>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Sed do eiusmod tempor incididunt ut labore.</p>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
