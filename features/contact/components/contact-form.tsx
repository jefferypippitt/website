"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { sendMessage, type ContactState } from "@/features/contact/actions"

const initialState: ContactState = { status: "idle" }

// Field errors stay inline next to their inputs; the overall result is a toast.
async function submit(prevState: ContactState, formData: FormData) {
  const result = await sendMessage(prevState, formData)

  if (result.status === "success") {
    toast.add({
      type: "success",
      title: "Message sent",
      description: result.message,
    })
  } else if (result.message) {
    toast.add({
      type: "error",
      title: "Message not sent",
      description: result.message,
    })
  }

  return result
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submit, initialState)

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-6">
      <FieldGroup>
        <Field data-invalid={!!state.errors?.name}>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            maxLength={100}
            required
            defaultValue={state.values?.name}
            aria-invalid={!!state.errors?.name}
          />
          <FieldError>{state.errors?.name}</FieldError>
        </Field>
        <Field data-invalid={!!state.errors?.email}>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            maxLength={254}
            required
            defaultValue={state.values?.email}
            aria-invalid={!!state.errors?.email}
          />
          <FieldError>{state.errors?.email}</FieldError>
        </Field>
        <Field data-invalid={!!state.errors?.message}>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            name="message"
            placeholder="What's on your mind?"
            rows={5}
            maxLength={5000}
            required
            className="min-h-32"
            defaultValue={state.values?.message}
            aria-invalid={!!state.errors?.message}
          />
          <FieldError>{state.errors?.message}</FieldError>
        </Field>
      </FieldGroup>
      <div aria-hidden className="hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={pending} className="self-start">
        {pending && <Spinner />}
        {pending ? "Sending" : "Send message"}
      </Button>
    </form>
  )
}
