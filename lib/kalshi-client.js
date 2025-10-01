// Kalshi API Client for Miyomi
// Documentation: https://trading-api.readme.io/reference

export class KalshiClient {
  constructor(config = {}) {
    this.baseUrl = config.baseUrl || 'https://trading-api.kalshi.com/trade-api/v2'
    this.apiKey = config.apiKey // Required for trading, optional for market data
    this.email = config.email
    this.password = config.password
    this.token = null
  }

  /**
   * Authenticate with Kalshi (required for trading)
   */
  async authenticate() {
    if (!this.email || !this.password) {
      console.warn('[Kalshi] No credentials provided, read-only mode')
      return false
    }

    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const data = await response.json()
      this.token = data.token
      return true
    } catch (error) {
      console.error('[Kalshi] Authentication failed:', error)
      return false
    }
  }

  /**
   * Get headers for authenticated requests
   */
  getHeaders() {
    const headers = { 'Content-Type': 'application/json' }
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }
    return headers
  }

  /**
   * Get all active markets
   * @param {Object} options - Filter options
   * @returns {Promise<Array>} List of markets
   */
  async getMarkets(options = {}) {
    const params = new URLSearchParams({
      limit: options.limit || 100,
      cursor: options.cursor || '',
      status: options.status || 'open',
      ...options
    })

    try {
      const response = await fetch(`${this.baseUrl}/events?${params}`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Kalshi API error: ${response.statusText}`)
      }

      const data = await response.json()
      return data.events || []
    } catch (error) {
      console.error('[Kalshi] Failed to fetch markets:', error)
      return []
    }
  }

  /**
   * Get specific event/market
   * @param {string} eventTicker - Event ticker (e.g., "FED-23DEC")
   * @returns {Promise<Object>} Event details
   */
  async getEvent(eventTicker) {
    try {
      const response = await fetch(`${this.baseUrl}/events/${eventTicker}`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Event not found: ${eventTicker}`)
      }

      const data = await response.json()
      return data.event
    } catch (error) {
      console.error('[Kalshi] Failed to fetch event:', error)
      return null
    }
  }

  /**
   * Get markets within an event
   * @param {string} eventTicker - Event ticker
   * @returns {Promise<Array>} List of markets
   */
  async getEventMarkets(eventTicker) {
    try {
      const response = await fetch(`${this.baseUrl}/events/${eventTicker}/markets`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Markets not found: ${eventTicker}`)
      }

      const data = await response.json()
      return data.markets || []
    } catch (error) {
      console.error('[Kalshi] Failed to fetch event markets:', error)
      return []
    }
  }

  /**
   * Get order book for a market
   * @param {string} ticker - Market ticker
   * @returns {Promise<Object>} Order book
   */
  async getOrderBook(ticker) {
    try {
      const response = await fetch(`${this.baseUrl}/markets/${ticker}/orderbook`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Order book not found: ${ticker}`)
      }

      const data = await response.json()

      return {
        bids: data.orderbook?.yes || [],
        asks: data.orderbook?.no || [],
        yesPrice: this.calculateMidpoint(data.orderbook?.yes, data.orderbook?.no),
        noPrice: 1 - this.calculateMidpoint(data.orderbook?.yes, data.orderbook?.no)
      }
    } catch (error) {
      console.error('[Kalshi] Failed to fetch order book:', error)
      return { bids: [], asks: [], yesPrice: 0.5, noPrice: 0.5 }
    }
  }

  /**
   * Get trade history for a market
   * @param {string} ticker - Market ticker
   * @returns {Promise<Array>} Trade history
   */
  async getTrades(ticker, options = {}) {
    const params = new URLSearchParams({
      ticker,
      limit: options.limit || 100,
      ...options
    })

    try {
      const response = await fetch(`${this.baseUrl}/markets/trades?${params}`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Trades not found: ${ticker}`)
      }

      const data = await response.json()
      return data.trades || []
    } catch (error) {
      console.error('[Kalshi] Failed to fetch trades:', error)
      return []
    }
  }

  /**
   * Search markets by category or query
   * @param {string} category - Category (e.g., "fed", "cpi", "economics")
   * @returns {Promise<Array>} Matching markets
   */
  async searchByCategory(category) {
    try {
      const params = new URLSearchParams({
        series_ticker: category.toUpperCase(),
        status: 'open',
        limit: 100
      })

      const response = await fetch(`${this.baseUrl}/events?${params}`, {
        headers: this.getHeaders()
      })

      if (!response.ok) {
        throw new Error(`Category search failed: ${category}`)
      }

      const data = await response.json()
      return data.events || []
    } catch (error) {
      console.error('[Kalshi] Category search failed:', error)
      return []
    }
  }

  /**
   * Find contrarian opportunities on Kalshi
   * Economic indicators with extreme consensus
   */
  async findContrarianOpportunities() {
    try {
      // Focus on high-profile economic categories
      const categories = ['FED', 'CPI', 'JOBS', 'GDP', 'INFL']
      const opportunities = []

      for (const category of categories) {
        const events = await this.searchByCategory(category)

        for (const event of events.slice(0, 10)) {
          const markets = await this.getEventMarkets(event.event_ticker)

          for (const market of markets) {
            if (!market.yes_bid || !market.yes_ask) continue

            const yesPrice = (market.yes_bid + market.yes_ask) / 2 / 100 // Convert cents to decimal

            // Extreme consensus = contrarian opportunity
            if (yesPrice > 0.75 || yesPrice < 0.25) {
              opportunities.push({
                platform: 'kalshi',
                eventTicker: event.event_ticker,
                marketTicker: market.ticker,
                question: market.title || event.title,
                description: market.subtitle || event.subtitle,
                category: event.category || 'economics',
                yesPrice,
                noPrice: 1 - yesPrice,
                consensus: yesPrice > 0.5 ? 'YES' : 'NO',
                contrarian: yesPrice > 0.5 ? 'NO' : 'YES',
                edge: Math.abs(yesPrice - 0.5) * 2,
                volume: market.volume || 0,
                liquidity: market.open_interest || 0,
                url: `https://kalshi.com/events/${event.event_ticker}/${market.ticker}`,
                closeTime: market.close_time || event.close_time
              })
            }
          }
        }
      }

      // Sort by edge (most extreme first)
      return opportunities.sort((a, b) => b.edge - a.edge)
    } catch (error) {
      console.error('[Kalshi] Failed to find contrarian opportunities:', error)
      return []
    }
  }

  /**
   * Get popular economic indicator markets
   */
  async getEconomicIndicators() {
    const categories = ['FED', 'CPI', 'INFL', 'JOBS', 'GDP', 'RATES']
    const indicators = []

    for (const category of categories) {
      const events = await this.searchByCategory(category)
      indicators.push(...events.slice(0, 5)) // Top 5 per category
    }

    return indicators
  }

  /**
   * Calculate midpoint from order book
   */
  calculateMidpoint(yesBids, noAsks) {
    if (!yesBids?.length || !noAsks?.length) return 0.5

    const bestYesBid = parseFloat(yesBids[0]?.price || 50) / 100
    const bestNoAsk = parseFloat(noAsks[0]?.price || 50) / 100

    // Yes bid and No ask should sum to ~1
    return (bestYesBid + (1 - bestNoAsk)) / 2
  }

  /**
   * Format market for Miyomi dashboard
   */
  formatMarketForDashboard(market, event) {
    const yesPrice = market.last_price / 100 || 0.5

    return {
      platform: 'kalshi',
      id: market.ticker,
      eventId: event?.event_ticker,
      question: market.title || event?.title,
      description: market.subtitle || event?.subtitle,
      category: event?.category || 'economics',
      yesPrice,
      noPrice: 1 - yesPrice,
      volume: market.volume || 0,
      openInterest: market.open_interest || 0,
      closeTime: market.close_time || event?.close_time,
      url: `https://kalshi.com/events/${event?.event_ticker}/${market.ticker}`,
      status: market.status
    }
  }
}

