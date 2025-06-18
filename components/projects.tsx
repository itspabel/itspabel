"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import ProjectCard from "./project-card"

const projects = [
  {
    id: 1,
    title: "AI Image Enhancer",
    description: "AI-powered image enhancement with upscaling, deblurring, and noise reduction",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "AI", "Image Processing", "Tailwind CSS"],
    link: "/projects/image-enhancer",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A modern shopping experience with React and Node.js",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 3,
    title: "Travel Blog",
    description: "Responsive travel blog with dynamic content management",
    image: "https://cdn.pixabay.com/photo/2017/06/05/11/01/airport-2373727_1280.jpg",
    tags: ["Next.js", "Tailwind CSS", "Prisma"],
  },
  {
    id: 4,
    title: "Portfolio Generator",
    description: "Create beautiful portfolios with a few clicks",
    image: "https://cdn.pixabay.com/photo/2018/05/04/20/01/website-3374825_1280.jpg",
    tags: ["React", "Firebase", "Framer Motion"],
  },
  {
    id: 5,
    title: "Task Management App",
    description: "Organize your work with this intuitive application",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=2032&auto=format&fit=crop",
    tags: ["Vue.js", "Express", "PostgreSQL"],
  },
]

export default function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <div key={project.id} className={cn("stagger-item", inView && "visible")}>
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
