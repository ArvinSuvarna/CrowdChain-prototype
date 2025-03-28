// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract Crowdfunding is ReentrancyGuard, Ownable {
    struct Campaign {
        address creator;
        uint256 goal;
        uint256 deadline;
        uint256 pledged;
        bool claimed;
    }

    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => mapping(address => uint256)) public pledges;

    event CampaignCreated(uint256 campaignId, address indexed creator, uint256 goal, uint256 deadline);
    event Pledged(uint256 indexed campaignId, address indexed backer, uint256 amount);
    event Withdrawn(uint256 indexed campaignId, address indexed creator, uint256 amount);
    event Refunded(uint256 indexed campaignId, address indexed backer, uint256 amount);

    // Constructor that accepts an initial owner address.
    constructor(address initialOwner) Ownable(initialOwner) {}

    function createCampaign(uint256 _goal, uint256 _duration) external {
        require(_goal > 0, "Goal must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");

        campaignCount++;
        uint256 deadline = block.timestamp + _duration;

        campaigns[campaignCount] = Campaign({
            creator: msg.sender,
            goal: _goal,
            deadline: deadline,
            pledged: 0,
            claimed: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _goal, deadline);
    }

    function pledge(uint256 _campaignId) external payable nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Must send ETH");

        campaign.pledged += msg.value;
        pledges[_campaignId][msg.sender] += msg.value;

        emit Pledged(_campaignId, msg.sender, msg.value);
    }

    function withdraw(uint256 _campaignId) external nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Not the creator");
        require(block.timestamp >= campaign.deadline, "Campaign is still running");
        require(campaign.pledged >= campaign.goal, "Goal not met");
        require(!campaign.claimed, "Already claimed");

        campaign.claimed = true;
        payable(msg.sender).transfer(campaign.pledged);

        emit Withdrawn(_campaignId, msg.sender, campaign.pledged);
    }

    function refund(uint256 _campaignId) external nonReentrant {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign is still running");
        require(campaign.pledged < campaign.goal, "Goal met, no refunds");

        uint256 amount = pledges[_campaignId][msg.sender];
        require(amount > 0, "No funds to refund");

        pledges[_campaignId][msg.sender] = 0;
        payable(msg.sender).transfer(amount);

        emit Refunded(_campaignId, msg.sender, amount);
    }

    function getCampaign(uint256 _campaignId)
        external
        view
        returns (address, uint256, uint256, uint256, bool)
    {
        require(_campaignId > 0 && _campaignId <= campaignCount, "Campaign does not exist");
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.goal,
            campaign.deadline,
            campaign.pledged,
            campaign.claimed
        );
    }
}
