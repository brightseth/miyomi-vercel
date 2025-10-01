# MIYOMI MARKET MAKER - Architecture & Implementation Plan

## 🎯 Vision: Miyomi as Prediction Market Oracle

**Transform Miyomi from trader → market maker + oracle + content creator**

Instead of just betting on existing markets, Miyomi creates her own prediction markets on Soup.xyz, controls resolution as oracle, and generates video content explaining her unique contrarian thesis.

---

## 🚀 Core Value Proposition

### What Miyomi Markets Offer
1. **Unique Predictions** - Markets that don't exist elsewhere (NYC culture + finance hybrid)
2. **Trusted Oracle** - Miyomi resolves outcomes transparently with documented methodology
3. **First Liquidity** - Miyomi seeds markets with initial YES/NO quotes
4. **Video Content** - Every market launch includes video explaining the thesis
5. **Contrarian Brand** - "Fade the consensus, trade Miyomi's markets"

### Revenue Model
- **Market making spread** - Earn on bid/ask spread from liquidity provision
- **Trading profits** - Take contrarian positions in her own markets
- **Oracle reputation** - Build trust through transparent resolution history
- **Content monetization** - Videos drive traffic to markets
- **Community subscriptions** - Premium access to market creation signals

---

## 🏗️ Technical Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│                    MIYOMI BRAIN                         │
│  Claude AI → Market Ideas → Contrarian Analysis        │
└────────────────────┬────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│  MARKET CREATOR │    │  VIDEO GENERATOR │
│  (Soup.xyz CTF) │    │  (Eden API)      │
└────────┬────────┘    └────────┬─────────┘
         │                      │
         ▼                      ▼
┌──────────────────────────────────────┐
│         MIYOMI MARKETS DASHBOARD      │
│  - Active markets & positions         │
│  - Resolution history & win rate      │
│  - Community trading interface        │
└──────────────┬───────────────────────┘
               │
               ▼
┌──────────────────────────────────────┐
│      SOUP.XYZ PROTOCOL (Base)        │
│  - Binary conditional tokens (ERC1155)│
│  - Decentralized orderbook DEX        │
│  - On-chain resolution & settlement   │
└──────────────────────────────────────┘
```

### Data Flow

```
1. MARKET CREATION
   ├─ Claude generates contrarian thesis
   ├─ Miyomi creates Soup condition
   ├─ Seeds initial liquidity (split + place orders)
   ├─ Generates video announcement
   └─ Saves to Supabase

2. TRADING PHASE
   ├─ Community trades on Soup DEX
   ├─ Miyomi adjusts positions based on flow
   ├─ WebSocket updates dashboard real-time
   └─ Content updates (daily videos)

3. RESOLUTION
   ├─ Outcome determined at deadline
   ├─ Miyomi calls resolveCondition()
   ├─ Winners redeem tokens for collateral
   ├─ Performance metrics updated
   └─ Resolution video published
```

---

## 📊 Database Schema

### New Tables

```sql
-- Miyomi's created markets
CREATE TABLE miyomi_markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_id TEXT UNIQUE NOT NULL, -- Soup conditionId (bytes32)
  question TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'contrarian' | 'culture' | 'crypto' | 'politics'
  resolution_criteria JSONB NOT NULL,
  resolution_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  -- Market state
  status TEXT DEFAULT 'active', -- 'active' | 'resolved' | 'invalid'
  outcome TEXT, -- 'YES' | 'NO' | 'INVALID' after resolution
  resolved_at TIMESTAMP,

  -- Financial data
  initial_liquidity DECIMAL(10,2),
  total_volume DECIMAL(10,2) DEFAULT 0,
  miyomi_position JSONB, -- {yes: amount, no: amount, entry_price: X}
  miyomi_pnl DECIMAL(10,2),

  -- Content
  announcement_video_url TEXT,
  resolution_video_url TEXT,
  social_post_ids JSONB -- {farcaster: id, twitter: id}
);

-- Market liquidity tracking
CREATE TABLE market_liquidity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id UUID REFERENCES miyomi_markets(id),
  timestamp TIMESTAMP DEFAULT NOW(),
  yes_best_bid DECIMAL(10,6),
  yes_best_ask DECIMAL(10,6),
  no_best_bid DECIMAL(10,6),
  no_best_ask DECIMAL(10,6),
  total_yes_liquidity DECIMAL(10,2),
  total_no_liquidity DECIMAL(10,2)
);

