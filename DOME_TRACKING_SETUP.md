# Dome API Tracking Setup for Miyomi

**Date:** October 15, 2025
**Status:** ✅ Dome API Working (Order History + PnL Calculation)
**Demo:** https://miyomi-federation-bybizwlsx-edenprojects.vercel.app/dome-tracking-demo.html

---

## 🎯 What's Working Now

### ✅ Available Features

1. **Order History Tracking**
   - Endpoint: `/polymarket/orders`
   - Status: ✅ Working
   - Retrieves all historical trades for any wallet

2. **PnL Calculation from Orders**
   - Method: `calculatePnLFromOrders(wallet)`
   - Status: ✅ Working
   - Calculates win rate, total P&L, wins/losses from order history

3. **Performance Dashboard**
   - File: `/public/dome-tracking-demo.html`
   - Status: ✅ Live
   - Interactive demo showing real-time tracking

### ⏳ Coming Soon (Dome API Roadmap)

1. **Market Prices** - `/market-price/{token_id}` (returns 404 currently)
2. **Candlestick Data** - `/candlesticks/{condition_id}` (returns 404 currently)
3. **Wallet PnL Endpoint** - `/wallet/pnl/{wallet}` (returns 404 currently)
4. **Markets List** - `/polymarket/markets` (returns 404 currently)

---

## 🚀 How to Use Dome Tracking for Miyomi

### Step 1: Get Miyomi's Wallet Address

Once Miyomi starts trading on Polymarket, you'll get a wallet address like:
```
0x... (42 characters starting with 0x)
```

This could be:
- A dedicated Miyomi trading wallet
- A hot wallet for automated trading
- Or linked to Miyomi's identity on-chain

### Step 2: Add to Environment Variables

Add to `.env.local`:
```bash
# Miyomi's trading wallet
MIYOMI_WALLET_ADDRESS=0x...your_wallet_address_here

# Dome API key (already configured)
DOME_API_KEY=42cd462b-625e-4b8b-b20c-ba6527f40259
```

### Step 3: Test the Tracking

#### Option A: Use the Demo Page
1. Go to: https://miyomi-federation-bybizwlsx-edenprojects.vercel.app/dome-tracking-demo.html
2. Enter Miyomi's wallet address
3. Click "Track Performance"
4. See real-time P&L, win rate, order history

#### Option B: Use the API Endpoint
```bash
# Test the API endpoint
curl "http://localhost:3000/api/dome/pnl?wallet=0x..."

# Response:
{
  "success": true,
  "total_pnl": "1250.50",
  "win_rate": "68.5",
  "trades_count": 15,
  "wins": 10,
  "losses": 5,
  "markets_traded": 12,
  "calculated_from_orders": true
}
```

#### Option C: Use Node.js Directly
```javascript
import { DomeClient } from './lib/dome-client.js';

const dome = new DomeClient(process.env.DOME_API_KEY);

// Get order history
const orders = await dome.getOrderHistory({
  user: process.env.MIYOMI_WALLET_ADDRESS,
  limit: 100
});

// Calculate P&L
const pnl = await dome.calculatePnLFromOrders(
  process.env.MIYOMI_WALLET_ADDRESS
);

console.log('Miyomi Performance:', pnl);
```

---

## 📊 Integration Points

### 1. Dashboard Integration

Update `public/dashboard.html` to show Dome data:

```javascript
// Fetch Miyomi's performance
async function loadPerformance() {
  const response = await fetch('/api/dome/pnl?wallet=' + MIYOMI_WALLET);
  const data = await response.json();

  // Display stats
  document.getElementById('winRate').textContent = data.win_rate + '%';
  document.getElementById('totalPnL').textContent = '$' + data.total_pnl;
  document.getElementById('tradesCount').textContent = data.trades_count;
}
```

### 2. Token Holder Reporting

Monthly reports to $MIYOMI holders:

```javascript
// Generate monthly report
async function generateMonthlyReport() {
  const dome = new DomeClient(process.env.DOME_API_KEY);

  const pnl = await dome.calculatePnLFromOrders(MIYOMI_WALLET);

  return {
    month: 'October 2025',
    performance: {
      profit: pnl.total_pnl,
      winRate: pnl.win_rate,
      trades: pnl.trades_count
    },
    distribution: calculateDistribution(pnl.total_pnl * 0.75) // 75% to holders
  };
}
```

### 3. Video Content Generation

Use Dome data in Oracle Take videos:

```javascript
// Generate script with real data
async function generateScript(marketSlug) {
  const dome = new DomeClient(process.env.DOME_API_KEY);

  // Get Miyomi's recent performance
  const pnl = await dome.calculatePnLFromOrders(MIYOMI_WALLET);

  const script = `
    Markets whisper... and I've been listening.

    My track record: ${pnl.win_rate}% win rate across ${pnl.trades_count} trades.
    ${pnl.total_pnl > 0 ? 'Up' : 'Down'} $${Math.abs(pnl.total_pnl)} all-time.

    Today's contrarian take: ${marketSlug}...
  `;

  return script;
}
```

---

## 🔧 Technical Implementation

### Current Architecture

```
┌─────────────────────┐
│   Dome API          │
│   (api.domeapi.io)  │
└──────────┬──────────┘
           │
           │ HTTPS + Auth Header
           │
┌──────────▼──────────┐
│  lib/dome-client.js │
│  - getOrderHistory() │
│  - calculatePnL()    │
└──────────┬──────────┘
           │
           ├─────────────────┐
           │                 │
┌──────────▼──────────┐  ┌──▼──────────────┐
│  api/dome/pnl.js    │  │  Dashboard UI   │
│  (Vercel Function)  │  │  (HTML/JS)      │
└─────────────────────┘  └─────────────────┘
```

