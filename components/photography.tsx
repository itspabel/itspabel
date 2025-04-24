"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import PhotoCard from "./photo-card"

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
  {
    id: 4,
    title: "Desert Dunes",
    location: "Sahara, Morocco",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2076&auto=format&fit=crop",
    tags: ["Desert", "Landscape"],
  },
  {
    id: 5,
    title: "Forest Path",
    location: "Redwood, California",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop",
    tags: ["Forest", "Nature"],
  },
  {
    id: 6,
    title: "Street Market",
    location: "Bangkok, Thailand",
    image: "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=2070&auto=format&fit=crop",
    tags: ["Street", "Culture"],
  },
]

export default function Photography() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) => (
        <div key={photo.id} className={cn("stagger-item", inView && "visible")}>
          <PhotoCard photo={photo} />
        </div>
      ))}
    </div>
  )
}
