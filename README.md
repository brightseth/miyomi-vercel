# MIYOMI - The Contrarian Oracle

**AI Agent Evolution: Trader → Market Maker → Oracle**

[![Live Production](https://img.shields.io/badge/Live-miyomi.ai-green)](https://miyomi.ai)
[![Phase](https://img.shields.io/badge/Phase-1%20Trader-blue)](https://github.com/yourusername/miyomi-vercel)
[![AI](https://img.shields.io/badge/AI-Claude%204.5%20Sonnet-purple)](https://www.anthropic.com)

---

## 🎯 Vision: Make Your Own Market

**Miyomi** is an AI agent that trades prediction markets with a contrarian strategy, generates video content, and will eventually create her own markets as an oracle.

**The Evolution:**
- **Phase 1 (NOW):** Trade on Polymarket + Kalshi → Prove the model
- **Phase 2 (Q1 2026):** Create markets on Soup.xyz → Be the oracle

---

## 🚀 What is Miyomi?

**Concept:** A contrarian prediction market trader with personality

- Identifies markets where consensus is extreme (>75% or <25%)
- Takes opposing positions publicly
- Generates 30-60s videos explaining her contrarian thesis
- Tracks transparent P&L and win rate
- Builds reputation through public track record

**Personality:** NYC downtown trader mixing sophisticated analysis with chaos energy
- "Everyone thinks Bitcoin hits $100k? Let me tell you why they're wrong..."
- References bodega wisdom, Dimes Square, Mercury retrograde + Fed meetings
- Confident contrarian: "The crowd is always wrong at extremes"

---

## 📊 Project Structure

### Core Documentation
```
MIYOMI_VISION_ROADMAP.md        - Complete evolution (trader → market maker)
MIYOMI_MARKET_MAKER.md          - Technical architecture for Phase 2
MIYOMI_MARKETS_README.md        - Product vision and philosophy
MIYOMI_COLLABORATION_BRIEF.md   - For developers (jmill collaboration)
DEPLOYMENT_GUIDE.md             - Step-by-step deployment
```

### Implementation
```
lib/
├── polymarket-client.js        - Polymarket API integration
├── kalshi-client.js            - Kalshi API integration
└── soup-client.js              - Soup.xyz protocol (Phase 2)

api/
├── miyomi/
│   ├── create-market.js        - Create Soup markets (Phase 2)
│   └── resolve-market.js       - Oracle resolution (Phase 2)
└── generate-video-v2.js        - Eden video generation

public/
├── miyomi-markets.html         - Markets dashboard (Phase 2)
└── [other dashboards]
```

---

## 🏗️ Technical Architecture

### Phase 1: MIYOMI THE TRADER (Current)

```
MIYOMI BRAIN (Claude 4.5)
    ↓
Contrarian Analysis
    ↓
TRADE EXECUTION
    ├─ Polymarket API (get markets, identify opportunities)
    └─ Kalshi API (economic indicators focus)
    ↓
POSITION TRACKING (Supabase)
    ↓
VIDEO GENERATION (Eden API)
    ↓
SOCIAL POSTING (Farcaster/Twitter)
    ↓
PUBLIC DASHBOARD (miyomi.ai)
```

### Phase 2: MIYOMI THE MARKET MAKER (Future)

```
MIYOMI BRAIN (Claude 4.5)
    ↓
DECISION: Trade vs Create
    ↓
    ├─ TRADE (existing markets)    ├─ CREATE MARKET (Soup.xyz)
    │   • Polymarket                │   • prepareCondition()
    │   • Kalshi                    │   • Seed liquidity
    │   • Soup DEX                  │   • Be oracle
    │                               │   • Resolve with evidence
    └───────────┬───────────────────┘
                ↓
    VIDEO GENERATION (Eden API)
                ↓
    SOCIAL POSTING + PUBLIC DASHBOARD
```

---

## 🛠️ Tech Stack

**Backend:**
- Vercel serverless functions
- Supabase PostgreSQL
- Node.js/TypeScript

**APIs:**
- Polymarket CLOB API - Prediction markets
- Kalshi API - Regulated prediction markets
- Soup.xyz Protocol - Permissionless market creation (Phase 2)
- Eden API - Video generation
- Neynar SDK - Farcaster posting

**Frontend:**
- Static HTML/CSS/JS (lightweight, fast)
- Real-time updates via polling

**AI:**
- Anthropic Claude 4.5 Sonnet (analysis + personality)

**Blockchain (Phase 2):**
- Base L2 (for Soup.xyz markets)
- viem (Ethereum interactions)
- USDC (collateral)

---

## 🎨 Key Features

### Phase 1 (Trading)
✅ Polymarket integration with contrarian detection
✅ Kalshi integration for economic indicators
✅ Video generation with Eden API
✅ Public P&L tracking
✅ Transparent win rate dashboard
✅ Social media integration

### Phase 2 (Market Making)
✅ Soup.xyz smart contract integration (code ready)
✅ Market creation API endpoints (ready to deploy)
✅ Oracle resolution system (built)
✅ Market dashboard UI (complete)
⏳ Waiting for Soup.xyz contract deployment

---

## 📈 Phase 2: Soup.xyz Market Making

### What is Soup.xyz?

**Soup Protocol** (by Clearing-Company) is next-gen prediction markets on Base L2:

**Key Features:**
- ✨ **Permissionless** - Anyone can create markets
- 🎨 **Creative freedom** - Any question (culture + finance, astrology + economics)
- 🔮 **Creator as oracle** - You resolve outcomes with evidence
- 💰 **Market making fees** - Earn from liquidity provision
- 🔗 **On-chain transparency** - All trades visible on Base

**Why This Matters:**
```
Traditional: "Will Bitcoin hit $100k?" (platform creates, platform resolves)
Miyomi: "Will Dimes Square be mentioned in NYT?" (Miyomi creates, Miyomi resolves)
```

**Protocol Documentation:**
- Docs: https://docs.soup.xyz (password: `chickennoodle`)
- Indexer: https://i.soup.xyz (REST) + wss://i.soup.xyz/ws (WebSocket)
- Status: Pre-launch (contracts not deployed yet)

**When Soup Launches:**
1. Deploy market creation module (already built)
2. Test on Base Sepolia testnet
3. Create first Miyomi market
4. Transition to hybrid model (trade + create)

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/miyomi-vercel.git
cd miyomi-vercel
npm install
```

### 2. Environment Setup
```env
# .env.local

# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# Eden API (Video Generation)
EDEN_API_KEY=xxx

# Phase 2: Soup.xyz (when available)
MIYOMI_ORACLE_PRIVATE_KEY=xxx
MIYOMI_ORACLE_ADDRESS=xxx
BASE_RPC_URL=https://mainnet.base.org
```

### 3. Deploy
```bash
npx vercel --prod
```

### 4. Access
- **Dashboard:** https://your-deployment.vercel.app
- **API:** https://your-deployment.vercel.app/api/miyomi/*

---

## 📖 Documentation

### For Users
- **MIYOMI_VISION_ROADMAP.md** - The evolution story with UI/UX wireframes
- **MIYOMI_MARKETS_README.md** - Product vision and example markets

### For Developers
- **MIYOMI_COLLABORATION_BRIEF.md** - Technical collaboration guide
- **MIYOMI_MARKET_MAKER.md** - Complete architecture and APIs
- **DEPLOYMENT_GUIDE.md** - Step-by-step setup instructions

### Total Documentation: ~20,000 words

---

## 💡 Example Markets

### Phase 1: Trading on Existing Markets
```
Market: "Will Bitcoin hit $100k by Dec 31?" (Polymarket)
Crowd: 87% YES
Miyomi: Takes NO at 0.13
Thesis: "Funding rates exhausted, retail euphoria peaked..."
Result: BTC closes at $94k → Miyomi wins
```

### Phase 2: Creating Miyomi Markets
```
Market: "Will Dimes Square be mentioned in NYT this month?"
Creator: Miyomi (oracle)
Initial: YES @ 0.35, NO @ 0.65
Miyomi: 200 YES @ 0.35
Thesis: "Downtown culture always bubbles up to mainstream..."
Resolution: NYT publishes article → YES (Miyomi resolves with evidence)
Miyomi earns: Trading profit + market making fees
```

---

## 📊 Success Metrics

### Phase 1 Goals (Month 1-3)
- 20+ trades executed
- 60%+ win rate
- 20+ videos published
- Positive cumulative P&L
- 1,000+ social followers

### Phase 2 Goals (Month 4+)
- First Miyomi market: $5k volume
- 5 markets created & resolved
- 95%+ resolution accuracy
- $500+ market making revenue
- Combined revenue > trading alone

---

## 🤝 Collaboration

### Want to Help?

**We're looking for:**
- Eden API integration expertise
- Full-stack developers
- Prediction market enthusiasts
- Content creators
- Community managers

**See:** `MIYOMI_COLLABORATION_BRIEF.md` for details

**Contact:**
- GitHub: Issues on this repo
- Farcaster: @seth
- Email: [your email]

---

## 🎬 Content Strategy

### Weekly Schedule
- **Monday 9am:** New contrarian trade + announcement video
- **Wednesday 2pm:** Mid-week update (if significant movement)
- **Friday 4pm:** Resolution + P&L update
- **Sunday 7pm:** Weekly recap

### Video Templates
1. **Announcement:** Hook → Thesis → Position → CTA
2. **Update:** Current status → Analysis → Adjustment
3. **Resolution:** Outcome → Evidence → Lesson/Victory
4. **Recap:** Weekly performance → Best trades → Tease next

---

## 💰 Revenue Model

### Phase 1
1. Trading profits from contrarian positions
2. Content monetization (views, sponsorships)
3. Premium subscription for detailed analysis

### Phase 2 (Additional)
4. Market making fees from Soup.xyz markets
5. Oracle reputation (trusted resolution = more traders)
6. "Miyomi Markets" brand licensing

---

## 🔐 Security

- Hot wallet for oracle operations (gas only)
- Cold wallet for treasury (large holdings)
- All trades logged and auditable
- API rate limiting
- Database row-level security

---

## 📝 License

MIT License - See LICENSE file

---

## 🙏 Credits

**Built by:** Seth Goldstein
**AI:** Anthropic Claude 4.5 Sonnet
**Video:** Eden API
**Markets:** Polymarket, Kalshi, Soup.xyz (pending)
**Infrastructure:** Vercel, Supabase, Base L2

---

## 🚦 Project Status

**Current Phase:** Phase 1 Implementation
**Next Milestone:** Eden video integration
**Waiting On:** Soup.xyz contract deployment (Phase 2)

**Last Updated:** October 1, 2025

---

*"The crowd is always wrong at extremes. I teach you when to fade them."* - Miyomi

---

## 📚 Additional Resources

- **Live Site:** https://miyomi.ai (when deployed)
- **Documentation:** See markdown files in repo root
- **Soup.xyz Docs:** https://docs.soup.xyz (password: `chickennoodle`)
- **Eden API:** https://docs.eden.art/api
- **Polymarket API:** https://docs.polymarket.com
- **Kalshi API:** https://trading-api.readme.io
