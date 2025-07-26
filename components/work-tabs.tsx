"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Eye } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function WorkTabs() {
  const [activeTab, setActiveTab] = useState("projects")

  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: contentRef, inView: contentInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      image: "/placeholder.svg?height=300&width=400&text=E-Commerce+Platform",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Tailwind CSS"],
      github: "https://github.com/itspabel",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates",
      image: "/placeholder.svg?height=300&width=400&text=Task+Management+App",
      technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io"],
      github: "https://github.com/itspabel",
      live: "https://example.com",
      featured: true,
    },
    {
      title: "Weather Dashboard",
      description: "A responsive weather dashboard with location-based forecasts",
      image: "/placeholder.svg?height=300&width=400&text=Weather+Dashboard",
      technologies: ["React", "OpenWeather API", "Chart.js", "CSS3"],
      github: "https://github.com/itspabel",
      live: "https://example.com",
      featured: false,
    },
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS",
      image: "/placeholder.svg?height=300&width=400&text=Portfolio+Website",
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "MDX"],
      github: "https://github.com/itspabel",
      live: "https://example.com",
      featured: false,
    },
  ]

  const photos = [
    {
      title: "Urban Landscapes",
      description: "Capturing the beauty of city life and architecture",
      image: "/placeholder.svg?height=400&width=300&text=Urban+Landscape",
      category: "Architecture",
      location: "New York City",
    },
    {
      title: "Portrait Session",
      description: "Professional portrait photography with natural lighting",
      image: "/placeholder.svg?height=400&width=300&text=Portrait+Session",
      category: "Portrait",
      location: "Studio",
    },
    {
      title: "Nature's Beauty",
      description: "Exploring the natural world through photography",
      image: "/placeholder.svg?height=400&width=300&text=Nature+Beauty",
      category: "Nature",
      location: "National Park",
    },
    {
      title: "Street Photography",
      description: "Candid moments from everyday life",
      image: "/placeholder.svg?height=400&width=300&text=Street+Photography",
      category: "Street",
      location: "Downtown",
    },
    {
      title: "Event Coverage",
      description: "Professional event and wedding photography",
      image: "/placeholder.svg?height=400&width=300&text=Event+Coverage",
      category: "Event",
      location: "Various",
    },
    {
      title: "Product Photography",
      description: "Commercial product photography for brands",
      image: "/placeholder.svg?height=400&width=300&text=Product+Photography",
      category: "Commercial",
      location: "Studio",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="space-y-12">
          {/* Heading */}
          <div ref={headingRef} className="text-center space-y-4">
            <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", headingInView && "visible")}>My Work</h2>
            <p
              className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", headingInView && "visible")}
              style={{ transitionDelay: "0.2s" }}
            >
              Explore my latest projects and photography work. Each piece represents my passion for creating and
              capturing beauty.
            </p>
          </div>

          {/* Tabs */}
          <div
            ref={contentRef}
            className={cn("fade-in-up", contentInView && "visible")}
            style={{ transitionDelay: "0.3s" }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="projects" className="flex items-center gap-2">
                  <span>Projects</span>
                </TabsTrigger>
                <TabsTrigger value="photography" className="flex items-center gap-2">
                  <span>Photography</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {projects.map((project, index) => (
                    <Card
                      key={project.title}
                      className={cn(
                        "group hover:shadow-lg transition-all duration-300 stagger-item",
                        contentInView && "visible",
                      )}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {project.featured && <Badge className="absolute top-4 left-4 bg-secondary">Featured</Badge>}
                      </div>
                      <CardHeader>
                        <CardTitle className="group-hover:text-secondary transition-colors">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              Code
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={project.live} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="photography" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photos.map((photo, index) => (
                    <Card
                      key={photo.title}
                      className={cn(
                        "group hover:shadow-lg transition-all duration-300 stagger-item",
                        contentInView && "visible",
                      )}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={photo.image || "/placeholder.svg"}
                          alt={photo.title}
                          width={300}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Button>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                            {photo.title}
                          </CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {photo.category}
                          </Badge>
                        </div>
                        <CardDescription>{photo.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">📍 {photo.location}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  )
}

export { WorkTabs }
