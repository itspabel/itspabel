import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Image Enhancer | Tasfiqul Alam",
  description: "AI-powered image enhancement tool with upscaling, deblurring, and noise reduction capabilities.",
  keywords: ["AI", "image enhancement", "upscaling", "deblur", "noise reduction", "photo editing"],
  openGraph: {
    title: "AI Image Enhancer",
    description: "Transform your images with AI-powered enhancement technology",
    type: "website",
    images: [
      {
        url: "/og-image-enhancer.png",
        width: 1200,
        height: 630,
        alt: "AI Image Enhancer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Enhancer",
    description: "Transform your images with AI-powered enhancement technology",
    images: ["/og-image-enhancer.png"],
  },
}

export default function ImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
