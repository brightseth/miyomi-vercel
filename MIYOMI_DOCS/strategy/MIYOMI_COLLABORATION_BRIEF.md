# MIYOMI - Collaboration Brief for jmill

**Date:** October 1, 2025
**From:** Seth
**To:** jmill
**Re:** Miyomi Markets - Technical Collaboration Proposal

---

## Executive Summary

**Miyomi** is an AI agent that trades prediction markets with a contrarian strategy, generates video content explaining her thesis, and will eventually create her own markets as an oracle. She's launching as an **Eden Spirit** with real tokenomics and royalty distributions.

**3-Phase Evolution:**
- **Phase 1 (Oct-Nov 2025):** Trade on Polymarket + Kalshi, prove the model
- **Phase 2 (Dec 2025/Jan 2026):** Launch $MIYOMI token, join Spirit Protocol
- **Phase 3 (Q1 2026):** Create markets on Soup.xyz as oracle

**Launch Target: December 2025 / January 2026**

**Your role:** Help integrate Eden's video generation API and potentially advise on Spirit Protocol integration/architecture.

---

## Project Context

### What is Miyomi?

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

### Why This is Interesting

1. **Content + Markets fusion** - Every trade is a piece of content
2. **Transparent trading** - Public P&L, no BS
3. **Personality-driven** - Not generic analysis, Miyomi's voice
4. **Evolution potential** - Phase 2 = she creates markets as oracle
5. **Eden integration** - Natural use case for video generation

---

## Technical Architecture

### Current State (Phase 1)

```
MIYOMI BRAIN (Claude AI)
    ↓
Contrarian Analysis
    ↓
TRADE EXECUTION
    ├─ Polymarket API (get markets, identify opportunities)
    └─ Kalshi API (economic indicators focus)
    ↓
POSITION TRACKING (Supabase)
    ↓
VIDEO GENERATION (Eden API) ← Your expertise needed here
    ↓
SOCIAL POSTING (Farcaster/Twitter)
    ↓
PUBLIC DASHBOARD (miyomi.ai)
```

### Tech Stack

**Backend:**
- Vercel serverless functions
- Supabase PostgreSQL
- Node.js/TypeScript

**APIs:**
- Polymarket CLOB API (prediction markets)
- Kalshi API (regulated prediction markets)
- Eden API (video generation) ← **Need help here**
- Neynar SDK (Farcaster posting)

**Frontend:**
- Static HTML/CSS/JS (lightweight, fast)
- Real-time updates via polling (WebSocket later)

**AI:**
- Anthropic Claude 4.5 Sonnet (analysis + personality)

### Database Schema

```sql
-- Miyomi's trades
CREATE TABLE miyomi_trades (
  id UUID PRIMARY KEY,
  platform TEXT NOT NULL, -- 'polymarket' | 'kalshi'
  market_id TEXT NOT NULL,
  question TEXT,
  position TEXT NOT NULL, -- 'YES' | 'NO'
  entry_price DECIMAL(10,6),
  amount DECIMAL(10,2),
  entry_date TIMESTAMP,
  exit_price DECIMAL(10,6),
  exit_date TIMESTAMP,
  pnl DECIMAL(10,2),
  status TEXT DEFAULT 'open',
  category TEXT,
  thesis TEXT,
  video_url TEXT,
  social_post_ids JSONB
);

-- Performance metrics
CREATE TABLE miyomi_performance (
  date DATE PRIMARY KEY,
  trades_today INTEGER,
  wins INTEGER,
  losses INTEGER,
  pnl_today DECIMAL(10,2),
  cumulative_pnl DECIMAL(10,2),
  win_rate DECIMAL(5,2)
);
```

---

## Where I Need Your Help

### 1. Eden Video Generation Integration (PRIMARY)

**Current Status:**
- I have Eden API key: `db10962875d98d2a2dafa8599a89c850766f39647095c002`
- I've built skeleton integration in `/api/generate-video-v2.js`
- Videos are 30-60 seconds, 9:16 format (TikTok/Shorts)

**What I Need:**

#### A. Correct Eden API Endpoint Structure
```javascript
// Is this the right pattern?
POST /api/v1/eden/agents/miyomi/generate-video
or
POST /api/v1/create

// What's the actual endpoint for video generation?
// What parameters does it accept?
// What's the response format?
```

#### B. Video Generation Parameters
```javascript
// What fields can I use?
{
  agent_id: "miyomi" or "68aae13174876e833d9ae73b",
  text: "Script text...",
  duration: 30,
  aspect_ratio: "9:16",
  voice: "miyomi_confident"?, // Does this exist?
  style: "contrarian_oracle"?, // Can we define styles?
  background: "trading_charts"? // Can we specify backgrounds?
}
```

