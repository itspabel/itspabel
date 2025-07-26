"use client"

import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CustomerReviews() {
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: reviewsRef, inView: reviewsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "TechCorp",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      rating: 5,
      review:
        "Tasfiqul delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
      rating: 5,
      review:
        "Working with Tasfiqul was a game-changer for our startup. He built our entire platform from scratch and delivered it on time and within budget.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "Creative Agency",
      avatar: "/placeholder.svg?height=40&width=40&text=ER",
      rating: 5,
      review:
        "The photography work Tasfiqul did for our brand campaign was absolutely stunning. His creative vision brought our concepts to life beautifully.",
    },
    {
      name: "David Thompson",
      role: "E-commerce Owner",
      company: "ShopSmart",
      avatar: "/placeholder.svg?height=40&width=40&text=DT",
      rating: 5,
      review:
        "Our e-commerce platform's performance improved dramatically after Tasfiqul's optimization work. Sales increased by 40% in the first month!",
    },
    {
      name: "Lisa Wang",
      role: "Wedding Planner",
      company: "Dream Weddings",
      avatar: "/placeholder.svg?height=40&width=40&text=LW",
      rating: 5,
      review:
        "Tasfiqul captured our wedding events perfectly. His photography style is unique and he has an amazing ability to capture emotions.",
    },
    {
      name: "James Miller",
      role: "CTO",
      company: "DataFlow",
      avatar: "/placeholder.svg?height=40&width=40&text=JM",
      rating: 5,
      review:
        "Excellent full-stack development skills. Tasfiqul built a complex data visualization dashboard that our team uses daily. Highly recommended!",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={cn("h-4 w-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
    ))
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Heading */}
          <div ref={headingRef} className="text-center space-y-4">
            <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", headingInView && "visible")}>
              What Clients Say
            </h2>
            <p
              className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", headingInView && "visible")}
              style={{ transitionDelay: "0.2s" }}
            >
              Don't just take my word for it. Here's what some of my clients have to say about working with me.
            </p>
          </div>

          {/* Reviews Grid */}
          <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card
                key={review.name}
                className={cn("stagger-item hover:shadow-lg transition-all duration-300", reviewsInView && "visible")}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 space-y-4">
                  {/* Rating */}
                  <div className="flex space-x-1">{renderStars(review.rating)}</div>

                  {/* Review Text */}
                  <p className="text-muted-foreground italic">"{review.review}"</p>

                  {/* Author */}
                  <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{review.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.role} at {review.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { CustomerReviews }
