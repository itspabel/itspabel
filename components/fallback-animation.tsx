"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function FallbackAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create stars
    const stars: { x: number; y: number; size: number; speed: number }[] = []
    const starCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 15000))

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.05 + 0.02,
      })
    }

    // Animation
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = theme === "dark" ? "#1a1a2e" : "#f8f9fa"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach((star) => {
        // Update position
        star.y += star.speed * canvas.height

        // Reset if off screen
        if (star.y > canvas.height) {
          star.y = 0
          star.x = Math.random() * canvas.width
        }

        // Draw star
        ctx.beginPath()
        ctx.fillStyle = Math.random() > 0.9 ? "#FF69B4" : theme === "dark" ? "#ffffff" : "#1a1a2e"
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationId)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "block" }} />
}
