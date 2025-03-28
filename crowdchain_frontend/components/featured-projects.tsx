"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Users, DollarSign } from "lucide-react"

export default function FeaturedProjects() {
  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      id: 1,
      title: "NeuralLink",
      category: "AI & Machine Learning",
      description: "A decentralized neural network that allows developers to train AI models collaboratively.",
      image: "/project-1.jpg",
      raised: 120000,
      goal: 150000,
      backers: 1240,
      daysLeft: 12,
      tags: ["AI", "Web3", "Decentralized Computing"],
    },
    {
      id: 2,
      title: "OceanClean",
      category: "Environmental",
      description: "Autonomous drones that collect plastic waste from oceans and convert it into recyclable materials.",
      image: "/project-2.jpg",
      raised: 89000,
      goal: 100000,
      backers: 945,
      daysLeft: 8,
      tags: ["CleanTech", "Robotics", "Sustainability"],
    },
    {
      id: 3,
      title: "MetaVerse Pioneers",
      category: "Virtual Reality",
      description: "An open-source metaverse platform that enables creators to build and monetize virtual experiences.",
      image: "/project-3.jpg",
      raised: 210000,
      goal: 250000,
      backers: 1876,
      daysLeft: 21,
      tags: ["VR/AR", "Gaming", "NFT"],
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl">
              Discover innovative projects that are changing the world through decentralized funding.
            </p>
          </div>
          <a
            href="/projects"
            className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4 md:mt-0"
          >
            View all projects
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`
                group relative overflow-hidden rounded-2xl border border-white/10
                transition-all duration-300 hover:border-white/20
                ${index === activeProject ? "lg:col-span-2 lg:row-span-2" : ""}
              `}
              onClick={() => setActiveProject(index)}
            >
              {/* Project image with overlay */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Category tag */}
                <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-white">
                  {project.category}
                </div>
              </div>

              {/* Project info */}
              <div className="relative z-20 p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white font-medium">${(project.raised / 1000).toFixed(1)}K raised</span>
                    <span className="text-gray-400">${(project.goal / 1000).toFixed(1)}K goal</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: `${(project.raised / project.goal) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-sm text-gray-400">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1 text-blue-400" />
                    {project.backers.toLocaleString()} backers
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1 text-purple-400" />
                    {project.daysLeft} days left
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1 text-green-400" />$
                    {Math.round(project.raised / project.backers)} avg
                  </div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