#### C. Polling/Webhook for Completion
```javascript
// How do I know when video is ready?
// Is there a webhook callback?
// Or do I poll a status endpoint?
// How long does generation typically take?
```

#### D. Cost & Rate Limits
- How much does video generation cost per request?
- Are there rate limits I should know about?
- Best practices for production use?

### 2. Architecture Review (SECONDARY)

**Question:** Does this architecture make sense given Eden's patterns?

```javascript
// api/miyomi/generate-trade-video.js
export default async function handler(req, res) {
  const { trade, thesis, category } = req.body

  // 1. Generate script (Claude)
  const script = await generateScript(trade, thesis)

  // 2. Call Eden API
  const video = await edenClient.generateVideo({
    script,
    duration: 30,
    style: category // 'contrarian', 'culture', 'crypto'
  })

  // 3. Save video URL to database
  await supabase
    .from('miyomi_trades')
    .update({ video_url: video.url })
    .eq('id', trade.id)

  // 4. Return video URL
  return res.json({ video_url: video.url })
}
```

**Concerns:**
- Should video generation be synchronous or async?
- Should I queue video jobs vs. generate on-demand?
- How do I handle failures/retries?

### 3. Eden Agent Profile Setup (OPTIONAL)

**Question:** Should Miyomi be a registered Eden agent?

- Does Eden have an agent registry?
- Would Miyomi benefit from having an official profile?
- Can we customize voice/appearance for consistency?

---

## Phase 2: Soup.xyz Market Making (Future)

**Timeline:** When Soup.xyz launches (Q1 2026?)

### What is Soup.xyz?

**Soup Protocol** (developed by Clearing-Company) is a next-generation prediction market infrastructure on Base L2:

**Key Components:**
1. **SCTF (Soup Conditional Token Framework)** - ERC1155-based binary outcome tokens
2. **Decentralized Exchange** - On-chain orderbook with capital efficiency optimizations
3. **Public Indexer** - REST + WebSocket API at `i.soup.xyz` for market data

**Why Soup > Polymarket/Kalshi for Phase 2:**
- ✅ **Fully decentralized** - No operator, uncensorable
- ✅ **Anyone can create markets** - No approval process
- ✅ **Creator is oracle** - Miyomi controls resolution
- ✅ **Capital efficient** - JIT collateralization (same collateral across multiple orders)
- ✅ **On-chain transparency** - All trades visible on Base
- ✅ **Real-time WebSocket** - Live order book updates

**Protocol Documentation:**
- Docs: https://docs.soup.xyz (password: `chickennoodle`)
- Public Indexer: `https://i.soup.xyz` (REST) + `wss://i.soup.xyz/ws` (WebSocket)
- GitHub: `Clearing-Company/protocol-sdk` (not yet published)

### How Miyomi Uses Soup.xyz

**Market Creation Flow:**
```solidity
// 1. Prepare condition (create market)
function prepareCondition(
    address collateral,      // USDC
    address oracle,          // Miyomi's wallet
    bytes32 groupID,         // 0x0 for standalone
    bytes description,       // JSON with question + criteria
    string[2] outcomes       // ["YES", "NO"]
) returns (bytes32 conditionID)

// 2. Split collateral into outcome tokens
function split(bytes32 conditionID, uint256 amount)
// Miyomi deposits $1,000 USDC → gets 1,000 YES + 1,000 NO tokens

// 3. Place initial orders (seed liquidity)
DEX.placeOrder(/* YES @ 0.45 */)
DEX.placeOrder(/* NO @ 0.55 */)

// 4. Community trades on Soup DEX
// Miyomi earns market making spread

// 5. Resolution time
function resolveCondition(bytes32 conditionID, int8 result)
// result: 0 = YES wins, 1 = NO wins, 2 = 50/50 invalid

// 6. Winners redeem tokens for USDC
function redeem(bytes32 conditionID, uint8 index, uint256 amount)
```

### What Changes in Phase 2

**New Capabilities:**
- Miyomi can CREATE markets (not just trade on them)
- She becomes the oracle (resolves outcomes with evidence)
- New revenue stream: market making fees + trading profits
- Unique markets: culture + finance hybrids, questions that don't exist elsewhere

**Already Built (Ready to Activate):**
- Complete Soup.xyz integration module (`/lib/soup-client.js`)
- Market creation API endpoint (`/api/miyomi/create-market.js`)
- Oracle resolution system (`/api/miyomi/resolve-market.js`)
- Dashboard UI for created markets (`/public/miyomi-markets.html`)
- Database schema for Miyomi markets

**Pending (When Soup Launches):**
- Contract addresses (currently not public - protocol in development)
- Testing on Base Sepolia testnet
- Wallet setup for oracle transactions
- Fund oracle wallet with ETH (gas) + USDC (liquidity)

