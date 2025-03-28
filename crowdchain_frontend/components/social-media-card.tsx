"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Github, Twitter, MessagesSquare, Rocket } from "lucide-react"

export default function SocialMediaCard() {
  return (
    <div className="relative w-[300px] z-10">
      <div className="bg-[#111111] shadow-lg border-2 border-[#111111] rounded-[10px] p-[20px] overflow-hidden">
        {/* Animated gradient background effect */}
        <div
          className="absolute w-[120%] h-[20%] top-[40%] left-[-10%] bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] 
          blur-[20px] animate-floating-light"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-[200px] h-[200px] flex items-center justify-center bg-gradient-to-r from-[#5b42f3] to-[#00ddeb] rounded-full mb-2 animate-floating-img">
            <Rocket className="w-20 h-20 text-white" />
          </div>

          <div className="font-semibold text-sm text-center mt-[-20px] py-[10px] text-[#e8e8e8] animate-flash-text">
            We&apos;re on Social Media
          </div>

          <div className="flex gap-[10px] w-full mt-4">
            <SocialButton
              href="https://github.com/yourusername"
              icon={<Github size={24} />}
              color="from-[#333] to-[#555]"
              hoverColor="from-[#444] to-[#666]"
            />
            <SocialButton
              href="https://twitter.com/"
              icon={<Twitter size={24} />}
              color="from-[#1DA1F2] to-[#0d8bd9]"
              hoverColor="from-[#1a91da] to-[#0a7bc3]"
            />
            <SocialButton
              href="https://discord.com/"
              icon={<MessagesSquare size={24} />}
              color="from-[#5865F2] to-[#4752c4]"
              hoverColor="from-[#4752c4] to-[#3b45a0]"
            />
          </div>

          <div className="mt-4 text-xs text-center text-[#e8e8e8] opacity-80">
            Stay tuned! More features coming soon...
          </div>
        </div>
      </div>
    </div>
  )
}

interface SocialButtonProps {
  href: string
  icon: React.ReactNode
  color: string
  hoverColor: string
}

function SocialButton({ href, icon, color, hoverColor }: SocialButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className="flex-grow relative group"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
        flex items-center justify-center p-3 rounded-lg
        bg-gradient-to-br ${color}
        transition-all duration-300 transform
        group-hover:bg-gradient-to-br ${hoverColor}
        group-hover:scale-110 group-hover:shadow-lg
      `}
      >
        <div className="text-white">{icon}</div>
      </div>

      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className={`
          absolute inset-0 -z-10 rounded-lg
          bg-gradient-to-br ${color}
          blur-md opacity-70 scale-110
          animate-pulse
        `}
        ></div>
      )}
    </Link>
  )
}

