"use client"

import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { Code, Camera, Briefcase, GraduationCap } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import Script from "next/script"

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [imageLoaded, setImageLoaded] = useState(false)

  // JSON-LD structured data for person
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tasfiqul Alam Pabel",
    jobTitle: "Full-Stack Developer & Photographer",
    description:
      "A passionate developer and photographer based in Bangladesh with over 5 years of experience in web development.",
    image: "https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg",
    url: "/",
    sameAs: [
      "https://github.com/itspabel",
      "https://facebook.com/tasfiqulalampabel",
      "https://instagram.com/tasfiqul_alam_pabel",
      "https://x.com/tasfiqul_alam",
    ],
    knowsAbout: ["Web Development", "React", "Next.js", "Photography", "UI/UX Design"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Computer Science Department",
    },
  }

  return (
    <div className="container mx-auto py-20">
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div ref={ref} className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className={cn("text-3xl md:text-4xl font-bold fade-in-up", inView && "visible")}>About Me</h2>
          <p
            className={cn("text-muted-foreground max-w-2xl mx-auto fade-in-up", inView && "visible")}
            style={{ transitionDelay: "0.2s" }}
          >
            Get to know more about my journey, skills, and passion for creating beautiful digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-6">
              <p className="text-lg">
                I'm a passionate full-stack developer and photographer based in Bangladesh with a keen eye for detail
                and a love for creating beautiful, functional digital experiences. With over 5 years of experience, I
                specialize in building modern web applications using React, Next.js, and other cutting-edge
                technologies.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md mt-1">
                    <Code className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Web Development</h3>
                    <p className="text-muted-foreground">
                      Specializing in React, Next.js, TypeScript, and modern frontend technologies to build responsive,
                      user-friendly websites and web applications with optimal performance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md mt-1">
                    <Camera className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Photography</h3>
                    <p className="text-muted-foreground">
                      Capturing moments and places through my lens, with a focus on landscapes, urban photography, and
                      portrait photography that tells compelling stories.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md mt-1">
                    <Briefcase className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Experience</h3>
                    <p className="text-muted-foreground">
                      Over 5 years of experience in web development, working with clients across various industries
                      including e-commerce, education, and healthcare to deliver high-quality digital solutions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md mt-1">
                    <GraduationCap className="h-5 w-5 text-primary dark:text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Education</h3>
                    <p className="text-muted-foreground">
                      Bachelor's degree in Computer Science with a focus on web technologies and digital media.
                      Continuously learning through professional certifications and online courses.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden">
              {!imageLoaded && <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />}
              <Image
                src="https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg"
                alt="Tasfiqul Alam Pabel - Full-Stack Developer and Photographer"
                fill
                className={cn(
                  "object-cover transition-opacity duration-300",
                  imageLoaded ? "opacity-100" : "opacity-0",
                )}
                onLoad={() => setImageLoaded(true)}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <p className="font-medium">Tasfiqul Alam Pabel</p>
                <p className="text-sm opacity-80">Full-Stack Developer & Photographer</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
