"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative rounded-full border-secondary/20 hover:bg-secondary/10 hover:text-secondary"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: theme === "dark" ? "0 0 0 1.5px rgba(255, 105, 180, 0.3)" : "0 0 0 1.5px rgba(255, 105, 180, 0.3)",
        }}
        transition={{ duration: 0.5 }}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
