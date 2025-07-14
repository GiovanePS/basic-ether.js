require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
];

// Setup contract
const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

// Define reciever
const RECEIVER = "0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c" // Your account address 2

async function main() {
    const privateKey = await promptForKey()

    // Setup wallet
    const wallet = new ethers.Wallet(privateKey, provider)

    // Get ERC20 balances
    const senderBalanceBefore = await contract.balanceOf(wallet.address)
    const recieverBalanceBefore = await contract.balanceOf(RECEIVER)

    // Log ERC20 balances
    console.log(`\nReading from ${ERC20_ADDRESS}\n`)
    console.log(`Sender balance before: ${senderBalanceBefore}\n`)
    console.log(`Reciever balance before: ${recieverBalanceBefore}\n`)

    // Setup amount to transfer
    const decimals = await contract.decimals()
    const AMOUNT = ethers.parseUnits("1", decimals) // 1 USDC (USDC has 6 decimals)

    // Create transaction
    const tx = await contract.connect(wallet).transfer(RECEIVER, AMOUNT) // This function must be called with a signer

    // Wait transaction
    await tx.wait()

    // Log transaction
    console.log(transaction)

    // Get ERC20 balances
    const senderBalanceAfter = await contract.balanceOf(wallet.address)
    const recieverBalanceAfter = await contract.balanceOf(RECEIVER)

    console.log(`\nBalance of sender: ${senderBalanceAfter}`)
    console.log(`Balance of reciever: ${recieverBalanceAfter}\n`)
}

main()
