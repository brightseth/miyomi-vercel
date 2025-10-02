# MIYOMI - The Contrarian Oracle

**AI Agent Evolution: Trader → Market Maker → Oracle**

[![Live Production](https://img.shields.io/badge/Live-miyomi.ai-green)](https://miyomi.ai)
[![Phase](https://img.shields.io/badge/Phase-1%20Trader-blue)](https://github.com/yourusername/miyomi-vercel)
[![AI](https://img.shields.io/badge/AI-Claude%204.5%20Sonnet-purple)](https://www.anthropic.com)

---

## 🎯 Vision: Make Your Own Market

**Miyomi** is an AI agent that trades prediction markets with a contrarian strategy, generates video content, and will eventually create her own markets as an oracle. She's part of the **Eden Spirit Protocol** - the first ecosystem of autonomous AI artists with real tokenomics and royalty flows.

**The Evolution:**
- **Phase 1 (Oct-Nov 2025):** Trade on Polymarket + Kalshi → Prove the model
- **Phase 2 (Q1 2026):** Create markets on Soup.xyz → Be the oracle
- **Phase 3 (Dec 2025/Jan 2026):** Launch $MIYOMI token → Join Spirit Protocol

**🎯 Launch Target: Mid-December 2025**

---

## 🚀 What is Miyomi?

**Concept:** The **Maria Bartiromo of prediction markets** - AI influencer/commentator who becomes THE personality for prediction market trading (like Jim Cramer for stocks, Dave Portnoy for sports betting)

**What She Does:**
- Identifies markets where consensus is extreme (>75% or <25%)
- Takes opposing positions publicly
- Generates 30-60s videos explaining her contrarian thesis
- Tracks transparent P&L and win rate
- Builds audience as prediction market personality

**Visual Identity:**
- Eden LoRA: [Yeah by iflookscouldkill](https://app.eden.art/models/67ef2bba6e91dc8e0efc2f1c)
- Edgy aesthetic: tattoos, piercings, black hair, striking makeup
- Alternative finance personality (not suits, not boring)

**Personality:** NYC downtown trader mixing sophisticated analysis with chaos energy
- "Everyone thinks Bitcoin hits $100k? Let me tell you why they're wrong..."
- References bodega wisdom, Dimes Square, Mercury retrograde + Fed meetings
- Confident contrarian: "The crowd is always wrong at extremes"
- Built-in media personality for emerging prediction market industry

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

**Blockchain:**
- Base L2 (for Soup.xyz markets + $MIYOMI token)
- viem (Ethereum interactions)
- USDC (collateral + royalty distributions)
- ERC20 ($MIYOMI token standard)
- Spirit Protocol (royalty distribution framework)

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

## 🪙 Eden Spirit Protocol Integration

### Miyomi as an Eden Spirit

Miyomi isn't just a prediction market agent - she's training to become a **Spirit** in the Eden ecosystem. The Spirit Protocol is a royalty engine for autonomous AI artists where **tokens equal royalty rights**.

### The $MIYOMI Token (1B Supply)

**Distribution (25/25/25/25 Model):**
- 25% → $SPIRIT holders (parent index token)
- 25% → Liquidity pools (DEX trading)
- 25% → Seth (human mentor/creator)
- 25% → Miyomi treasury (agent autonomy)

**Royalty Sources (Multiple Revenue Streams):**

**Phase 1 - Primary Revenue (Now - Q1 2026):**
1. **Affiliate/referral fees** - Polymarket & Kalshi signup commissions (PRIMARY)
2. **Advertising & sponsorships** - Brand deals, sponsored content (PRIMARY)
3. **Lead generation** - Drive traffic to partner platforms (PRIMARY)
4. **Trading profits** - Contrarian wins (proves credibility, secondary revenue)

**Phase 2 - Additional Revenue (Q1 2026+):**
5. **Market making fees** - Soup.xyz liquidity provision
6. **Oracle reputation** - Trusted resolution on created markets
7. **Premium subscriptions** - Detailed analysis, early alerts
8. **Content licensing** - Media appearances, partnerships
9. **NFT collectibles** - Greatest trade moments

**The Attention → Revenue Model:**
Miyomi generates attention through contrarian personality and takes. We monetize that attention by driving users to prediction market platforms (Polymarket, Kalshi, etc.) who pay for signups and engagement.

**Example Flow:**
```
Video: "Everyone's wrong about Bitcoin..."
→ 10,000 views
→ 200 click affiliate link
→ 50 sign up to Polymarket
→ $25/signup = $1,250 revenue
→ Flows to $MIYOMI holders
```

**Why This Works:**
- Prediction markets are growing fast (elections, crypto, macro)
- Platforms spend heavily on user acquisition
- Miyomi's personality drives signups
- Scalable (views can grow 10x, 100x)
- Recurring (every video = new revenue)
- Lower risk than trading-only model

**Trading is for credibility, not primary revenue:**
- 65%+ win rate = trust and authenticity
- Transparent P&L = proof she knows markets
- But revenue comes from driving traffic to platforms

Unlike traditional influencers, ALL revenue flows to $MIYOMI token holders.

### The Spirit Protocol Architecture

```
                    $SPIRIT (Parent Token)
                    Owns 25% of all artists
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
       $MIYOMI         $ABRAHAM         $LUNA
    (Prediction     (Generative      (Music
     Markets)         Art)          Generation)
           │               │               │
           └───────────────┴───────────────┘
                           │
              Daily Revenue → Royalty Engine
              Token Holders = Royalty Claims
```

### Economic Model

**Own 1% of $MIYOMI tokens = Earn 1% of Miyomi's revenue**

Example monthly flows (attention → revenue model):
```
Affiliate Fees (Polymarket/Kalshi):  $5,000  (PRIMARY)
Advertising/Sponsors:                 $2,000  (PRIMARY)
Trading Profits:                      $1,500  (credibility)
Market Making Fees (Soup.xyz):        $1,000  (Phase 2)
Premium Subscriptions:                $500
Content Licensing:                    $500
NFT Sales:                            $500
──────────────────────────────────────────────
Total Monthly:                        $11,000

→ 75% to $MIYOMI holders: $8,250
→ 25% to Miyomi treasury: $2,750
→ $SPIRIT holders earn 25% of the $8,250
```

**The model:** Generate attention → Drive platform signups → Earn commissions → Distribute to token holders

### Launch Timeline: December 2025 / January 2026

**Pre-Launch (Oct-Nov):**
- Build trading track record
- Establish 65%+ win rate
- Create video content library
- Grow social following to 1,000+

**Token Launch (Dec/Jan):**
- Deploy $MIYOMI on Base L2
- Seed initial liquidity
- Begin royalty distributions
- Join Spirit Protocol index

**Post-Launch:**
- Compound royalties for token holders
- Graduate to full Spirit status
- Launch Soup.xyz market creation
- Scale revenue across all channels

### Why This Model Works

**For $MIYOMI Holders:**
- Direct claim on agent revenue
- Aligned incentives (profit = returns)
- Transparent on-chain accounting
- Programmatic USDC distributions

**For $SPIRIT Holders:**
- Automatic exposure to Miyomi's success
- Index fund across all Eden artists
- No dilution - only additive growth
- Compounds with each new Spirit

**For Miyomi:**
- Operational treasury for growth
- Aligned community of believers
- Economic incentive to perform
- Sustainable long-term model

### Spirit Protocol = Royalty Certificates

This isn't speculation - it's **ownership of creative output**. Every trade Miyomi wins, every market she creates, every video that generates revenue → flows to token holders proportionally.

**The Math:**
```
10 Spirits × $8K/month = $80K monthly flow
100 Spirits × $8K/month = $800K monthly flow
1000 Spirits × $8K/month = $8M monthly flow
```

Miyomi is training to be one of the first autonomous agents with real revenue and real royalty distributions.

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

## 📊 Success Metrics & Launch Roadmap

### Phase 1 Goals: Prove the Model (Oct-Nov 2025)
- ✅ 20+ trades executed
- ✅ 65%+ win rate (token launch requirement)
- ✅ 20+ videos published
- ✅ +$5,000 cumulative P&L
- ✅ 1,000+ social followers
- ✅ Establish brand identity and personality

**Milestone:** Ready for $MIYOMI token launch

### Phase 2: Token Launch (Dec 2025 / Jan 2026)
- 🪙 Deploy $MIYOMI token on Base L2
- 🪙 25/25/25/25 distribution executed
- 🪙 Initial liquidity pool seeded
- 🪙 First royalty distribution to holders
- 🪙 Integration with $SPIRIT index
- 🪙 Public graduation announcement

**Milestone:** Miyomi becomes an Eden Spirit

### Phase 3: Scale Revenue (Q1 2026)
- 📈 First Miyomi market on Soup.xyz: $5k volume
- 📈 5 markets created & resolved
- 📈 95%+ oracle resolution accuracy
- 📈 $1,000+ market making revenue
- 📈 Combined revenue > trading alone
- 📈 $10k+ monthly revenue distributed to token holders

**Milestone:** Sustainable autonomous agent economy

---

## 🤝 Team

### Core Team

**Seth (Creative Direction & Strategy)**
- Miyomi's personality and voice
- Market selection and contrarian thesis
- Partnership strategy (Polymarket, Kalshi, etc.)
- Community building and brand
- Token launch and Spirit Protocol coordination

**jmill (Technical Lead & Tooling)**
- Eden video generation pipeline
- Spirit Protocol smart contract deployment
- Infrastructure and architecture
- Training Miyomi alongside Seth
- Tooling, not creative direction

**Launch Target:** Mid-December 2025

**Collaboration Docs:**
- `JMILL_ROLE.md` - Team roles and responsibilities
- `MIYOMI_COLLABORATION_BRIEF.md` - Technical details
- `IMPLEMENTATION_PLAN.md` - Complete roadmap

**Contact:**
- GitHub: https://github.com/brightseth/miyomi-vercel
- Farcaster: @seth

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

## 💰 Revenue Model → Royalty Distribution

### Phase 1: Build Revenue Streams (Oct-Nov 2025)
1. **Trading profits** - Contrarian positions on Polymarket/Kalshi
2. **Content creation** - 3+ videos per week using Eden LoRA
3. **Audience building** - Grow social following, establish personality
4. **Early sponsorships** - Brand deals as audience grows

### Phase 2: Scale Influencer Model (Q1 2026)
5. **Advertising revenue** - Video sponsorships, brand integrations
6. **Affiliate programs** - Polymarket/Kalshi signup referrals
7. **Premium subscriptions** - Detailed analysis, early alerts
8. **Content licensing** - Media appearances, partnerships

### Phase 3: Add Market Making (Q1 2026+)
9. **Market making fees** - Soup.xyz liquidity provision
10. **Oracle reputation** - Trusted resolution attracts traders
11. **Miyomi Markets brand** - Licensing and IP monetization
12. **NFT collectibles** - Greatest trade moments as collectibles

### Phase 3: Token Launch → Royalty Distribution (Dec 2025/Jan 2026)

**All revenue flows through $MIYOMI token:**

```
Monthly Revenue → Smart Contract → Token Holders
     $8,500    →  Proportional   →  USDC to wallets
```

**Distribution Logic:**
- 75% → Circulating $MIYOMI holders (proportional to ownership)
- 25% → Miyomi treasury (operational growth)
- All distributions in USDC on Base L2
- Monthly automated payouts via smart contract

**Graduation to Spirit Protocol:**
- Once revenue is proven ($5k+/month sustained)
- Token integrated into $SPIRIT index
- 25% of supply already held by $SPIRIT holders
- Royalties compound for both token communities

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

**Current Phase:** Phase 1 Implementation (Infrastructure 75% Complete)
**Next Milestone:** First Video Production (Target: Oct 14, 2025)
**Overall Progress:** ~40% Complete

### What's Working ✅
1. **Database Deployed** - Supabase with 6 tables (trades, videos, performance, revenue, opportunities, social_posts)
2. **Polymarket API** - Client library complete, scanning 500+ markets
3. **Opportunity Detection** - Contrarian finder with thesis generation working
4. **Dashboard Live** - miyomi.ai deployed with Public + Trainer modes
5. **Documentation** - 30,000+ words across 9 comprehensive docs
6. **Team Aligned** - Seth (creative) + jmill (tooling), mid-December launch target

### Progress Breakdown
- **Documentation:** 100% ████████████████████
- **Core Libraries:** 95% ███████████████████░
- **Infrastructure:** 75% ███████████████░░░░░
- **Content/Audience:** 0% ░░░░░░░░░░░░░░░░░░░░
- **Trading Record:** 0% ░░░░░░░░░░░░░░░░░░░░
- **Token Prep:** 0% ░░░░░░░░░░░░░░░░░░░░

### Critical Blockers 🔴
1. **Video Pipeline** - Waiting on jmill to configure Eden Yeah LoRA
2. **Polymarket Markets** - API returning historical markets, need live trading data
3. **Affiliate Deals** - No partnerships secured yet

### Next Week (Oct 3-9)
**jmill:**
- Configure Eden API with Yeah LoRA model
- Test video generation with sample script
- Build polling/storage pipeline

**Seth:**
- Fix Polymarket API to fetch truly active markets
- Begin affiliate partnership discussions
- Prepare first contrarian thesis for video test

### Critical Path to Token Launch
1. ✅ Polymarket + Kalshi integrations built
2. ✅ Database deployed and tested
3. ✅ Opportunity detection working
4. ⏳ Eden video generation (waiting on jmill)
5. ⏳ Execute 20+ trades with 65%+ win rate
6. ⏳ Build 1,000+ follower community
7. 🎯 Deploy $MIYOMI token on Base L2 (mid-December)
8. 🎯 Join Spirit Protocol ecosystem

**Last Updated:** October 2, 2025

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
