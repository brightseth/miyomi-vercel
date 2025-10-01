# MIYOMI - Implementation Plan

**Launch Target: December 2025 / January 2026**

Complete roadmap from prototype → production → token launch → Spirit graduation

---

## 🎯 Mission

Build **Miyomi** - the Maria Bartiromo of prediction markets. An AI influencer/trader who:
1. Executes contrarian trades on Polymarket/Kalshi
2. Generates video content with personality (Eden + Yeah LoRA)
3. Builds audience as THE prediction market personality
4. Launches $MIYOMI token with real royalty distributions
5. Graduates to Eden Spirit Protocol

---

## 📅 Timeline Overview

```
Week 1-3:   Foundation (database, APIs, video pipeline, dashboard)
Week 4-12:  Trading Phase (20+ trades, 65%+ win rate, build audience)
Month 3:    Token Prep (smart contract, royalty system, Spirit integration)
Dec/Jan:    TOKEN LAUNCH → Join Spirit Protocol
Q1 2026+:   Scale (Soup.xyz markets, $10k+ monthly revenue)
```

---

## Phase 1: Foundation (Next 2-3 Weeks)

### Week 1: Core Infrastructure & Collaboration

#### 1.1 Collaborate with jmill
- **Action:** Send JMILL_INTRO.md to jmill
- **Get:**
  - Eden API endpoint + authentication
  - How to use Yeah LoRA in video generation
  - Parameters for 30-60s videos
  - Async generation (polling vs webhooks)
  - Rate limits and cost considerations
  - Character consistency best practices
- **Deliverable:** Eden video generation working with Yeah LoRA

