import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tasfiqul Alam Pabel | Full-Stack Developer & Photographer",
  description:
    "Professional portfolio of Tasfiqul Alam Pabel, a skilled full-stack developer and photographer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "web developer",
    "full-stack developer",
    "photographer",
    "React developer",
    "Next.js",
    "Tasfiqul Alam Pabel",
    "frontend developer",
    "Bangladesh developer",
  ],
  authors: [{ name: "Tasfiqul Alam Pabel" }],
  creator: "Tasfiqul Alam Pabel",
  publisher: "Tasfiqul Alam Pabel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Tasfiqul Alam Pabel | Full-Stack Developer & Photographer",
    description:
      "Professional portfolio of Tasfiqul Alam Pabel, a skilled full-stack developer and photographer specializing in React, Next.js, and modern web technologies.",
    url: "https://tasfiqulalampabel.com",
    siteName: "Tasfiqul Alam Pabel Portfolio",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg",
        width: 1200,
        height: 630,
        alt: "Tasfiqul Alam Pabel - Developer & Photographer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasfiqul Alam Pabel | Full-Stack Developer & Photographer",
    description:
      "Professional portfolio of Tasfiqul Alam Pabel, a skilled full-stack developer and photographer specializing in React, Next.js, and modern web technologies.",
    images: ["https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg"],
    creator: "@tasfiqul_alam",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
      },
    ],
    shortcut: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png",
      },
    ],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/programmer-IPls7h7TIvYX6CfeeeNkJ9SFLAHzk8.png"
        />
        <meta name="theme-color" content="#1a1a2e" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="pabel-theme">
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
