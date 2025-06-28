import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Image Enhancer | Tasfiqul Alam Pabel",
  description:
    "Transform your images with AI-powered enhancement. Upscale, deblur, and reduce noise with cutting-edge technology.",
  keywords: [
    "AI image enhancer",
    "image upscaling",
    "photo enhancement",
    "deblur images",
    "noise reduction",
    "AI photo editor",
    "image processing",
    "photo restoration",
  ],
  openGraph: {
    title: "AI Image Enhancer | Tasfiqul Alam Pabel",
    description:
      "Transform your images with AI-powered enhancement. Upscale, deblur, and reduce noise with cutting-edge technology.",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/itspabel/Images/ai-enhancer.jpg",
        width: 1200,
        height: 630,
        alt: "AI Image Enhancer Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Enhancer | Tasfiqul Alam Pabel",
    description:
      "Transform your images with AI-powered enhancement. Upscale, deblur, and reduce noise with cutting-edge technology.",
    images: ["https://cdn.jsdelivr.net/gh/itspabel/Images/ai-enhancer.jpg"],
  },
}

export default function ImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
