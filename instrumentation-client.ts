import { initBotId } from "botid/client/core"

import { installBackTransitions } from "@/lib/back-transitions"

// Runs before Next.js sets up its router, so these popstate listeners come
// first.
installBackTransitions()

// BotID attaches its headers only to these requests. The contact form's
// Server Action posts to the page it's on, so the path is the page.
initBotId({
  protect: [{ path: "/contact", method: "POST" }],
})
