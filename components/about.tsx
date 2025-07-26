"use client"

import { useInView } from "react-intersection-observer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Camera, Palette, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export default function About() {
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "AWS",
    "Docker",
    "Git",
    "Photography",
    "Adobe Lightroom",
    "Adobe Photoshop",
  ]

  const highlights = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Full Stack Development",
      description: "Building scalable web applications with modern technologies and best practices.",
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Photography",
      description: "Capturing moments and telling stories through the lens with creative vision.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "UI/UX Design",
      description: "Creating intuitive and beautiful user interfaces that enhance user experience.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Performance Optimization",
      description: "Optimizing applications for speed, accessibility, and search engine visibility.",
    },
  ]

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {/* Heading */}
          <div ref={headingRef} className="text-center space-y-4">
            <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", headingInView && "visible")}>About Me</h2>
            <p
              className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", headingInView && "visible")}
              style={{ transitionDelay: "0.2s" }}
            >
              I'm a passionate developer and photographer who loves creating digital experiences and capturing life's
              beautiful moments.
            </p>
          </div>

          {/* Content */}
          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Story */}
            <div className={cn("space-y-6 slide-in-left", contentInView && "visible")}>
              <h3 className="text-2xl font-semibold">My Story</h3>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  With over 3 years of experience in web development, I specialize in creating robust, scalable
                  applications using React, Next.js, and modern backend technologies. My journey began with a curiosity
                  about how websites work, which evolved into a passion for crafting exceptional digital experiences.
                </p>
                <p>
                  Beyond coding, I'm an avid photographer who finds joy in capturing the world through different
                  perspectives. This creative outlet complements my technical skills, bringing a unique aesthetic sense
                  to my development work.
                </p>
                <p>
                  I believe in continuous learning, clean code, and building products that make a positive impact.
                  Whether it's developing a complex web application or capturing the perfect shot, I approach every
                  project with dedication and creativity.
                </p>
              </div>
            </div>

            {/* Highlights */}
            <div className={cn("space-y-6 slide-in-right", contentInView && "visible")}>
              <h3 className="text-2xl font-semibold">What I Do</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <Card
                    key={item.title}
                    className={cn("stagger-item", contentInView && "visible")}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="text-secondary">{item.icon}</div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className={cn("space-y-8 scale-in", contentInView && "visible")} style={{ transitionDelay: "0.4s" }}>
            <h3 className="text-2xl font-semibold text-center">Skills & Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className={cn("text-sm py-2 px-4 stagger-item", contentInView && "visible")}
                  style={{ transitionDelay: `${index * 0.05}s` }}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { About }
