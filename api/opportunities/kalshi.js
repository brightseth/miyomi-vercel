// Kalshi Contrarian Opportunities API
// Finds economic indicator markets with extreme consensus (>75% or <25%)

import { KalshiClient, MiyomiKalshiAnalyzer } from '../../lib/kalshi-client.js';

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
    console.log('[Kalshi Opportunities] Fetching contrarian economic indicators...');

    // Initialize Kalshi client with API key
    const client = new KalshiClient({
      apiKey: process.env.KALSHI_API_KEY
    });

    const analyzer = new MiyomiKalshiAnalyzer(client);

    // Find contrarian opportunities (focused on economic indicators)
    const opportunities = await client.findContrarianOpportunities();

    if (opportunities.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        opportunities: [],
        message: 'No contrarian economic indicators found at this time'
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
        console.error('[Kalshi] Failed to analyze opportunity:', error);
        // Still include the raw opportunity
        analyzed.push(opp);
      }
    }

    console.log(`[Kalshi Opportunities] Found ${opportunities.length} markets, analyzed ${analyzed.length}`);

    return res.status(200).json({
      success: true,
      count: opportunities.length,
      analyzed: analyzed.length,
      opportunities: analyzed,
      categories: ['FED', 'CPI', 'JOBS', 'GDP', 'INFL'],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('[Kalshi Opportunities] Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
