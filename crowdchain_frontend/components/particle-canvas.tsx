"use client"

import { useEffect, useRef } from "react"

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Mouse tracking
    let mouseX = 0
    let mouseY = 0
    const mouseRadius = 100

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 3 + 1
        this.density = Math.random() * 30 + 1

        // Use the project's color scheme
        const colors = ["#00bfff", "#5b42f3", "#af40ff"]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fillStyle = this.color
        ctx.fill()
      }

      update() {
        // Calculate distance between mouse and particle
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Move particles away from mouse
        if (distance < mouseRadius) {
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const force = (mouseRadius - distance) / mouseRadius
          const directionX = forceDirectionX * force * this.density * -1
          const directionY = forceDirectionY * force * this.density * -1

          this.x += directionX
          this.y += directionY
        } else {
          // Return to original position
          if (this.x !== this.baseX) {
            const dx = this.baseX - this.x
            this.x += dx / 10
          }
          if (this.y !== this.baseY) {
            const dy = this.baseY - this.y
            this.y += dy / 10
          }
        }
      }
    }

    // Create particles
    const particlesArray: Particle[] = []
    const numberOfParticles = Math.min(150, Math.floor((canvas.width * canvas.height) / 9000))

    const init = () => {
      particlesArray.length = 0

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particlesArray.push(new Particle(x, y))
      }
    }

    init()

    // Connect particles with lines
    function connect() {
      let opacityValue = 1

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            opacityValue = 1 - distance / 120
            ctx.strokeStyle = `rgba(100, 150, 255, ${opacityValue * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connect()
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" style={{ background: "transparent" }} />
}