**Your Involvement:**
- Phase 1: Primary (Eden video integration)
- Phase 2: Advisory/optional (blockchain heavy, but you may have insights on Base/smart contracts)

### Why Soup Protocol Matters (The Big Picture)

**Problem with existing prediction markets:**
- Polymarket: Centralized, limited questions, oracles controlled by platform
- Kalshi: Regulated only, slow approvals, boring categories
- Manifold: Play money, no real stakes

**Soup Protocol enables:**
- ✨ **Permissionless market creation** - Anyone can ask any question
- 🎨 **Creative markets** - Culture + finance, astrology + economics, bodega wisdom + macro
- 🔮 **Creator as oracle** - You control resolution = you control outcome criteria
- 💰 **Market making revenue** - Earn fees from liquidity provision
- 🎬 **Content fusion** - Every market is content, every video drives liquidity

**Why This is Revolutionary for Miyomi:**
```
Phase 1: "Everyone's betting YES at 87%. I'm taking NO."
         → Miyomi as trader on other people's markets

Phase 2: "I just created a market: Will Dimes Square be mentioned
         in NYT this month? I'm the oracle. Trade with me or against me."
         → Miyomi as market maker + oracle + content creator
```

**This is the evolution from:**
- Reacting to markets → Creating markets
- Trading on consensus → Setting the question
- Following oracles → Being the oracle
- Platform user → Platform creator

**For prediction market enthusiasts like you (jmill):**
- This is what decentralized markets should be
- Soup = prediction markets meet Uniswap (permissionless, composable)
- Miyomi = showcase of what's possible when anyone can create markets
- Content + markets fusion = new paradigm

---

## Collaboration Models

### Option 1: Advisory (Lightweight)
**Time commitment:** 2-4 hours total
**What:**
- 30-min call to review Eden API integration
- Async Slack/Discord for questions
- Code review of video generation module

**Compensation:** $200-500 consulting fee

### Option 2: Co-development (Medium)
**Time commitment:** 10-20 hours over 2-3 weeks
**What:**
- Build Eden integration together
- Set up video generation pipeline
- Test and optimize video quality
- Deploy to production

**Compensation:** $1,500-3,000 or equity in Miyomi project

### Option 3: Partnership (Full)
**Time commitment:** Ongoing
**What:**
- Joint project ownership
- You handle all Eden integration + video pipeline
- I handle trading logic + AI + product
- Revenue share when monetization starts

**Compensation:** 20-30% equity + future revenue split

---

## Project Status

### ✅ Completed
- Architecture documentation (3 comprehensive docs)
- Polymarket integration (`/lib/polymarket-client.js`)
- Kalshi integration (`/lib/kalshi-client.js`)
- Soup.xyz integration (`/lib/soup-client.js`) - ready for launch
- Database schema designed
- Dashboard UI wireframes
- Vision/roadmap document

### 🚧 In Progress
- Eden video generation integration ← **Need your help**
- API endpoints for trade tracking
- Trader dashboard implementation
- Deployment to Vercel

### 📋 Not Started
- Social media auto-posting
- Performance analytics
- Premium subscription features
- Mobile responsive design

---

## Documentation Available

All located in `/Users/seth/miyomi-vercel/`:

1. **MIYOMI_VISION_ROADMAP.md** (6,000 words)
   - Complete evolution story (trader → Spirit → market maker)
   - UI/UX wireframes for all three phases
   - Content strategy and examples
   - Token launch timeline

2. **MIYOMI_SPIRIT_TOKENOMICS.md** (5,000 words)
   - Complete token economics for $MIYOMI
   - Spirit Protocol integration details
   - Revenue → royalty distribution mechanics
   - Launch requirements and timeline
   - Example monthly flow scenarios

3. **MIYOMI_MARKET_MAKER.md** (8,000 words)
   - Technical architecture for Soup.xyz integration
   - Database schemas
   - API specifications
   - Security considerations

4. **MIYOMI_MARKETS_README.md** (4,000 words)
   - Product vision and philosophy
   - Example markets
   - Revenue model
   - Launch roadmap

5. **DEPLOYMENT_GUIDE.md** (3,000 words)
   - Step-by-step setup instructions
   - Environment variables
   - Testing procedures
   - Troubleshooting

**Total:** ~26,000 words of comprehensive documentation

---

## Questions for You

### Technical Questions
1. What's the correct Eden API endpoint for video generation?
2. What parameters are available for customization?
3. How should I handle async video generation?
4. What's the typical generation time?
5. Any rate limits or cost considerations?

### Strategic Questions
1. Does this use case align with Eden's Spirit Protocol vision?
2. Is there an existing Spirit I should learn from?
3. Should Miyomi be in Eden's Spirit registry?
4. Any features/capabilities of the Spirit Protocol I'm not aware of?
5. How does royalty distribution work for other Spirits?
6. What's the graduation process from agent → Spirit?

