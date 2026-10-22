import { interests } from "@/features/about/about-constants"

export default function Interests() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-sm font-medium">Interests</h2>
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
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
