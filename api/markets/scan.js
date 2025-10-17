/**
 * Market Scanner API
 *
 * GET /api/markets/scan
 * GET /api/markets/scan?live=true (try real API)
 *
 * Returns contrarian opportunities with extreme consensus
 * Uses mock data by default for reliable demo
 */

import { mockOpportunities } from './mock-data.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const useLive = req.query.live === 'true';

    if (!useLive) {
      // Use mock data for reliable demo
      console.log('📊 Using mock data (12 opportunities)');
      return res.status(200).json({
        success: true,
        count: mockOpportunities.length,
        markets: mockOpportunities,
        lastUpdate: new Date().toISOString(),
        source: 'mock'
      });
    }

    // Try live API if requested
    console.log('🔍 Scanning live Polymarket API...');

    const response = await fetch('https://clob.polymarket.com/markets', {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status}`);
    }

    const data = await response.json();
    const markets = data.data || data;

    console.log(`📊 Found ${markets.length} total markets`);

    // Filter for contrarian opportunities
    const opportunities = markets
      .filter(market => {
        // Skip closed/archived markets
        if (market.closed || market.archived || !market.active) return false;

        // Must have tokens with prices
        if (!market.tokens || market.tokens.length < 2) return false;

        // Get YES token price (first token is usually YES)
        const yesToken = market.tokens[0];
        const yesPrice = parseFloat(yesToken.price);

        // Skip if no valid price
        if (isNaN(yesPrice) || yesPrice === 0) return false;

        // Filter for extreme consensus (>70% or <30%)
        return yesPrice > 0.70 || yesPrice < 0.30;
      })
      .map(market => {
        const yesToken = market.tokens[0];
        const noToken = market.tokens[1];
        const yesPrice = parseFloat(yesToken.price);
        const consensus = (yesPrice * 100).toFixed(1);

        // Calculate contrarian position
        const position = yesPrice > 0.70 ? 'NO' : 'YES';
        const edge = yesPrice > 0.70
          ? ((1 - yesPrice) / yesPrice * 100).toFixed(0)
          : (yesPrice / (1 - yesPrice) * 100).toFixed(0);

        return {
          id: market.condition_id,
          question: market.question,
          consensus: parseFloat(consensus),
          position,
          edge: parseInt(edge),
          yesPrice: yesPrice.toFixed(3),
          noPrice: parseFloat(noToken.price).toFixed(3),
          volume: 0, // Not provided in this endpoint
          liquidity: 0, // Not provided in this endpoint
          endDate: market.end_date_iso,
          url: `https://polymarket.com/event/${market.market_slug}`,
          outcomes: {
            yes: yesToken.outcome,
            no: noToken.outcome
          }
        };
      })
      .sort((a, b) => b.edge - a.edge) // Sort by highest edge first
      .slice(0, 50); // Top 50 opportunities

    console.log(`✅ Found ${opportunities.length} contrarian opportunities`);

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      markets: opportunities,
      lastUpdate: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Market scan failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Market scan failed',
      markets: [],
    });
  }
}
