import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tasfiqul Alam Pabel - Full-Stack Developer & Photographer",
  description:
    "Professional portfolio of Tasfiqul Alam Pabel, a full-stack developer and photographer based in Bangladesh. Specializing in React, Next.js, and modern web technologies.",
  keywords: "Tasfiqul Alam Pabel, Full-Stack Developer, Photographer, React, Next.js, Web Development, Bangladesh",
  authors: [{ name: "Tasfiqul Alam Pabel" }],
  creator: "Tasfiqul Alam Pabel",
  publisher: "Tasfiqul Alam Pabel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tasfiqulalampabel.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tasfiqul Alam Pabel - Full-Stack Developer & Photographer",
    description:
      "Professional portfolio showcasing web development projects and photography work by Tasfiqul Alam Pabel",
    url: "https://tasfiqulalampabel.com",
    siteName: "Tasfiqul Alam Pabel Portfolio",
    images: [
      {
        url: "https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg",
        width: 1200,
        height: 630,
        alt: "Tasfiqul Alam Pabel - Full-Stack Developer & Photographer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasfiqul Alam Pabel - Full-Stack Developer & Photographer",
    description: "Professional portfolio showcasing web development projects and photography work",
    creator: "@tasfiqul_alam",
    images: ["https://cdn.jsdelivr.net/gh/itspabel/Images/Pabel.jpg"],
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
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="your-google-site-verification-code" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
