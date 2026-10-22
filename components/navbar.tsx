import Link from "next/link"

export default function Navbar() {
  return (
    <header className="font-pixel text-base">
      <Link href="/" transitionTypes={["nav-back"]}>
        Jeffery Pippitt
      </Link>
    </header>
  )
}
