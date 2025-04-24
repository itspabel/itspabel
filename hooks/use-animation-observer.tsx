"use client"

import { useEffect, useRef } from "react"

export function useAnimationObserver() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    // Select all elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in, .stagger-item",
    )

    // Observe each element
    animatedElements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])
}
