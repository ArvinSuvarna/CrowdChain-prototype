"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface CursorFollowerProps {
  variant: string
  text: string
}

export function CursorFollower({ variant, text }: CursorFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    button: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      borderColor: "rgba(59, 130, 246, 0.3)",
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
    },
    link: {
      width: 64,
      height: 64,
      backgroundColor: "rgba(139, 92, 246, 0.2)",
      borderColor: "rgba(139, 92, 246, 0.3)",
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
    },
    card: {
      width: 24,
      height: 24,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    },
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-50 hidden md:block"
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {text && variant !== "default" && (
        <motion.div
          className="fixed top-0 left-0 text-white text-xs font-medium pointer-events-none z-50 hidden md:flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: 1,
            x: mousePosition.x || 0,
            y: mousePosition.y || 0,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          {text}
        </motion.div>
      )}
    </>
  )
}

