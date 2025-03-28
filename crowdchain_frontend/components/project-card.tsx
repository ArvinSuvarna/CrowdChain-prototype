"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Users, DollarSign, Bot, ArrowRight } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  name: string
  description: string
  raised: number
  goal: number
  backers: number
  daysLeft: number
  image: string
  status: string
  aiRiskScore: number
  featured?: boolean
}

export function ProjectCard({
  name,
  description,
  raised,
  goal,
  backers,
  daysLeft,
  image,
  status,
  aiRiskScore,
  featured = false,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-white/20 ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project image with overlay */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Category tag */}
        <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white">
          {status}
        </div>

        {/* AI Risk Score */}
        <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-white flex items-center gap-1">
          <Bot className="h-3 w-3 text-green-400" />
          <span className={aiRiskScore > 90 ? "text-green-400" : aiRiskScore > 70 ? "text-yellow-400" : "text-red-400"}>
            AI Score: {aiRiskScore}
          </span>
        </div>
      </div>

      {/* Project info */}
      <div className="relative z-20 p-6">
        <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white font-medium">${(raised / 1000).toFixed(1)}K raised</span>
            <span className="text-gray-400">${(goal / 1000).toFixed(1)}K goal</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(raised / goal) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-400">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-400" />
            {backers.toLocaleString()} backers
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-purple-400" />
            {daysLeft} days left
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-green-400" />${Math.round(raised / backers)} avg
          </div>
        </div>

        {/* View button that appears on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 pt-12"
        >
          <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-sm text-white font-medium flex items-center justify-center gap-2">
            View Project
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}