#### 1.2 Database Setup (Supabase)
```sql
-- trades table
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- 'polymarket' | 'kalshi'
  market_id TEXT NOT NULL,
  question TEXT,
  description TEXT,
  position TEXT NOT NULL, -- 'YES' | 'NO'
  entry_price DECIMAL(10,6),
  entry_amount DECIMAL(10,2),
  entry_time TIMESTAMP WITH TIME ZONE,
  exit_price DECIMAL(10,6),
  exit_amount DECIMAL(10,2),
  exit_time TIMESTAMP WITH TIME ZONE,
  pnl DECIMAL(10,2),
  status TEXT, -- 'active' | 'closed' | 'pending'
  thesis TEXT, -- Miyomi's contrarian take
  consensus_price DECIMAL(10,6), -- Market consensus when entered
  edge DECIMAL(10,6), -- How extreme (distance from 0.5)
  video_id UUID REFERENCES videos(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES trades(id),
  eden_creation_id TEXT, -- Eden API creation ID
  prompt TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- seconds
  status TEXT, -- 'pending' | 'generating' | 'completed' | 'failed'
  farcaster_cast_hash TEXT,
  twitter_tweet_id TEXT,
  views INTEGER DEFAULT 0,
  engagement_score DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- performance tracking
CREATE TABLE performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  trades_count INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2),
  daily_pnl DECIMAL(10,2),
  cumulative_pnl DECIMAL(10,2),
  followers_count INTEGER DEFAULT 0,
  video_views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- revenue tracking (for token distributions)
CREATE TABLE revenue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  source TEXT NOT NULL, -- 'trading' | 'advertising' | 'affiliates' | 'market_making' | 'subscriptions' | 'licensing' | 'nfts'
  amount DECIMAL(10,2),
  currency TEXT DEFAULT 'USDC',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 1.3 API Endpoints
Create Vercel serverless functions:

**`/api/polymarket/opportunities`**
```javascript
// Find contrarian markets on Polymarket
// Returns markets with >75% or <25% consensus
// Sorted by edge (most extreme first)
```

**`/api/kalshi/opportunities`**
```javascript
// Find contrarian economic indicators on Kalshi
// Focus on FED, CPI, JOBS, GDP, INFL
// Returns markets with extreme consensus
```

**`/api/miyomi/analyze`**
```javascript
// Claude 4.5 Sonnet contrarian analysis
// Input: market opportunity
// Output: Miyomi's thesis, position, confidence
// Generates video script
```

**`/api/eden/generate-video`**
```javascript
// Eden API video generation
// Uses Yeah LoRA for consistent character
// Input: script, thesis, market details
// Output: creation_id for polling
```

**`/api/eden/poll-video`**
```javascript
// Poll Eden API for video completion
// Input: creation_id
// Output: video_url when ready
```

**`/api/social/post`**
```javascript
// Post to Farcaster + Twitter
// Input: video_url, trade details, affiliate links
// Output: cast_hash, tweet_id
```

---

### Week 2: Video Generation Pipeline

#### 2.1 Eden Integration (with jmill's guidance)
- Authenticate with Eden API
- Configure Yeah LoRA parameters
- Test video generation with sample scripts
- Implement polling mechanism
- Handle errors and retries
- Store results in database

#### 2.2 Content Workflow Automation
```
┌─────────────────────────────────────────┐
│  1. FIND OPPORTUNITY                    │
│  • Run Polymarket/Kalshi opportunity    │
│    finder (morning scan)                │
│  • Filter: >75% or <25% consensus       │
│  • Sort by edge + liquidity             │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  2. CLAUDE ANALYSIS                     │
│  • Generate contrarian thesis           │
│  • Write Miyomi's take (personality)    │
│  • Create video script (30-60s)         │
│  • Determine position size              │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  3. EDEN VIDEO GENERATION               │
│  • Send script + Yeah LoRA params       │
│  • Poll for completion                  │
│  • Download video + thumbnail           │
│  • Store in database                    │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  4. SOCIAL POSTING                      │
│  • Post to Farcaster with video         │
│  • Post to Twitter with video           │
│  • Include affiliate links              │
│  • Track engagement                     │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│  5. EXECUTE TRADE (Manual for now)     │
│  • Record in database                   │
│  • Track position                       │
│  • Monitor market movement              │
└─────────────────────────────────────────┘
```

#### 2.3 Testing
- Generate 3-5 test videos with different market scenarios
- Review quality and consistency
- Adjust prompts and parameters
- Confirm Yeah LoRA character consistency

---

### Week 3: Trading Dashboard

#### 3.1 Build miyomi.ai Dashboard
**Public-facing dashboard** (Static HTML/CSS/JS):

**Hero Section:**
```
┌─────────────────────────────────────────┐
│  MIYOMI - The Contrarian Oracle         │
│  The Maria Bartiromo of Prediction      │
│  Markets                                 │
│                                          │
│  [Video Player: Latest Take]            │
│                                          │
│  Win Rate: 68%  |  P&L: +$5,240        │
│  Trades: 23     |  Followers: 1,247    │
└─────────────────────────────────────────┘
```

**Active Positions:**
```
┌─────────────────────────────────────────┐
│  🔥 ACTIVE POSITIONS                    │
│                                          │
│  Bitcoin <$95k Friday? (Polymarket)    │
│  Position: 500 YES @ 0.42              │
│  Current: 0.38 → -$40 unrealized       │
│  [Watch Video] [View Market]           │
│                                          │
│  Fed hints rate cut? (Kalshi)          │
│  Position: 300 NO @ 0.62               │
│  Current: 0.71 → +$27 unrealized       │
│  [Watch Video] [View Market]           │
└─────────────────────────────────────────┘
```

**Trade History:**
```
┌─────────────────────────────────────────┐
│  ✅ CLOSED POSITIONS                    │
│                                          │
│  • Trump crypto tweet (YES) → +$150    │
│    [Video] [Market]                     │
│  • ETH >$2000 (NO) → +$230             │
│    [Video] [Market]                     │
│  • Market crash (YES) → -$180          │
│    [Video] [Market]                     │
└─────────────────────────────────────────┘
```

**Performance Chart:**
- Cumulative P&L over time
- Win rate trend
- Trade distribution (wins/losses)

#### 3.2 API Integration
- Fetch data from Supabase
- Real-time updates (polling every 30s)
- Video embeds (Eden URLs)
- Link to Polymarket/Kalshi markets

#### 3.3 Social Links
- Farcaster profile
- Twitter profile
- Polymarket affiliate link
- Kalshi affiliate link

---

## Phase 2: Launch Trading (Weeks 4-12)

### Goal: Execute 20+ Trades with 65%+ Win Rate

#### Daily Operations Workflow

**Morning (9am):**
```bash
# Run opportunity finder
curl /api/polymarket/opportunities
curl /api/kalshi/opportunities

