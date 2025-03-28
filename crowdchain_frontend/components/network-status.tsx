"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Info, CheckCircle2 } from "lucide-react"

export function NetworkStatus({ network }: { network: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPolygon, setIsPolygon] = useState(true)
  const [gasPrice, setGasPrice] = useState("32")
  const [blockHeight, setBlockHeight] = useState("42,156,789")

  useEffect(() => {
    setIsPolygon(network.toLowerCase().includes("polygon"))

    // Simulate live data updates
    const interval = setInterval(() => {
      setGasPrice(Math.floor(Math.random() * 20 + 25).toString())
      setBlockHeight((Number.parseInt(blockHeight.replace(/,/g, "")) + Math.floor(Math.random() * 10)).toLocaleString())
    }, 5000)

    return () => clearInterval(interval)
  }, [network, blockHeight])

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
          className={`w-2 h-2 rounded-full ${isPolygon ? "bg-green-500" : "bg-amber-500"}`}
        />
        <span className="text-sm font-medium">{network}</span>
        <Info className="h-3.5 w-3.5 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-64 rounded-xl bg-[#111] border border-white/10 shadow-xl z-50 p-4"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="p-1.5 rounded-full bg-green-500/20 mt-0.5">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Network Status: Offline</h4>
                <p className="text-xs text-gray-400 mt-1">Connected to {network}. All systems operational.</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Gas Price</span>
                <motion.span
                  key={gasPrice}
                  initial={{ color: "#3B82F6" }}
                  animate={{ color: "#9CA3AF" }}
                  transition={{ duration: 1 }}
                  className="font-medium"
                >
                  {gasPrice} Gwei
                </motion.span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Block Height</span>
                <motion.span
                  key={blockHeight}
                  initial={{ color: "#3B82F6" }}
                  animate={{ color: "#9CA3AF" }}
                  transition={{ duration: 1 }}
                  className="font-medium"
                >
                  {blockHeight}
                </motion.span>
              </div>
              <div className="flex justify-between p-2 bg-white/5 rounded-lg">
                <span className="text-gray-400">Smart Contract</span>
                <span className="font-medium text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>

            <button
              className="w-full mt-3 py-2 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

