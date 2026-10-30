import { socials } from "@/features/about/about-constants"

export default function Socials() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="type-subtitle font-medium">Socials</h2>
      <ul className="flex flex-col gap-2 type-body text-muted-foreground">
        {socials.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <span className="flex size-4 shrink-0 items-center justify-center">
                <social.icon.light
                  className={`${social.icon.size} dark:hidden`}
                  aria-hidden
                />
                <social.icon.dark
                  className={`hidden ${social.icon.size} dark:block`}
                  aria-hidden
                />
              </span>
              <span className="sr-only">{social.label}:</span>
              {social.handle}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
