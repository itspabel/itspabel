"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
    errors?: Array<{ field: string; message: string }>
  } | null>(null)

  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    try {
      const formData = new FormData(e.currentTarget)
      const formValues = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      })

      const result = await response.json()

      setFormStatus(result)

      if (result.success && formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      setFormStatus({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {formStatus?.success ? (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-400">Message Sent!</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-500">
            Thanks for reaching out. I'll get back to you soon.
          </AlertDescription>
        </Alert>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {formStatus?.success === false && (
            <Alert className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <AlertTitle className="text-red-800 dark:text-red-400">Error</AlertTitle>
              <AlertDescription className="text-red-700 dark:text-red-500">{formStatus.message}</AlertDescription>
            </Alert>
          )}

          <div>
            <Input name="name" placeholder="Your Name" required disabled={isSubmitting} />
            {formStatus?.errors?.find((e) => e.field === "name")?.message && (
              <p className="text-sm text-red-500 mt-1">{formStatus.errors.find((e) => e.field === "name")?.message}</p>
            )}
          </div>

          <div>
            <Input name="email" type="email" placeholder="Your Email" required disabled={isSubmitting} />
            {formStatus?.errors?.find((e) => e.field === "email")?.message && (
              <p className="text-sm text-red-500 mt-1">{formStatus.errors.find((e) => e.field === "email")?.message}</p>
            )}
          </div>

          <div>
            <Textarea name="message" placeholder="Your Message" rows={5} required disabled={isSubmitting} />
            {formStatus?.errors?.find((e) => e.field === "message")?.message && (
              <p className="text-sm text-red-500 mt-1">
                {formStatus.errors.find((e) => e.field === "message")?.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </>
  )
}
