"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Camera, ExternalLink, Github } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Script from "next/script"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern shopping experience with React and Node.js",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Travel Blog",
    description: "Responsive travel blog with dynamic content management",
    image: "https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727_1280.jpg",
    tags: ["Next.js", "Tailwind CSS", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "Portfolio Generator",
    description: "Create beautiful portfolios with a few clicks",
    image: "https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_1280.jpg",
    tags: ["React", "Firebase", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
  },
]

const photos = [
  {
    id: 1,
    title: "Mountain Sunrise",
    location: "Himalayas, Nepal",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Landscape", "Nature"],
  },
  {
    id: 2,
    title: "Urban Nightscape",
    location: "Tokyo, Japan",
    image: "https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014619_1280.jpg",
    tags: ["City", "Night"],
  },
  {
    id: 3,
    title: "Ocean Waves",
    location: "Bali, Indonesia",
    image: "https://cdn.pixabay.com/photo/2017/12/15/13/51/polynesia-3021072_1280.jpg",
    tags: ["Ocean", "Nature"],
  },
]

export default function WorkTabs() {
  const [activeTab, setActiveTab] = useState("projects")
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { ref: tabsRef, inView: tabsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // JSON-LD structured data for creative work collection
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "Collection",
    name: "Tasfiqul Alam Pabel's Portfolio",
    description: "A collection of web development projects and photography work by Tasfiqul Alam Pabel",
    creator: {
      "@type": "Person",
      name: "Tasfiqul Alam Pabel",
    },
    about: [
      {
        "@type": "CreativeWork",
        name: "Web Development Projects",
        description: "Modern web applications built with React, Next.js, and other cutting-edge technologies",
      },
      {
        "@type": "CreativeWork",
        name: "Photography Collection",
        description: "Landscape, urban, and portrait photography capturing moments and places",
      },
    ],
  }

  return (
    <div className="container mx-auto py-20">
      <Script
        id="portfolio-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />

      <div className="space-y-12">
        <div ref={headingRef} className="text-center space-y-4">
          <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", headingInView && "visible")}>My Work</h2>
          <p
            className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", headingInView && "visible")}
            style={{ transitionDelay: "0.2s" }}
          >
            Explore my projects and photography - two passions that fuel my creativity.
          </p>
        </div>

        <div ref={tabsRef}>
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className={cn("flex justify-center mb-8 fade-in-up", tabsInView && "visible")}>
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="projects" className="flex items-center justify-center gap-2">
                  <Code className="h-4 w-4" aria-hidden="true" />
                  <span>Projects</span>
                </TabsTrigger>
                <TabsTrigger value="photography" className="flex items-center justify-center gap-2">
                  <Camera className="h-4 w-4" aria-hidden="true" />
                  <span>Photography</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="projects" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="photography" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="group hover:shadow-lg transition-shadow duration-300">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={photo.image || "/placeholder.svg"}
                        alt={photo.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg">{photo.title}</CardTitle>
                      <CardDescription>{photo.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {photo.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
