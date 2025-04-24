"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Tag } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface Photo {
  id: number
  title: string
  location: string
  image: string
  tags: string[]
}

export default function PhotoCard({ photo }: { photo: Photo }) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg aspect-square bg-muted"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>
      )}

      <Image
        src={photo.image || "/placeholder.svg"}
        alt={photo.title}
        fill
        className={cn(
          "object-cover transition-all duration-500",
          imageLoaded ? "opacity-100" : "opacity-0",
          isHovered && "scale-105",
        )}
        onLoad={() => setImageLoaded(true)}
      />

      <div
        className={`absolute inset-0 bg-background/70 backdrop-blur-sm flex flex-col justify-end p-4 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <h3 className="text-lg font-semibold">{photo.title}</h3>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{photo.location}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {photo.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
