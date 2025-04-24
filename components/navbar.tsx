"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Home, User, Briefcase, Mail, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollSpy } from "@/hooks/use-scroll-spy"

const navLinks = [
  { href: "#hero", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#work", label: "Work", icon: Briefcase },
  { href: "#testimonials", label: "Testimonials", icon: Star },
  { href: "#contact", label: "Contact", icon: Mail },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useScrollSpy(
    navLinks.map((link) => link.href.substring(1)),
    { rootMargin: "-30% 0px -70% 0px" },
  )

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Side drawer animation variants
  const drawerVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "tween",
        duration: 0.3,
      },
    },
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-gray-900 dark:bg-gray-100 shadow-md" : "bg-gray-900 dark:bg-gray-100",
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <motion.div className="flex items-center" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <motion.span
              className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary via-purple-500 to-blue-500 dark:from-secondary dark:via-purple-400 dark:to-blue-400"
              style={{ fontFamily: "Arial, sans-serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Pabel
            </motion.span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6 px-4 py-2 rounded-lg bg-gray-800/90 dark:bg-gray-200/90 border border-gray-700 dark:border-gray-300">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    "text-sm font-medium px-3 py-1.5 rounded-md transition-all duration-300 text-gray-200 dark:text-gray-800",
                    activeSection === link.href.substring(1)
                      ? "bg-secondary text-white dark:text-gray-900"
                      : "hover:bg-gray-700 dark:hover:bg-gray-300",
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            className="relative z-50 rounded-full border-secondary/20 bg-gray-800 dark:bg-gray-200 hover:bg-secondary/20 hover:text-secondary text-white dark:text-black"
          >
            {isOpen ? (
              <X className="h-5 w-5 transition-all duration-300 ease-in-out" />
            ) : (
              <Menu className="h-5 w-5 transition-all duration-300 ease-in-out" />
            )}
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: isOpen ? "0 0 0 1.5px rgba(255, 105, 180, 0.5)" : "0 0 0 1.5px rgba(255, 105, 180, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            />
          </Button>
        </div>
      </div>

      {/* Mobile Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/70 dark:bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Side drawer */}
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden fixed inset-y-0 left-0 w-72 bg-gray-900 dark:bg-gray-100 z-50 shadow-xl"
            >
              <div className="flex flex-col h-full pt-20 pb-6 px-4">
                <div className="flex-1 flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={cn(
                        "flex items-center space-x-3 text-left py-3 px-4 rounded-md transition-colors",
                        activeSection === link.href.substring(1)
                          ? "bg-secondary text-white"
                          : "text-gray-200 dark:text-gray-800 hover:bg-gray-800 dark:hover:bg-gray-200",
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-800 dark:border-gray-300 pt-4 mt-4">
                  <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
                    © {new Date().getFullYear()} Tasfiqul Alam Pabel
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