-- Resolution history for trust/transparency
CREATE TABLE market_resolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id UUID REFERENCES miyomi_markets(id),
  resolved_at TIMESTAMP DEFAULT NOW(),
  outcome TEXT NOT NULL,
  evidence_url TEXT, -- Link to proof of outcome
  methodology TEXT, -- How outcome was determined
  community_disputes INTEGER DEFAULT 0,
  resolution_tx_hash TEXT -- On-chain transaction
);

-- Market performance metrics
CREATE TABLE market_metrics (
  market_id UUID REFERENCES miyomi_markets(id),
  date DATE,
  volume_24h DECIMAL(10,2),
  unique_traders INTEGER,
  miyomi_return_percent DECIMAL(5,2),
  video_views INTEGER,
  PRIMARY KEY (market_id, date)
);
```

---

## 🔧 Core Modules

### 1. Market Creation Module

**File:** `/lib/miyomi-market-creator.js`

```javascript
import { ProtocolClient } from '@soup/protocol'
import { IndexerClient } from '@soup/indexer'

class MiyomiMarketCreator {
  async createMarket({
    question,
    description,
    category,
    resolutionDate,
    resolutionCriteria,
    initialLiquidity = 1000 // USDC
  }) {
    // 1. Prepare condition on Soup
    const conditionId = await this.prepareCondition(question, resolutionDate)

    // 2. Seed initial liquidity
    await this.seedLiquidity(conditionId, initialLiquidity)

    // 3. Generate announcement video
    const videoUrl = await this.generateAnnouncementVideo({
      question,
      description,
      thesis: description
    })

    // 4. Save to database
    const market = await this.saveMarket({
      conditionId,
      question,
      description,
      category,
      resolutionDate,
      resolutionCriteria,
      initialLiquidity,
      videoUrl
    })

    // 5. Publish to socials
    await this.publishMarketAnnouncement(market)

    return market
  }
}
```

### 2. Oracle Resolution Module

**File:** `/lib/miyomi-oracle.js`

```javascript
class MiyomiOracle {
  async resolveMarket(marketId, outcome, evidence) {
    // 1. Validate outcome against resolution criteria
    const isValid = await this.validateResolution(marketId, outcome, evidence)

    if (!isValid) {
      throw new Error('Outcome does not match resolution criteria')
    }

    // 2. Call Soup contract to resolve
    const tx = await this.soupClient.resolveCondition({
      conditionId: market.condition_id,
      result: outcome === 'YES' ? [0,1] : [1,0]
    })

    // 3. Record resolution
    await this.recordResolution({
      marketId,
      outcome,
      evidence,
      txHash: tx.hash
    })

    // 4. Generate resolution video
    await this.generateResolutionVideo(marketId, outcome)

    // 5. Update metrics
    await this.updateMarketMetrics(marketId)

    return tx
  }
}
```

### 3. Liquidity Management Module

**File:** `/lib/miyomi-liquidity-manager.js`

```javascript
class MiyomiLiquidityManager {
  async seedLiquidity(conditionId, amount) {
    // Split USDC into YES/NO outcome tokens
    await this.soupClient.split({ conditionId, amount })

    // Place initial orders on both sides
    await this.placeOrder({
      conditionId,
      outcome: 0, // YES
      price: 0.45,
      amount: amount / 2
    })

    await this.placeOrder({
      conditionId,
      outcome: 1, // NO
      price: 0.55,
      amount: amount / 2
    })
  }

  async rebalanceLiquidity(conditionId) {
    // Monitor order book
    const orderBook = await this.indexerClient.getOrderBook(conditionId)

    // Adjust quotes based on inventory and risk
    if (this.needsRebalance(orderBook)) {
      await this.updateOrders(conditionId, orderBook)
    }
  }
}
```

### 4. Content Generation Integration

**File:** `/lib/miyomi-content-generator.js`

```javascript
class MiyomiContentGenerator {
  async generateMarketAnnouncementVideo(market) {
    const script = await this.generateScript({
      type: 'market_announcement',
      market: market,
      tone: 'provocative-confident'
    })

    // Call existing Eden video generation
    const video = await fetch('/api/generate-video-v2', {
      method: 'POST',
      body: JSON.stringify({
        category: market.category,
        script: script,
        position: `NEW MARKET: ${market.question}`,
        thesis: market.description
      })
    })

    return video.url
  }

