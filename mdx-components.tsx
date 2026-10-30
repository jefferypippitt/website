import type { MDXComponents } from "mdx/types"

import Callout from "@/components/callout"
import Chat from "@/components/chat"
import ChatMessage from "@/components/chat-message"
import MdxLink from "@/components/mdx-link"

const components: MDXComponents = {
  a: MdxLink,
  Callout,
  Chat,
  ChatMessage,
}

export function useMDXComponents(): MDXComponents {
  return components
}
