/**
 * Dome API Client
 *
 * Prediction market data service for Polymarket and Kalshi
 *
 * Docs: https://docs.domeapi.io/
 * Base URL: https://api.domeapi.io/v1
 *
 * NOTE (Oct 3, 2025): Currently only /polymarket/orders endpoint is available.
 * Other endpoints (candlesticks, market-price, wallet/pnl) are documented but return 404.
 * We'll implement order history analysis for now and add others when they become available.
 */

const DOME_API_BASE = 'https://api.domeapi.io/v1';

export class DomeClient {
  constructor(apiKey) {
    this.apiKey = apiKey || process.env.DOME_API_KEY;

    if (!this.apiKey) {
      throw new Error('Dome API key required. Set DOME_API_KEY environment variable.');
    }
  }

  /**
   * Internal fetch wrapper with auth headers
   */
  async _fetch(endpoint, options = {}) {
    const url = `${DOME_API_BASE}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Dome API error (${response.status}): ${error}`);
    }

    return response.json();
  }

  /**
   * Get order history for a user/market
   *
   * @param {Object} options
   * @param {string} options.user - Wallet address
   * @param {string} options.market_slug - Market slug (optional)
   * @param {number} options.limit - Results limit (default: 100)
   * @param {number} options.offset - Pagination offset (default: 0)
   * @returns {Promise<Array>} Order history
   */
  async getOrderHistory(options = {}) {
    const { user, market_slug, limit = 100, offset = 0 } = options;

    if (!user) {
      throw new Error('User wallet address required for order history');
    }

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      user,
    });

    if (market_slug) {
      params.append('market_slug', market_slug);
    }

    const data = await this._fetch(`/polymarket/orders?${params}`);
    return data;
  }

  /**
   * Get current market price data
   *
   * NOTE: This endpoint is documented but not yet available (returns 404)
   * Will implement once Dome API launches this feature
   *
   * @param {Object} options
   * @param {string} options.token_id - Token ID for market
   * @param {string} options.at_time - Timestamp for historical price
   * @returns {Promise<Object>} Market price data
   */
  async getMarketPrice(options = {}) {
    const { token_id, at_time } = options;

    if (!token_id) {
      throw new Error('Token ID required for price data');
    }

    const params = at_time ? `?at_time=${at_time}` : '';
    const endpoint = `/market-price/${token_id}${params}`;

    const data = await this._fetch(endpoint);
    return data;
  }

  /**
   * Get candlestick (OHLCV) data for market
   *
   * NOTE: This endpoint is documented but not yet available (returns 404)
   * Will implement once Dome API launches this feature
   *
   * @param {Object} options
   * @param {string} options.condition_id - Condition ID for market
   * @param {string} options.interval - Candle interval
   * @param {string} options.timeRange - Time range
   * @returns {Promise<Array>} Candlestick data
   */
  async getCandlestickData(options = {}) {
    const { condition_id, interval = '1h', timeRange = '7d' } = options;

    if (!condition_id) {
      throw new Error('Condition ID required for candlestick data');
    }

    const params = new URLSearchParams({
      interval,
      time_range: timeRange,
    });

    const data = await this._fetch(`/candlesticks/${condition_id}?${params}`);
    return data;
  }

  /**
   * Get wallet profit/loss data
   *
   * NOTE: This endpoint is documented but not yet available (returns 404)
   * Will implement once Dome API launches this feature
   *
   * For now, we can calculate PnL manually from order history using calculatePnLFromOrders()
   *
   * @param {Object} options
   * @param {string} options.wallet - Wallet address
   * @param {string} options.time_range - Time range
   * @returns {Promise<Object>} PnL data
   */
  async getWalletPnL(options = {}) {
    const { wallet, time_range = 'all' } = options;

    if (!wallet) {
      throw new Error('Wallet address required for PnL data');
    }

    const params = time_range ? `?time_range=${time_range}` : '';
    const data = await this._fetch(`/wallet/pnl/${wallet}${params}`);
    return data;
  }

  /**
   * Calculate PnL from order history (alternative until getWalletPnL is available)
   *
   * @param {string} wallet - Wallet address
   * @param {Object} options - Options for order history
   * @returns {Promise<Object>} Calculated PnL data
   */
  async calculatePnLFromOrders(wallet, options = {}) {
    const orders = await this.getOrderHistory({
      user: wallet,
      limit: 1000, // Get lots of orders
      ...options
    });

    // Group orders by market
    const marketPositions = {};

    for (const order of orders.orders || []) {
      const key = order.market_slug || order.condition_id;
      if (!marketPositions[key]) {
        marketPositions[key] = {
          market_slug: order.market_slug,
          title: order.title,
          buys: [],
          sells: []
        };
      }

      if (order.side === 'BUY') {
        marketPositions[key].buys.push(order);
      } else {
        marketPositions[key].sells.push(order);
      }
    }

    // Calculate P&L for each market
    let totalPnL = 0;
    let wins = 0;
    let losses = 0;

    for (const [market, position] of Object.entries(marketPositions)) {
      const totalBought = position.buys.reduce((sum, b) => sum + (b.shares * b.price), 0);
      const totalSold = position.sells.reduce((sum, s) => sum + (s.shares * s.price), 0);
      const pnl = totalSold - totalBought;

      if (pnl > 0) wins++;
      if (pnl < 0) losses++;

      totalPnL += pnl;
    }

    const tradesCount = wins + losses;
    const winRate = tradesCount > 0 ? (wins / tradesCount) * 100 : 0;

    return {
      total_pnl: totalPnL.toFixed(2),
      win_rate: winRate.toFixed(1),
      trades_count: tradesCount,
      wins,
      losses,
      markets_traded: Object.keys(marketPositions).length,
      calculated_from_orders: true // Flag that this is calculated, not from API
    };
  }

  /**
   * Find contrarian opportunities using Dome data
   *
   * This is a higher-level method that combines market prices and candlestick data
   * to identify extreme consensus with momentum exhaustion
   *
   * @param {Object} options
   * @param {number} options.threshold - Consensus threshold (default: 0.75)
   * @param {string} options.timeRange - Historical analysis range (default: '7d')
   * @returns {Promise<Array>} Contrarian opportunities with confidence scores
   */
  async findContrarianOpportunities(options = {}) {
    const { threshold = 0.75, timeRange = '7d' } = options;

    // Get all active markets
    const markets = await this.getMarketPrice({
      market_slug: 'all',
      timeRange
    });

    const opportunities = [];

    for (const market of markets) {
      // Check if market has extreme consensus
      const currentPrice = market.lastPrice || market.price;

      if (currentPrice > threshold || currentPrice < (1 - threshold)) {
        // Get candlestick data for momentum analysis
        try {
          const candles = await this.getCandlestickData({
            market_slug: market.slug,
            interval: '1h',
            timeRange: '7d'
          });

          // Analyze momentum
          const analysis = this._analyzeMomentum(candles, currentPrice);

          if (analysis.momentumExhausted) {
            opportunities.push({
              market: market.slug,
              question: market.question,
              currentPrice,
              consensus: currentPrice > 0.5 ? 'YES' : 'NO',
              contrarian: currentPrice > 0.5 ? 'NO' : 'YES',
              edge: Math.abs(currentPrice - 0.5),
              confidence: analysis.confidence,
              historicalContext: {
                priceChange7d: analysis.priceChange,
                volumeTrend: analysis.volumeTrend,
                momentumScore: analysis.momentumScore
              },
              closesAt: market.end_date
            });
          }
        } catch (err) {
          console.warn(`Could not analyze ${market.slug}:`, err.message);
          // Continue to next market
        }
      }
    }

    // Sort by confidence score (highest first)
    return opportunities.sort((a, b) => b.confidence - a.confidence);
  }

  /**
   * Analyze momentum from candlestick data
   *
   * @private
   * @param {Array} candles - Candlestick data
   * @param {number} currentPrice - Current market price
   * @returns {Object} Momentum analysis
   */
  _analyzeMomentum(candles, currentPrice) {
    if (!candles || candles.length < 2) {
      return {
        momentumExhausted: false,
        confidence: 0,
        priceChange: 0,
        volumeTrend: 'unknown',
        momentumScore: 0
      };
    }

    const firstCandle = candles[0];
    const lastCandle = candles[candles.length - 1];

    // Calculate price change over period
    const priceChange = lastCandle.close - firstCandle.open;
    const priceChangePercent = Math.abs(priceChange);

    // Calculate average volume
    const avgVolume = candles.reduce((sum, c) => sum + c.volume, 0) / candles.length;
    const recentVolume = candles.slice(-3).reduce((sum, c) => sum + c.volume, 0) / 3;
    const volumeRatio = recentVolume / avgVolume;

    // Momentum exhaustion signals:
    // 1. Price moved >10% to extreme
    // 2. Volume increasing (more participants piling in)
    // 3. Current price very extreme (>75% or <25%)

    const extremePrice = currentPrice > 0.75 || currentPrice < 0.25;
    const significantMove = priceChangePercent > 0.10;
    const volumeIncreasing = volumeRatio > 1.2;

    let confidence = 0;
    let momentumExhausted = false;

    if (extremePrice && significantMove) {
      confidence = 0.5; // Base confidence
      momentumExhausted = true;

      if (volumeIncreasing) {
        confidence += 0.3; // High volume = more exhaustion likely
      }

      if (priceChangePercent > 0.20) {
        confidence += 0.2; // Very rapid move = higher exhaustion
      }
    }

    return {
      momentumExhausted,
      confidence: Math.min(confidence, 1.0), // Cap at 1.0
      priceChange,
      volumeTrend: volumeRatio > 1.2 ? 'increasing' : volumeRatio < 0.8 ? 'decreasing' : 'stable',
      momentumScore: priceChangePercent * volumeRatio
    };
  }
}

// Export singleton instance
let domeInstance = null;

export function getDomeClient() {
  if (!domeInstance) {
    domeInstance = new DomeClient(process.env.DOME_API_KEY);
  }
  return domeInstance;
}

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DomeClient, getDomeClient };
}
