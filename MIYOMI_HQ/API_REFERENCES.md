# MIYOMI - API REFERENCES

**Quick reference for all prediction market and trading APIs**

---

## 🎯 PREDICTION MARKET PLATFORMS

### Polymarket
**Website**: https://polymarket.com
**Docs**: https://docs.polymarket.com
**Status**: Primary revenue source (affiliate deals)

**Key Features**:
- Largest prediction market (crypto-based)
- Election, sports, crypto, macro markets
- USDC settlement on Polygon
- No KYC for trading (read-only API public)

**API Access**:
- Public: Market data, orderbooks (no auth needed)
- Private: Requires API key for trading
- GraphQL endpoint: https://gamma-api.polymarket.com/

**For Miyomi**:
- Use for market scanning
- Track contrarian opportunities
- Affiliate links for signups

---

### Kalshi
**Website**: https://kalshi.com
**Docs**: https://docs.kalshi.com
**Status**: Secondary revenue source (affiliate deals)

**Key Features**:
- CFTC-regulated prediction market (USD)
- Elections, economics, weather, sports
- Direct USD deposits/withdrawals
- KYC required

**API Access**:
- REST API: https://api.elections.kalshi.com/trade-api/v2
- Python SDK: `pip install kalshi-python` (v2.1.4)
- Public endpoints: No auth needed for market data
- Private endpoints: API key for trading

**Quick Start**:
```bash
# Market data (no auth)
curl https://api.elections.kalshi.com/trade-api/v2/markets

# Python
pip install kalshi-python
```

**For Miyomi**:
- Alternative to Polymarket
- More "legit" for US users
- Affiliate revenue potential

**Support**: Discord #dev channel

---

## 📊 UNIFIED DATA APIS

### Dome API ⭐ PRIMARY
**Website**: https://domeapi.io
**Docs**: https://docs.domeapi.io
**Status**: Y Combinator F25 - Already integrated

**What It Does**:
Unified API for prediction markets (Polymarket + Kalshi + more)
- Real-time market prices
- Historical candlestick data
- Wallet analytics & P&L
- Order tracking
- Cross-platform market matching

**Key Endpoints**:
- `/markets/price` - Real-time pricing (Polymarket)
- `/markets/candlestick` - Historical OHLCV data
- `/wallet/pnl` - Portfolio performance ✅ (working)
- `/markets/match` - Find same market across platforms
- `/sports/{date}` - Sports markets by date

**SDK**:
- TypeScript: `npm install @dome-api/sdk`
- Python: `pip install dome-api-sdk`

**Authentication**:
```javascript
const dome = new DomeClient({ apiKey: 'your-api-key' });
```

**For Miyomi**:
- **PRIMARY DATA SOURCE** for performance tracking
- Cross-platform market discovery
- Wallet P&L already working in `/api/dome/pnl`

**Support**: support@domeapi.com | Discord

---

### Soup Protocol 🔒
**Website**: https://soup.xyz
**Docs**: https://docs.soup.xyz
**Password**: chickennoodle
**Status**: Future integration (Phase 2)

**What It Does**:
DeFi protocol for prediction market liquidity
- Market making infrastructure
- Automated liquidity provision
- Revenue from LP fees

**For Miyomi**:
- Phase 2 revenue stream
- Provide liquidity → earn fees
- Mentioned in tokenomics doc

**Access**: Password-protected docs (ask Seth for details)

---

## 🎥 CONTENT GENERATION

### Eden API ⭐ PRIMARY
**Website**: https://eden.art
**Docs**: https://docs.eden.art/api
**Status**: Active - Miyomi agent deployed

**Agent Details**:
- Agent ID: `68aae13174876e833d9ae73b`
- LoRA Model: `67ef2bba6e91dc8e0efc2f1c` (Yeah by iflookscouldkill)
- 15k-word personality document