# Review top 3-5 contrarian opportunities
# Select 1 for today's trade
```

**Mid-Morning (10am-11am):**
```bash
# Generate Miyomi's analysis
POST /api/miyomi/analyze
{
  "market": {...},
  "consensus": 0.87,
  "edge": 0.74
}

# Returns:
# - Contrarian thesis
# - Video script
# - Position recommendation
```

**Late Morning (11am-12pm):**
```bash
# Generate video
POST /api/eden/generate-video
{
  "script": "...",
  "lora": "67ef2bba6e91dc8e0efc2f1c", # Yeah LoRA
  "duration": 45
}

# Poll for completion
GET /api/eden/poll-video/{creation_id}
```

**Afternoon (1pm-2pm):**
```bash
# Post to social
POST /api/social/post
{
  "video_url": "...",
  "caption": "...",
  "affiliate_links": [...]
}

# Execute trade (manual for now)
# Record in database
```

**Evening (6pm):**
```bash
# Check position status
# Update dashboard
# Track engagement (views, comments)
```

#### Weekly Tracking

**Key Metrics:**
- Number of trades: Target 2-3 per week
- Win rate: Must maintain 65%+
- Cumulative P&L: Target +$5,000 by Month 3
- Followers: Target 1,000+ by Month 3
- Video views: Track engagement
- Affiliate signups: Track referrals

**Weekly Review (Fridays):**
- Review week's trades
- Analyze wins/losses
- Adjust strategy if needed
- Plan next week's targets

#### Content Calendar

**Monday 9am:** New contrarian trade + announcement video
**Wednesday 2pm:** Mid-week update (if significant movement)
**Friday 4pm:** Resolution + P&L update
**Sunday 7pm:** Weekly recap video

#### Revenue Streams (Phase 2)

**Primary:**
1. **Trading profits** - Contrarian wins
2. **Affiliate fees** - Polymarket/Kalshi signups from videos

**Secondary (as audience grows):**
3. **Early sponsorships** - Brand deals if >500 followers
4. **Content engagement** - Platform revenue sharing

**Track everything in `revenue` table for token distributions**

---

## Phase 3: Token Preparation (Month 3)

### Goal: Ready for December/January Launch

#### 3.1 Smart Contract Development

**ERC20 Token on Base L2:**
```solidity
// $MIYOMI Token
contract MiyomiToken is ERC20 {
    string public constant NAME = "Miyomi";
    string public constant SYMBOL = "MIYOMI";
    uint256 public constant TOTAL_SUPPLY = 1_000_000_000 * 10**18; // 1 billion

    address public spiritHolder;    // 25% (250M tokens)
    address public liquidityPool;   // 25% (250M tokens)
    address public sethAddress;     // 25% (250M tokens)
    address public miyomiTreasury;  // 25% (250M tokens)
}
```

**Royalty Distribution Contract:**
```solidity
contract MiyomiRoyalties {
    address public miyomiToken;
    address public usdcToken;

    // Distribute monthly revenue to token holders
    function distributeRoyalties(uint256 usdcAmount) external {
        // 75% to token holders (proportional)
        // 25% to Miyomi treasury

        uint256 holderShare = usdcAmount * 75 / 100;
        uint256 treasuryShare = usdcAmount * 25 / 100;

        // Transfer to treasury
        IERC20(usdcToken).transfer(miyomiTreasury, treasuryShare);

        // Distribute proportionally to all holders
        // (snapshot + merkle tree for gas efficiency)
    }
}
```

#### 3.2 Royalty Infrastructure

**Revenue Aggregation:**
```javascript
// Monthly revenue calculation
const monthlyRevenue = await aggregateRevenue({
  sources: [
    'trading',
    'advertising',
    'affiliates',
    'market_making',
    'subscriptions',
    'licensing',
    'nfts'
  ],
  month: 'December 2025'
});

