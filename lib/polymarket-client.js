// Polymarket API Client for Miyomi
// Documentation: https://docs.polymarket.com

export class PolymarketClient {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'https://clob.polymarket.com'
    this.apiKey = config.apiKey // Optional for read-only
  }

  /**
   * Get all active markets
   * @param {Object} options - Filter options
   * @returns {Promise<Array>} List of markets
   */
  async getMarkets(options = {}) {
    const params = new URLSearchParams({
      active: options.active !== false ? 'true' : 'false',
      closed: options.closed || 'false',
      limit: options.limit || 100,
      offset: options.offset || 0,
      ...options
    })

    try {
      const response = await fetch(`${this.baseUrl}/markets?${params}`)
      if (!response.ok) {
        throw new Error(`Polymarket API error: ${response.statusText}`)
      }
      const data = await response.json()
      // Polymarket returns { data: [...] } format
      return data.data || data || []
    } catch (error) {
      console.error('[Polymarket] Failed to fetch markets:', error)
      return []
    }
  }

  /**
   * Get specific market by ID
   * @param {string} marketId - Market condition ID
   * @returns {Promise<Object>} Market details
   */
  async getMarket(marketId) {
    try {
      const response = await fetch(`${this.baseUrl}/markets/${marketId}`)
      if (!response.ok) {
        throw new Error(`Market not found: ${marketId}`)
      }
      return await response.json()
    } catch (error) {
      console.error('[Polymarket] Failed to fetch market:', error)
      return null
    }
  }

  /**
   * Get order book for a market
   * @param {string} tokenId - Outcome token ID
   * @returns {Promise<Object>} Order book with bids and asks
   */
  async getOrderBook(tokenId) {
    try {
      const response = await fetch(`${this.baseUrl}/book?token_id=${tokenId}`)
      if (!response.ok) {
        throw new Error(`Order book not found: ${tokenId}`)
      }
      const data = await response.json()

      return {
        bids: data.bids || [],
        asks: data.asks || [],
        midpoint: this.calculateMidpoint(data.bids, data.asks),
        spread: this.calculateSpread(data.bids, data.asks)
      }
    } catch (error) {
      console.error('[Polymarket] Failed to fetch order book:', error)
      return { bids: [], asks: [], midpoint: 0.5, spread: 0 }
    }
  }

  /**
   * Get trade history for a market
   * @param {string} marketId - Market ID
   * @param {Object} options - Filter options
   * @returns {Promise<Array>} List of trades
   */
  async getTrades(marketId, options = {}) {
    const params = new URLSearchParams({
      market: marketId,
      limit: options.limit || 100,
      ...options
    })

    try {
      const response = await fetch(`${this.baseUrl}/trades?${params}`)
      if (!response.ok) {
        throw new Error(`Trades not found: ${marketId}`)
      }
      return await response.json()
    } catch (error) {
      console.error('[Polymarket] Failed to fetch trades:', error)
      return []
    }
  }

  /**
   * Search markets by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching markets
   */
  async searchMarkets(query) {
    try {
      const markets = await this.getMarkets({ limit: 500 })

      const searchTerm = query.toLowerCase()
      return markets.filter(market =>
        market.question?.toLowerCase().includes(searchTerm) ||
        market.description?.toLowerCase().includes(searchTerm) ||
        market.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      console.error('[Polymarket] Search failed:', error)
      return []
    }
  }

  /**
   * Find contrarian opportunities
   * Identifies markets with extreme consensus (>75% or <25%)
   * @returns {Promise<Array>} Contrarian opportunities
   */
  async findContrarianOpportunities() {
    try {
      const markets = await this.getMarkets({ active: true })

      const opportunities = []
      for (const market of markets.slice(0, 50)) { // Check top 50 for performance
        // Polymarket markets have multiple outcomes, check binary ones
        if (market.outcomes?.length === 2) {
          const yesPrice = parseFloat(market.outcomes[0]?.price || 0.5)

          // Extreme consensus = contrarian opportunity
          if (yesPrice > 0.75 || yesPrice < 0.25) {
            const orderBook = await this.getOrderBook(market.outcomes[0].token_id)

            opportunities.push({
              platform: 'polymarket',
              marketId: market.condition_id,
              question: market.question,
              description: market.description,
              yesPrice,
              noPrice: 1 - yesPrice,
              consensus: yesPrice > 0.5 ? 'YES' : 'NO',
              contrarian: yesPrice > 0.5 ? 'NO' : 'YES',
              edge: Math.abs(yesPrice - 0.5) * 2, // 0-1 scale
              volume24h: market.volume_24h || 0,
              liquidity: market.liquidity || 0,
              orderBook,
              url: `https://polymarket.com/event/${market.slug}`,
              endsAt: market.end_date_iso
            })
          }
        }
      }

      // Sort by edge (most extreme consensus first)
      return opportunities.sort((a, b) => b.edge - a.edge)
    } catch (error) {
      console.error('[Polymarket] Failed to find contrarian opportunities:', error)
      return []
    }
  }

  /**
   * Get market categories/tags
   * @returns {Promise<Array>} Available categories
   */
  async getCategories() {
    try {
      const markets = await this.getMarkets({ limit: 1000 })
      const categories = new Set()

      markets.forEach(market => {
        if (market.tags) {
          market.tags.forEach(tag => categories.add(tag))
        }
      })

      return Array.from(categories).sort()
    } catch (error) {
      console.error('[Polymarket] Failed to fetch categories:', error)
      return []
    }
  }

  /**
   * Calculate midpoint price from order book
   */
  calculateMidpoint(bids, asks) {
    if (!bids?.length || !asks?.length) return 0.5

    const bestBid = parseFloat(bids[0]?.price || 0)
    const bestAsk = parseFloat(asks[0]?.price || 1)

    return (bestBid + bestAsk) / 2
  }

  /**
   * Calculate spread from order book
   */
  calculateSpread(bids, asks) {
    if (!bids?.length || !asks?.length) return 0

    const bestBid = parseFloat(bids[0]?.price || 0)
    const bestAsk = parseFloat(asks[0]?.price || 1)

    return bestAsk - bestBid
  }

  /**
   * Format market for Miyomi dashboard
   */
  formatMarketForDashboard(market) {
    const yesPrice = parseFloat(market.outcomes?.[0]?.price || 0.5)

    return {
      platform: 'polymarket',
      id: market.condition_id,
      question: market.question,
      description: market.description,
      category: market.tags?.[0] || 'general',
      yesPrice,
      noPrice: 1 - yesPrice,
      volume: market.volume || 0,
      liquidity: market.liquidity || 0,
      traders: market.num_traders || 0,
      endsAt: market.end_date_iso,
      url: `https://polymarket.com/event/${market.slug}`,
      image: market.image || null
    }
  }
}

