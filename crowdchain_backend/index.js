const express = require("express");
const cors = require("cors");
const { ethers } = require("ethers");
const fs = require("fs");

// Load environment variables
require("dotenv").config();

const app = express(); // Initialize express once
const PORT = 3001;

app.use(cors()); // Apply CORS middleware
app.use(express.json());

// RPC URL & Private Key
const RPC_URL = "http://127.0.0.1:8545"; // Local Anvil Node
const PRIVATE_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Example private key

// Load ABI
const abi = JSON.parse(fs.readFileSync("CrowdfundingABI.json")).abi;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// Set up provider & wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend API is running!");
});

// Endpoint to Create a Campaign
app.post("/create-campaign", async (req, res) => {
  try {
    const { goal, duration } = req.body;

    if (!goal || !duration) {
      return res.status(400).json({ error: "Missing goal or duration" });
    }

    const tx = await contract.createCampaign(goal, duration);
    await tx.wait();

    res.json({ message: "Campaign created successfully!", txHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to Get Campaign Details
app.get("/campaign/:id", async (req, res) => {
  try {
    const campaignId = req.params.id;
    const campaign = await contract.getCampaign(campaignId);

    res.json({
      creator: campaign[0],
      goal: campaign[1].toString(),
      deadline: campaign[2].toString(),
      pledged: campaign[3].toString(),
      claimed: campaign[4],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Backend API is running on port ${PORT}`);
});
