# Decentralized Crowdfunding Platform

A robust Ethereum-based crowdfunding platform leveraging smart contracts for transparent, secure, and decentralized fundraising campaigns.

## Architecture Overview

The platform consists of three main components:
- Smart Contracts (Solidity)
- Backend Service (Node.js)
- Frontend Application (Next.js)

## Technical Stack

### Smart Contract Layer
- Solidity ^0.8.19
- OpenZeppelin Contracts
- Foundry Framework (Testing & Deployment)

### Backend Infrastructure
- Node.js
- Web3.js
- Express.js

### Frontend Application
- Next.js 13+
- TypeScript
- TailwindCSS
- Web3 Integration

## Development Environment Setup

### Prerequisites

```bash
# Required tools and versions
Node.js >= 18.0.0
Foundry (Latest Version)
MetaMask or Compatible Web3 Wallet
pnpm (Recommended) or npm
```

### Dependencies Installation

#### Smart Contracts (Foundry)
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Install smart contract dependencies
forge install OpenZeppelin/openzeppelin-contracts
```

#### Backend Service
```bash
cd crowdfunding-backend
pnpm install  # Installs: cors@2.8.5, dotenv@16.4.7, ethers@6.13.5, express@4.21.2
```

#### Frontend Application
```bash
cd new_frontend_v0
pnpm install  # Installs Next.js, React, TailwindCSS, and UI components
```

### Local Development

1. Clone and Setup Project
```bash
git clone <repository-url>
cd <project-directory>
```

2. Configure Environment
```bash
# Create .env files for each component

# Backend (.env in crowdfunding-backend/)
RPC_URL=<your-rpc-url>  # e.g. http://127.0.0.1:8545 for local development
PRIVATE_KEY=<your-private-key>
CONTRACT_ADDRESS=<deployed-contract-address>
PORT=3001  # Backend server port

# Frontend (.env in new_frontend_v0/)
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_CONTRACT_ADDRESS=<deployed-contract-address>
```

3. Start Development Environment
```bash
# Terminal 1: Start local blockchain
anvil --block-time 1

# Terminal 2: Start backend server
cd crowdfunding-backend
pnpm install
node index.js

# Terminal 3: Start frontend development server
cd new_frontend_v0
pnpm install
pnpm dev
```

4. Verify Setup
- Local blockchain should be running at http://127.0.0.1:8545
- Backend server should be running at http://localhost:3001
- Frontend application should be running at http://localhost:3000

## Smart Contract Deployment

### Local Deployment
```bash
forge script script/Deploy.s.sol:DeployCrowdfunding --rpc-url http://127.0.0.1:8545 --broadcast
```

### Contract Verification
```bash
forge verify-contract <contract-address> src/Crowdfunding.sol:Crowdfunding --chain-id <chain-id>
```

## Contract Interaction Guide

### Campaign Creation
```solidity
// Example campaign creation with 1 ETH goal and 1-hour duration
function createCampaign(uint256 goal, uint256 duration) public returns (uint256)
```

### Pledge Management
```solidity
// Pledge to a campaign
function pledge(uint256 campaignId) public payable

// Unpledge from a campaign
function unpledge(uint256 campaignId, uint256 amount) public
```

## Testing Strategy

### Testing with Anvil
When running local tests using Anvil, use the default development accounts provided by the client:
```bash
# Start local test network with deterministic development accounts
anvil --block-time 1
```

Use the pre-funded test accounts and their private keys displayed in Anvil's startup output. These credentials should **only** be used in development environments.

### Unit Tests
```bash
forge test
```

### Integration Tests
```bash
forge test --match-contract IntegrationTest -vvv
```

### Security Considerations
- 🔒 Never use Anvil-generated private keys in production environments
- 🔑 Store test credentials in environment variables rather than code
- 🛡️ Always reset test accounts between testing sessions
- ⚠️ Ensure test networks are properly isolated from mainnet

## Security Considerations

- Reentrancy Protection
- Integer Overflow Prevention
- Access Control Implementation
- Gas Optimization

## Advanced Features

- Multi-signature Campaign Creation
- Token-based Pledging Support
- Campaign Milestone Tracking
- Automated Refund Mechanism

## Troubleshooting

### Common Issues

1. Dependency Installation Issues
   - Clear npm/pnpm cache: `pnpm store prune` or `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && pnpm install`
   - Check Node.js version: `node --version` (should be >= 18.0.0)
   - For Foundry issues: Run `foundryup` to update to latest version

2. Environment Setup Problems
   - Verify all .env files are properly configured
   - Ensure correct RPC URL format in backend .env
   - Check if ports 3000 and 3001 are available
   - Confirm MetaMask is connected to correct network

3. Transaction Failures
   - Verify sufficient gas
   - Check campaign status
   - Confirm pledge amounts

4. Contract Deployment Issues
   - Validate network configuration
   - Check compiler version
   - Verify contract dependencies

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
