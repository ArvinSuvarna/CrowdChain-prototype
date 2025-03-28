"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function HeroParallaxEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  const orb1X = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
  const orb2X = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"])
  const orb3X = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"])
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[80px]"
        style={{
          left: `calc(20% + ${mousePosition.x * 5 || 0}%)`,
          top: `calc(30% + ${mousePosition.y * 5 || 0}%)`,
          x: orb1X,
          y: orb1Y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[80px]"
        style={{
          left: `calc(70% - ${mousePosition.x * 5 || 0}%)`,
          top: `calc(60% - ${mousePosition.y * 5 || 0}%)`,
          x: orb2X,
          y: orb2Y,
          transform: "translate(-50%, -50%)",
        }}
      />
      <motion.div
        className="absolute w-[25vw] h-[25vw] rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-[80px]"
        style={{
          left: `calc(40% - ${mousePosition.x * 3 || 0}%)`,
          top: `calc(80% - ${mousePosition.y * 3 || 0}%)`,
          x: orb3X,
          y: orb3Y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </>
  )
}

