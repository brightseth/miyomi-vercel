// Test complete opportunity workflow with lower threshold
import { PolymarketClient, MiyomiPolymarketAnalyzer } from './lib/polymarket-client.js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://aeflqgydcrlszgbpduyk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFlZmxxZ3lkY3Jsc3pnYnBkdXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzA4ODcsImV4cCI6MjA3MzYwNjg4N30.DZh-LX5fD5Lz0-bvoc13-UqZvHEI8Ir4UDxaBMG1uv8'
);

console.log('\n🔍 MIYOMI OPPORTUNITY SCANNER - Demo Mode (55% threshold)\n');

const client = new PolymarketClient();
const analyzer = new MiyomiPolymarketAnalyzer(client);

// Fetch markets
const markets = await client.getMarkets({ active: true, limit: 100 });
console.log(`📊 Scanning ${markets.length} active markets...\n`);

// Find opportunities with 55%+ or 45%- consensus
const opportunities = [];
for (const market of markets) {
  const outcomes = market.outcomes || market.tokens;
  // Check binary markets with valid prices (between 0 and 1, not resolved)
  if (outcomes?.length === 2) {
    const yesPrice = parseFloat(outcomes[0]?.price || 0.5);

    // Skip resolved markets and only include markets with some liquidity
    const hasLiquidity = (market.liquidity || 0) > 100;
    const validPrice = yesPrice > 0.01 && yesPrice < 0.99; // Not essentially resolved
    const hasConsensus = yesPrice > 0.55 || yesPrice < 0.45;

    if (validPrice && hasLiquidity && hasConsensus) {
      opportunities.push({
        platform: 'polymarket',
        marketId: market.condition_id,
        question: market.question,
        yesPrice,
        noPrice: 1 - yesPrice,
        consensus: yesPrice > 0.5 ? 'YES' : 'NO',
        contrarian: yesPrice > 0.5 ? 'NO' : 'YES',
        edge: Math.abs(yesPrice - 0.5) * 2,
        volume: market.volume || 0,
        liquidity: market.liquidity || 0,
        url: `https://polymarket.com/event/${market.slug}`,
        endsAt: market.end_date_iso
      });
    }
  }
}

console.log(`✅ Found ${opportunities.length} opportunities with moderate-to-strong consensus\n`);

if (opportunities.length > 0) {
  // Sort by edge and pick the best one
  opportunities.sort((a, b) => b.edge - a.edge);
  const topPick = opportunities[0];

  console.log('🎯 TOP CONTRARIAN OPPORTUNITY:\n');
  console.log(`Question: ${topPick.question}`);
  console.log(`Consensus: ${topPick.consensus} at ${(topPick.yesPrice * 100).toFixed(1)}%`);
  console.log(`Miyomi's Play: Take ${topPick.contrarian}`);
  console.log(`Edge Score: ${(topPick.edge * 100).toFixed(1)}%`);
  console.log(`Liquidity: $${topPick.liquidity?.toLocaleString() || '0'}`);
  console.log(`URL: ${topPick.url}\n`);

  // Generate Miyomi's contrarian thesis
  console.log('💭 Generating Miyomi\'s take...\n');

  const templates = topPick.yesPrice > 0.55 ? [
    `Everyone's saying YES at ${(topPick.yesPrice * 100).toFixed(0)}%. That's peak delusion. I'm taking NO.`,
    `${(topPick.yesPrice * 100).toFixed(0)}% YES? The crowd is adorable but wrong. Loading NO bags.`,
    `When consensus hits ${(topPick.yesPrice * 100).toFixed(0)}%, it's time to fade. NO position here.`
  ] : [
    `Only ${(topPick.yesPrice * 100).toFixed(0)}% think YES? That's FUD talking. I'm contrarian on the contrarians - taking YES.`,
    `Market is ${((1-topPick.yesPrice) * 100).toFixed(0)}% NO. Too bearish. I see upside. YES position.`,
    `${((1-topPick.yesPrice) * 100).toFixed(0)}% NO consensus means opportunity. Taking YES here.`
  ];

  const thesis = templates[Math.floor(Math.random() * templates.length)];

  console.log('📝 MIYOMI\'S THESIS:');
  console.log(`"${thesis}"\n`);

  // Calculate position size
  const confidence = Math.abs(topPick.yesPrice - 0.5) * 2;
  const baseSize = 200;
  const maxSize = 1000;
  const recommendedSize = Math.min(
    baseSize + (confidence * (maxSize - baseSize)),
    topPick.liquidity * 0.1,
    maxSize
  );

  console.log(`💰 Recommended Size: $${recommendedSize.toFixed(0)}`);
  console.log(`📈 Confidence: ${(confidence * 100).toFixed(0)}%\n`);

  // Save to database
  console.log('💾 Saving to database...\n');

  const { data, error } = await supabase
    .from('opportunities')
    .insert([{
      platform: 'polymarket',
      market_id: topPick.marketId,
      question: topPick.question,
      yes_price: topPick.yesPrice,
      no_price: topPick.noPrice,
      consensus: topPick.consensus,
      contrarian: topPick.contrarian,
      edge: topPick.edge,
      volume: topPick.volume,
      liquidity: topPick.liquidity,
      close_time: topPick.endsAt,
      url: topPick.url,
      miyomi_thesis: thesis,
      recommended_size: recommendedSize,
      status: 'new'
    }])
    .select();

  if (error) {
    console.error('❌ Database error:', error);
  } else {
    console.log('✅ Saved to opportunities table!');
    console.log(`Database ID: ${data[0].id}\n`);

    console.log('🎬 NEXT STEPS:');
    console.log('1. jmill configures Eden video pipeline with Yeah LoRA');
    console.log('2. Generate video explaining this contrarian thesis');
    console.log('3. Post to TikTok/YouTube with affiliate links');
    console.log('4. Track engagement and affiliate signups\n');

    console.log('📊 This opportunity is now in your miyomi.ai dashboard');
  }
}
