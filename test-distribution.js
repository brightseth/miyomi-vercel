import { PolymarketClient } from './lib/polymarket-client.js';

const client = new PolymarketClient();
const markets = await client.getMarkets({ active: true, limit: 100 });

console.log('\n📊 MARKET DISTRIBUTION ANALYSIS\n');

const priceRanges = {
  'Balanced (45-55%)': 0,
  'Moderate (40-45% or 55-60%)': 0,
  'Strong (30-40% or 60-70%)': 0,
  'Very Strong (20-30% or 70-80%)': 0,
  'Extreme (<20% or >80%)': 0
};

const prices = [];

markets.forEach(market => {
  if (market.outcomes?.length === 2) {
    const yesPrice = parseFloat(market.outcomes[0]?.price || 0.5);
    prices.push({ question: market.question, yesPrice });

    if (yesPrice >= 0.45 && yesPrice <= 0.55) {
      priceRanges['Balanced (45-55%)']++;
    } else if ((yesPrice >= 0.40 && yesPrice < 0.45) || (yesPrice > 0.55 && yesPrice <= 0.60)) {
      priceRanges['Moderate (40-45% or 55-60%)']++;
    } else if ((yesPrice >= 0.30 && yesPrice < 0.40) || (yesPrice > 0.60 && yesPrice <= 0.70)) {
      priceRanges['Strong (30-40% or 60-70%)']++;
    } else if ((yesPrice >= 0.20 && yesPrice < 0.30) || (yesPrice > 0.70 && yesPrice <= 0.80)) {
      priceRanges['Very Strong (20-30% or 70-80%)']++;
    } else {
      priceRanges['Extreme (<20% or >80%)']++;
    }
  }
});

console.log('Distribution:');
Object.entries(priceRanges).forEach(([range, count]) => {
  const bar = '█'.repeat(Math.floor(count / 2));
  const pct = ((count / prices.length) * 100).toFixed(0);
  console.log(`${range.padEnd(32)} ${count.toString().padStart(3)} (${pct}%) ${bar}`);
});

// Show most extreme markets
prices.sort((a, b) => Math.abs(b.yesPrice - 0.5) - Math.abs(a.yesPrice - 0.5));
console.log('\n🎯 TOP 5 MOST EXTREME CONSENSUS:\n');
prices.slice(0, 5).forEach((m, i) => {
  const consensus = m.yesPrice > 0.5 ? 'YES' : 'NO';
  const contrarian = m.yesPrice > 0.5 ? 'NO' : 'YES';
  console.log(`${i + 1}. ${(m.yesPrice * 100).toFixed(1)}% ${consensus} (Miyomi plays ${contrarian})`);
  console.log(`   ${m.question.substring(0, 90)}\n`);
});
