// Soup.xyz Protocol Client for Miyomi Markets
// Based on Soup.xyz documentation: https://docs.soup.xyz

import { createPublicClient, createWalletClient, http, parseAbi } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// Soup.xyz contract addresses (Base mainnet)
const SOUP_CONTRACTS = {
  SCTF: '0x...', // Soup Conditional Token Framework
  DEX: '0x...',  // Soup DEX
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' // Base USDC
}

// Soup.xyz contract addresses (Base Sepolia testnet)
const SOUP_TESTNET_CONTRACTS = {
  SCTF: '0x...', // TODO: Get from Soup docs
  DEX: '0x...',
  USDC: '0x...'
}

// Simplified ABIs based on Soup docs
const SCTF_ABI = parseAbi([
  'function prepareCondition(address collateral, address oracle, bytes32 groupID, bytes calldata description, string[2] calldata outcomes) external returns (bytes32 conditionID)',
  'function resolveCondition(bytes32 conditionID, int8 result) external',
  'function split(bytes32 conditionID, uint256 amount) external',
  'function merge(bytes32 conditionID, uint256 amount) external',
  'function redeem(bytes32 conditionID, uint8 indexToRedeem, uint256 amount) external'
])

const DEX_ABI = parseAbi([
  'function placeOrder(tuple(bytes32 id, address maker, bytes32 conditionId, uint8 outcome, uint256 orderType, uint256 price, uint256 amount, uint256 remainingAmount, uint256 nonce, uint256 expiry) order) external returns (bytes32 orderId)',
  'function cancelOrder(bytes32 orderId) external',
  'function fillOrders(tuple(bytes32 id, address maker, bytes32 conditionId, uint8 outcome, uint256 orderType, uint256 price, uint256 amount, uint256 remainingAmount, uint256 nonce, uint256 expiry)[] orders, uint256 fillAmount, uint256 feeRate, bool allOrNothing, bool broadcastRemainder) external returns (uint256 totalFilled)'
])

const ERC20_ABI = parseAbi([
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'function balanceOf(address account) external view returns (uint256)'
])

/**
 * Soup.xyz Indexer Client
 * Fetches data from the public indexer API at i.soup.xyz
 */
export class SoupIndexerClient {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'https://i.soup.xyz'
    this.wsUrl = config.wsUrl || 'wss://i.soup.xyz/ws'
  }

  /**
   * Get all conditions (markets)
   */
  async getConditions(params = {}) {
    const queryParams = new URLSearchParams(params)
    const response = await fetch(`${this.baseUrl}/conditions?${queryParams}`)
    return await response.json()
  }

  /**
   * Get specific condition details
   */
  async getCondition(conditionId) {
    const response = await fetch(`${this.baseUrl}/conditions/${conditionId}`)
    return await response.json()
  }

  /**
   * Get order book for a condition
   */
  async getOrderBook(conditionId) {
    const response = await fetch(`${this.baseUrl}/orderbook/${conditionId}`)
    return await response.json()
  }

  /**
   * Get user's token balances
   */
  async getTokenBalances(userAddress) {
    const response = await fetch(`${this.baseUrl}/token-balances?userAddress=${userAddress}`)
    return await response.json()
  }

  /**
   * Get trades for a user or condition
   */
  async getTrades(params = {}) {
    const queryParams = new URLSearchParams(params)
    const response = await fetch(`${this.baseUrl}/trades?${queryParams}`)
    return await response.json()
  }

  /**
   * Subscribe to real-time order book updates via WebSocket
   */
  subscribeToOrderBook(conditionId, callback) {
    const ws = new WebSocket(this.wsUrl)

    ws.onopen = () => {
      ws.send(JSON.stringify({
        action: 'subscribe',
        data: {
          channel: 'order-book',
          params: { conditionId }
        }
      }))
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      if (message.channel === 'order-book') {
        callback(message.data)
      }
    }

    // Keep-alive ping every 30 seconds
    const pingInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ action: 'ping' }))
      }
    }, 30000)

    ws.onclose = () => {
      clearInterval(pingInterval)
    }

    return ws
  }
}

/**
 * Soup.xyz Protocol Client
 * Interacts with Soup smart contracts on Base
 */
