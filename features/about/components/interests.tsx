import { interests } from "@/features/about/about-constants"

export default function Interests() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="type-subtitle font-medium">Interests</h2>
      <ul className="flex flex-col gap-2 type-body text-muted-foreground">
        {interests.map((interest) => (
          <li key={interest.label}>
            <span className="text-foreground">{interest.label}:</span>{" "}
            {interest.description}
          </li>
        ))}
      </ul>
    </section>
  )
}
