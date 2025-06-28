import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Photography from "@/components/photography"
import Contact from "@/components/contact"
import CustomerReviews from "@/components/customer-reviews"
import ScrollToTop from "@/components/scroll-to-top"

// Disable static generation to prevent server-side hook execution
export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Photography />
      <CustomerReviews />
      <Contact />
      <ScrollToTop />
    </main>
  )
}
