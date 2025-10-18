# Dome API Integration Status

**Updated:** October 3, 2025
**API Key:** Received and working ✅

---

## What's Working ✅

### 1. Order History Endpoint
**Endpoint:** `GET /polymarket/orders`

**Status:** ✅ WORKING

**Capabilities:**
- Fetch historical trades for any wallet address
- Filter by market, condition, token, or time range
- Pagination support (limit/offset)
- Returns full trade details: side, shares, price, timestamp, tx_hash

**Example:**
```javascript
const dome = new DomeClient(DOME_API_KEY);
const orders = await dome.getOrderHistory({
  user: '0x8ae2...',
  market_slug: 'us-government-shutdown-by-october-1',
  limit: 100
});
```

**Use Cases for Miyomi:**
- Track all trades for transparent P&L reporting
- Analyze historical trading patterns
- Build performance dashboard
- Verify trades for token holder transparency

### 2. PnL Calculation (Manual)
**Method:** `calculatePnLFromOrders(wallet)`

**Status:** ✅ WORKING (calculated from order history)

**Capabilities:**
- Calculate total P&L from buy/sell orders
- Win rate calculation (wins / total trades)
- Per-market breakdown
- Works until native `/wallet/pnl` endpoint is available

**Example:**
```javascript
const pnl = await dome.calculatePnLFromOrders('0x8ae2...');
// Returns: { total_pnl, win_rate, wins, losses, trades_count, markets_traded }
```

**Test Results:**
- Tested with wallet `0x8ae2e93ead25c5d41e5f1b3c209c552cf7eb325d`
- Successfully calculated $3M+ volume, 28.6% win rate, 7 trades
- ✅ Ready for production use

---

## What's Documented But Not Available Yet ⏳

### 1. Market Price Endpoint
**Endpoint:** `GET /market-price/{token_id}`

**Status:** ⏳ Documented but returns 404

**Expected Capabilities:**
- Current market prices by token ID
- Historical price lookup via `at_time` parameter
- Real-time price data

**Workaround:**
For now, we'll continue using Polymarket's direct API for market prices. Once Dome launches this endpoint, we can switch to their cleaner data.

### 2. Candlestick Data Endpoint
**Endpoint:** `GET /candlesticks/{condition_id}`

**Status:** ⏳ Documented but returns 404

**Expected Capabilities:**
- OHLCV (Open/High/Low/Close/Volume) data
- Multiple time intervals (1m, 5m, 15m, 1h, 4h, 1d)
- Historical price trends for technical analysis

**Workaround:**
We won't have candlestick data for now. This limits our ability to detect momentum exhaustion for contrarian signals. We'll rely on current consensus levels only until this becomes available.

### 3. Wallet PnL Endpoint (Native)
**Endpoint:** `GET /wallet/pnl/{wallet_address}`

**Status:** ⏳ Documented but returns 404

**Expected Capabilities:**
- Automated P&L calculation by Dome
- Cross-platform analytics (Polymarket + Kalshi)
- Time-range filtering

**Workaround:**
✅ Our `calculatePnLFromOrders()` method provides equivalent functionality by analyzing order history. This works well for now.

---

## Impact on Miyomi Project

### Original Plan vs Current Reality

**Original Dome Integration Plan:**
1. ✅ Order history → Track trades
2. ⏳ Market prices → Find opportunities
3. ⏳ Candlestick data → Momentum analysis
4. ✅ Wallet PnL → Performance tracking (manual calculation)

**Revised Plan:**
1. ✅ **Use Dome for trade tracking** - Order history works perfectly
2. ✅ **Use Dome for PnL calculation** - Manual calculation from orders works
3. ⏳ **Keep Polymarket API for opportunities** - Until Dome's market price endpoint launches
4. ⏳ **Skip candlestick analysis for now** - Not critical for v1, can add later

### What We Can Do RIGHT NOW

**✅ Immediate Capabilities:**
- Track Miyomi's trades transparently via Dome order history
- Calculate real-time P&L from order history
- Display verified trading performance on dashboard
- Build credibility with third-party data provider

**⏳ Waiting For:**
- Enhanced opportunity detection with historical price context
- Momentum exhaustion signals from candlestick data
- Cross-platform analytics (when Kalshi support added)

### Updated Timeline

**Week 1 (Current - Oct 3):**
- ✅ Dome API key received
- ✅ Order history endpoint working
- ✅ PnL calculation implemented
- ⏳ Continue with existing Polymarket API for opportunities