export class SoupProtocolClient {
  constructor(config = {}) {
    this.network = config.network || 'mainnet'
    this.contracts = this.network === 'testnet' ? SOUP_TESTNET_CONTRACTS : SOUP_CONTRACTS

    // Public client for reading
    this.publicClient = createPublicClient({
      chain: this.network === 'testnet' ? baseSepolia : base,
      transport: http()
    })

    // Wallet client for writing (optional, set later)
    this.walletClient = null
    if (config.privateKey) {
      this.setWallet(config.privateKey)
    }
  }

  /**
   * Set wallet for signing transactions
   */
  setWallet(privateKey) {
    const account = privateKeyToAccount(privateKey)
    this.walletClient = createWalletClient({
      account,
      chain: this.network === 'testnet' ? baseSepolia : base,
      transport: http()
    })
  }

  /**
   * Prepare a new condition (create market)
   */
  async prepareCondition({
    collateral = this.contracts.USDC,
    oracle,
    groupID = '0x0000000000000000000000000000000000000000000000000000000000000000',
    question,
    description,
    outcomes = ['YES', 'NO']
  }) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured. Call setWallet() first.')
    }

    // Encode description as bytes
    const descriptionBytes = Buffer.from(JSON.stringify({
      question,
      description,
      creator: 'miyomi',
      timestamp: Date.now()
    })).toString('hex')

    const hash = await this.walletClient.writeContract({
      address: this.contracts.SCTF,
      abi: SCTF_ABI,
      functionName: 'prepareCondition',
      args: [collateral, oracle, groupID, `0x${descriptionBytes}`, outcomes]
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })

    // Extract conditionId from logs
    // In production, parse the event logs properly
    return {
      conditionId: hash, // Simplified - should extract from logs
      transactionHash: hash,
      receipt
    }
  }

  /**
   * Resolve a condition (oracle only)
   */
  async resolveCondition(conditionId, outcome) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured. Call setWallet() first.')
    }

    // Convert outcome to result code
    // 0 = first outcome wins (YES)
    // 1 = second outcome wins (NO)
    // 2 = 50/50 split (invalid)
    const resultCode = outcome === 'YES' ? 0 : outcome === 'NO' ? 1 : 2

    const hash = await this.walletClient.writeContract({
      address: this.contracts.SCTF,
      abi: SCTF_ABI,
      functionName: 'resolveCondition',
      args: [conditionId, resultCode]
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
    return { transactionHash: hash, receipt }
  }

  /**
   * Split collateral into outcome tokens
   */
  async split(conditionId, amount) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured. Call setWallet() first.')
    }

    // First ensure USDC approval
    await this.ensureApproval(this.contracts.USDC, this.contracts.SCTF, amount)

    const hash = await this.walletClient.writeContract({
      address: this.contracts.SCTF,
      abi: SCTF_ABI,
      functionName: 'split',
      args: [conditionId, amount]
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
    return { transactionHash: hash, receipt }
  }

  /**
   * Merge outcome tokens back to collateral
   */
  async merge(conditionId, amount) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured. Call setWallet() first.')
    }

    const hash = await this.walletClient.writeContract({
      address: this.contracts.SCTF,
      abi: SCTF_ABI,
      functionName: 'merge',
      args: [conditionId, amount]
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
    return { transactionHash: hash, receipt }
  }

  /**
   * Place an order on the DEX
   */
  async placeOrder({
    conditionId,
    outcome, // 0 = YES, 1 = NO
    orderType, // 0 = Bid, 1 = Ask
    price, // Price in USDC (e.g., 0.45 for 45 cents)
    amount // Number of shares
  }) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured. Call setWallet() first.')
    }

    // Convert price to fixed-point (assume 6 decimals for USDC)
    const priceScaled = BigInt(Math.floor(price * 1e6))
    const amountScaled = BigInt(Math.floor(amount * 1e6))

    const order = {
      id: `0x${Math.random().toString(16).slice(2).padStart(64, '0')}`,
      maker: this.walletClient.account.address,
      conditionId,
      outcome: BigInt(outcome),
      orderType: BigInt(orderType),
      price: priceScaled,
      amount: amountScaled,
      remainingAmount: amountScaled,
      nonce: BigInt(Date.now()),
      expiry: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7) // 7 days
    }

    const hash = await this.walletClient.writeContract({
      address: this.contracts.DEX,
      abi: DEX_ABI,
      functionName: 'placeOrder',
      args: [order]
    })

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash })
    return { orderId: order.id, transactionHash: hash, receipt }
  }

  /**
   * Ensure ERC20 approval for spending
   */
  async ensureApproval(tokenAddress, spenderAddress, amount) {
    if (!this.walletClient) {
      throw new Error('Wallet not configured')
    }

    // Check current allowance
    const allowance = await this.publicClient.readContract({
      address: tokenAddress,
      abi: ERC20_ABI,
      functionName: 'allowance',
      args: [this.walletClient.account.address, spenderAddress]
    })

    // If allowance insufficient, approve
    if (allowance < amount) {
      const hash = await this.walletClient.writeContract({
        address: tokenAddress,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [spenderAddress, BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')] // Max approval
      })

      await this.publicClient.waitForTransactionReceipt({ hash })
      return hash
    }

    return null // No approval needed
  }
}