  async generateResolutionVideo(market, outcome) {
    const script = await this.generateScript({
      type: 'market_resolution',
      market: market,
      outcome: outcome,
      tone: outcome === market.miyomi_position ? 'victorious' : 'analytical'
    })

    return await this.createVideo(script)
  }
}
```

---

## 🎨 Dashboard UI Components

### Miyomi Markets Dashboard

**File:** `/public/miyomi-markets-dashboard.html`

**Features:**
- **Active Markets** - Live pricing, volume, time to resolution
- **Miyomi's Positions** - Her stakes in each market + current P&L
- **Resolution History** - Past markets with outcomes and evidence
- **Market Creation Interface** - Trainer dashboard to create new markets
- **Community Leaderboard** - Top traders in Miyomi markets

**Layout:**
```
┌─────────────────────────────────────────────────────────┐
│  MIYOMI MARKETS                            [Create New] │
├─────────────────────────────────────────────────────────┤
│  ACTIVE MARKETS (8)                                     │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 💰 Will Bitcoin close below $95k Friday?          │ │
│  │ YES: 37% | NO: 63% | Volume: $12.4k | 2d left    │ │
│  │ Miyomi's position: 500 YES @ 0.42 (+$250)        │ │
│  │ [Trade] [Watch Video] [View Details]             │ │
│  └───────────────────────────────────────────────────┘ │
│  ... more markets ...                                   │
├─────────────────────────────────────────────────────────┤
│  RESOLVED MARKETS (23)                                  │
│  ✅ Trump tweeted about crypto - YES (Resolved 2 days) │
│  ✅ Fed hinted at rate cut - NO (Resolved 1 week)      │
├─────────────────────────────────────────────────────────┤
│  MIYOMI'S STATS                                         │
│  Win Rate: 71% | Total Volume: $145k | Active: 8       │
│  Resolution Accuracy: 96% | Avg Market Duration: 5 days│
└─────────────────────────────────────────────────────────┘
```

---

## 📋 API Endpoints

### Market Management

```typescript
// Create new market (Trainer/Admin only)
POST /api/miyomi/create-market
{
  question: string
  description: string
  category: 'contrarian' | 'culture' | 'crypto' | 'politics'
  resolutionDate: string (ISO timestamp)
  resolutionCriteria: {
    method: 'objective' | 'subjective'
    dataSource?: string
    evidence?: string
  }
  initialLiquidity: number // USDC amount
}

// Get all Miyomi markets
GET /api/miyomi/markets
Query params: status, category, sortBy, limit

// Get specific market details
GET /api/miyomi/markets/:conditionId

// Resolve market (Oracle only)
POST /api/miyomi/resolve-market
{
  marketId: string
  outcome: 'YES' | 'NO' | 'INVALID'
  evidence: string (URL or description)
  methodology: string
}

// Get market metrics
GET /api/miyomi/markets/:id/metrics

// Get resolution history
GET /api/miyomi/resolutions
```

### Trading Interface

```typescript
// Get order book for Miyomi market
GET /api/soup/orderbook/:conditionId

// Place order on Miyomi market
POST /api/soup/place-order
{
  conditionId: string
  outcome: 0 | 1 // 0=YES, 1=NO
  orderType: 'bid' | 'ask'
  price: string
  amount: string
}

// Get user's positions in Miyomi markets
GET /api/soup/positions/:userAddress
```

---

## 🎬 Content Strategy

### Market Launch Workflow

**Monday 9:00 AM EST - "Contrarian Call of the Week"**

1. **Claude generates thesis** - Analyzes week ahead, identifies contrarian opportunity
2. **Market created** - Soup condition prepared with Miyomi as oracle
3. **Liquidity seeded** - $1,000 USDC split into YES/NO tokens
4. **Video generated** - 30-60s explaining the contrarian thesis
5. **Social announcement** - Farcaster, Twitter with market link
6. **Dashboard updated** - Market goes live with embedded video

**Example Market:**
```
Question: "Will Bitcoin close below $95k this Friday?"
Thesis: "Everyone thinks $100k is inevitable this week.
         I'm seeing exhaustion in perpetuals funding.
         Betting NO on the moon boys."
