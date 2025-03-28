"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { ethers } from "ethers"

type Web3ContextType = {
  provider: ethers.BrowserProvider | null
  signer: ethers.Signer | null
  contract: ethers.Contract | null
  isConnected: boolean
  connectWallet: (walletType: string) => Promise<void>
  disconnectWallet: () => void
}

const Web3Context = createContext<Web3ContextType | null>(null)

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const contractAbi = [
  "function createCampaign(uint256 _goal, uint256 _duration) public",
  "function getCampaign(uint256 _campaignId) view returns (address, uint256, uint256, uint256, bool)",
  "function pledge(uint256 _campaignId) public payable",
  "function withdraw(uint256 _campaignId) public",
  "function refund(uint256 _campaignId) public",
  "event CampaignCreated(uint256 campaignId, address indexed creator, uint256 goal, uint256 deadline)",
  "event Pledged(uint256 indexed campaignId, address indexed backer, uint256 amount)",
  "event Withdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount)",
  "event Refunded(uint256 indexed campaignId, address indexed backer, uint256 amount)"
]

export function Web3Provider({ children }: { children: ReactNode }) {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = async (walletType: string) => {
    try {
      if (typeof window !== "undefined" && window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum)
        const userSigner = await browserProvider.getSigner()
        const crowdfundingContract = new ethers.Contract(contractAddress, contractAbi, userSigner)

        setProvider(browserProvider)
        setSigner(userSigner)
        setContract(crowdfundingContract)
        setIsConnected(true)
      } else {
        throw new Error("Please install MetaMask or another Web3 wallet")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnectWallet = () => {
    setProvider(null)
    setSigner(null)
    setContract(null)
    setIsConnected(false)
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts.length > 0) {
            await connectWallet("MetaMask")
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()

    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          connectWallet("MetaMask")
        }
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {})
        window.ethereum.removeListener("chainChanged", () => {})
      }
    }
  }, [])

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        contract,
        isConnected,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider")
  }
  return context
}