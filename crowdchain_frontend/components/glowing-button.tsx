"use client"

import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface GlowingButtonProps {
  children: ReactNode
  href: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function GlowingButton({ children, href, onMouseEnter, onMouseLeave }: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    onMouseEnter?.()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    onMouseLeave?.()
  }

  return (
    <Link href={href}>
      <motion.div
        className="relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-[2px]">
          <div className="rounded-full bg-black px-8 py-3 h-14 flex items-center justify-center gap-2 text-white font-medium">
            {children}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

