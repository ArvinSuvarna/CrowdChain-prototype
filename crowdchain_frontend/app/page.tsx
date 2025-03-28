"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Rocket, ArrowRight, Shield, Users, Globe, Sparkles, Star, Zap } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import WalletConnectModal from "@/components/wallet-connect-modal"
import ParticleCanvas from "@/components/particle-canvas"
import { MilestoneTracker } from "@/components/milestone-tracker"
import { NetworkStatus } from "@/components/network-status"
import { ThreeDProjectShowcase } from "@/components/3d-project-showcase"
import { HeroParallaxEffect } from "@/components/hero-parallax-effect"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"
import { MagneticButton } from "@/components/magnetic-button"
import { GlowingButton } from "@/components/glowing-button"
import { FloatingElements } from "@/components/floating-elements"
import { TextReveal } from "@/components/text-reveal"
import { CursorFollower } from "@/components/cursor-follower"

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [cursorVariant, setCursorVariant] = useState("default")
  const [cursorText, setCursorText] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const communityRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.98])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section
      const scrollPosition = window.scrollY + window.innerHeight / 2

      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection("hero")
      } else if (
        featuredRef.current &&
        scrollPosition < featuredRef.current.offsetTop + featuredRef.current.offsetHeight
      ) {
        setActiveSection("featured")
      } else if (
        howItWorksRef.current &&
        scrollPosition < howItWorksRef.current.offsetTop + howItWorksRef.current.offsetHeight
      ) {
        setActiveSection("how")
      } else if (statsRef.current && scrollPosition < statsRef.current.offsetTop + statsRef.current.offsetHeight) {
        setActiveSection("stats")
      } else if (communityRef.current) {
        setActiveSection("community")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleCursorEnter = (variant: string, text = "") => {
    setCursorVariant(variant)
    setCursorText(text)
  }

  const handleCursorLeave = () => {
    setCursorVariant("default")
    setCursorText("")
  }

  if (!isLoaded) {
    return <LoadingScreen />
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <CursorFollower variant={cursorVariant} text={cursorText} />
      <ParticleCanvas />
      <ScrollProgressBar />

      {/* Fixed navigation */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3 bg-black/80 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent",
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div
                className={`absolute inset-0 rounded-full bg-blue-500/50 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              />
              <div className="relative bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/10">
                <Rocket
                  className={`h-6 w-6 text-blue-500 transition-transform duration-300 ${
                    scrolled ? "rotate-0" : "rotate-45"
                  }`}
                />
              </div>
            </div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`font-bold text-xl transition-all duration-300 ${
                scrolled ? "text-white" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
              }`}
            >
              CrowdChain
            </motion.span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="#featured" isActive={activeSection === "featured"}>
              Projects
            </NavLink>
            <NavLink href="#how" isActive={activeSection === "how"}>
              How It Works
            </NavLink>
            <NavLink href="#stats" isActive={activeSection === "stats"}>
              Stats
            </NavLink>
            <NavLink href="#community" isActive={activeSection === "community"}>
              Community
            </NavLink>

            <div className="ml-2">
              <NetworkStatus network="Polygon Testnet" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => handleCursorEnter("button", "Connect")}
              onMouseLeave={handleCursorLeave}
              className="rounded-full"
            >
              <span className="relative z-10 flex items-center gap-2">
                Connect Wallet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <button className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          id="hero"
        >
          <HeroParallaxEffect />

          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5" />

          <motion.div style={{ opacity, scale }} className="relative z-10 container mx-auto px-4 py-24 text-center">
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

            <TextReveal
              text="Empowering Innovation Through Decentralized Funding"
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight"
              highlightClass="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
              highlightWords={["Decentralized", "Funding"]}
            />

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
              <GlowingButton
                href="/dashboard"
                onMouseEnter={() => handleCursorEnter("button", "Launch")}
                onMouseLeave={handleCursorLeave}
              >
                Launch Your Project
                <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </GlowingButton>

              <button
                className="relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-transparent border border-white/20 px-8 py-3 text-white font-medium hover:border-white/40 transition-colors duration-300"
                onMouseEnter={() => handleCursorEnter("button", "Learn")}
                onMouseLeave={handleCursorLeave}
              >
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
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-gray-500 text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center p-1">
              <motion.div
                className="w-1 h-2 bg-white rounded-full"
                animate={{
                  y: [0, 10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </section>

        {/* Featured Projects Section */}
        <section
          ref={featuredRef}
          className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
          id="featured"
        >
          <FloatingElements />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  Featured Projects
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-400 max-w-2xl"
                >
                  Discover innovative projects that are changing the world through decentralized funding.
                </motion.p>
              </div>
              <motion.a
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                href="/projects"
                className="group inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-4 md:mt-0"
                onMouseEnter={() => handleCursorEnter("link", "View All")}
                onMouseLeave={handleCursorLeave}
              >
                View all projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            <ThreeDProjectShowcase />

            <div className="mt-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                      <Shield className="h-5 w-5 text-blue-400" />
                      Milestone-Based Funding
                    </h3>
                    <p className="text-gray-400">Track progress and release funds based on achievements</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                      OpenZeppelin Verified
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                      AI Risk Score: 95/100
                    </span>
                  </div>
                </div>

                <MilestoneTracker
                  projectName="NeuralLink"
                  milestones={[
                    { title: "MVP Development", status: "completed", date: "Jan 15, 2023", proof: "QmX7b5..." },
                    { title: "Beta Testing", status: "completed", date: "Mar 22, 2023", proof: "QmY8c6..." },
                    { title: "Public Launch", status: "current", date: "Jun 10, 2023", proof: "" },
                    { title: "Scale Operations", status: "upcoming", date: "Sep 05, 2023", proof: "" },
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="py-24 relative overflow-hidden" id="how">
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform leverages blockchain technology to create a transparent, secure, and efficient crowdfunding
                experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Rocket className="w-8 h-8 text-blue-500" />,
                  title: "Create Campaign",
                  description:
                    "Set your funding goal, campaign duration, and share your vision with potential backers.",
                  color: "from-blue-500/20 to-blue-500/5",
                  delay: 0,
                },
                {
                  icon: <Users className="w-8 h-8 text-purple-500" />,
                  title: "Receive Pledges",
                  description: "Backers can pledge funds directly to your campaign using cryptocurrency.",
                  color: "from-purple-500/20 to-purple-500/5",
                  delay: 0.1,
                },
                {
                  icon: <Sparkles className="w-8 h-8 text-cyan-500" />,
                  title: "Manage Funds",
                  description: "Once your goal is reached, withdraw funds to bring your project to life.",
                  color: "from-cyan-500/20 to-cyan-500/5",
                  delay: 0.2,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: step.delay }}
                  className="relative group"
                  onMouseEnter={() => handleCursorEnter("card")}
                  onMouseLeave={handleCursorLeave}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-2xl transform group-hover:-translate-y-1 transition-transform duration-300" />
                  <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl overflow-hidden h-full">
                    {/* Gradient background */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t ${step.color} opacity-20`}
                    />

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
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <GlowingButton
                href="/dashboard"
                onMouseEnter={() => handleCursorEnter("button", "Start")}
                onMouseLeave={handleCursorLeave}
              >
                Start Your Project
              </GlowingButton>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section
          ref={statsRef}
          className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-900 to-black"
          id="stats"
        >
          <div className="absolute inset-0 bg-[url('/grid-pattern.png')] bg-repeat opacity-5" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-blue-500" />,
                  value: "$12.5M+",
                  label: "Total Funded",
                  description: "Across all projects",
                  delay: 0,
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-500" />,
                  value: "25,000+",
                  label: "Active Users",
                  description: "Growing community",
                  delay: 0.1,
                },
                {
                  icon: <Globe className="w-6 h-6 text-cyan-500" />,
                  value: "120+",
                  label: "Countries",
                  description: "Global reach",
                  delay: 0.2,
                },
                {
                  icon: <Shield className="w-6 h-6 text-green-500" />,
                  value: "100%",
                  label: "Secure",
                  description: "Blockchain protected",
                  delay: 0.3,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: stat.delay }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                  onMouseEnter={() => handleCursorEnter("card")}
                  onMouseLeave={handleCursorLeave}
                >
                  <div className="mb-4 p-3 rounded-full bg-white/10">{stat.icon}</div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-16 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 p-8"
            >
              <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-400" />
                    DeFi Yield Integration
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Earn interest on idle funds while waiting for milestones to be completed. Our platform integrates
                    with leading DeFi protocols to maximize your returns.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <div className="font-medium">Automatic Yield Generation</div>
                        <div className="text-sm text-gray-500">Funds automatically earn yield while in escrow</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-medium">Risk-Managed Strategies</div>
                        <div className="text-sm text-gray-500">Only audited, secure protocols are used</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/2 bg-black/30 rounded-xl border border-white/10 p-6">
                  <h4 className="text-lg font-bold text-white mb-4">Current Yield Opportunities</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              fill="#627EEA"
                            />
                            <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602" />
                            <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Ethereum</div>
                          <div className="text-xs text-gray-500">via Aave</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">4.2% APY</div>
                        <div className="text-xs text-gray-500">Low Risk</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                              fill="#8247E5"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Polygon</div>
                          <div className="text-xs text-gray-500">via Compound</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">5.8% APY</div>
                        <div className="text-xs text-gray-500">Medium Risk</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                              fill="#F0B90B"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Binance</div>
                          <div className="text-xs text-gray-500">via Venus</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-400">7.5% APY</div>
                        <div className="text-xs text-gray-500">High Risk</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-sm text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-colors border border-white/10">
                    Enable DeFi Yield
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Section */}
        <section ref={communityRef} className="py-24 relative overflow-hidden" id="community">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row items-center justify-between gap-12"
            >
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Community</h2>
                <p className="text-gray-400 mb-8">
                  Connect with like-minded innovators, investors, and creators. Share ideas, get feedback, and
                  collaborate on groundbreaking projects.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    onMouseEnter={() => handleCursorEnter("link", "Discord")}
                    onMouseLeave={handleCursorLeave}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978Z"
                          fill="#5865F2"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Discord</div>
                      <div className="text-xs text-gray-500">25,000+ members</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    onMouseEnter={() => handleCursorEnter("link", "Twitter")}
                    onMouseLeave={handleCursorLeave}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#1DA1F2]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z"
                          stroke="#1DA1F2"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Twitter</div>
                      <div className="text-xs text-gray-500">50K+ followers</div>
                    </div>
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                    onMouseEnter={() => handleCursorEnter("link", "Telegram")}
                    onMouseLeave={handleCursorLeave}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#229ED9]/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M22.0717 5.36913C21.9376 4.85111 21.6684 4.37562 21.2896 3.99684C20.9108 3.61806 20.4353 3.34886 19.9173 3.21479C18.2661 2.7998 12 2.7998 12 2.7998C12 2.7998 5.73384 2.7998 4.08263 3.21479C3.56465 3.34886 3.08917 3.61806 2.71039 3.99684C2.33162 4.37562 2.06241 4.85111 1.92834 5.36913C1.51335 7.02034 1.51335 10.7998 1.51335 10.7998C1.51335 10.7998 1.51335 14.5793 1.92834 16.2305C2.06241 16.7485 2.33162 17.224 2.71039 17.6028C3.08917 17.9816 3.56465 18.2508 4.08263 18.3848C5.73384 18.7998 12 18.7998 12 18.7998C12 18.7998 18.2661 18.7998 19.9173 18.3848C20.4353 18.2508 20.9108 17.9816 21.2896 17.6028C21.6684 17.224 21.9376 16.7485 22.0717 16.2305C22.4867 14.5793 22.4867 10.7998 22.4867 10.7998C22.4867 10.7998 22.4867 7.02034 22.0717 5.36913Z"
                          stroke="#229ED9"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.75 14.0123L15.4999 10.7998L9.75 7.58734V14.0123Z"
                          stroke="#229ED9"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Telegram</div>
                      <div className="text-xs text-gray-500">15K+ members</div>
                    </div>
                  </a>
                </div>

                <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-400" />
                    Governance Voting
                  </h3>
                  <p className="text-gray-400 mb-4">
                    As a community member, you have a voice in platform decisions. Vote on proposals and help shape the
                    future of CrowdChain.
                  </p>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 mb-4">
                    <div>
                      <div className="font-medium mb-1">Active Proposal: Reduce Platform Fee</div>
                      <div className="text-xs text-gray-500">Ends in 3 days</div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-lg bg-green-500/20 text-xs text-green-400 hover:bg-green-500/30 transition-colors">
                        Vote For
                      </button>
                      <button className="px-3 py-1 rounded-lg bg-red-500/20 text-xs text-red-400 hover:bg-red-500/30 transition-colors">
                        Vote Against
                      </button>
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-white/10 text-sm text-white hover:bg-white/20 transition-colors">
                    View All Proposals
                  </button>
                </div>
              </div>

              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-white/10 p-8"
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Learn More</h3>

                  <div className="space-y-6">
                    <div className="group">
                      <a
                        href="#"
                        className="block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                        onMouseEnter={() => handleCursorEnter("link", "Read")}
                        onMouseLeave={handleCursorLeave}
                      >
                        <div className="h-48 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            Web3 Crowdfunding vs. Traditional Platforms
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            Learn about the key differences and advantages of blockchain-based crowdfunding.
                          </p>
                          <div className="flex items-center text-sm text-blue-400">
                            Read Article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </a>
                    </div>

                    <div className="group">
                      <a
                        href="#"
                        className="block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors"
                        onMouseEnter={() => handleCursorEnter("link", "Read")}
                        onMouseLeave={handleCursorLeave}
                      >
                        <div className="h-48 bg-gradient-to-r from-green-500/20 to-blue-500/20 flex items-center justify-center">
                          <svg
                            width="64"
                            height="64"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 16V12"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M12 8H12.01"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                            How to Secure Your Crypto Wallet
                          </h4>
                          <p className="text-gray-400 text-sm mb-4">
                            Essential security practices every crypto user should follow to protect their digital
                            assets.
                          </p>
                          <div className="flex items-center text-sm text-green-400">
                            Read Article
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-12 relative z-10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold mb-4">Platform</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/projects">Browse Projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="/start">Start a Project</FooterLink>
                </li>
                <li>
                  <FooterLink href="/dashboard">Dashboard</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/help">Help Center</FooterLink>
                </li>
                <li>
                  <FooterLink href="/faq">FAQs</FooterLink>
                </li>
                <li>
                  <FooterLink href="/blog">Blog</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/about">About Us</FooterLink>
                </li>
                <li>
                  <FooterLink href="/careers">Careers</FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <FooterLink href="/terms">Terms</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy">Privacy</FooterLink>
                </li>
                <li>
                  <FooterLink href="/cookies">Cookies</FooterLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Rocket className="h-5 w-5 text-blue-500" />
              <span className="text-white font-bold">CrowdChain</span>
            </div>
            <div className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} CrowdChain. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <WalletConnectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={() => setIsModalOpen(false)}
      />
    </div>
  )
}

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium transition-colors ${
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform origin-left transition-transform duration-300 ${
          isActive ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-400 hover:text-white transition-colors">
      {children}
    </Link>
  )
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-black/50 backdrop-blur-sm p-6 rounded-full border border-white/10">
            <Rocket className="w-16 h-16 text-blue-500" />
          </div>
        </div>

        <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-500 text-sm"
        >
          Loading the future of funding...
        </motion.p>
      </div>
    </div>
  )
}

