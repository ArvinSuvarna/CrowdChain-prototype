"use client"

import { useState, useEffect, FormEvent } from "react"
import { Rocket } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useWeb3 } from "@/contexts/web3-context"
import WalletConnectModal from "@/components/wallet-connect-modal"

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [goal, setGoal] = useState("")
  const [duration, setDuration] = useState("")
  const [campaignId, setCampaignId] = useState("")
  const [pledgeAmount, setPledgeAmount] = useState("")
  const { isConnected, connectWallet, disconnectWallet, contract } = useWeb3()
  const router = useRouter()

  const handleConnect = () => {
    if (isConnected) {
      disconnectWallet()
      router.push('/')
      return
    }
    setIsModalOpen(true)
  }

  const handleWalletConnect = async (walletType: string) => {
    try {
      await connectWallet(walletType)
      setIsModalOpen(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b border-gray-800">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Rocket className="size-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" />
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">CrowdChain</span>
        </Link>
        <Button onClick={handleConnect} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
          {isConnected ? "Disconnect" : "Connect Wallet"}
        </Button>
      </header>

      <main className="py-8">
        <div className="max-w-[800px] mx-auto px-4 space-y-6">
          <div className="bg-[#1e1e1e] p-6 rounded-lg">
            <div className="text-center mb-4">
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Provider:{" "}
                <span className={isConnected ? "text-green-500" : "text-red-500"}>
                  {isConnected ? "Connected" : "Not Connected"}
                </span>
              </p>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Signer:{" "}
                <span className={isConnected ? "text-green-500" : "text-red-500"}>
                  {isConnected ? "Connected" : "Not Connected"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-lg">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">Create a Campaign</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Goal (wei):</Label>
                <Input
                  id="goal"
                  type="number"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Enter goal in wei"
                  className="bg-[#333] border-[#333] text-[#e0e0e0] mt-2"
                />
              </div>
              <div>
                <Label htmlFor="duration" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Duration (seconds):</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Enter duration in seconds"
                  className="bg-[#333] border-[#333] text-[#e0e0e0] mt-2"
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full"
                onClick={async () => {
                  try {
                    if (!contract) throw new Error("Contract not initialized")
                    const tx = await contract.createCampaign(goal, duration)
                    console.log("Transaction sent:", tx.hash)
                    alert("Transaction sent! Waiting for confirmation...")
                    const receipt = await tx.wait(1) // Wait for 1 confirmation
                    console.log("Transaction receipt:", receipt)
                    
                    // Look for CampaignCreated event
                    const event = receipt.logs.find(log => {
                      try {
                        const parsedLog = contract.interface.parseLog({
                          topics: log.topics,
                          data: log.data
                        })
                        return parsedLog?.name === "CampaignCreated"
                      } catch {
                        return false
                      }
                    })

                    if (!event) {
                      console.error("Campaign creation event not found in logs:", receipt.logs)
                      throw new Error("Campaign creation event not found")
                    }

                    const parsedEvent = contract.interface.parseLog({
                      topics: event.topics,
                      data: event.data
                    })
                    
                    if (!parsedEvent) {
                      throw new Error("Failed to parse campaign creation event")
                    }
                    
                    const campaignId = parsedEvent.args[0]
                    alert(`Campaign created successfully! Campaign ID: ${campaignId}`)
                    setGoal("")
                    setDuration("")
                    setCampaignId(campaignId.toString())
                  } catch (error) {
                    console.error("Error creating campaign:", error)
                    alert("Failed to create campaign. Please try again.")
                  }
                }}
                disabled={!isConnected || !goal || !duration}
              >
                Create Campaign
              </Button>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-lg">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">Fetch Campaign</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaign-id" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Campaign ID:</Label>
                <Input
                  id="campaign-id"
                  value={campaignId}
                  onChange={(e) => setCampaignId(e.target.value)}
                  placeholder="Enter campaign ID"
                  className="bg-[#333] border-[#333] text-[#e0e0e0] mt-2"
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full"
                onClick={async () => {
                  try {
                    if (!contract) throw new Error("Contract not initialized")
                    if (!campaignId) throw new Error("Please enter a campaign ID")
                    const campaign = await contract.getCampaign(Number(campaignId))
                    const [creator, goal, deadline, pledged, claimed] = campaign
                    const deadlineDate = new Date(Number(deadline) * 1000).toLocaleString()
                    alert(`Campaign Details:\nCreator: ${creator}\nGoal: ${ethers.formatEther(goal)} ETH\nDeadline: ${deadlineDate}\nPledged: ${ethers.formatEther(pledged)} ETH\nClaimed: ${claimed}`)
                    console.log("Campaign data:", campaign)
                  } catch (error) {
                    console.error("Error fetching campaign:", error)
                    alert("Failed to fetch campaign. Please try again.")
                  }
                }}
                disabled={!isConnected || !campaignId}
              >
                Fetch Campaign
              </Button>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-lg">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">Pledge to Campaign</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pledge-amount" className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Pledge Amount (wei):</Label>
                <Input
                  id="pledge-amount"
                  type="number"
                  value={pledgeAmount}
                  onChange={(e) => setPledgeAmount(e.target.value)}
                  placeholder="Enter pledge amount in ETH"
                  className="bg-[#333] border-[#333] text-[#e0e0e0] mt-2"
                  step="0.01"
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white w-full"
                onClick={async () => {
                  try {
                    if (!contract) throw new Error("Contract not initialized")
                    if (!campaignId) throw new Error("Please enter a campaign ID")
                    if (!pledgeAmount) throw new Error("Please enter a pledge amount")
                    const weiAmount = ethers.parseEther(pledgeAmount)
                    const tx = await contract.pledge(campaignId, { value: weiAmount })
                    alert("Transaction sent! Waiting for confirmation...")
                    await tx.wait(1)
                    alert("Pledge successful!")
                    setPledgeAmount("")
                  } catch (error) {
                    console.error("Error pledging to campaign:", error)
                    alert("Failed to pledge to campaign. Please try again.")
                  }
                }}
                disabled={!isConnected || !campaignId || !pledgeAmount}
              >
                Pledge
              </Button>
            </div>
          </div>

          <div className="bg-[#1e1e1e] p-6 rounded-lg">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-4">Manage Campaign</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1"
                onClick={async () => {
                  try {
                    if (!contract) throw new Error("Contract not initialized")
                    if (!campaignId) throw new Error("Please enter a campaign ID")
                    const tx = await contract.withdraw(campaignId)
                    alert("Transaction sent! Waiting for confirmation...")
                    await tx.wait(1)
                    alert("Funds withdrawn successfully!")
                  } catch (error) {
                    console.error("Error withdrawing funds:", error)
                    alert("Failed to withdraw funds. Please try again.")
                  }
                }}
                disabled={!isConnected || !campaignId}
              >
                Withdraw Funds
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-1"
                onClick={async () => {
                  try {
                    if (!contract) throw new Error("Contract not initialized")
                    if (!campaignId) throw new Error("Please enter a campaign ID")
                    const tx = await contract.refund(campaignId)
                    alert("Transaction sent! Waiting for confirmation...")
                    await tx.wait(1)
                    alert("Refund successful!")
                  } catch (error) {
                    console.error("Error requesting refund:", error)
                    alert("Failed to request refund. Please try again.")
                  }
                }}
                disabled={!isConnected || !campaignId}
              >
                Request Refund
              </Button>
            </div>
          </div>
        </div>
      </main>

      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConnect={handleWalletConnect} />
    </div>
  )
}

