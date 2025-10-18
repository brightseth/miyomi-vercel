# Proprietary Edge Architecture - Dome + Soup.xyz Integration

**Date:** October 3, 2025
**Status:** Strategic differentiation plan
**Purpose:** Leverage Dome API + Soup.xyz clearing as unfair advantages

---

## Executive Summary

**The Opportunity:**

While others build on public Polymarket/Kalshi data, you have **proprietary access** to:
1. **Dome API** - Advanced prediction market analytics (orders, PnL, momentum)
2. **Soup.xyz** - Permission-less market creation + clearing infrastructure

**This creates two unfair advantages:**

### Advantage #1: Dome Intelligence Layer
- Order flow analysis (who's buying/selling)
- Momentum exhaustion detection
- Cross-market sentiment correlation
- Whale watching (large position tracking)
- **No one else has this data publicly**

### Advantage #2: Soup Market Creation
- Create custom Miyomi markets others can't
- Control resolution as oracle
- Market-making revenue from spread
- Build brand through unique opportunities
- **Platform independence (no Polymarket approval needed)**

---

## Architecture: Three-Layer Intelligence Stack

```
┌──────────────────────────────────────────────────┐
│         LAYER 3: MIYOMI INTELLIGENCE              │
│   AI Analysis + Content Generation + Strategy    │
└────────────────┬─────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
    ▼                         ▼
┌─────────────────┐   ┌──────────────────┐
│  LAYER 2: DOME  │   │ LAYER 2: SOUP    │
│  Market Data    │   │ Market Creation  │
│  - Order flow   │   │ - Custom markets │
│  - PnL tracking │   │ - Oracle control │
│  - Momentum     │   │ - Market making  │
└────────┬────────┘   └────────┬─────────┘
         │                     │
         └──────────┬──────────┘
                    ▼
┌──────────────────────────────────────────────────┐
│      LAYER 1: PUBLIC PREDICTION MARKETS           │
│    Polymarket + Kalshi + Other Platforms         │
└──────────────────────────────────────────────────┘
```

**How it works:**

1. **Layer 1 (Public Markets):** Everyone can see prices
2. **Layer 2 (Proprietary Data):** Only you see order flow + can create markets
3. **Layer 3 (Miyomi AI):** Combines 1+2 to identify opportunities no one else can

---

## Dome API: Proprietary Intelligence

### What Dome Provides (That Others Don't Have)

**1. Order Flow Analysis**
```javascript
// See WHO is buying and selling
const orders = await dome.getOrderHistory({
  user: walletAddress,
  market_slug: 'bitcoin-100k-2025'
});

// Detect smart money vs retail
const whaleOrders = orders.filter(o => o.shares > 10000);
const retailOrders = orders.filter(o => o.shares < 1000);

// Contrarian signal: If whales selling, retail buying
if (whaleOrders.side === 'SELL' && retailOrders.side === 'BUY') {
  return { signal: 'FADE_RETAIL', confidence: 0.85 };
}
```

**2. Momentum Exhaustion Detection**
```javascript
// Dome's findContrarianOpportunities method
const opportunities = await dome.findContrarianOpportunities({
  threshold: 0.75, // Markets > 75% or < 25%
  timeRange: '7d'
});

// Returns markets with:
// - Extreme consensus (e.g., 87% YES)
// - Momentum exhaustion (price moved fast, volume spiking)
// - Confidence score (how likely to reverse)
```

**Current implementation:** `lib/dome-client.js` ✅

**Already has:**
- Order history tracking
- PnL calculation from orders
- Momentum analysis
- Contrarian opportunity finder

### What to Build: Advanced Dome Features

#### Feature 1: Smart Money Tracker
```javascript
// Track known profitable wallets
const whales = [
  '0x123...', // Known prediction market pro
  '0x456...', // Polymarket whale
  '0x789...'  // Your own wallet
];

async function trackSmartMoney(market) {
  for (const whale of whales) {
    const orders = await dome.getOrderHistory({
      user: whale,
      market_slug: market.slug
    });

    if (orders.length > 0) {
      return {
        signal: 'WHALE_ACTIVE',
        direction: orders[0].side,
        confidence: 0.8,
        message: `Smart money taking ${orders[0].side} position`
      };
    }
  }
  return null;
}
```

**Use case for Miyomi:**
"Markets whisper... and I'm watching the whales. Three addresses that crush Polymarket just went long on NO. I'm following."

#### Feature 2: Cross-Market Correlation
```javascript
// Find markets moving together
async function findCorrelatedMarkets() {
  const btcMarket = await dome.getCandlestickData({
    condition_id: 'bitcoin-100k',
    interval: '1h',
    timeRange: '7d'
  });

  const ethMarket = await dome.getCandlestickData({
    condition_id: 'ethereum-8k',
    interval: '1h',
    timeRange: '7d'
  });

  // Calculate correlation
  const correlation = calculateCorrelation(
    btcMarket.map(c => c.close),
    ethMarket.map(c => c.close)
  );

  if (correlation > 0.9) {
    // If BTC market is 87% YES but ETH is only 60% YES
    // That's a mispricing opportunity
    return {
      signal: 'CORRELATION_DIVERGENCE',
      market1: 'bitcoin-100k',
      market2: 'ethereum-8k',
      arbitrage: true
    };
  }
}
```

**Use case for Miyomi:**
"BTC and ETH markets usually move together. Right now BTC is 87% moon, but ETH only 60%. Someone's wrong. I'm betting on convergence."

#### Feature 3: Volume Spike Alerts
```javascript
// Monitor for unusual volume = big money moving
async function detectVolumeSpikets(market) {
  const candles = await dome.getCandlestickData({
    condition_id: market.id,
    interval: '1h',
    timeRange: '7d'
  });

  const avgVolume = candles.slice(0, -3)
    .reduce((sum, c) => sum + c.volume, 0) / (candles.length - 3);

  const recentVolume = candles.slice(-3)
    .reduce((sum, c) => sum + c.volume, 0) / 3;

  if (recentVolume > avgVolume * 3) {
    return {
      signal: 'VOLUME_SPIKE',
      message: `Volume 3x average - someone knows something`,
      confidence: 0.75
    };
  }
}
```

**Use case for Miyomi:**
"Volume just spiked 300% on this market in last 3 hours. Either whales are accumulating or there's inside info. Either way, I'm paying attention."

---

## Soup.xyz: Market Creation Infrastructure

### Why Soup is a Strategic Advantage

**Polymarket limitations:**
- Can't create your own markets (need approval)
- Can't control resolution
- Can't experiment with custom categories
- Can't build brand through unique markets

**Soup.xyz enables:**
- ✅ Create any market instantly (no approval)
- ✅ Control resolution as oracle
- ✅ Earn market-making spread
- ✅ Build "Miyomi Markets" brand
- ✅ Test creative prediction categories

### Soup Architecture (from `MIYOMI_MARKET_MAKER.md`)

**Already documented:**
- Conditional token framework (CTF)
- Market creation flow
- Oracle resolution process
- Liquidity provision strategy

**Current status:** Architecture designed, not yet implemented

### What to Build: Miyomi Markets Platform

#### Phase 1: Basic Market Creation (Week 1-2)

```javascript
// File: lib/soup-client.js
import { ProtocolClient } from '@soup/protocol';
import { IndexerClient } from '@soup/indexer';

class SoupMarketCreator {
  async createMiyomiMarket({
    question,
    category,
    resolutionDate,
    initialLiquidity = 1000 // USDC
  }) {
    // 1. Prepare condition on Soup
    const condition = await this.protocol.prepareCondition({
      questionId: hash(question),
      outcomeSlotCount: 2, // Binary YES/NO
      oracle: MIYOMI_ORACLE_ADDRESS
    });

    // 2. Split collateral into outcome tokens
    await this.protocol.splitPosition({
      collateralToken: USDC_ADDRESS,
      amount: initialLiquidity,
      conditionId: condition.id
    });

    // 3. Place initial orders (market making)
    await this.placeInitialOrders(condition.id, {
      yesBid: 0.45,
      yesAsk: 0.55,
      noBid: 0.45,
      noAsk: 0.55,
      size: initialLiquidity / 4
    });

    return condition;
  }
}
```

#### Phase 2: Oracle Resolution (Week 2-3)

```javascript
class MiyomiOracle {
  async resolveMarket(conditionId, outcome) {
    // 1. Verify resolution criteria met
    const market = await db.getMarket(conditionId);
    const evidence = await this.gatherEvidence(market);

    // 2. Resolve on-chain
    const tx = await this.protocol.reportPayouts({
      questionId: market.questionId,
      payouts: outcome === 'YES' ? [1, 0] : [0, 1]
    });

    // 3. Record resolution in database
    await db.recordResolution({
      conditionId,
      outcome,
      evidence,
      txHash: tx.hash,
      resolvedAt: new Date()
    });

    // 4. Generate resolution video
    await this.generateResolutionVideo(market, outcome);

    return tx;
  }
}
```

#### Phase 3: Market Making Automation (Week 3-4)

```javascript
class MiyomiLiquidityManager {
  async monitorAndRebalance(conditionId) {
    // Check order book
    const orderBook = await this.indexer.getOrderBook(conditionId);
    const position = await this.getPosition(conditionId);

    // Rebalance if inventory skewed
    if (position.yes > position.no * 1.5) {
      // Too many YES tokens, widen YES ask, tighten NO bid
      await this.adjustQuotes({
        yesBid: orderBook.yesBid - 0.02,
        yesAsk: orderBook.yesAsk + 0.03,
        noBid: orderBook.noBid + 0.02,
        noAsk: orderBook.noAsk - 0.01
      });
    }
  }
}
```

---

## Combined Intelligence: Dome + Soup Synergy

### Strategy 1: "Fade the Polymarket Crowd, Create Soup Alternative"

**Scenario:**
1. Dome detects extreme consensus on Polymarket (e.g., "BTC $100k by Friday" at 87% YES)
2. Momentum analysis shows exhaustion
3. Order flow shows retail piling in, whales exiting

**Miyomi's play:**
1. Create SAME market on Soup with better odds (YES at 0.75 instead of 0.87)
2. Take contrarian NO position on Polymarket
3. Market-make the Soup version
4. Create video: "Polymarket thinks 87% YES, I'm giving you 75% on my market. Here's why they're wrong..."

**Revenue:**
- Trading profit if Polymarket reverses
- Market-making spread on Soup
- Affiliate traffic to Polymarket
- Attention/followers from video

### Strategy 2: "Unique Miyomi Markets"

**Markets Polymarket won't approve:**

**Example 1: "Will Dimes Square Get More Mainstream Mentions Than Bushwick This Week?"**
- NYC culture question
- Subjective but measurable (Google Trends)
- Only Miyomi cares enough to create + resolve

**Example 2: "Mercury Retrograde + Fed Meeting = Market Chaos?"**
- Hybrid astrology + finance
- Fun contrarian angle
- Miyomi can objectively measure (VIX spike >20% during period)

**Example 3: "Will Any AI Agent Video Hit 100k Views This Month?"**
- Eden/AI agent ecosystem question
- Miyomi is in the space, can track
- Builds community in AI agent world

**Why this works:**
- No competition (no one else creating these)
- Miyomi controls resolution (oracle trust)
- Content opportunity (explain unique thesis)
- Brand building ("Miyomi Markets" = creative predictions)

### Strategy 3: "Advanced Data → Better Odds"

**Public sees:** Bitcoin at 87% on Polymarket

**Miyomi sees (via Dome):**
- Order flow: 80% retail buyers, 20% smart money
- Volume: Spiking 300% (FOMO signal)
- Whale tracker: 3 known profitable wallets just exited
- Momentum: +15% price move in 48h (exhaustion)
- Cross-correlation: Other crypto markets not moving

**Miyomi's edge:**
1. Knows consensus is fragile (smart money exiting)
2. Creates Soup market at fairer odds (YES 0.75 not 0.87)
3. Video explains the hidden data others don't see
4. Builds reputation as oracle with superior information

---

## Implementation Roadmap

### Phase 1: Dome Intelligence (Week 1-2)
**Files to create:**
- `lib/dome-advanced-analytics.js` - Smart money tracker, correlation, volume alerts
- `lib/contrarian-signal-generator.js` - Combines Dome data into actionable signals
- `api/dome-intelligence/opportunities.ts` - API endpoint for morning brief

**Integration point:**
- Trainer dashboard shows "Dome Intelligence" panel
- AI morning brief uses Dome signals
- Oracle take videos reference Dome insights

### Phase 2: Soup Market Creation (Week 2-3)
**Files to create:**
- `lib/soup-client.js` - Market creation + oracle resolution
- `lib/soup-liquidity-manager.js` - Market making automation
- `api/miyomi-markets/create.ts` - Trainer interface to create markets
- `api/miyomi-markets/resolve.ts` - Oracle resolution interface

**Integration point:**
- New section in trainer dashboard: "Create Miyomi Market"
- Automated video generation for market announcements
- Public page shows "Miyomi Markets" alongside Polymarket picks

### Phase 3: Combined Strategy Engine (Week 3-4)
**Files to create:**
- `lib/strategy-engine.js` - Combines Dome + Soup + public data
- `lib/miyomi-decision-framework.js` - Scoring system for opportunities

**Logic:**
```javascript
async function generateDailyStrategy() {
  // 1. Scan public markets (Polymarket, Kalshi)
  const publicMarkets = await scanPublicMarkets();

  // 2. Enhance with Dome intelligence
  const domeSignals = await dome.findContrarianOpportunities();

  // 3. For each opportunity, decide strategy
  for (const market of publicMarkets) {
    const signal = domeSignals.find(s => s.market === market.slug);

    if (signal && signal.confidence > 0.75) {
      // High confidence contrarian signal

      if (market.volume > 100000) {
        // Large existing market - take position on Polymarket
        return {
          strategy: 'TRADE_EXISTING',
          platform: 'Polymarket',
          position: signal.contrarian,
          reasoning: `Dome shows ${signal.confidence} confidence reversal`
        };
      } else {
        // Small market - create better version on Soup
        return {
          strategy: 'CREATE_ALTERNATIVE',
          platform: 'Soup',
          marketParams: {
            question: market.question,
            betterOdds: adjustOdds(market.price, signal.edge)
          },
          reasoning: `Low liquidity on Polymarket. Creating Miyomi version with fairer odds.`
        };
      }
    }
  }

  // 4. Check for unique Miyomi market opportunities
  const uniqueOpportunities = await generateUniqueMarketIdeas();
  if (uniqueOpportunities.length > 0) {
    return {
      strategy: 'CREATE_UNIQUE',
      platform: 'Soup',
      market: uniqueOpportunities[0],
      reasoning: 'No one else creating markets like this. Brand building opportunity.'
    };
  }
}
```

---

## Competitive Moat Analysis

### What Others Have
- ✅ Access to Polymarket/Kalshi public prices
- ✅ Basic charting and price history
- ✅ Social media presence
- ✅ Trading strategies

### What Miyomi Has (Proprietary)
- ✅ **Dome order flow data** (no one else has this)
- ✅ **Soup market creation** (permission-less)
- ✅ **Video generation pipeline** (Eden + audio working)
- ✅ **Character/personality** (22yo NYC oracle brand)
- ✅ **Combined intelligence stack** (Dome insights → Soup markets → Content)

### Defensibility

**Network effects:**
1. More followers → more liquidity in Miyomi Markets
2. More markets → more resolution history → more oracle trust
3. More videos → more SEO → more discovery
4. More data → better AI insights → better picks

**Proprietary data moat:**
- Dome API access (paid, not public)
- Historical resolution record (Miyomi-specific)
- Whale tracking database (manually curated)
- Video content library (unique IP)

**Platform independence:**
- Not reliant on Polymarket for market creation
- Can experiment with categories Polymarket won't touch
- Control resolution criteria
- Build "Miyomi Markets" brand separate from existing platforms

---

## Revenue Model with Proprietary Edge

### Revenue Stream 1: Affiliate (Base)
- Polymarket/Kalshi affiliate links
- **Dome advantage:** Better picks = more clicks
- **Goal:** 5% CTR (vs industry 1-2%)

### Revenue Stream 2: Market Making (New)
- Soup market spread capture
- **Example:** Create market, place orders at 0.45/0.55, earn 10% spread
- **Goal:** 5-10% monthly return on deployed capital

### Revenue Stream 3: Premium Intelligence (Future)
- $25/mo: Access to Dome intelligence dashboard
- See whale trackers, momentum signals, correlation analysis
- **Justification:** Proprietary data others can't get

### Revenue Stream 4: Oracle Fees (Future)
- Charge 1-2% fee on Miyomi Markets total volume
- Similar to Polymarket's model
- **Justification:** Oracle service + market creation value

---

## Security & Access Control

### API Key Management
```bash
# .env.local
DOME_API_KEY=xxx                    # Proprietary market data
SOUP_PROTOCOL_PRIVATE_KEY=xxx       # Market creation wallet
MIYOMI_ORACLE_PRIVATE_KEY=xxx       # Resolution authority
EDEN_API_KEY=xxx                    # Video generation
```

**Best practices:**
- Dome key: Rotate monthly, monitor usage
- Soup keys: Hardware wallet for oracle, hot wallet for liquidity
- Never commit to git (already protected via .gitignore)
- Log all API calls for audit trail

### Data Privacy
**Dome order data contains:**
- Wallet addresses
- Trade sizes
- Timing information

**Use responsibly:**
- Don't dox specific wallets publicly
- Aggregate signals, don't expose raw data
- Focus on patterns, not individuals
- Build trust through ethical use

---

## Success Metrics

### Dome Intelligence KPIs
- **Signal accuracy:** % of Dome contrarian signals that reverse
- **Target:** 65%+ accuracy on >0.75 confidence signals
- **Edge validation:** Dome picks outperform random by X%

### Soup Markets KPIs
- **Market volume:** Total trading in Miyomi Markets
- **Target:** $10k/month by Month 2
- **Resolution record:** % of markets resolved fairly + on-time
- **Target:** 95%+ (build oracle trust)
- **Market-making P&L:** Profit from spread capture
- **Target:** 5-10% monthly return

### Combined Platform KPIs
- **Unique opportunity rate:** Markets Miyomi creates that don't exist elsewhere
- **Target:** 1-2 unique Miyomi Markets per week
- **Cross-platform arbitrage:** Opportunities to fade Polymarket + create Soup alternative
- **Target:** 1 per week
- **Content performance:** Views on Miyomi Market videos vs Polymarket pick videos
- **Target:** 20%+ higher engagement (unique markets = more interesting)

---

## Next Steps

### Week 1: Dome Advanced Features
- [ ] Build smart money tracker
- [ ] Build volume spike detector
- [ ] Build cross-market correlation
- [ ] Integrate into morning brief AI

### Week 2: Soup Infrastructure
- [ ] Set up Soup SDK integration
- [ ] Test market creation on testnet
- [ ] Build oracle resolution flow
- [ ] Deploy first test market

### Week 3: Combined Strategy
- [ ] Build strategy engine (decides: trade existing vs create new)
- [ ] Trainer dashboard: Show Dome insights + Soup create button
- [ ] Generate first Miyomi Market video
- [ ] Test end-to-end flow

### Week 4: Launch
- [ ] First production Miyomi Market on Soup mainnet
- [ ] Video announcement across all platforms
- [ ] Track engagement vs standard Polymarket picks
- [ ] Iterate based on what resonates

---

## Bottom Line

**Your unfair advantages:**

1. **Dome API** = See order flow, momentum, smart money that others can't
2. **Soup.xyz** = Create markets others can't, control resolution, earn spread
3. **Combined Intelligence** = Dome insights → Soup markets → Content = unique position

**Strategic priorities:**

1. **Short-term (Month 1):** Use Dome to find better Polymarket picks (validate proprietary data edge)
2. **Mid-term (Month 2-3):** Launch Miyomi Markets on Soup (build brand, test market making)
3. **Long-term (Month 4+):** Scale unique markets, premium intelligence tier, oracle reputation

**The moat:**

No one else can replicate this stack:
- Dome access (paid, not public)
- Soup expertise (technical barrier)
- Video pipeline (Eden + audio working)
- Character (Miyomi brand)
- Historical track record (resolution history)

**Stay ahead by:**
- Building Dome features others don't know exist
- Creating Soup markets Polymarket won't approve
- Documenting oracle methodology for trust
- Using proprietary data ethically for competitive edge

**This is your proprietary edge.** Build it systematically over next 10 weeks alongside oracle content platform. 🚀
