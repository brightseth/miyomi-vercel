import { PolymarketClient } from './lib/polymarket-client.js';

const client = new PolymarketClient();
const markets = await client.getMarkets({ active: true, limit: 200 });

console.log('\n🔍 FINDING BEST AVAILABLE OPPORTUNITY:\n');

const candidates = [];
markets.forEach(market => {
  const outcomes = market.outcomes || market.tokens;
  if (outcomes?.length === 2) {
    const yesPrice = parseFloat(outcomes[0]?.price || 0.5);
    const liquidity = market.liquidity || 0;

    // Valid unresolved market with any liquidity
    if (yesPrice > 0.01 && yesPrice < 0.99 && liquidity > 0) {
      candidates.push({
        question: market.question,
        yesPrice,
        liquidity,
        edge: Math.abs(yesPrice - 0.5) * 2,
        slug: market.market_slug
      });
    }
  }
});

// Sort by edge
candidates.sort((a, b) => b.edge - a.edge);

console.log(`Found ${candidates.length} valid unresolved markets with liquidity\n`);
console.log('TOP 5 BY EDGE:\n');

candidates.slice(0, 5).forEach((m, i) => {
  const consensus = m.yesPrice > 0.5 ? 'YES' : 'NO';
  const contrarian = m.yesPrice > 0.5 ? 'NO' : 'YES';
  console.log(`${i + 1}. ${(m.yesPrice * 100).toFixed(1)}% ${consensus} (Miyomi plays ${contrarian})`);
  console.log(`   Edge: ${(m.edge * 100).toFixed(1)}%, Liquidity: $${m.liquidity.toLocaleString()}`);
  console.log(`   ${m.question.substring(0, 85)}...\n`);
});
