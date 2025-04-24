"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      className="h-full"
    >
      <Card
        className="overflow-hidden h-full border border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              imageLoaded ? "opacity-100" : "opacity-0",
              isHovered && "scale-105",
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <CardContent className="p-5 space-y-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-muted-foreground text-sm">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
