"use client"

import { useRef, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import Script from "next/script"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "CreativeMinds",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    content:
      "Working with Tasfiqul was an absolute pleasure. His attention to detail and creative approach to web development exceeded our expectations. Our new website has significantly improved our conversion rates.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    content:
      "Pabel delivered our project ahead of schedule and with exceptional quality. His photography skills added a unique dimension to our brand identity. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Art Director",
    company: "VisualCraft",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    content:
      "The website Tasfiqul created for our art gallery perfectly captures our aesthetic. His understanding of both design principles and technical implementation is impressive.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Wilson",
    role: "E-commerce Manager",
    company: "RetailPlus",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    content:
      "Our online store's conversion rate increased by 40% after Pabel redesigned our user experience. His technical skills combined with an eye for design make him a valuable asset.",
    rating: 4,
  },
  {
    id: 5,
    name: "Sophia Ahmed",
    role: "Non-profit Director",
    company: "GreenEarth",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    content:
      "Tasfiqul understood our mission and translated it beautifully into our digital presence. The website he created has helped us reach more donors and volunteers.",
    rating: 5,
  },
  {
    id: 6,
    name: "James Taylor",
    role: "Restaurant Owner",
    company: "Flavor Fusion",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    content:
      "The photography work Pabel did for our restaurant menu and website is stunning. He captured the essence of our dishes perfectly, and our online orders have increased significantly.",
    rating: 5,
  },
]

export default function CustomerReviews() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollRef = useRef<HTMLDivElement>(null)

  // Create JSON-LD structured data for reviews
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: testimonials.map((testimonial, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: testimonial.rating,
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: testimonial.name,
        },
        reviewBody: testimonial.content,
        itemReviewed: {
          "@type": "Service",
          name: "Tasfiqul Alam Pabel - Web Development and Photography Services",
        },
      },
    })),
  }

  // Infinite scroll effect
  useEffect(() => {
    if (!scrollRef.current) return

    const scrollElement = scrollRef.current
    let animationFrameId: number

    const scrollSpeed = 0.5
    let scrollPosition = 0

    const scroll = () => {
      if (!scrollElement) return

      scrollPosition += scrollSpeed

      // Reset position when we've scrolled the width of half the testimonials
      if (scrollPosition >= scrollElement.scrollWidth / 2) {
        scrollPosition = 0
      }

      scrollElement.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll)

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId)
    }

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll)
    }

    scrollElement.addEventListener("mouseenter", handleMouseEnter)
    scrollElement.addEventListener("mouseleave", handleMouseLeave)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollElement.removeEventListener("mouseenter", handleMouseEnter)
      scrollElement.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div className="container mx-auto py-20">
      <Script
        id="reviews-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <div ref={ref} className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", inView && "visible")}>Client Testimonials</h2>
          <p
            className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", inView && "visible")}
            style={{ transitionDelay: "0.2s" }}
          >
            What my clients say about working with me
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays for infinite scroll effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

          {/* Scrolling container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide py-8 px-4 -mx-4 space-x-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {/* Double the testimonials for seamless infinite scroll */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                className="flex-shrink-0 w-full max-w-sm"
              >
                <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4 border-2 border-secondary/20">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-3" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm flex-grow italic">"{testimonial.content}"</blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Named export for build/runtime importers
export { CustomerReviews }
