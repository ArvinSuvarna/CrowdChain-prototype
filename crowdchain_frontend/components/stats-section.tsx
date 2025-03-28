"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TrendingUp, Users, Globe, Shield } from "lucide-react"

export default function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />,
      value: "$12.5M+",
      label: "Total Funded",
      description: "Across all projects",
    },
    {
      icon: <Users className="w-6 h-6 text-purple-500" />,
      value: "25,000+",
      label: "Active Users",
      description: "Growing community",
    },
    {
      icon: <Globe className="w-6 h-6 text-cyan-500" />,
      value: "120+",
      label: "Countries",
      description: "Global reach",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      value: "100%",
      label: "Secure",
      description: "Blockchain protected",
    },
  ]

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="mb-4 p-3 rounded-full bg-white/10">{stat.icon}</div>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-3xl font-bold text-white mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

