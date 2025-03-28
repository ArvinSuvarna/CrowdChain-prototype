"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, Clock, Upload, ExternalLink } from "lucide-react"

type MilestoneStatus = "completed" | "current" | "upcoming"

interface Milestone {
  title: string
  status: MilestoneStatus
  date: string
  proof: string
}

interface MilestoneTrackerProps {
  projectName: string
  milestones: Milestone[]
}

export function MilestoneTracker({ projectName, milestones }: MilestoneTrackerProps) {
  const [expandedMilestone, setExpandedMilestone] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-3.5 top-5 bottom-0 w-0.5 bg-white/10" />

        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex items-start gap-3 pb-4">
              <div className="flex-shrink-0 mt-1">
                {milestone.status === "completed" ? (
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </motion.div>
                ) : milestone.status === "current" ? (
                  <motion.div
                    animate={{
                      boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0)"],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                    className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center"
                  >
                    <Clock className="h-5 w-5 text-blue-400" />
                  </motion.div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                    <Circle className="h-5 w-5 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <button
                  onClick={() => setExpandedMilestone(expandedMilestone === index ? null : index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div>
                    <div className="font-medium">{milestone.title}</div>
                    <div className="text-xs text-gray-500">{milestone.date}</div>
                  </div>

                  <div>
                    {milestone.status === "completed" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Completed</span>
                    )}
                    {milestone.status === "current" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">In Progress</span>
                    )}
                    {milestone.status === "upcoming" && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-500/20 text-gray-400">Upcoming</span>
                    )}
                  </div>
                </button>

                {milestone.status === "current" && (
                  <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "45%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="bg-blue-500 h-1.5 rounded-full"
                    />
                  </div>
                )}

                {expandedMilestone === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    {milestone.status === "completed" ? (
                      <div>
                        <div className="text-sm mb-2">Proof of completion submitted to IPFS:</div>
                        <div className="flex items-center gap-2 text-xs bg-black/30 p-2 rounded-md font-mono text-gray-400">
                          <span>{milestone.proof}</span>
                          <button className="p-1 hover:bg-white/10 rounded-md transition-colors">
                            <ExternalLink className="h-3 w-3 text-blue-400" />
                          </button>
                        </div>
                      </div>
                    ) : milestone.status === "current" ? (
                      <div>
                        <div className="text-sm mb-3">Submit proof of completion to proceed:</div>
                        <button className="w-full py-2 rounded-lg bg-blue-500/20 text-sm text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-2">
                          <Upload className="h-4 w-4" />
                          Submit Proof to IPFS
                        </button>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400">
                        This milestone will be unlocked after previous milestones are completed.
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

