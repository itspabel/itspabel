"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import ProjectCard from "./project-card"
import { useAnimationObserver } from "@/hooks/use-animation-observer"

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/ecommerce.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "MongoDB"],
    liveUrl: "https://ecommerce-demo.vercel.app",
    githubUrl: "https://github.com/itspabel/ecommerce-platform",
    category: "Full Stack",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/taskapp.jpg",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    liveUrl: "https://taskmanager-demo.vercel.app",
    githubUrl: "https://github.com/itspabel/task-manager",
    category: "Full Stack",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/weather.jpg",
    technologies: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    liveUrl: "https://weather-dashboard-demo.vercel.app",
    githubUrl: "https://github.com/itspabel/weather-dashboard",
    category: "Frontend",
  },
  {
    id: 4,
    title: "AI Image Enhancer",
    description:
      "AI-powered image enhancement tool with upscaling, deblur, noise reduction, and before/after comparison features.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/ai-enhancer.jpg",
    technologies: ["Next.js", "AI/ML", "TypeScript", "Tailwind CSS"],
    liveUrl: "/projects/image-enhancer",
    githubUrl: "https://github.com/itspabel/ai-image-enhancer",
    category: "AI/ML",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website showcasing my work with smooth animations and optimized performance.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/portfolio.jpg",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://tasfiqulalampabel.com",
    githubUrl: "https://github.com/itspabel/portfolio",
    category: "Frontend",
  },
  {
    id: 6,
    title: "Blog Platform",
    description:
      "A content management system with markdown support, SEO optimization, and social sharing capabilities.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/blog.jpg",
    technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    liveUrl: "https://blog-demo.vercel.app",
    githubUrl: "https://github.com/itspabel/blog-platform",
    category: "Full Stack",
  },
]

const categories = ["All", "Full Stack", "Frontend", "AI/ML", "Mobile"]

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { ref, isVisible } = useAnimationObserver()

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((project) => project.category === selectedCategory)

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A showcase of my recent work, featuring full-stack applications, AI-powered tools, and modern web
            experiences.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