Initial odds: YES @ 0.45 | NO @ 0.55
Resolution: Friday 4pm EST (Coinbase close price)
```

### Weekly Schedule

- **Monday**: New contrarian market launch
- **Wednesday**: Mid-week update video if market moved significantly
- **Friday**: Resolution video + outcome explanation
- **Sunday**: Weekly recap of all Miyomi markets performance

---

## 🔐 Security & Trust

### Oracle Trust Model

**Transparent Resolution:**
1. Resolution criteria defined at market creation
2. Evidence URL provided at resolution
3. Methodology documented (data source, calculations)
4. Community dispute period (24h to flag issues)
5. Resolution transaction hash published

**Dispute Handling:**
- If community flags resolution as incorrect
- Miyomi reviews evidence and methodology
- Can update resolution if error found
- Builds trust through accountability

### Wallet Security

```bash
# Environment variables
MIYOMI_ORACLE_PRIVATE_KEY=   # Hot wallet for resolutions
MIYOMI_TREASURY_PRIVATE_KEY= # Cold wallet for large capital
SUPABASE_SERVICE_KEY=        # Database access
EDEN_API_KEY=                # Video generation
```

**Best Practices:**
- Oracle wallet only holds gas + small operational capital
- Treasury wallet requires multisig for large withdrawals
- All transactions logged to audit trail
- Rate limiting on API endpoints

---

## 📈 Success Metrics

### Phase 1 - MVP (Weeks 1-2)
- ✅ Create 5 test markets on Soup testnet
- ✅ Successful resolution flow end-to-end
- ✅ Dashboard displays markets + order books
- ✅ Video generation integrated

### Phase 2 - Beta Launch (Weeks 3-4)
- 🎯 Launch 3 markets on mainnet
- 🎯 $5k total volume across markets
- 🎯 50+ unique traders
- 🎯 3/3 markets resolved successfully

### Phase 3 - Scale (Month 2+)
- 🎯 1 new market per week minimum
- 🎯 $25k+ weekly volume
- 🎯 200+ active community traders
- 🎯 90%+ resolution accuracy
- 🎯 Positive P&L from market making

---

## 🚀 Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Set up Soup.xyz SDK integration
- [ ] Create database schema in Supabase
- [ ] Build market creation module
- [ ] Build oracle resolution module
- [ ] Deploy to testnet

### Phase 2: Dashboard (Week 2)
- [ ] Build Miyomi Markets dashboard UI
- [ ] WebSocket integration for real-time updates
- [ ] Market creation interface (trainer mode)
- [ ] Resolution interface (oracle controls)

### Phase 3: Content (Week 3)
- [ ] Integrate video generation for market announcements
- [ ] Build resolution video automation
- [ ] Social media auto-posting
- [ ] Analytics dashboard

### Phase 4: Trading (Week 4)
- [ ] Liquidity management automation
- [ ] Order book monitoring
- [ ] Position rebalancing logic
- [ ] P&L tracking

### Phase 5: Launch (Week 5)
- [ ] Mainnet deployment
- [ ] First production market
- [ ] Community testing
- [ ] Gather feedback

---

## 💡 Unique Market Ideas

### Miyomi's Signature Categories

**1. Contrarian Finance**
- "Will BTC close below X?" (betting against moon boys)
- "Will volatility spike this week?" (betting against complacency)
- "Will this popular trade blow up?" (identifying crowded positions)

**2. NYC Culture x Finance**
- "Will Dimes Square get mentioned in mainstream media?"
- "Will NYC subway delays exceed 30 min avg this week?"
- "Will this Brooklyn coffee shop close before 2026?"

**3. AI Agent Predictions**
- "Will any Eden agent video go viral (100k+ views)?"
- "Will AI agents make more art than humans this month?"
- "Will Claude release a major update this quarter?"

**4. Hybrid Chaos**
- "Mercury retrograde + Fed meeting = market chaos?"
- "Will bodega cat predictions beat economists?"
- "Will astrology trend correlate with BTC price?"

---

## 🎯 Competitive Advantages

**vs Polymarket:**
- Miyomi creates unique markets (not just copying news)
- Full oracle control (can do subjective/cultural markets)
- Integrated content (video with every market)
- Personality-driven (trade Miyomi's thesis, not just events)

**vs Kalshi:**
- Decentralized (no KYC, global access)
- Faster launches (no regulatory approval)
- Creative markets (not just regulated categories)
- Lower barriers (anyone can trade)

**Miyomi's Moat:**
- Contrarian brand reputation
- Track record of market creation + resolution
- Unique market categories
- Video content explains complex theses
- Community of contrarian traders

---

## 📝 Next Steps

Ready to implement? Here's the order:

1. **Set up Soup.xyz integration** - Install SDKs, test on testnet
2. **Database migrations** - Create new tables in Supabase
3. **Build core modules** - Market creator, oracle, liquidity manager
4. **Create dashboard** - UI for viewing/creating/resolving markets
5. **Test flow** - Create → Seed → Trade → Resolve on testnet
6. **Deploy MVP** - First production market on mainnet
7. **Launch campaign** - Announce "Miyomi Markets" to community

Would you like me to start implementing the core modules?
