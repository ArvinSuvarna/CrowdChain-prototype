// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/Crowdfunding.sol";

contract DeployCrowdfunding is Script {
    function run() external {
        vm.startBroadcast();
        // Pass the sender (msg.sender) as the initial owner
        new Crowdfunding(msg.sender);
        vm.stopBroadcast();
    }
}
