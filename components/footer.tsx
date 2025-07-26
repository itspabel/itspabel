"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/itspabel",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/tasfiqulalam",
      label: "LinkedIn",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:tasfiqulalam@example.com",
      label: "Email",
    },
  ]

  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-muted/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Tasfiqul Alam</h3>
            <p className="text-muted-foreground">
              Full Stack Developer & Photographer passionate about creating beautiful digital experiences and capturing
              life's moments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-border/50 hover:border-secondary/50 hover:bg-secondary/5 transition-all duration-300 group"
                  aria-label={link.label}
                >
                  <div className="text-muted-foreground group-hover:text-secondary transition-colors">{link.icon}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">© {currentYear} Tasfiqul Alam. All rights reserved.</p>
          <p className="text-muted-foreground text-sm flex items-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
