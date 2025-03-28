"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ProjectCard } from "./project-card"

export function ThreeDProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const x = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 30 })

  const projects = [
    {
      name: "NeuralLink",
      description: "A decentralized neural network that allows developers to train AI models collaboratively.",
      image: "/project-1.jpg",
      raised: 120000,
      goal: 150000,
      backers: 1240,
      daysLeft: 12,
      status: "AI & Machine Learning",
      aiRiskScore: 92,
    },
    {
      name: "OceanClean",
      description: "Autonomous drones that collect plastic waste from oceans and convert it into recyclable materials.",
      image: "/project-2.jpg",
      raised: 89000,
      goal: 100000,
      backers: 945,
      daysLeft: 8,
      status: "Environmental",
      aiRiskScore: 95,
    },
    {
      name: "MetaVerse Pioneers",
      description: "An open-source metaverse platform that enables creators to build and monetize virtual experiences.",
      image: "/project-3.jpg",
      raised: 210000,
      goal: 250000,
      backers: 1876,
      daysLeft: 21,
      status: "Virtual Reality",
      aiRiskScore: 88,
    },
    {
      name: "Quantum Computing OS",
      description: "Open-source operating system designed for quantum computers.",
      image: "/placeholder.svg?height=200&width=400",
      raised: 180000,
      goal: 300000,
      backers: 1560,
      daysLeft: 15,
      status: "Quantum Computing",
      aiRiskScore: 90,
    },
    {
      name: "Sustainable Energy Grid",
      description: "Decentralized energy trading platform for renewable sources.",
      image: "/placeholder.svg?height=200&width=400",
      raised: 75000,
      goal: 120000,
      backers: 820,
      daysLeft: 18,
      status: "Energy",
      aiRiskScore: 94,
    },
  ]

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth)
    }
  }, [])

  const handleDragEnd = () => {
    const currentPosition = x.get()
    const cardWidth = width / (projects.length - 1)
    const newIndex = Math.round(Math.abs(currentPosition) / cardWidth)

    setActiveIndex(newIndex)
    x.set(-newIndex * cardWidth)
  }

  const cardWidth = width / (projects.length - 1) || 1 // Prevent division by zero

  const rotateYValues = projects.map((_, index) => {
    const cardPosition = -index * cardWidth
    return useTransform(springX, (val) => {
      const distanceFromCenter = val - cardPosition
      const rotation = (distanceFromCenter / cardWidth) * 15
      return isNaN(rotation) ? 0 : rotation // Prevent NaN
    })
  })

  const scaleValues = projects.map((_, index) => {
    const cardPosition = -index * cardWidth
    return useTransform(springX, (val) => {
      const distanceFromCenter = Math.abs(val - cardPosition)
      const scale = 1 - Math.min(distanceFromCenter / (cardWidth * 2), 0.2)
      return isNaN(scale) ? 1 : scale // Prevent NaN
    })
  })

  const opacityValues = projects.map((_, index) => {
    const cardPosition = -index * cardWidth
    return useTransform(springX, (val) => {
      const distanceFromCenter = Math.abs(val - cardPosition)
      const opacity = 1 - Math.min(distanceFromCenter / (cardWidth * 1.5), 0.5)
      return isNaN(opacity) ? 1 : opacity // Prevent NaN
    })
  })

  const filterValues = projects.map((_, index) => {
    const cardPosition = -index * cardWidth
    return useTransform(springX, (val) => {
      const distanceFromCenter = Math.abs(val - cardPosition)
      const blur = Math.min((distanceFromCenter / cardWidth) * 5, 5)
      return `blur(${isNaN(blur) ? 0 : blur}px)` // Prevent NaN
    })
  })

  const zIndexValues = projects.map((_, index) => {
    const cardPosition = -index * cardWidth
    return useTransform(springX, (val) => {
      const distanceFromCenter = Math.abs(val - cardPosition)
      return isNaN(distanceFromCenter) ? 100 : 100 - distanceFromCenter // Prevent NaN
    })
  })

  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={containerRef}
        className="flex gap-6 cursor-grab active:cursor-grabbing overflow-hidden"
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        style={{ x: springX }}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: "grabbing" }}
      >
        {projects.map((project, index) => {
          return (
            <motion.div
              key={index}
              className="min-w-[300px] md:min-w-[400px] lg:min-w-[500px] perspective-1000"
              style={{
                rotateY: rotateYValues[index],
                scale: scaleValues[index],
                opacity: opacityValues[index],
                filter: filterValues[index],
                zIndex: zIndexValues[index],
              }}
            >
              <ProjectCard {...project} />
            </motion.div>
          )
        })}
      </motion.div>

      <div className="flex justify-center mt-8 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-6 bg-blue-500" : "bg-white/20"
            }`}
            onClick={() => {
              const cardWidth = width / (projects.length - 1)
              setActiveIndex(index)
              x.set(-index * cardWidth)
            }}
          />
        ))}
      </div>
    </div>
  )
}

