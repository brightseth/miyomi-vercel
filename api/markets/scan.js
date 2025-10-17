/**
 * Market Scanner API
 *
 * GET /api/markets/scan
 *
 * Fetches live Polymarket markets and filters for contrarian opportunities
 * Returns markets where consensus is extreme (>70% or <30%)
 */

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🔍 Scanning Polymarket for opportunities...');

    // Fetch markets from Polymarket CLOB API
    const response = await fetch('https://clob.polymarket.com/markets', {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.status}`);
    }

    const markets = await response.json();
    console.log(`📊 Found ${markets.length} total markets`);

    // Filter for contrarian opportunities
    const opportunities = markets
      .filter(market => {
        // Must have price data
        if (!market.outcomePrices || market.outcomePrices.length < 2) return false;

        // Get YES price (consensus)
        const yesPrice = parseFloat(market.outcomePrices[0]);

        // Filter for extreme consensus (>70% or <30%)
        return yesPrice > 0.70 || yesPrice < 0.30;
      })
      .map(market => {
        const yesPrice = parseFloat(market.outcomePrices[0]);
        const consensus = (yesPrice * 100).toFixed(1);

        // Calculate contrarian position
        const position = yesPrice > 0.70 ? 'NO' : 'YES';
        const edge = yesPrice > 0.70
          ? ((1 - yesPrice) / yesPrice * 100).toFixed(0)
          : (yesPrice / (1 - yesPrice) * 100).toFixed(0);

        return {
          id: market.condition_id || market.id,
          question: market.question,
          consensus: parseFloat(consensus),
          position,
          edge: parseInt(edge),
          yesPrice: yesPrice.toFixed(3),
          noPrice: (1 - yesPrice).toFixed(3),
          volume: market.volume || 0,
          liquidity: market.liquidity || 0,
          endDate: market.end_date_iso,
          url: `https://polymarket.com/event/${market.slug || market.condition_id}`,
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
