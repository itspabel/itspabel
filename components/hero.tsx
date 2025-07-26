"use client"

import type React from "react"

import { ArrowDown, Code, Camera } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"
import AnimatedShape from "./animated-shape"
import { motion } from "framer-motion"
import { Suspense } from "react"
import FallbackAnimation from "./fallback-animation"

export default function Hero() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToProjects = () => {
    const workSection = document.querySelector("#work")
    if (workSection) {
      workSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const firstNameAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6,
      },
    },
  }

  const lastNameAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.0,
      },
    },
  }

  const letterAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const firstName = "Tasfiqul Alam"
  const lastName = "Pabel"

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 via-background/70 to-background z-10 dark:from-secondary/10" />
        <Suspense fallback={<FallbackAnimation />}>
          <AnimatedShape />
        </Suspense>
      </div>

      <motion.div
        ref={ref}
        className="z-10 text-center max-w-4xl mx-auto px-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-6 flex justify-center space-x-4" variants={item}>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
            <Code className="mr-1 h-3 w-3" aria-hidden="true" />
            <span>Full-Stack Developer</span>
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary-foreground">
            <Camera className="mr-1 h-3 w-3" aria-hidden="true" />
            <span>Photographer</span>
          </span>
        </motion.div>

        <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" variants={item}>
          <span className="block">Hi, I'm</span>
          <div className="mt-2">
            <motion.div
              className="flex justify-center"
              variants={firstNameAnimation}
              initial="hidden"
              animate="visible"
            >
              {firstName.split("").map((char, index) => (
                <motion.span
                  key={`first-${index}`}
                  variants={letterAnimation}
                  className={cn(
                    "inline-block text-4xl sm:text-5xl md:text-6xl",
                    char === " " ? "mr-2 sm:mr-3" : "mx-[0.5px] sm:mx-[1px]",
                    "text-transparent bg-clip-text bg-gradient-to-r from-secondary via-purple-500 to-blue-500 dark:from-secondary dark:via-purple-400 dark:to-blue-400",
                  )}
                  style={{ "--glow-color": "rgba(255, 105, 180, 0.3)" } as React.CSSProperties}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="flex justify-center mt-1 sm:mt-2"
              variants={lastNameAnimation}
              initial="hidden"
              animate="visible"
            >
              {lastName.split("").map((char, index) => (
                <motion.span
                  key={`last-${index}`}
                  variants={letterAnimation}
                  className={cn(
                    "inline-block text-4xl sm:text-5xl md:text-6xl",
                    "mx-[0.5px] sm:mx-[1px]",
                    "text-transparent bg-clip-text bg-gradient-to-r from-secondary via-purple-500 to-blue-500 dark:from-secondary dark:via-purple-400 dark:to-blue-400",
                  )}
                  style={{ "--glow-color": "rgba(255, 105, 180, 0.3)" } as React.CSSProperties}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-muted-foreground mt-6 mb-8" variants={item}>
          Creating digital experiences that <span className="text-secondary font-medium">inspire</span> and{" "}
          <span className="text-secondary font-medium">elevate</span> your brand
        </motion.p>

        <motion.div variants={item}>
          <button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center justify-center px-6 py-3 text-base md:text-lg font-bold text-white bg-gradient-to-r from-secondary to-purple-600 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
            style={{
              textShadow: "0 1px 1px rgba(0,0,0,0.2)",
              boxShadow:
                "0 10px 20px -10px rgba(255, 105, 180, 0.5), 0 -3px 0 0 rgba(0,0,0,0.1) inset, 0 3px 10px rgba(0,0,0,0.2)",
            }}
            aria-label="View my work"
          >
            <span className="relative z-10">View My Work</span>
            <span className="absolute inset-0 bg-gradient-to-r from-secondary/80 to-purple-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <ArrowDown
              className="ml-2 h-4 w-4 md:h-5 md:w-5 relative z-10 group-hover:animate-bounce"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-secondary" aria-hidden="true" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

// Named export for build/runtime importers
export { Hero }
