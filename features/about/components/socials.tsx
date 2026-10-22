import { socials } from "@/features/about/about-constants"

export default function Socials() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-sm font-medium">Socials</h2>
      <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-70"
            >
              <span className="text-foreground">{social.label}:</span>{" "}
              {social.handle}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
