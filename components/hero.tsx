"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/5" />

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div ref={ref} className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className={cn("space-y-4 fade-in-up", inView && "visible")}>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hi, I'm{" "}
                <span className="animated-gradient-text bg-gradient-to-r from-secondary via-primary to-secondary">
                  Tasfiqul Alam
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">Full Stack Developer & Photographer</p>
            </div>

            <div className={cn("space-y-6 fade-in-up", inView && "visible")} style={{ transitionDelay: "0.2s" }}>
              <p className="text-lg text-muted-foreground max-w-lg">
                I create beautiful, functional web applications and capture moments through photography. Passionate
                about clean code, user experience, and visual storytelling.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button onClick={scrollToContact} size="lg" className="group">
                  <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Get In Touch
                </Button>
                <Button variant="outline" size="lg" className="group bg-transparent">
                  <Download className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Download CV
                </Button>
              </div>

              <div className="flex space-x-4">
                <Link
                  href="https://github.com/itspabel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 group"
                >
                  <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
                <Link
                  href="https://linkedin.com/in/tasfiqulalam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 group"
                >
                  <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div
            className={cn("flex justify-center lg:justify-end fade-in-up", inView && "visible")}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-secondary/20 shadow-2xl">
                <Image
                  src="/placeholder-user.jpg"
                  alt="Tasfiqul Alam"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-secondary/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-secondary transition-colors group"
          >
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="h-5 w-5 animate-bounce group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}

export { Hero }
