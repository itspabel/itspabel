import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Bangladeshi Music Player | Tasfiqul Alam Pabel",
  description:
    "A minimalist web music player featuring top Bangladeshi artists like Minar Rahman, Tahsan, Habib Wahid, Shironamhin, Artcell, and Avash.",
  keywords: [
    "Bangladeshi music",
    "music player",
    "Minar Rahman",
    "Tahsan",
    "Habib Wahid",
    "Shironamhin",
    "Artcell",
    "Avash",
    "YouTube music",
    "web music player",
  ],
  openGraph: {
    title: "Bangladeshi Music Player",
    description: "Discover the best of Bangladeshi music with our minimalist web player",
    images: [
      {
        url: "/api/og-music?title=Bangladeshi Music Player&artist=Featuring Top Artists",
        width: 1200,
        height: 630,
        alt: "Bangladeshi Music Player",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bangladeshi Music Player",
    description: "Discover the best of Bangladeshi music with our minimalist web player",
    images: ["/api/og-music?title=Bangladeshi Music Player&artist=Featuring Top Artists"],
  },
}

export default function MusicPlayerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
