import { projects } from "@/features/projects/projects-constants"

export default function ProjectList() {
  return (
    <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
      {projects.map((project) => (
        <li key={project.name}>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-4 transition-opacity hover:opacity-70"
          >
            <span className="shrink-0 font-mono">{project.year}</span>
            <span>
              <span className="text-foreground">{project.name}:</span>{" "}
              {project.description}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
