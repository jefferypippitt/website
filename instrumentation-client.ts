import { initBotId } from "botid/client/core"

// BotID attaches its headers only to these requests. The contact form's
// Server Action posts to the page it's on, so the path is the page.
initBotId({
  protect: [{ path: "/contact", method: "POST" }],
})
