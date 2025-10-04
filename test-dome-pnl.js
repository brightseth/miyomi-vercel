/**
 * Test Dome API PnL Calculation
 *
 * Usage: DOME_API_KEY=xxx node test-dome-pnl.js
 */

import { DomeClient } from './lib/dome-client.js';

async function testPnLCalculation() {
  console.log('🔥 Testing Dome API PnL Calculation\n');

  const dome = new DomeClient(process.env.DOME_API_KEY);

  const testWallet = '0x8ae2e93ead25c5d41e5f1b3c209c552cf7eb325d';

  try {
    console.log(`Calculating PnL for wallet: ${testWallet}\n`);

    const pnl = await dome.calculatePnLFromOrders(testWallet);

    console.log('✅ PnL Calculation Results:');
    console.log('---------------------------');
    console.log(`Total P&L: $${pnl.total_pnl}`);
    console.log(`Win Rate: ${pnl.win_rate}%`);
    console.log(`Total Trades: ${pnl.trades_count}`);
    console.log(`Wins: ${pnl.wins}`);
    console.log(`Losses: ${pnl.losses}`);
    console.log(`Markets Traded: ${pnl.markets_traded}`);
    console.log(`\n(Calculated from order history: ${pnl.calculated_from_orders})`);

    console.log('\n✅ Test complete!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Stack:', error.stack);
  }
}

testPnLCalculation().catch(console.error);