/**
 * Miyomi Market Manager
 * High-level interface for creating and managing Miyomi markets
 */
export class MiyomiMarketManager {
  constructor(config = {}) {
    this.indexer = new SoupIndexerClient(config.indexer)
    this.protocol = new SoupProtocolClient(config.protocol)
    this.oracleAddress = config.oracleAddress
  }

  /**
   * Create a new Miyomi market
   */
  async createMarket({
    question,
    description,
    category,
    resolutionDate,
    resolutionCriteria,
    initialLiquidity = 1000 // USDC
  }) {
    // 1. Prepare condition on Soup
    const { conditionId, transactionHash } = await this.protocol.prepareCondition({
      oracle: this.oracleAddress,
      question,
      description: JSON.stringify({
        description,
        category,
        resolutionDate,
        resolutionCriteria
      })
    })

    console.log(`Market created: ${conditionId}`)
    console.log(`Transaction: ${transactionHash}`)

    // 2. Seed initial liquidity
    if (initialLiquidity > 0) {
      await this.seedLiquidity(conditionId, initialLiquidity)
    }

    return {
      conditionId,
      question,
      transactionHash
    }
  }

  /**
   * Seed liquidity for a market
   */
  async seedLiquidity(conditionId, amount) {
    // Convert USDC to outcome tokens
    const amountScaled = BigInt(Math.floor(amount * 1e6))
    await this.protocol.split(conditionId, amountScaled)

    console.log(`Split ${amount} USDC into outcome tokens`)

    // Place orders on both sides
    // YES @ 0.45, NO @ 0.55 (10% spread)
    await this.protocol.placeOrder({
      conditionId,
      outcome: 0, // YES
      orderType: 1, // Ask
      price: 0.45,
      amount: amount / 2
    })

    await this.protocol.placeOrder({
      conditionId,
      outcome: 1, // NO
      orderType: 1, // Ask
      price: 0.55,
      amount: amount / 2
    })

    console.log(`Seeded liquidity: YES @ 0.45, NO @ 0.55`)
  }

  /**
   * Resolve a market
   */
  async resolveMarket(conditionId, outcome, evidence) {
    const { transactionHash } = await this.protocol.resolveCondition(conditionId, outcome)

    console.log(`Market resolved: ${outcome}`)
    console.log(`Transaction: ${transactionHash}`)
    console.log(`Evidence: ${evidence}`)

    return { transactionHash, outcome, evidence }
  }

  /**
   * Get contrarian opportunities
   * Returns markets where consensus is extreme (>75% or <25%)
   */
  async findContrarianOpportunities() {
    const conditions = await this.indexer.getConditions()

    const opportunities = []
    for (const condition of conditions.data || []) {
      const orderBook = await this.indexer.getOrderBook(condition.id)

      if (orderBook.data) {
        const { bids, asks } = orderBook.data
        const midpoint = this.calculateMidpoint(bids, asks)

        // Contrarian opportunity if consensus > 75% or < 25%
        if (midpoint > 0.75 || midpoint < 0.25) {
          opportunities.push({
            ...condition,
            currentPrice: midpoint,
            edge: midpoint > 0.75 ? 'FADE_YES' : 'FADE_NO',
            recommendedPosition: midpoint > 0.75 ? 'NO' : 'YES'
          })
        }
      }
    }

    return opportunities
  }

  /**
   * Calculate order book midpoint
   */
  calculateMidpoint(bids, asks) {
    if (!bids?.length || !asks?.length) return 0.5

    const bestBid = parseFloat(bids[0].price)
    const bestAsk = parseFloat(asks[0].price)

    return (bestBid + bestAsk) / 2
  }
}

export default MiyomiMarketManager