/**
 * Miyomi-specific Kalshi analysis
 */
export class MiyomiKalshiAnalyzer {
  constructor(client) {
    this.client = client || new KalshiClient()
  }

  /**
   * Generate Miyomi's contrarian take on Kalshi market
   */
  async generateContrarianTake(opportunity) {
    const { yesPrice, category } = opportunity
    const confidence = opportunity.edge

    // Miyomi's Kalshi-specific thesis templates
    const templates = {
      fed: [
        `Fed consensus at ${(yesPrice * 100).toFixed(0)}%? Market is pricing in certainty that doesn't exist. Taking ${opportunity.contrarian}.`,
        `Everyone thinks they know what Powell will do. ${(yesPrice * 100).toFixed(0)}% conviction is insane. I'm fading this.`
      ],
      cpi: [
        `CPI predictions are ${(yesPrice * 100).toFixed(0)}% one direction. Inflation data always surprises. Contrarian ${opportunity.contrarian} here.`,
        `${(yesPrice * 100).toFixed(0)}% think they can predict CPI. They can't. Loading ${opportunity.contrarian} position.`
      ],
      jobs: [
        `Jobs report at ${(yesPrice * 100).toFixed(0)}% consensus. Labor market is unpredictable. Taking ${opportunity.contrarian}.`,
        `When jobs numbers have ${(yesPrice * 100).toFixed(0)}% agreement, bet against the herd. ${opportunity.contrarian} position.`
      ],
      default: [
        `Economic indicator at ${(yesPrice * 100).toFixed(0)}% consensus. That's too confident. Fading with ${opportunity.contrarian}.`,
        `${(yesPrice * 100).toFixed(0)}% agreement on macro data? Market will be surprised. Taking ${opportunity.contrarian}.`
      ]
    }

    const categoryTemplates = templates[category.toLowerCase()] || templates.default
    const thesis = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)]

    return {
      ...opportunity,
      miyomiPosition: opportunity.contrarian,
      thesis,
      recommendedSize: this.calculatePositionSize(confidence, opportunity.liquidity),
      timing: this.assessTiming(opportunity.closeTime),
      dataSource: this.identifyDataSource(category)
    }
  }

  /**
   * Calculate position size
   */
  calculatePositionSize(confidence, liquidity) {
    const baseSize = 200
    const maxSize = 1000

    const confidentSize = baseSize + (confidence * (maxSize - baseSize))
    const liquidityCap = liquidity * 0.1

    return Math.min(confidentSize, liquidityCap, maxSize)
  }

  /**
   * Assess timing
   */
  assessTiming(closeTime) {
    const now = new Date()
    const closes = new Date(closeTime)
    const hoursLeft = (closes - now) / (1000 * 60 * 60)

    if (hoursLeft < 24) return { timing: 'URGENT', reason: 'Closes in < 24h' }
    if (hoursLeft < 72) return { timing: 'GOOD', reason: 'Few days out' }
    if (hoursLeft < 168) return { timing: 'MODERATE', reason: 'One week' }
    return { timing: 'PATIENT', reason: 'Week+ away' }
  }

  /**
   * Identify data source for resolution
   */
  identifyDataSource(category) {
    const sources = {
      fed: 'Federal Reserve official statement',
      cpi: 'Bureau of Labor Statistics CPI release',
      jobs: 'BLS Employment Situation report',
      gdp: 'Bureau of Economic Analysis GDP release',
      infl: 'BLS inflation data',
      rates: 'Federal Reserve interest rate decision'
    }

    return sources[category.toLowerCase()] || 'Official government data'
  }

  /**
   * Get Miyomi's daily economic pick
   */
  async getDailyEconomicPick() {
    const opportunities = await this.client.findContrarianOpportunities()

    if (opportunities.length === 0) return null

    // Prefer Fed/CPI/Jobs over other categories
    const priority = opportunities.sort((a, b) => {
      const priorityOrder = { fed: 0, cpi: 1, jobs: 2 }
      const aPriority = priorityOrder[a.category.toLowerCase()] ?? 99
      const bPriority = priorityOrder[b.category.toLowerCase()] ?? 99
      return aPriority - bPriority
    })

    return await this.generateContrarianTake(priority[0])
  }
}

export default KalshiClient
