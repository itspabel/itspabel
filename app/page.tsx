import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import WorkTabs from "@/components/work-tabs"
import CustomerReviews from "@/components/customer-reviews"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="work">
        <WorkTabs />
      </section>
      <section id="reviews">
        <CustomerReviews />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      <ScrollToTop />
    </main>
  )
}
