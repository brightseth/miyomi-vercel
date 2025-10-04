/**
 * Dome PnL API Endpoint
 *
 * GET /api/dome/pnl?wallet=0x...
 *
 * Returns:
 * {
 *   total_pnl: "1250.50",
 *   win_rate: "68.5",
 *   trades_count: 15,
 *   wins: 10,
 *   losses: 5,
 *   markets_traded: 12
 * }
 */

import { DomeClient } from '../../lib/dome-client.js';

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { wallet } = req.query;

    // Validate required fields
    if (!wallet) {
      return res.status(400).json({ error: 'wallet address is required' });
    }

    console.log('Calculating PnL for wallet:', wallet);

    // Initialize Dome client
    const dome = new DomeClient(process.env.DOME_API_KEY);

    // Calculate PnL from order history
    const pnl = await dome.calculatePnLFromOrders(wallet);

    return res.status(200).json({
      success: true,
      ...pnl
    });

  } catch (error) {
    console.error('PnL calculation failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'PnL calculation failed'
    });
  }
}
