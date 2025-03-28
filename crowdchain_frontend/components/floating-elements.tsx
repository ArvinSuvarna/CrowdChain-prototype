"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function FloatingElements() {
  const [elements, setElements] = useState<{ x: number; y: number; size: number; delay: number; duration: number }[]>(
    [],
  )

  useEffect(() => {
    // Generate random floating elements
    const newElements = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      delay: Math.random() * 2,
      duration: Math.random() * 10 + 10,
    }))

    setElements(newElements)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            width: `${element.size}px`,
            height: `${element.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: element.duration,
            delay: element.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