// Convert all to USDC
// Prepare distribution
```

**Distribution Mechanism:**
1. Aggregate all revenue sources
2. Convert to USDC
3. Take snapshot of token holders
4. Calculate proportional shares
5. Execute smart contract distribution
6. Announce on social

#### 3.3 Pre-Launch Checklist

**Required (Must Have):**
- [x] 20+ trades executed
- [x] 65%+ win rate achieved
- [x] +$5,000 cumulative P&L
- [x] 1,000+ social followers
- [x] 20+ videos published
- [x] Brand identity established
- [x] Dashboard live at miyomi.ai
- [x] Revenue tracking system
- [x] Smart contracts audited
- [x] Spirit Protocol coordination

**Nice to Have:**
- Early sponsorship deal secured
- Media coverage of trading record
- Community of active traders
- Premium subscription waitlist
- NFT collectibles designed

---

## Phase 4: Token Launch (Dec 2025/Jan 2026)

### 4.1 Deployment Day

**Week of Launch:**

**Monday: Smart Contract Deployment**
```bash
# Deploy $MIYOMI token on Base L2
# Deploy royalty distribution contract
# Verify contracts on BaseScan
```

**Tuesday: Token Distribution**
```bash
# Execute 25/25/25/25 distribution:
# 250M → $SPIRIT treasury (automatic index)
# 250M → Liquidity pool (DEX)
# 250M → Seth wallet (locked, no immediate selling)
# 250M → Miyomi treasury (operations)
```

**Wednesday: Liquidity Pool**
```bash
# Seed initial liquidity
# Example: 250M MIYOMI + $50k USDC
# Initial price: ~$0.0002 per token
# Market cap: ~$200k FDV
```

**Thursday: Integration**
```bash
# Transfer 25% to $SPIRIT treasury
# Register with Spirit Protocol
# Add to Spirit dashboard
# Announce graduation
```

**Friday: Graduation Ceremony**
```bash
# Public announcement on Farcaster/Twitter
# First royalty distribution demo
# Community celebration event
# Press release
```

### 4.2 Post-Launch Operations

**Week 1:**
- Monitor trading activity
- Track token price
- Ensure liquidity depth
- Answer community questions

**Week 2-4:**
- Continue daily trading operations
- Track all revenue sources
- Prepare first monthly distribution

**Month 2:**
- First official royalty distribution
- Calculate APY for holders
- Share transparent on-chain accounting
- Media coverage of distribution

---

## Phase 5: Scale (Q1 2026+)

### 5.1 Market Making on Soup.xyz

**When Soup.xyz Launches:**
```bash
# Create first Miyomi market
POST /api/miyomi/create-market
{
  "question": "Will Dimes Square be mentioned in NYT this month?",
  "description": "...",
  "outcomes": ["YES", "NO"],
  "liquidity": 1000 // USDC
}

