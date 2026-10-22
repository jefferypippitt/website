"use server"

import { createHash } from "node:crypto"
import { checkBotId } from "botid/server"
import { Resend } from "resend"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  errors?: { name?: string; email?: string; message?: string }
  values?: { name: string; email: string; message: string }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Control characters plus Unicode direction overrides, which can make text
// display differently from what it really says (like a disguised link).
const HIDDEN_CHARS = /[\p{Cc}\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu
// Same, but keeps line breaks and tabs so a message's formatting survives.
const HIDDEN_CHARS_EXCEPT_LINES =
  /(?![\n\t])[\p{Cc}\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu

// For single-line fields: line breaks become spaces, then hidden chars go.
function cleanLine(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(HIDDEN_CHARS, "")
    .trim()
}

function cleanMessage(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(HIDDEN_CHARS_EXCEPT_LINES, "")
    .trim()
}
const SENT = "Thanks for reaching out."
const FAILED = "Something went wrong. Try again later."
const BUSY = "Couldn't send right now. Try again in a minute."

// Resend errors that clear up on their own, so a retry from the visitor helps
const TRANSIENT_ERRORS = new Set([
  "rate_limit_exceeded",
  "concurrent_idempotent_requests",
  "application_error",
  "internal_server_error",
])

export async function sendMessage(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot: real visitors never see this field, bots fill it in.
  if (formData.get("company")) {
    return { status: "success", message: SENT }
  }

  // The name ends up in the email subject, so it must stay on one line.
  const values = {
    name: cleanLine(formData.get("name")),
    email: cleanLine(formData.get("email")),
    message: cleanMessage(formData.get("message")),
  }

  // Blocks scripted posts that skip the page. Always passes in local dev.
  // Values come back so a misjudged visitor doesn't lose their message.
  const { isBot } = await checkBotId()
  if (isBot) {
    return { status: "error", message: FAILED, values }
  }

  const errors: ContactState["errors"] = {}
  if (!values.name) errors.name = "Enter your name."
  else if (values.name.length > 100)
    errors.name = "Keep it under 100 characters."
  if (!EMAIL_PATTERN.test(values.email) || values.email.length > 254)
    errors.email = "Enter a valid email."
  if (!values.message) errors.message = "Enter a message."
  else if (values.message.length > 5000)
    errors.message = "Keep it under 5,000 characters."

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values }
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error(
      "Contact form is missing RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_TO_EMAIL."
    )
    return { status: "error", message: FAILED, values }
  }

  // Same sender + same message within 24 hours is delivered once, so a
  // retry or double submit never sends a duplicate.
  const digest = createHash("sha256")
    .update(`${values.email}\n${values.message}`)
    .digest("hex")

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send(
    {
      from,
      to: [to],
      replyTo: values.email,
      subject: `New message from ${values.name}`,
      text: `From: ${values.name} <${values.email}>\n\n${values.message}`,
    },
    { idempotencyKey: `contact-form/${digest}` }
  )

  if (error) {
    console.error("Resend failed to send contact email:", error)
    const message = TRANSIENT_ERRORS.has(error.name) ? BUSY : FAILED
    return { status: "error", message, values }
  }

  return { status: "success", message: SENT }
}
