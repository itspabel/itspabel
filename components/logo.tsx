"use client"

import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={cn("flex items-center", className)}>
      <motion.svg
        width="120"
        height="40"
        viewBox="0 0 120 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto h-8 md:h-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.path
          d="M10 8H20C25.5228 8 30 12.4772 30 18V18C30 23.5228 25.5228 28 20 28H10V8Z"
          fill="none"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        <motion.path
          d="M40 8H50V18H60V8H70V28H60V23H50V28H40V8Z"
          fill="none"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.path
          d="M80 8H90C95.5228 8 100 12.4772 100 18V18C100 23.5228 95.5228 28 90 28H80V8Z"
          fill="none"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.path
          d="M110 8H120V28H110V8Z"
          fill="none"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
        />
        <motion.text
          x="60"
          y="22"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill={isDark ? "#ffffff" : "#000000"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Pabel
        </motion.text>
      </motion.svg>
    </div>
  )
}
