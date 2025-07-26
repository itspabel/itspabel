import Hero from "@/components/hero"
import About from "@/components/about"
import WorkTabs from "@/components/work-tabs"
import CustomerReviews from "@/components/customer-reviews"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"
import Navbar from "@/components/navbar"

// Disable static generation to prevent server-side hook execution
export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="work">
          <WorkTabs />
        </section>
        <section id="testimonials">
          <CustomerReviews />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}