**Key Endpoints**:
- `POST /v2/video/create` - Generate video
- `GET /v2/tasks/{taskId}` - Poll for completion
- `GET /v2/agents/{agentId}` - Get agent config

**Our Wrapper**:
- `lib/eden-client.js` - JavaScript wrapper
- `api/generate-video-eden.js` - API endpoint

**Usage**:
```javascript
const result = await client.generateMiyomiVideo({
  prompt: "Bitcoin just hit $100k...",
  duration: 10,  // Max 10 seconds
  aspectRatio: "9:16"
});

const video = await client.pollTaskUntilComplete(result.taskId);
console.log(video.url);
```

**Limitations**:
- Max 10 seconds per video (not 30!)
- Vertical format: 9:16 recommended
- Character consistency requires locked settings

**For Miyomi**:
- Daily video generation
- Character must be locked first (Week 1 priority)

---

## 🔧 SUPPORTING APIS

### Twitter API
**Docs**: https://developer.twitter.com
**Status**: Needed for distribution

**For Miyomi**:
- Auto-posting videos
- Reply management
- Engagement tracking
- Phase 2 (manual for now)

---

### Telegram Bot API
**Docs**: https://core.telegram.org/bots/api
**Status**: Needed for 3 channels

**For Miyomi**:
- Announcements channel (read-only)
- Degen chat (open)
- Signals Pro (gated)
- Phase 2 automation

---

## 📈 ANALYTICS & TRACKING

### Bitly / UTM Tracking
**Status**: Needed for affiliate attribution

**For Miyomi**:
- Track clicks from videos → Polymarket/Kalshi
- Measure conversion rates
- Prove revenue model

**Setup**: Week 1 (JMill)

---

## 🔑 CREDENTIALS & ACCESS

**Environment Variables** (`.env.local`):
```bash
# Eden
EDEN_API_KEY=xxx
EDEN_AGENT_ID=68aae13174876e833d9ae73b

# Dome
DOME_API_KEY=xxx
MIYOMI_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb  # Placeholder

# Polymarket (read-only, no key needed)

# Kalshi (future)
KALSHI_API_KEY=xxx
KALSHI_API_SECRET=xxx

# Soup (future)
SOUP_API_KEY=xxx
```

**Full credentials**: See `MIYOMI_HQ/QUICK_REF.md`

---

## 🚀 INTEGRATION STATUS

| API | Status | Priority | Week 1? |
|-----|--------|----------|---------|
| Eden | ✅ Working | Critical | Yes - character lock |
| Dome | ⚠️ Partial (PnL only) | High | Yes - full integration |
| Polymarket | ✅ Read-only | High | Yes - affiliate link |
| Kalshi | ❌ Not started | Medium | Maybe - affiliate link |
| Soup | ❌ Future | Low | No - Phase 2 |
| Twitter | ❌ Manual | High | Yes - handle claim |
| Telegram | ❌ Manual | High | Yes - channel setup |
| Bitly | ❌ Not started | High | Yes - tracking setup |

---

## 📚 ADDITIONAL RESOURCES

**Prediction Market Research**:
- Manifold Markets: https://manifold.markets
- Metaculus: https://www.metaculus.com
- Insight Prediction: https://insightprediction.com

**Tools**:
- Polymarket Analytics: https://polymarket.com/analytics
- Kalshi Leaderboard: https://kalshi.com/leaderboard
- Dome Dashboard: https://domeapi.io/dashboard

**Competitors to Watch**:
- Perp Protocol: https://perp.com (DeFi perps)
- Gnosis Prediction: https://gnosis.io
- Augur: https://augur.net

---

## 🆘 SUPPORT

**Dome**: support@domeapi.com | Discord
**Eden**: team@eden.art | Discord
**Kalshi**: Discord #dev channel
**Polymarket**: support@polymarket.com

**Team Internal**: See `MIYOMI_HQ/QUICK_REF.md` for full contact list

---

**Last Updated**: Oct 18, 2025
**Next Review**: After Week 1 (character lock + social setup)
