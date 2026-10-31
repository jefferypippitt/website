import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Message, MessageContent, MessageHeader } from "@/components/ui/message"

export default function ChatMessage({
  from,
  children,
}: {
  from: "me" | "bot"
  children: React.ReactNode
}) {
  const isMe = from === "me"

  return (
    <Message align={isMe ? "end" : "start"}>
      <MessageContent>
        <MessageHeader>{isMe ? "Me" : "Grok Bot"}</MessageHeader>
        <Bubble variant={isMe ? "default" : "muted"}>
          <BubbleContent className="[&_a]:underline [&_a_svg]:hidden [&_ol]:list-decimal [&_ol]:ps-5 [&_ul]:list-disc [&_ul]:ps-5 [&>*+*]:mt-2">
            {children}
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}