**Week 2-3:**
- Build video pipeline (unblocked - we have enough to proceed)
- First contrarian trade using Polymarket API
- Track trade via Dome order history
- Display PnL on dashboard via Dome calculation

**Future (When Dome Launches More Endpoints):**
- Migrate opportunity detection to Dome's market price endpoint
- Add candlestick analysis for better signals
- Enhanced dashboard with historical charts

---

## Technical Implementation

### Current Integration

```javascript
// lib/dome-client.js - WORKING
import { DomeClient } from './lib/dome-client.js';

const dome = new DomeClient(process.env.DOME_API_KEY);

// Track Miyomi's trades
const miyomiWallet = '0x...'; // Miyomi's wallet address
const orders = await dome.getOrderHistory({
  user: miyomiWallet,
  limit: 1000
});

// Calculate P&L for dashboard
const pnl = await dome.calculatePnLFromOrders(miyomiWallet);

console.log(`Total P&L: $${pnl.total_pnl}`);
console.log(`Win Rate: ${pnl.win_rate}%`);
console.log(`Trades: ${pnl.trades_count} (${pnl.wins}W / ${pnl.losses}L)`);
```

### API Endpoints Summary

| Endpoint | Status | Our Implementation |
|----------|--------|-------------------|
| `/polymarket/orders` | ✅ Working | `getOrderHistory()` |
| `/market-price/{token_id}` | ⏳ Not yet | Use Polymarket API |
| `/candlesticks/{condition_id}` | ⏳ Not yet | Skip for now |
| `/wallet/pnl/{wallet}` | ⏳ Not yet | `calculatePnLFromOrders()` |

---

## Recommendations

### For Immediate Development (This Week):

1. **✅ Use Dome for what works:**
   - Trade tracking via order history
   - PnL calculation from orders
   - Display "Verified by Dome API" badge

2. **⏳ Keep existing approach for what doesn't:**
   - Opportunity detection: Continue with Polymarket direct API
   - Market scanning: Use existing `lib/polymarket-client.js`

3. **🔄 Plan for migration:**
   - Build opportunity scanner to be swappable
   - When Dome launches market-price endpoint, easy switch
   - When candlesticks available, add momentum analysis

### For Token Launch (December):

**What we HAVE for credibility:**
- ✅ Third-party trade verification (Dome order history)
- ✅ Calculated P&L from verified trades
- ✅ Transparent performance tracking

**What would be NICE to have:**
- ⏳ Native Dome PnL endpoint (but manual calculation works)
- ⏳ Historical price charts (not critical for v1)
- ⏳ Cross-platform analytics (Miyomi only trading Polymarket initially)

**Conclusion:** We have enough for token launch. Dome's order history provides the credibility we need.

---

## Next Steps

### Immediate (Today):
- ✅ Dome client library complete
- ✅ Order history working
- ✅ PnL calculation working
- ⏳ Document findings (this file)
- ⏳ Update main documentation

### This Week:
- Build Vercel API endpoint `/api/dome/pnl` using `calculatePnLFromOrders()`
- Test with Miyomi wallet (once she starts trading)
- Update dashboard to display Dome-calculated P&L
- Add "Verified by Dome API" badge

### When Dome Launches New Endpoints:
- Monitor Dome docs for market-price and candlesticks launch
- Migrate opportunity detection to Dome
- Add historical analysis features
- Test enhanced contrarian signals

---

## Contact Dome Team

**Questions to Ask:**
1. When will `market-price`, `candlesticks`, and `wallet/pnl` endpoints be available?
2. Is there a roadmap or timeline we can follow?
3. Can we get early access for testing when they launch?
4. Will Kalshi support be added? (for cross-platform analytics)

**Feedback:**
- Order history endpoint works great! ✅
- Manual PnL calculation from orders is a good workaround
- Looking forward to candlestick data for technical analysis
- Thank you for building this - it's exactly what prediction market traders need!

---

## Summary

**Status:** ✅ Dome integration is 50% complete (order history works, other endpoints pending)

**Impact on Miyomi:** ✅ No blocker - we have enough to proceed with video production and first trades

**Timeline:** ✅ No change - still targeting mid-December token launch

**Value:** ✅ High - Order history provides third-party trade verification for credibility

**Next Action:** Continue building video pipeline and first contrarian trade. Dome will track trades transparently.

---

**Last Updated:** October 3, 2025
**Status:** Dome API partially integrated, ready for production use with what's available
