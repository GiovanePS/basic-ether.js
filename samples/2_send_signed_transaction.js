require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

const RECEIVER = "0x6AbaB641a25777DF89B5F3Bdc86DAC11619e9921"

async function main() {
    const privateKey = await promptForKey()

    // Setup wallet
    const wallet = new ethers.Wallet(privateKey, provider)

    // Get balances
    const senderBalanceBefore = await provider.getBalance(wallet.address)
    const receiverBalanceBefore = await provider.getBalance(RECEIVER)

    // Log balances
    console.log(`\nETH Balance of ${wallet.address} --> ${ethers.formatUnits(senderBalanceBefore, 18)} ETH\n`)
    console.log(`ETH Balance of ${RECEIVER} --> ${ethers.formatUnits(receiverBalanceBefore, 18)} ETH\n`)

    // Create transaction
    const transaction = await wallet.sendTransaction({
        to: RECEIVER,
        value: ethers.parseUnits("1", 18),
    })

    // Wait transaction
    const receipt = await transaction.wait()

    console.log(transaction)
    console.log(receipt)

    // Get balances
    const senderBalanceAfter = await provider.getBalance(wallet.address)
    const receiverBalanceAfter = await provider.getBalance(RECEIVER)

    // Log balances
    console.log(`\nETH Balance of ${wallet.address} --> ${ethers.formatUnits(senderBalanceAfter, 18)} ETH\n`)
    console.log(`ETH Balance of ${RECEIVER} --> ${ethers.formatUnits(receiverBalanceAfter, 18)} ETH\n`)
}

main()
