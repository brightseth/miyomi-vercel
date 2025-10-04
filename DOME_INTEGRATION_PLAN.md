# Dome API Integration Plan

**Date:** October 3, 2025
**Project:** Miyomi - Contrarian Prediction Market AI
**Status:** Waiting for API key

---

## What is Dome API?

Dome API is a specialized prediction market data service providing:
- **Order history** - Historical trades across platforms
- **Market prices** - Real-time and historical pricing
- **Candlestick data** - OHLCV data for technical analysis
- **Wallet PnL** - Automated profit/loss tracking

**Platforms Supported:** Polymarket, Kalshi (our exact targets!)

**Docs:** https://docs.domeapi.io/

---

## Why This Helps Miyomi

### Current Problems It Solves

1. **Polymarket API Issues** - We've had trouble getting truly active markets
2. **Manual PnL Tracking** - Currently need to calculate wins/losses manually
3. **Limited Historical Data** - Hard to identify true contrarian patterns
4. **No Cross-Platform Analytics** - Can't easily compare Polymarket vs Kalshi performance

### New Capabilities It Enables

1. **Better Opportunity Detection**
   - Historical price data shows when consensus became extreme
   - Candlestick patterns identify momentum exhaustion
   - True contrarian signals vs just current odds

2. **Automated Performance Tracking**
   - Wallet PnL endpoint gives real-time profitability
   - No manual reconciliation needed
   - Transparent public dashboard data

3. **Strategy Refinement**
   - Analyze which contrarian bets worked best
   - Identify optimal entry/exit points
   - Learn from order history patterns

4. **Credibility Building**
   - Third-party verified performance data
   - Real trading history for token launch
   - Transparent track record for token holders

---

## Integration Architecture

### New Components

```
lib/dome-client.js
├── getOrderHistory(wallet, filters)
├── getMarketPrice(marketId, timeRange)
├── getCandlestickData(marketId, interval)
└── getWalletPnL(wallet, platform)

api/dome/
├── pnl.js              - Fetch Miyomi's performance
├── market-data.js      - Get enhanced market info
└── opportunities.js    - Enhanced contrarian scanner

Enhanced Features:
├── Historical price analysis for better detection
├── Automated PnL dashboard updates
├── Cross-platform performance comparison
└── Candlestick-based contrarian signals
```

### Integration Points

**1. Opportunity Scanner Enhancement**
```javascript
// Current: Just check current odds
if (odds > 0.75) { /* contrarian opportunity */ }

// With Dome: Check historical context
const history = await dome.getCandlestickData(marketId, '1h');
if (odds > 0.75 && recentMomentumExhausted(history)) {
  /* HIGH CONFIDENCE contrarian opportunity */
}
```

**2. Automated PnL Tracking**
```javascript
// Current: Manual calculation from database
const trades = await db.trades.findAll();
const pnl = calculateManually(trades);

// With Dome: Direct API call
const pnl = await dome.getWalletPnL(MIYOMI_WALLET, 'all');
// Use for dashboard, token holder reporting
```

**3. Dashboard Enhancement**
```javascript
// Add to miyomi.ai dashboard:
- Real-time PnL chart (from Dome candlestick data)
- Win rate by platform (Polymarket vs Kalshi)
- Historical performance graphs
- Trade execution quality metrics
```

---

## Implementation Plan

### Phase 1: Core Integration (Day 1)
- [ ] Create `/lib/dome-client.js` with all 4 endpoints
- [ ] Add `DOME_API_KEY` to `.env.local`
- [ ] Test basic connectivity with all endpoints
- [ ] Document API response formats

### Phase 2: Opportunity Scanner (Day 2)
- [ ] Enhance `/api/opportunities/polymarket.js` with Dome data
- [ ] Add historical price context to contrarian detection
- [ ] Use candlestick data for momentum analysis
- [ ] Test improved opportunity quality

### Phase 3: PnL Tracking (Day 3)
- [ ] Create `/api/dome/pnl.js` endpoint
- [ ] Update database schema if needed (may not need manual tracking)
- [ ] Build automated PnL refresh workflow
- [ ] Test accuracy vs manual calculations

### Phase 4: Dashboard Integration (Day 4)
- [ ] Add PnL chart to miyomi.ai
- [ ] Display historical performance graphs
- [ ] Show platform-specific analytics
- [ ] Add "Verified by Dome API" badge for credibility

### Phase 5: Testing & Documentation (Day 5)
- [ ] End-to-end testing with real trades
- [ ] Verify PnL accuracy
- [ ] Update README.md with Dome integration
- [ ] Document for jmill and other collaborators

---

## Technical Details

### Environment Variables

```bash
# Add to .env.local
DOME_API_KEY=xxx_your_key_here
MIYOMI_WALLET_ADDRESS=xxx  # For PnL tracking
```

### API Client Structure

