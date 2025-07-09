// Require packages
require('dotenv').config()
const { ethers } = require('ethers');

// Setup connection
const apikey = process.env.ALCHEMY_API_KEY
const URL = `https://eth-mainnet.g.alchemy.com/v2/${apikey}`
const provider = new ethers.JsonRpcProvider(URL)

const ADDRESS = "0x03e8482c2bbf8247361b1d6000f138d9f9ca9cd7"

async function main() {
    // Get balance
    const balance = await provider.getBalance(ADDRESS)

    // Log balance
    console.log(`\nETH Balance of ${ADDRESS} --> ${ethers.formatUnits(balance, 18)} ETH\n`)
}

main()
