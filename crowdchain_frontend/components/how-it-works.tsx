"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Rocket, Users, DollarSign } from "lucide-react"

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const steps = [
    {
      icon: <Rocket className="w-8 h-8 text-blue-500" />,
      title: "Create Campaign",
      description: "Set your funding goal, campaign duration, and share your vision with potential backers.",
      color: "from-blue-500/20 to-blue-500/5",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Receive Pledges",
      description: "Backers can pledge funds directly to your campaign using cryptocurrency.",
      color: "from-purple-500/20 to-purple-500/5",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-cyan-500" />,
      title: "Manage Funds",
      description: "Once your goal is reached, withdraw funds to bring your project to life.",
      color: "from-cyan-500/20 to-cyan-500/5",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform leverages blockchain technology to create a transparent, secure, and efficient crowdfunding
            experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl transform group-hover:-translate-y-1 transition-transform duration-300" />
              <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl overflow-hidden">
                {/* Gradient background */}
                <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${step.color} opacity-20`} />

                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold text-white">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="/dashboard"
            className="inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-white font-medium shadow transition-colors hover:from-blue-600 hover:to-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}

