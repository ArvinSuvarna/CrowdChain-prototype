"use client"

import { useState, useEffect } from "react"
import { X, ChevronRight, Shield, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
}

export default function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  const [mounted, setMounted] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const [connectingStep, setConnectingStep] = useState(0)
  const [showQRCode, setShowQRCode] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSelectedWallet(null)
        setConnectingStep(0)
        setShowQRCode(false)
      }, 300)
    }
  }, [isOpen])

  if (!mounted || !isOpen) return null

  const handleWalletSelect = async (walletId: string) => {
    try {
      setSelectedWallet(walletId)
      setConnectingStep(1)

      if (walletId === "metamask") {
        if (typeof window !== "undefined" && window.ethereum) {
          try {
            await window.ethereum.request({ method: "eth_requestAccounts" })
            setConnectingStep(2)
            onConnect(walletId)
          } catch (error) {
            console.error("Error connecting to MetaMask:", error)
            setConnectingStep(0)
          }
        } else {
          window.open("https://metamask.io/download/", "_blank")
        }
      } else if (walletId === "walletconnect") {
        setShowQRCode(true)
      } else {
        // For other wallets, maintain existing behavior for now
        setTimeout(() => {
          setConnectingStep(2)
          onConnect(walletId)
        }, 1500)
      }
    } catch (error) {
      console.error("Error in handleWalletSelect:", error)
      setConnectingStep(0)
    }
  }

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      description: "Browser extension",
      image: "/metamask-logo.png",
      popular: true,
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      description: "Multiple wallets",
      image: "/walletconnect-logo.png",
      popular: false,
    },
    {
      id: "trustwallet",
      name: "Trust Wallet",
      description: "Mobile wallet",
      image: "/trustwallet-logo.png",
      popular: false,
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      description: "Web & mobile",
      image: "/coinbase-logo.png",
      popular: false,
    },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 backdrop-blur-md bg-black/70"
          onClick={onClose}
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm mx-2 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_20px_rgba(0,191,255,0.15)]"
        >
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <div className="absolute -inset-[80px] top-[40%] bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb] blur-[40px] animate-floating-light" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">Connect Wallet</h2>
                  <p className="text-xs text-gray-400">Secure connection</p>
                </div>
              </div>
              <button onClick={onClose} className="rounded-full p-1 hover:bg-white/10 transition-colors duration-200">
                <X className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="p-4">
              <AnimatePresence mode="wait">
                {connectingStep === 0 && (
                  <motion.div
                    key="wallet-selection"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-3">
                      <div className="text-xs text-gray-400 mb-3">
                        Choose your wallet to connect securely.
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {wallets.map((wallet) => (
                          <button
                            key={wallet.id}
                            onClick={() => handleWalletSelect(wallet.id)}
                            className="group relative w-full flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <div className="flex items-center gap-3 z-10">
                              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                                <div className="relative w-full h-full">
                                  <Image
                                    src={wallet.image || "/placeholder.svg"}
                                    alt={wallet.name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col items-start">
                                <div className="flex items-center gap-1">
                                  <span className="text-sm text-white font-medium">{wallet.name}</span>
                                  {wallet.popular && (
                                    <span className="text-[10px] py-0.5 px-1.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
                                      POPULAR
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] text-gray-400">{wallet.description}</span>
                              </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {connectingStep === 1 && (
                  <motion.div
                    key="connecting"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-4"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 relative">
                      <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
                      <div className="relative bg-white/10 rounded-full p-3 backdrop-blur-sm">
                        <Image
                          src={wallets.find((w) => w.id === selectedWallet)?.image || "/placeholder.svg"}
                          alt="Wallet"
                          width={36}
                          height={36}
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2">
                      Connecting to {wallets.find((w) => w.id === selectedWallet)?.name}
                    </h3>
                    <p className="text-xs text-gray-400 mb-6">
                      {showQRCode ? "Scan QR code" : "Waiting..."}
                    </p>

                    {showQRCode ? (
                      <div className="bg-white p-3 rounded-lg mx-auto w-36 h-36 mb-4">
                        <div className="w-full h-full bg-[url('/qr-code.png')] bg-contain bg-no-repeat bg-center" />
                      </div>
                    ) : (
                      <div className="flex justify-center mb-4">
                        <div className="w-6 h-6 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}

                    <div className="flex justify-center gap-3">
                      <button
                        onClick={onClose}
                        className="px-4 py-1.5 rounded-lg bg-white/10 text-xs text-white hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                      {showQRCode && (
                        <button
                          onClick={() => {
                            setConnectingStep(2)
                            setTimeout(() => onConnect(selectedWallet || "walletconnect"), 1500)
                          }}
                          className="px-4 py-1.5 rounded-lg bg-blue-500 text-xs text-white hover:bg-blue-600 transition-colors"
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {connectingStep === 2 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
                    >
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 6L9 17L4 12"
                          stroke="#4ADE80"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    <h3 className="text-lg font-bold mb-2">Connected</h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Wallet connected successfully.
                    </p>

                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 mb-4 text-left">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-medium text-white mb-1">Security</h4>
                          <p className="text-[10px] text-gray-400">
                            Never share your seed phrase or private keys.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onConnect(selectedWallet || "metamask")}
                      className="w-full py-2 rounded-lg bg-blue-500 text-xs text-white hover:bg-blue-600 transition-colors"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-3 border-t border-white/10 text-center text-[10px] text-gray-500">
              <p>
                By connecting, you agree to
                <button className="mx-1 text-blue-400 hover:text-blue-300 transition-colors">Terms</button>
                and
                <button className="ml-1 text-blue-400 hover:text-blue-300 transition-colors">Privacy</button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}