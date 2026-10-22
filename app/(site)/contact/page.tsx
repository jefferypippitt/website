import PageTitle from "@/components/page-title"
import PageTransition from "@/components/page-transition"
import ContactForm from "@/features/contact/components/contact-form"

export default function Page() {
  return (
    <PageTransition>
      <div className="flex flex-col gap-10">
        <section className="flex flex-col gap-6">
          <PageTitle name="contact">Contact</PageTitle>
          <p className="text-sm text-muted-foreground">
            Got a project or a question?
          </p>
          <ContactForm />
        </section>
      </div>
    </PageTransition>
  )
}
