import { MessageGroup } from "@/components/ui/message"

export default function Chat({ children }: { children: React.ReactNode }) {
  return <MessageGroup className="mt-5 gap-4">{children}</MessageGroup>
}
