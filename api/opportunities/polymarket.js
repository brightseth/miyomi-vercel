// Polymarket Contrarian Opportunities API
// Finds markets with extreme consensus (>75% or <25%)

import { PolymarketClient, MiyomiPolymarketAnalyzer } from '../../lib/polymarket-client.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('[Polymarket Opportunities] Fetching contrarian markets...');

    // Initialize Polymarket client (read-only, no API key needed for market data)
    const client = new PolymarketClient();
    const analyzer = new MiyomiPolymarketAnalyzer(client);

    // Find contrarian opportunities
    const opportunities = await client.findContrarianOpportunities();

    if (opportunities.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        opportunities: [],
        message: 'No contrarian opportunities found at this time'
      });
    }

    // Generate Miyomi's take on top 5 opportunities
    const topOpportunities = opportunities.slice(0, 5);
    const analyzed = [];

    for (const opp of topOpportunities) {
      try {
        const analysis = await analyzer.generateContrarianTake(opp);
        analyzed.push(analysis);
      } catch (error) {
        console.error('[Polymarket] Failed to analyze opportunity:', error);
        // Still include the raw opportunity
        analyzed.push(opp);
      }
    }

    console.log(`[Polymarket Opportunities] Found ${opportunities.length} markets, analyzed ${analyzed.length}`);

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      analyzed: analyzed.length,
      opportunities: analyzed,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Polymarket Opportunities] Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
