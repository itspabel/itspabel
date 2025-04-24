import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SocialLinkProps {
  icon: ReactNode
  label: string
  href: string
}

export default function SocialLink({ icon, label, href }: SocialLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center p-3 rounded-lg transition-all duration-200",
        "hover:bg-secondary/10 hover:text-secondary",
      )}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </Link>
  )
}
