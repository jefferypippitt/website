import TitleMorph from "@/components/title-morph"

export default function PageTitle({
  name,
  children,
}: {
  name: string
  children: React.ReactNode
}) {
  return (
    <TitleMorph name={name}>
      <h1 data-title-morph={name} className="text-sm font-medium">
        {children}
      </h1>
    </TitleMorph>
  )
}
