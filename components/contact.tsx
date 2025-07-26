"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Instagram, Facebook, Send, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  } | null>(null)

  const formRef = useRef<HTMLFormElement>(null)

  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: formContainerRef, inView: formInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: socialRef, inView: socialInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({
        success: true,
        message: "Message sent successfully!",
      })
      setIsSubmitting(false)
      if (formRef.current) {
        formRef.current.reset()
      }
    }, 2000)
  }

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com/itspabel",
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      label: "Facebook",
      href: "https://facebook.com/tasfiqulalampabel",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      href: "https://instagram.com/tasfiqul_alam_pabel",
    },
    {
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X",
      href: "https://x.com/tasfiqul_alam",
    },
  ]

  return (
    <div className="container mx-auto py-20">
      <div className="space-y-12">
        <div ref={headingRef} className="text-center space-y-4">
          <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", headingInView && "visible")}>Let's Connect</h2>
          <p
            className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", headingInView && "visible")}
            style={{ transitionDelay: "0.2s" }}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div ref={formContainerRef} className={cn("space-y-8 slide-in-left", formInView && "visible")}>
            <h3 className="text-xl font-semibold">Send a Message</h3>

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
                </div>

                <div>
                  <Input name="email" type="email" placeholder="Your Email" required disabled={isSubmitting} />
                </div>

                <div>
                  <Textarea name="message" placeholder="Your Message" rows={5} required disabled={isSubmitting} />
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
          </div>

          <div ref={socialRef} className={cn("space-y-8 slide-in-right", socialInView && "visible")}>
            <h3 className="text-xl font-semibold">Connect With Me</h3>
            <p className="text-muted-foreground">
              Let's build something beautiful together. Follow me on social media or check out my work.
            </p>

            <div className="flex flex-col space-y-4">
              {socialLinks.map((link, index) => (
                <div key={link.label} className={cn("stagger-item", socialInView && "visible")}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 group"
                  >
                    <div className="text-muted-foreground group-hover:text-secondary transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-medium group-hover:text-secondary transition-colors">{link.label}</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Contact }