### Collaboration Questions
1. Which collaboration model interests you?
2. Timeline - when would you have availability?
3. Preferred communication (Slack, Discord, email)?
4. Any concerns or red flags you see?

---

## Why This is a Good Fit

### For You (jmill)
1. **Showcase Eden** - Real production use case for video generation
2. **Prediction markets** - You mentioned you like this space
3. **Interesting tech** - AI agents, markets, blockchain, content
4. **Clear scope** - Phase 1 is well-defined and achievable
5. **Portfolio piece** - Unique project to show off

### For Eden
1. **Spirit Protocol showcase** - First prediction market Spirit with proven revenue
2. **Agent use case** - Demonstrates video generation in novel way
3. **Content creation** - 3+ videos per week, ongoing
4. **Market expansion** - Prediction market community exposure
5. **Revenue validation** - Real royalty distributions to $MIYOMI holders
6. **Token launch precedent** - Template for future Spirit graduations

### For Me (Seth)
1. **Video expertise** - I don't know Eden API well, you do
2. **Quality assurance** - Your review ensures production-ready
3. **Speed** - Your help = faster launch
4. **Learning** - I learn Eden's patterns from an expert

---

## Timeline Proposal

### Week 1: Alignment & Setup
- Review this document
- 30-min kickoff call
- Share Eden API documentation/examples
- Clarify collaboration model

### Week 2: Eden Integration
- Build video generation module
- Test with sample trades
- Optimize parameters (duration, style, etc.)
- Handle async/polling

### Week 3: Testing & Polish
- Generate 5-10 test videos
- Review quality and consistency
- Adjust scripts/parameters
- Prepare for production

### Week 4: Launch Phase 1
- Deploy to production (miyomi.ai)
- First real trade + video
- Monitor and iterate
- Gather community feedback

---

## Success Metrics (Phase 1)

**Month 1-3 Goals:**
- ✅ 20+ trades executed
- ✅ 60%+ win rate
- ✅ 20+ videos published (with Eden)
- ✅ Positive cumulative P&L
- ✅ 1,000+ social followers
- ✅ Public dashboard live

**Video Quality Metrics:**
- Generation success rate: >95%
- Average generation time: <5 minutes
- Video engagement: >50% watch rate
- Cost per video: <$5

---

## Next Steps

### If Interested:
1. **Reply** with which collaboration model sounds good
2. **Schedule** 30-min call to discuss technical details
3. **Share** Eden video generation docs/examples
4. **Review** the existing code in GitHub (can give you access)

### If Not Interested:
1. **Point me** to Eden API documentation I might have missed
2. **Suggest** someone else who might be a good fit
3. **Feedback** on the concept/architecture is still valuable

---

## Contact

**Seth Goldstein**
- Email: [your email]
- Farcaster: @seth
- Twitter: [your handle]
- GitHub: [your repo]

**Project Repo:** `/Users/seth/miyomi-vercel` (can share private repo link)

**Live Site (when deployed):** https://miyomi.ai

---

## Appendix: Code Samples

### Current Eden Integration (Needs Your Review)

```javascript
// api/generate-video-v2.js
export default async function handler(req, res) {
  const { category, position, thesis, script } = req.body

  try {
    // TODO: Replace with actual Eden API call
    const edenResponse = await fetch('https://api.eden.art/v1/create', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.EDEN_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agent_id: 'miyomi', // Is this correct?
        text: script,
        duration: 30,
        aspect_ratio: '9:16'
        // What other parameters are available?
      })
    })

    const data = await edenResponse.json()

    // How do I get the video URL?
    // Is it immediate or do I need to poll?
    const videoUrl = data.video_url ?? data.url ?? null

    res.json({
      success: true,
      video_url: videoUrl,
      job_id: data.job_id ?? null
    })

  } catch (error) {
    console.error('[Eden] Video generation failed:', error)
    res.status(500).json({ error: 'Video generation failed' })
  }
}
```

### Script Generation Example

```javascript
// Miyomi's contrarian script template
function generateContrarianScript(trade) {
  const { question, consensus, miyomiPosition, thesis } = trade

  return `
Bestiesss, everyone's betting ${consensus} on "${question}"
at ${(consensus === 'YES' ? trade.yesPrice : trade.noPrice) * 100}%.

${thesis}

I'm taking ${miyomiPosition} at ${trade.entryPrice}.
$${trade.amount} position.

Link in bio. Let's fade the consensus together.
  `.trim()
}
```

---

**TL;DR:** Miyomi is a contrarian prediction market trader that needs Eden's video generation API to create content. Phase 1 is trading on existing markets, Phase 2 is creating her own markets. I need your help with Eden integration. Let's talk?

---

*"The crowd is always wrong at extremes."* - Miyomi
