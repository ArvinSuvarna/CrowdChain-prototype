"use client"

import { useEffect, useRef, useState } from "react"
import { Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return

      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div ref={heroRef} className="relative overflow-hidden min-h-[90vh] flex items-center justify-center bg-black">
      {/* Animated gradient orbs */}
      <div
        className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-[80px]"
        style={{
          left: `calc(20% + ${mousePosition.x * 5}%)`,
          top: `calc(30% + ${mousePosition.y * 5}%)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />
      <div
        className="absolute w-[35vw] h-[35vw] rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[80px]"
        style={{
          left: `calc(70% - ${mousePosition.x * 5}%)`,
          top: `calc(60% - ${mousePosition.y * 5}%)`,
          transform: "translate(-50%, -50%)",
          transition: "left 0.3s ease-out, top 0.3s ease-out",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
              <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-full border border-white/10">
                <Rocket className="w-16 h-16 text-blue-500" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Empowering Innovation Through{" "}
            <span className="relative">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient-x">
                Decentralized Funding
              </span>
              <span className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-sm" />
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="max-w-2xl mx-auto text-xl text-gray-400 mb-10"
          >
            Launch your ideas into reality with our decentralized crowdfunding platform. Secure, transparent, and
            community-driven funding for the next generation of innovators.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="/dashboard"
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-black px-8 py-3 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:blur-md" />
              <span className="absolute inset-0 bg-black rounded-full m-[2px]" />
              <span className="relative flex items-center justify-center gap-2 text-white font-medium">
                Launch Your Project
                <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <button className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-transparent border border-white/20 px-8 py-3 text-white font-medium hover:border-white/40 transition-colors duration-300">
              Learn More
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="mt-16 flex justify-center"
          >
            <div className="flex items-center gap-6 py-3 px-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                  JD
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  MK
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white">
                  TS
                </div>
              </div>
              <span className="text-sm text-gray-400">
                <span className="text-white font-medium">2,500+</span> creators funded
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