/**
 * Miyomi-specific Polymarket analysis
 */
export class MiyomiPolymarketAnalyzer {
  constructor(client) {
    this.client = client || new PolymarketClient()
  }

  /**
   * Generate Miyomi's contrarian take on a market
   */
  async generateContrarianTake(market) {
    const yesPrice = parseFloat(market.outcomes?.[0]?.price || 0.5)
    const consensus = yesPrice > 0.5 ? 'YES' : 'NO'
    const contrarian = yesPrice > 0.5 ? 'NO' : 'YES'
    const confidence = Math.abs(yesPrice - 0.5) * 2 // 0-1 scale

    // Miyomi's thesis templates
    const templates = {
      highYes: [
        `Everyone's saying YES at ${(yesPrice * 100).toFixed(0)}%. That's peak delusion. I'm taking NO.`,
        `${(yesPrice * 100).toFixed(0)}% YES? The crowd is adorable but wrong. Loading NO bags.`,
        `When consensus hits ${(yesPrice * 100).toFixed(0)}%, it's time to fade. NO position here.`
      ],
      lowYes: [
        `Only ${(yesPrice * 100).toFixed(0)}% think YES? That's FUD talking. I'm contrarian on the contrarians - taking YES.`,
        `Market is ${((1-yesPrice) * 100).toFixed(0)}% NO. Too bearish. I see upside. YES position.`,
        `${((1-yesPrice) * 100).toFixed(0)}% NO consensus means opportunity. Taking YES here.`
      ]
    }

    const template = yesPrice > 0.75 ?
      templates.highYes[Math.floor(Math.random() * templates.highYes.length)] :
      templates.lowYes[Math.floor(Math.random() * templates.lowYes.length)]

    return {
      market,
      consensus,
      contrarian,
      confidence,
      miyomiPosition: contrarian,
      thesis: template,
      recommendedSize: this.calculatePositionSize(confidence, market.liquidity),
      timing: this.assessTiming(market)
    }
  }

  /**
   * Calculate recommended position size based on conviction and liquidity
   */
  calculatePositionSize(confidence, liquidity) {
    // Miyomi's default sizing: $200-$1000 based on confidence
    const baseSize = 200
    const maxSize = 1000

    // Scale with confidence
    const confidentSize = baseSize + (confidence * (maxSize - baseSize))

    // Cap at 10% of liquidity to avoid slippage
    const liquidityCap = liquidity * 0.1

    return Math.min(confidentSize, liquidityCap, maxSize)
  }

  /**
   * Assess timing for entry
   */
  assessTiming(market) {
    const now = new Date()
    const endsAt = new Date(market.end_date_iso)
    const daysLeft = (endsAt - now) / (1000 * 60 * 60 * 24)

    if (daysLeft < 1) return { timing: 'URGENT', reason: 'Less than 24h left' }
    if (daysLeft < 7) return { timing: 'GOOD', reason: 'One week window' }
    if (daysLeft < 30) return { timing: 'MODERATE', reason: 'Few weeks out' }
    return { timing: 'PATIENT', reason: 'Plenty of time' }
  }

  /**
   * Daily contrarian pick for Miyomi
   */
  async getDailyContrarianPick(category = null) {
    const opportunities = await this.client.findContrarianOpportunities()

    // Filter by category if specified
    const filtered = category ?
      opportunities.filter(o => o.category === category) :
      opportunities

    if (filtered.length === 0) return null

    // Pick the most extreme consensus
    const topPick = filtered[0]

    // Generate Miyomi's take
    return await this.generateContrarianTake(topPick)
  }
}

export default PolymarketClient
