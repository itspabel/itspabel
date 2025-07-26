import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tasfiqul Alam - Full Stack Developer & Photographer",
  description:
    "Portfolio of Tasfiqul Alam - Full Stack Developer specializing in React, Next.js, and modern web technologies. Also passionate about photography.",
  keywords: "Tasfiqul Alam, Full Stack Developer, React, Next.js, Photography, Web Development",
  authors: [{ name: "Tasfiqul Alam" }],
  creator: "Tasfiqul Alam",
  publisher: "Tasfiqul Alam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tasfiqulalam.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tasfiqul Alam - Full Stack Developer & Photographer",
    description:
      "Portfolio of Tasfiqul Alam - Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    url: "https://tasfiqulalam.vercel.app",
    siteName: "Tasfiqul Alam Portfolio",
    images: [
      {
        url: "/placeholder-user.jpg",
        width: 1200,
        height: 630,
        alt: "Tasfiqul Alam - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasfiqul Alam - Full Stack Developer & Photographer",
    description:
      "Portfolio of Tasfiqul Alam - Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    creator: "@tasfiqul_alam",
    images: ["/placeholder-user.jpg"],
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
  verification: {
    google: "your-google-site-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
