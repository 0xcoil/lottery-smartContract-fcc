const { network } = require("hardhat")


const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium so it costs 0.25 per requests.
const GAS_PRICE_LINK = 1e9 // link per gas. Calculated value based on the gas price of the chain.  
module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (chainId === 31337) {
        log("Local network detected! Deploying mocks...")
        // deploy a mock VRF coordinator...
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
    }
}

module.exports.tags = ["all", "mocks"]