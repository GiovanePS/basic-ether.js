require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
    'function name() view returns (string)',
    'function balanceOf(address) view returns (uint256)',
]

// Setup contract
const ERC20_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7"
const contract = new ethers.Contract("dai.tokens.ethers.eth", ERC20_ABI, provider)

async function main() {
    // Get contract state
    const name = await contract.name()

    // Log contract state
    console.log(`\nReading from ${ERC20_ADDRESS}\n`)
    console.log(`Name: ${name}`)

    // Get ERC20 balance
    const balance = await contract.balanceOf("0xb23360CCDd9Ed1b15D45E5d3824Bb409C8D7c460")

    // Log ERC20 balance
    console.log(`\nBalance: ${balance}`)
    console.log(`Balance formatted: ${ethers.formatUnits(balance, 18)}`)
}

main()
