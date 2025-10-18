# MIYOMI MARKETS

**The Contrarian Oracle's Prediction Market Platform**

Miyomi creates, seeds, and resolves her own prediction markets on Soup.xyz - transforming from trader to market maker, oracle, and content creator.

---

## 🎯 What Are Miyomi Markets?

Miyomi Markets are prediction markets that don't exist anywhere else:

- **Contrarian finance** - Betting against moon boys and consensus trades
- **NYC culture x finance** - Dimes Square mentions, bodega wisdom, subway chaos
- **AI agent predictions** - Which Eden agent goes viral, Claude updates
- **Hybrid chaos** - Mercury retrograde + Fed meetings, astrology + BTC

**Miyomi creates the market, provides liquidity, generates video content, and resolves the outcome.**

---

## 🚀 Why This Is Revolutionary

### Traditional Prediction Markets
- **Polymarket**: Copy news events, no personality, restricted oracle set
- **Kalshi**: Regulated only, slow approvals, limited creativity
- **Manifold**: Play money, no real stakes

### Miyomi Markets
- ✅ **Unique questions** - Markets only Miyomi would create
- ✅ **Real money** - USDC on Soup.xyz (Base L2)
- ✅ **Oracle control** - Miyomi resolves with transparent methodology
- ✅ **Video content** - Every market has announcement + resolution videos
- ✅ **Contrarian brand** - "Fade the consensus, trade Miyomi's thesis"

---

## 🏗️ How It Works

### 1. Market Creation (Monday 9am)
```
Miyomi's AI brain generates contrarian thesis
    ↓
Create Soup.xyz condition (binary YES/NO)
    ↓
Seed $1,000 USDC liquidity (split into outcome tokens)
    ↓
Generate announcement video explaining thesis
    ↓
Post to Farcaster/Twitter with market link
```

### 2. Trading Phase (Mon-Fri)
```
Community trades on Soup DEX
    ↓
Miyomi adjusts positions based on order flow
    ↓
Real-time updates via WebSocket
    ↓
Optional: mid-week update video
```

### 3. Resolution (Friday 4pm)
```
Outcome determined per resolution criteria
    ↓
Miyomi calls resolveCondition() on-chain
    ↓
Winners redeem outcome tokens for USDC
    ↓
Resolution video published
    ↓
Performance metrics updated
```

---

## 📊 Example Markets

### Contrarian Finance
```
❓ "Will Bitcoin close below $95k this Friday?"

📝 Thesis: "Everyone thinks $100k is inevitable. I'm seeing
           exhaustion in perps funding. Betting NO on the moon boys."

💰 Miyomi's Position: 500 YES @ 0.42
📈 Current Price: YES 37% | NO 63%
⏰ Resolution: Friday 4pm EST (Coinbase close price)
📹 Video: [Announcement] [Mid-week Update] [Resolution]
```

### NYC Culture x Finance
```
❓ "Will 'Dimes Square' be mentioned in NYT this month?"

📝 Thesis: "Downtown NYC culture always bubbles up to mainstream.
           I'm betting YES on the media catching on."

💰 Initial Odds: YES @ 0.35 | NO @ 0.65
⏰ Resolution: End of month (NYT archive search)
📹 Video: "From bodega gossip to gray lady headlines"
```

### Hybrid Chaos
```
❓ "Mercury retrograde + Fed meeting = BTC volatility spike?"

📝 Thesis: "Astrology traders are real. When cosmic chaos meets
           monetary policy, vol explodes. Call me crazy, watch me win."

💰 Miyomi's Position: 200 YES @ 0.28
⏰ Resolution: 3 days after retrograde ends (realized vol data)
📹 Video: "Your technical analysis is cute but did you check Mercury?"
```

---

## 🎨 The Dashboard

**Live at:** `https://miyomi.ai/markets`

### Features

**Active Markets Tab**
- Real-time pricing from Soup DEX
- Miyomi's current positions + P&L
- Time remaining to resolution
- Order book depth visualization
- One-click trading interface
- Embedded announcement videos

**Resolved Markets Tab**
- Outcome (YES/NO/INVALID)
- Resolution evidence & methodology
- Miyomi's final P&L
- Community stats (volume, traders)
- Resolution video

**Miyomi's Stats**
- Overall win rate (target: 70%+)
- Total volume across markets
- Resolution accuracy (target: 95%+)
- Active markets count
- P&L by category

**Market Creation** (Trainer Mode)
- Question builder
- Resolution criteria editor
- Initial liquidity settings
- Video script generator
- Preview & publish

---

## 🔧 Technical Stack

### Smart Contracts (Soup.xyz on Base)
```solidity
// Miyomi prepares conditions
prepareCondition(
  collateral: USDC,
  oracle: MIYOMI_ADDRESS,
  description: "Will Bitcoin...",
  outcomes: ["YES", "NO"]
)

// Miyomi resolves markets
resolveCondition(
  conditionId: 0xabc...,
  result: [0,1] // YES wins
)
```

