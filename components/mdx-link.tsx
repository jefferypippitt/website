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
      </a>
    )
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  )
}
