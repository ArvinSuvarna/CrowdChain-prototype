import { Rocket } from "lucide-react"

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-black pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Rocket className="w-16 h-16 text-blue-500" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Empowering Innovation Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Decentralized Funding
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Launch your ideas into reality with our decentralized crowdfunding platform. Secure, transparent, and
            community-driven funding for the next generation of innovators.
          </p>
        </div>
      </div>
    </div>
  )
}

