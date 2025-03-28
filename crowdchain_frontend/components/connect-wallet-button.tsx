"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useWeb3 } from "@/contexts/web3-context"

export default function ConnectWalletButton() {
  const [isHovered, setIsHovered] = useState(false)
  const { isConnected, connectWallet, disconnectWallet } = useWeb3()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    if (isConnected) {
      disconnectWallet()
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <motion.div
        className="relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleClick}
      >
        <div className="relative z-10 rounded-[9999px] bg-gradient-to-r from-blue-500 to-purple-500 p-[2px] overflow-hidden">
          <div className="rounded-[9999px] bg-black px-8 py-3 text-sm font-medium text-white hover:bg-black/80 transition-colors">
            {isConnected ? "Disconnect" : "Connect Wallet"}
          </div>
        </div>

        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {isModalOpen && !isConnected && (
        <WalletModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConnect={(walletType) => {
            connectWallet(walletType)
            setIsModalOpen(false)
          }}
        />
      )}
    </>
  )
}

