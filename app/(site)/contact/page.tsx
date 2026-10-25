import type { Metadata } from "next"
import ContactForm from "@/features/contact/components/contact-form"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Jeffery Pippitt about a project or a question.",
  alternates: {
    canonical: "/contact",
  },
}

export default function Page() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <h1 className="text-sm font-medium">Contact</h1>
        <p className="text-sm text-muted-foreground">
          Got a project or a question?
        </p>
        <ContactForm />
      </section>
    </div>
  )
}