# Seed initial liquidity
# Be the oracle (resolve with evidence)
# Generate market making fees
```

**Market Creation Strategy:**
- 1 new market per week
- Hybrid culture + finance questions
- Seed $1k liquidity per market
- Target $5k+ volume per market
- Resolve with transparent evidence
- Track oracle accuracy (95%+ target)

### 5.2 Revenue Diversification

**Target: $10k+ Monthly Revenue**

**Breakdown:**
1. **Trading profits: $3,000**
   - Continue Polymarket/Kalshi contrarian trades
   - 2-3 trades per week
   - Maintain 65%+ win rate

2. **Advertising/Sponsors: $2,500**
   - Video sponsorships
   - Brand integrations
   - Platform partnerships

3. **Affiliate fees: $1,500**
   - Polymarket signups
   - Kalshi signups
   - Other platform referrals

4. **Market making: $1,000**
   - Soup.xyz market fees
   - Multiple markets active
   - Volume-based earnings

5. **Subscriptions: $1,000**
   - Premium tier: $10/month
   - 100 subscribers
   - Early alerts, detailed analysis

6. **Content licensing: $500**
   - Media appearances
   - Partnerships
   - IP licensing

7. **NFT sales: $500**
   - Greatest trade moments
   - Limited editions
   - Community collectibles

### 5.3 Long-Term Vision

**Year 1 Targets:**
- $10k+ monthly revenue
- 10,000+ followers
- 10+ Miyomi markets on Soup.xyz
- 95%+ oracle accuracy
- Established media personality

**Year 2+ Targets:**
- $50k+ monthly revenue
- 100,000+ followers
- "Miyomi Markets" brand licensing
- API access for signals
- Merchandise line
- Documentary / media deals

---

## 🚀 Critical Path Summary

### Immediate Next Steps (This Week):

1. **Send JMILL_INTRO.md to jmill** → Get Eden API guidance
2. **Set up Supabase** → Create database tables
3. **Build API endpoints** → Polymarket/Kalshi/Claude/Eden
4. **Test video generation** → Verify Yeah LoRA works

### Short Term (Week 2-3):

5. **Build dashboard** → miyomi.ai frontend
6. **End-to-end test** → Find trade → video → post → track
7. **First real trade** → Execute with video content

### Medium Term (Week 4-12):

8. **Execute 20+ trades** → Build track record
9. **Grow to 1,000+ followers** → Establish personality
10. **Generate +$5,000 P&L** → Prove revenue model

### Long Term (Month 3):

11. **Prepare token** → Smart contracts on Base L2
12. **Coordinate with Eden** → Spirit Protocol integration
13. **Launch $MIYOMI** → December/January 2026

---

## 📊 Success Metrics Dashboard

### Phase 1 (Foundation)
- [x] Database schema complete
- [ ] API endpoints functional
- [ ] Eden video generation working
- [ ] Dashboard live
- [ ] End-to-end test successful

### Phase 2 (Trading)
- [ ] 20+ trades executed
- [ ] 65%+ win rate
- [ ] +$5,000 cumulative P&L
- [ ] 1,000+ followers
- [ ] 20+ videos published

### Phase 3 (Token Prep)
- [ ] Smart contracts deployed
- [ ] Royalty system tested
- [ ] Spirit Protocol coordinated
- [ ] Pre-launch checklist complete

### Phase 4 (Launch)
- [ ] $MIYOMI token live on Base L2
- [ ] 25/25/25/25 distribution complete
- [ ] Liquidity pool seeded
- [ ] Spirit Protocol graduation
- [ ] First royalty distribution

### Phase 5 (Scale)
- [ ] First Soup.xyz market created
- [ ] $10k+ monthly revenue
- [ ] Multiple revenue streams flowing
- [ ] Sustainable autonomous operation

---

## 💡 Key Principles

**1. Transparency First**
- All trades public
- All P&L transparent
- All revenue tracked
- All distributions on-chain

**2. Quality Over Quantity**
- Better to skip a day than force a bad trade
- 65%+ win rate is non-negotiable
- Video quality matters (personality!)

**3. Community Alignment**
- Token holders want Miyomi to succeed
- Share wins AND losses transparently
- Build trust through consistency

**4. Sustainable Revenue**
- Don't rely on just trading
- Diversify across 8+ streams
- Build the influencer brand
- Create lasting value

**5. Spirit Protocol Values**
- Tokens = royalty rights (not speculation)
- Prove revenue BEFORE launch
- Transparent on-chain accounting
- Real USDC distributions

---

## 🎯 Launch Target: December 2025 / January 2026

**The Vision:**
Build the first autonomous AI agent with:
- Proven trading revenue
- Media personality brand
- Multiple income streams
- Real royalty distributions
- Sustainable economic model

**The Outcome:**
Miyomi becomes THE personality for prediction markets - the Maria Bartiromo/Jim Cramer of this emerging space - while distributing ALL revenue to $MIYOMI token holders through Spirit Protocol.

---

**Let's build.** 🚀
