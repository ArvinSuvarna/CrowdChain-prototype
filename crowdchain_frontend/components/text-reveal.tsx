"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TextRevealProps {
  text: string
  className?: string
  highlightClass?: string
  highlightWords?: string[]
}

export function TextReveal({ text, className, highlightClass, highlightWords = [] }: TextRevealProps) {
  const [words, setWords] = useState<{ text: string; highlight: boolean }[]>([])

  useEffect(() => {
    const textWords = text.split(" ")
    const processedWords = textWords.map((word) => ({
      text: word,
      highlight: highlightWords.some((hw) => word.includes(hw)),
    }))

    setWords(processedWords)
  }, [text, highlightWords])

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.05 + 0.1 }}
        >
          <span className={word.highlight ? highlightClass : ""}>{word.text}</span>
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h1>
  )
}

