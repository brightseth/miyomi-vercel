/**
 * Test Dome API Integration
 *
 * Usage: node test-dome-api.js
 */

import { DomeClient } from './lib/dome-client.js';

async function testDomeAPI() {
  console.log('🔥 Testing Dome API Integration\n');

  const dome = new DomeClient(process.env.DOME_API_KEY || '42cd462b-625e-4b8b-b20c-ba6527f40259');

  try {
    // Test 1: Get order history (sample from docs)
    console.log('Test 1: Order History');
    console.log('--------------------');
    try {
      const orders = await dome.getOrderHistory({
        user: '0x8ae2e93ead25c5d41e5f1b3c209c552cf7eb325d',
        market_slug: 'us-government-shutdown-by-october-1',
        limit: 10,
        offset: 0
      });
      console.log('✅ Order History:', JSON.stringify(orders, null, 2));
    } catch (err) {
      console.log('❌ Order History Error:', err.message);
    }

    console.log('\n');

    // Test 2: Get market prices (all markets)
    console.log('Test 2: Market Prices');
    console.log('--------------------');
    try {
      const markets = await dome.getMarketPrice({
        market_slug: 'all',
        timeRange: '24h'
      });
      console.log(`✅ Found ${markets.length || 'N/A'} markets`);
      console.log('Sample market:', JSON.stringify(markets[0] || markets, null, 2).slice(0, 500));
    } catch (err) {
      console.log('❌ Market Prices Error:', err.message);
    }

    console.log('\n');

    // Test 3: Get candlestick data
    console.log('Test 3: Candlestick Data');
    console.log('------------------------');
    try {
      const candles = await dome.getCandlestickData({
        market_slug: 'us-government-shutdown-by-october-1',
        interval: '1h',
        timeRange: '7d'
      });
      console.log(`✅ Found ${candles.length || 'N/A'} candles`);
      console.log('Recent candles:', JSON.stringify(candles.slice(-3), null, 2));
    } catch (err) {
      console.log('❌ Candlestick Error:', err.message);
    }

    console.log('\n');

    // Test 4: Get wallet PnL
    console.log('Test 4: Wallet PnL');
    console.log('------------------');
    try {
      const pnl = await dome.getWalletPnL({
        wallet: '0x8ae2e93ead25c5d41e5f1b3c209c552cf7eb325d',
        platform: 'all',
        timeRange: 'all'
      });
      console.log('✅ PnL Data:', JSON.stringify(pnl, null, 2));
    } catch (err) {
      console.log('❌ PnL Error:', err.message);
    }

    console.log('\n');

    // Test 5: Find contrarian opportunities
    console.log('Test 5: Contrarian Opportunities');
    console.log('--------------------------------');
    try {
      const opportunities = await dome.findContrarianOpportunities({
        threshold: 0.75,
        timeRange: '7d'
      });
      console.log(`✅ Found ${opportunities.length} contrarian opportunities`);

      if (opportunities.length > 0) {
        console.log('\nTop 3 opportunities:');
        opportunities.slice(0, 3).forEach((opp, i) => {
          console.log(`\n${i + 1}. ${opp.question}`);
          console.log(`   Current: ${(opp.currentPrice * 100).toFixed(1)}%`);
          console.log(`   Consensus: ${opp.consensus}`);
          console.log(`   Contrarian: ${opp.contrarian}`);
          console.log(`   Confidence: ${(opp.confidence * 100).toFixed(1)}%`);
          console.log(`   Edge: ${(opp.edge * 100).toFixed(1)}%`);
        });
      }
    } catch (err) {
      console.log('❌ Contrarian Opportunities Error:', err.message);
      console.log('Stack:', err.stack);
    }

    console.log('\n✅ All tests complete!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Stack:', error.stack);
  }
}

// Run tests
testDomeAPI().catch(console.error);
