"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// Dynamically import Particles component with no SSR to avoid hydration issues
const Particles = dynamic(() => import("react-particles").then((mod) => mod.Particles), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background"></div>,
})

// Import the slim version of tsparticles engine
import { loadSlim } from "tsparticles-slim"

export default function AnimatedShape() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const particlesInit = useCallback(async (engine) => {
    // Use the slim version which has fewer dependencies and is more stable
    await loadSlim(engine)
  }, [])

  if (!mounted) return null

  const isDarkTheme = theme === "dark"

  return (
    <div className="absolute inset-0 w-full h-full">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: {
            enable: false,
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: isDarkTheme ? "#ffffff" : "#1a1a2e",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: true,
            },
            links: {
              enable: true,
              distance: 150,
              color: isDarkTheme ? "#ffffff" : "#1a1a2e",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200,
              },
            },
          },
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: {
                enable: true,
                mode: "grab",
              },
              onClick: {
                enable: true,
                mode: "push",
              },
              resize: true,
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 1,
                },
              },
              push: {
                quantity: 4,
              },
            },
          },
          detectRetina: true,
          background: {
            color: isDarkTheme ? "#1a1a2e" : "#f8f9fa",
          },
        }}
        className="w-full h-full"
      />
    </div>
  )
}
