"use client"

import { useState, useEffect } from "react"

export function useScrollSpy(sectionIds: string[], options: IntersectionObserverInit = { threshold: 0.5 }) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const elements = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as Element[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, options)

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, options])

  return activeId
}