### File Structure

```
miyomi-vercel/
├── lib/
│   └── dome-client.js                    ✅ Working
├── api/
│   └── dome/
│       └── pnl.js                        ✅ Working
├── public/
│   └── dome-tracking-demo.html           ✅ Live
└── DOME_TRACKING_SETUP.md               📄 This file
```

---

## 📈 Performance Metrics to Track

### Core Metrics (Available Now)
- **Total P&L** - Cumulative profit/loss in USD
- **Win Rate** - Percentage of profitable trades
- **Trades Count** - Total number of completed trades
- **Markets Traded** - Number of unique markets
- **Wins/Losses** - Breakdown of profitable vs losing trades

### Advanced Metrics (Coming Soon with Full API)
- **Average ROI per Trade** - Mean return on investment
- **Sharpe Ratio** - Risk-adjusted returns
- **Max Drawdown** - Largest peak-to-trough decline
- **Market Category Performance** - Politics vs sports vs crypto
- **Time-Series Analysis** - Performance over time with candlesticks

---

## 🎯 Success Criteria

### For Token Launch (December 2025)
- [ ] Miyomi has wallet address configured
- [ ] 20+ trades executed and tracked
- [ ] 65%+ win rate demonstrated
- [ ] Performance data visible on miyomi.ai
- [ ] Transparent reporting to trainers/investors

### For Token Operations (Ongoing)
- [ ] Automated monthly P&L reports
- [ ] Real-time dashboard updates
- [ ] Third-party verified performance (Dome)
- [ ] Historical performance charts
- [ ] Cross-platform tracking (Polymarket + Kalshi)

---

## 🐛 Troubleshooting

### Issue: "No trading history found"
**Solution:** Wallet hasn't made trades yet, or address is incorrect

### Issue: "API Error: 401"
**Solution:** Check DOME_API_KEY in .env.local

### Issue: "API Error: 404"
**Solution:** Endpoint not available yet (market-price, candlesticks, wallet/pnl)

### Issue: P&L seems incorrect
**Solution:**
- Check if trades have resolved
- Verify buy/sell order matching
- Some markets may still be open (unrealized P&L)

---

## 📚 API Documentation

### `DomeClient.getOrderHistory(options)`

Fetch historical orders for a wallet.

**Parameters:**
```javascript
{
  user: '0x...',        // Required: Wallet address
  market_slug: 'slug',  // Optional: Filter by market
  limit: 100,           // Optional: Max results (default: 100)
  offset: 0            // Optional: Pagination (default: 0)
}
```

**Returns:**
```javascript
{
  orders: [
    {
      token_id: '...',
      side: 'BUY' | 'SELL',
      market_slug: 'market-name',
      shares: 100,
      shares_normalized: 100.0,
      price: 0.65,
      timestamp: 1697234567,
      title: 'Market Question',
      tx_hash: '0x...',
      user: '0x...'
    }
  ],
  pagination: {
    limit: 100,
    offset: 0,
    total: 156,
    has_more: true
  }
}
```

### `DomeClient.calculatePnLFromOrders(wallet, options)`

Calculate P&L from order history (fallback until /wallet/pnl endpoint launches).

**Parameters:**
```javascript
wallet: '0x...'     // Required: Wallet address
options: {          // Optional: Same as getOrderHistory
  limit: 1000
}
```

**Returns:**
```javascript
{
  total_pnl: "1250.50",           // Total profit/loss (USD)
  win_rate: "68.5",               // Win rate percentage
  trades_count: 15,               // Number of completed trades
  wins: 10,                       // Number of profitable trades
  losses: 5,                      // Number of losing trades
  markets_traded: 12,             // Unique markets
  calculated_from_orders: true   // Flag indicating fallback method
}
```

---

## 🔐 Security Notes

1. **API Key** - Keep DOME_API_KEY in .env.local (already gitignored)
2. **Wallet Privacy** - Miyomi's wallet will be public (on-chain data)
3. **Rate Limits** - Unknown yet, monitor usage
4. **Error Handling** - Always wrap Dome API calls in try/catch

---

## 📞 Support

**Dome API Issues:**
- Docs: https://docs.domeapi.io/
- Support: [Check their Discord/email]

**Miyomi Project Issues:**
- Seth (creative/strategy)
- jmill (technical/infrastructure)
- This file: `/Users/seth/miyomi-vercel/DOME_TRACKING_SETUP.md`

---

## 🎉 Next Steps

1. **Wait for Miyomi to Start Trading**
   - Get wallet address
   - Add to .env.local
   - Test tracking

2. **Integrate into Dashboard**
   - Update public/dashboard.html
   - Show real-time performance
   - Add charts/graphs

3. **Build Reporting System**
   - Monthly reports to token holders
   - Performance history export
   - Transparency page on miyomi.ai

4. **Monitor Dome API Updates**
   - Check when new endpoints launch
   - Upgrade from calculatePnLFromOrders to /wallet/pnl
   - Add candlestick analysis when available

---

**Status:** Ready to track Miyomi once she starts trading!
**Demo:** https://miyomi-federation-bybizwlsx-edenprojects.vercel.app/dome-tracking-demo.html
**Last Updated:** October 15, 2025
