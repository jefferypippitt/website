import Link from "next/link"

export default function Navbar() {
  return (
    <header className="text-base font-medium">
      <Link href="/" transitionTypes={["nav-back"]}>
        Jeffery Pippitt
      </Link>
    </header>
  )
}