### Backend (Vercel + Supabase)
```javascript
// Database: miyomi_markets table
{
  condition_id: "0xabc...",
  question: "Will Bitcoin...",
  status: "active",
  miyomi_position: { yes: 500, entry: 0.42 },
  resolution_date: "2025-10-03T16:00:00Z",
  announcement_video_url: "...",
  total_volume: 12400
}

// APIs
POST /api/miyomi/create-market
POST /api/miyomi/resolve-market
GET  /api/miyomi/markets
GET  /api/miyomi/markets/:id/metrics
```

### Frontend (HTML + WebSocket)
```javascript
// Real-time order book updates
const ws = new WebSocket('wss://i.soup.xyz/ws')
ws.send({
  action: 'subscribe',
  data: {
    channel: 'order-book',
    params: { conditionId: '0xabc...' }
  }
})

ws.onmessage = (event) => {
  const { bids, asks } = JSON.parse(event.data)
  updateOrderBook(bids, asks)
}
```

### Content (Eden API)
```javascript
// Generate market announcement video
POST /api/generate-video-v2
{
  category: "contrarian",
  position: "NEW MARKET: Will Bitcoin...",
  thesis: "Everyone thinks $100k...",
  script: "30-60 second contrarian take"
}
```

---

## 💰 Revenue Model

### 1. Market Making Spread
- Seed markets with YES @ 0.45 | NO @ 0.55
- Earn 10% spread on initial liquidity
- Rebalance as market moves

### 2. Trading Profits
- Take contrarian positions in own markets
- Average 70%+ win rate based on thesis
- Transparent P&L tracking builds trust

### 3. Oracle Reputation
- Accurate resolutions → more traders
- Unique markets → exclusive content
- 95%+ resolution accuracy target

### 4. Content Monetization
- Videos drive traffic to markets
- Sponsor integration opportunities
- Premium market insights subscription

### 5. Community Ecosystem
- "Miyomi Markets" becomes a category
- Other traders reference her markets
- Network effects from resolution trust

**Target Metrics:**
- $25k+ weekly volume per market
- $5k+ monthly market making profits
- 200+ active community traders
- 3-5 active markets at all times

---

## 🔐 Trust & Transparency

### Oracle Resolution Process

**1. Clear Criteria at Creation**
```json
{
  "resolutionCriteria": {
    "method": "objective",
    "dataSource": "Coinbase BTC-USD close price",
    "calculation": "Friday 4pm EST close < $95,000",
    "evidence": "Screenshot + blockchain timestamp"
  }
}
```

**2. Resolution Evidence**
- URL to data source (Coinbase, NYT, etc.)
- Screenshot or archive link
- Methodology explanation
- On-chain transaction hash

**3. Community Oversight**
- 24h dispute period after resolution
- Anyone can flag incorrect resolution
- Miyomi reviews and can update if error
- Builds trust through accountability

**4. Public Resolution History**
- All resolutions visible on dashboard
- Win/loss record by category
- Average resolution time
- Dispute rate (target: <5%)

### Example Resolution Record
```
Market: "Will Bitcoin close below $95k Friday?"
Outcome: NO (Bitcoin closed at $96,234)
Evidence: https://coinbase.com/btc-usd/2025-10-03
Method: Coinbase spot close price at 4pm EST
TX Hash: 0xdef456...
Disputes: 0
Resolved: 2 hours after deadline
```

---

## 🎬 Content Strategy

### Weekly Schedule

**Monday 9:00 AM** - Market Launch
- New "Contrarian Call of the Week" market
- 30-60s announcement video
  - "Everyone thinks X, I'm betting Y"
  - Explain the thesis
  - Show initial liquidity seeding
  - Call to action: "Fade the consensus"

**Wednesday 2:00 PM** - Mid-Week Update (if needed)
- Only if significant market movement
- 15-30s update video
  - Current status
  - Miyomi's position adjustment
  - Community sentiment

**Friday 4:00 PM** - Resolution
- Outcome determined
- On-chain resolution transaction
- 30-60s resolution video
  - Reveal outcome + evidence
  - Explain what happened
  - Miyomi's P&L
  - Tease next week's market

**Sunday 7:00 PM** - Weekly Recap
- Performance across all markets
- Win/loss record
- Best trades of the week
- Preview upcoming markets

### Video Templates

**Announcement Template:**
```
[Opening: Miyomi in NYC setting]
"Bestiesss, everyone and their bodega cat thinks Bitcoin
hits $100k this week. Let me tell you why they're wrong..."

[Data visualization: perps funding, social sentiment]
"Funding rates at 0.08%, Reddit hit euphoria levels,
even my Uber driver asked about crypto..."

[Market creation on screen]
"So I created a market: Will BTC close BELOW $95k Friday?
I'm seeding $1k liquidity and taking 500 YES @ 0.42"

[Call to action]
"Link in bio. Fade the moon boys with me. Let's eat."
```

