"use client"

import { useState } from "react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Projects from "./projects"
import Photography from "./photography"
import { Code, Camera } from "lucide-react"
import Script from "next/script"

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
    <div className="container mx-auto">
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
              <Projects />
            </TabsContent>

            <TabsContent value="photography" className="mt-0">
              <Photography />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
