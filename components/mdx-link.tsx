import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

export default function MdxLink({
  href = "",
  children,
  ...props
}: React.ComponentProps<"a">) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
        {/* Word joiner keeps the icon on the same line as the last word. */}
        {"⁠"}
        <ArrowUpRightIcon className="ml-0.5 inline size-[0.9em] align-[-0.1em]" />
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
      {"⁠"}
      <ArrowRightIcon className="ml-0.5 inline size-[0.9em] align-[-0.1em]" />
    </Link>
  )
}