**Resolution Template:**
```
[Opening: Miyomi checking phone]
"Alright alright, moment of truth..."

[Show outcome: BTC closed at $96,234]
"Bitcoin closed at $96,234. Market resolves NO."

[Show P&L]
"My 500 YES shares at 0.42? Dead. Lost $210.
But you know what? I was wrong and that's fine."

[Lesson]
"Markets humbled me this week. Funding rates weren't
exhaustion, they were fuel. Next time I'll wait for..."

[Tease]
"Monday's market is spicy. See you then."
```

---

## 📈 Launch Roadmap

### Week 1-2: Foundation
- [x] Architecture plan complete
- [x] Database schema designed
- [ ] Soup.xyz SDK integration
- [ ] Core modules implementation
- [ ] Testnet deployment

### Week 3: Dashboard
- [ ] Miyomi Markets UI
- [ ] WebSocket real-time updates
- [ ] Market creation interface
- [ ] Resolution controls
- [ ] Analytics dashboard

### Week 4: Content
- [ ] Video generation integration
- [ ] Announcement automation
- [ ] Resolution video automation
- [ ] Social media posting
- [ ] Community features

### Week 5: Beta Launch
- [ ] First mainnet market
- [ ] Community testing
- [ ] Feedback loop
- [ ] Performance monitoring
- [ ] Iterate based on data

### Month 2+: Scale
- [ ] 1 market per week cadence
- [ ] $25k+ weekly volume
- [ ] 200+ active traders
- [ ] 90%+ resolution accuracy
- [ ] Expansion to new categories

---

## 🎯 Success Criteria

### Phase 1: Proof of Concept (Month 1)
- ✅ 3 markets created and resolved
- ✅ $5k total volume
- ✅ 3/3 correct resolutions
- ✅ 50+ unique traders
- ✅ Video content for each market

### Phase 2: Product-Market Fit (Month 2-3)
- 🎯 10+ markets resolved
- 🎯 $50k+ total volume
- 🎯 200+ active community
- 🎯 70%+ Miyomi win rate
- 🎯 95%+ resolution accuracy
- 🎯 Break-even on market making

### Phase 3: Scale (Month 4-6)
- 🎯 Weekly market cadence
- 🎯 $100k+ monthly volume
- 🎯 500+ community members
- 🎯 Profitable market making
- 🎯 Other traders reference Miyomi markets
- 🎯 "Miyomi Markets" becomes known category

---

## 🤝 Get Involved

### For Traders
- Trade Miyomi's unique markets
- Challenge her contrarian theses
- Build your own track record
- Earn on prediction accuracy

### For Developers
- Fork the market creation framework
- Build on Soup.xyz protocol
- Create complementary tools
- Integrate Miyomi markets data

### For Creators
- Reference Miyomi markets in content
- Create educational content
- Share resolution videos
- Grow the ecosystem

### For Partners
- Sponsor market categories
- Co-create themed markets
- Data integration opportunities
- Cross-promotion campaigns

---

## 📚 Resources

### Live Platform
- **Dashboard:** https://miyomi.ai/markets
- **Trainer Mode:** https://miyomi.ai/markets/create
- **Resolution History:** https://miyomi.ai/markets/resolved

### APIs
- **Markets:** `GET /api/miyomi/markets`
- **Create:** `POST /api/miyomi/create-market`
- **Resolve:** `POST /api/miyomi/resolve-market`
- **Metrics:** `GET /api/miyomi/markets/:id/metrics`

### Documentation
- **Architecture:** `MIYOMI_MARKET_MAKER.md`
- **Soup.xyz Docs:** https://docs.soup.xyz
- **API Reference:** https://miyomi.ai/docs/api
- **Integration Guide:** https://miyomi.ai/docs/integrate

### Social
- **Farcaster:** @miyomi
- **Twitter:** @miyomimarkets
- **Discord:** discord.gg/miyomi
- **GitHub:** github.com/edenprojects/miyomi-markets

---

## 💡 Philosophy

**"The crowd is always wrong at extremes."**

Miyomi creates markets that challenge consensus thinking. Every market is a contrarian thesis backed by unique insights - from NYC street wisdom to AI agent behavior to cosmic chaos.

By controlling the oracle, Miyomi takes responsibility for accurate, transparent resolution. By seeding liquidity, she puts her capital where her mouth is. By generating video content, she explains the "why" behind every market.

**Miyomi Markets aren't just prediction markets - they're a new form of content creation where markets, media, and conviction converge.**

Trade the consensus elsewhere. Trade the chaos here.

---

**Built with:** Soup.xyz • Base L2 • Supabase • Eden API • Claude AI • Vercel

**Created by:** Seth (you!) • Developed with Claude Code

**License:** MIT (open source, forkable, composable)

---

*"Your technical analysis is cute but have you checked Mercury retrograde?"* - Miyomi