```javascript
// lib/dome-client.js

export class DomeClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.domeapi.io/v1'; // Adjust based on docs
  }

  async getOrderHistory(wallet, options = {}) {
    // Fetch historical orders
    // Useful for: Understanding past patterns, strategy analysis
  }

  async getMarketPrice(marketId, timeRange = '24h') {
    // Get current + historical prices
    // Useful for: Real-time opportunity scanning
  }

  async getCandlestickData(marketId, interval = '1h') {
    // OHLCV data for technical analysis
    // Useful for: Momentum exhaustion, contrarian signals
  }

  async getWalletPnL(wallet, platform = 'all') {
    // Calculate profit/loss automatically
    // Useful for: Dashboard, token holder reporting, credibility
  }
}
```

### Enhanced Opportunity Detection

```javascript
// api/opportunities/dome.js

async function findContrarianOpportunities() {
  const markets = await dome.getMarketPrice('all', '7d');

  const opportunities = [];

  for (const market of markets) {
    // Current consensus
    const currentOdds = market.latestPrice;

    // Historical context
    const candles = await dome.getCandlestickData(market.id, '1h');
    const avgVolume = calculateAverage(candles.map(c => c.volume));
    const priceChange = candles[0].close - candles[candles.length - 1].open;

    // Enhanced detection
    if (currentOdds > 0.75 && priceChange > 0.10 && volumeIncreasing(candles)) {
      // High confidence: Extreme consensus + recent momentum + high volume
      opportunities.push({
        market: market.id,
        currentOdds,
        confidence: 'HIGH',
        reason: 'Momentum exhaustion after rapid move',
        historicalContext: { priceChange, avgVolume }
      });
    }
  }

  return opportunities;
}
```

---

## Benefits Summary

### For Miyomi (The Agent)
- Better trade selection (historical context)
- Automated performance tracking
- Learning from past patterns
- Cross-platform optimization

### For Token Holders
- Transparent, third-party verified performance
- Real-time PnL tracking
- Confidence in revenue projections
- Professional analytics dashboard

### For Development Team
- Cleaner API integration (one provider vs multiple)
- Reduced manual reconciliation work
- Better debugging (order history visibility)
- Scalable data infrastructure

### For Token Launch
- Credible track record (verified by Dome)
- Professional-grade analytics
- Transparent reporting infrastructure
- Industry-standard data provider

---

## Cost Considerations

**Need to determine:**
- Pricing tiers (free tier available?)
- Rate limits per plan
- Cost per API call
- Monthly budget estimate

**Expected Usage:**
- Opportunity scanner: ~100 calls/day (market prices)
- PnL tracking: ~10 calls/day (wallet updates)
- Historical analysis: ~50 calls/day (candlestick data)
- Order history: ~5 calls/day (learning/debugging)

**Total:** ~165 API calls/day = ~5,000 calls/month

---

## Success Metrics

### Integration Success
- [ ] All 4 endpoints working and tested
- [ ] <500ms response times
- [ ] 99%+ uptime
- [ ] Accurate PnL calculations (matches manual)

### Opportunity Quality Improvement
- [ ] Find 2-3 high-confidence opportunities per week (vs 0-1 currently)
- [ ] Win rate improves by 10%+ with historical context
- [ ] Reduced false positives (extreme odds without real edge)

### Dashboard Enhancement
- [ ] Real-time PnL chart live on miyomi.ai
- [ ] Historical performance graphs (7d, 30d, all-time)
- [ ] Platform comparison (Polymarket vs Kalshi ROI)
- [ ] "Verified by Dome API" credibility badge

---

## Timeline

**Waiting:** API key approval from Dome
**Estimated Integration:** 5 days once key received
**Target Completion:** Mid-October 2025

---

## Next Steps

1. **Seth:** Get Dome API key (in progress)
2. **Seth:** Test API access and review actual response formats
3. **Claude:** Build client library once key available
4. **Claude:** Integrate into opportunity scanner
5. **Seth + Claude:** Test with real market data
6. **Claude:** Update dashboard with enhanced analytics
7. **Seth:** Document in investor/trainer materials

---

## Questions for Dome Support

- What's the rate limit on free/paid tiers?
- Can we access historical data before Miyomi starts trading?
- What's the latency on real-time price updates?
- Do you support webhook notifications for price changes?
- Can we get testnet access for development?

---

## Documentation References

- **Dome API Docs:** https://docs.domeapi.io/
- **Current Polymarket Client:** `/lib/polymarket-client.js`
- **Current Kalshi Client:** `/lib/kalshi-client.js`
- **Opportunity Scanner:** `/api/opportunities/polymarket.js`
- **Database Schema:** `/database/schema-simple.sql`

---

**Status:** Ready to implement once API key received
**Priority:** HIGH - Solves multiple current blockers
**Impact:** Significantly improves opportunity detection and credibility
