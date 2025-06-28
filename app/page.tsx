"use client"
export const dynamic = "force-dynamic"

import Hero from "@/components/hero"
import About from "@/components/about"
import WorkTabs from "@/components/work-tabs"
import CustomerReviews from "@/components/customer-reviews"
import Contact from "@/components/contact"
import ScrollToTop from "@/components/scroll-to-top"
import { useAnimationObserver } from "@/hooks/use-animation-observer"
import Script from "next/script"

export default function Home() {
  // Initialize animation observer
  useAnimationObserver()

  // Website schema for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tasfiqul Alam Pabel - Full-Stack Developer & Photographer",
    url: "/",
    description:
      "Professional portfolio of Tasfiqul Alam Pabel, a skilled full-stack developer and photographer specializing in React, Next.js, and modern web technologies.",
    potentialAction: {
      "@type": "SearchAction",
      target: "/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <main className="min-h-screen">
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <ScrollToTop />
      <section id="hero" className="min-h-screen" aria-label="Introduction">
        <Hero />
      </section>
      <section id="about" className="py-20 px-4 md:px-8" aria-label="About Me">
        <About />
      </section>
      <section id="work" className="py-20 px-4 md:px-8" aria-label="My Work">
        <WorkTabs />
      </section>
      <section id="testimonials" className="py-20 px-4 md:px-8" aria-label="Client Testimonials">
        <CustomerReviews />
      </section>
      <section id="contact" className="py-20 px-4 md:px-8" aria-label="Contact Information">
        <Contact />
      </section>
    </main>
  )
}
