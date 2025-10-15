# MIYOMI Beta Launch Plan - 2 Week Sprint

**Date Created:** October 15, 2025
**Launch Target:** October 29, 2025 (Beta) → December 15, 2025 (Token)
**Status:** Ready to execute

---

## 🎯 Executive Summary

This document outlines the complete 2-week sprint to launch MIYOMI as a functional beta with:
- Live data integration (Dome API + Polymarket API)
- Working trainer workflow (market selection → content creation)
- Production-ready UI/UX
- End-to-end testing with real trades

**Critical Success Factors:**
1. **Remove all mock data** - Everything must be real/live
2. **Clear trainer workflow** - Trainer can actually select markets and create content
3. **Professional UI** - Production-ready, not prototypes
4. **Working video pipeline** - Market → video → post automation

---

## 📊 Current State Analysis

### ✅ What's Working (Assets to Leverage)

**Infrastructure (75% Complete)**
- ✅ Supabase database deployed (6 tables)
- ✅ Dome API key obtained (order history, PnL calculation working)
- ✅ Eden API configured (agent ID, API key ready)
- ✅ Polymarket CLOB API accessible (read-only, no auth needed)
- ✅ 30+ HTML pages built (prototypes)
- ✅ 13+ API endpoints created (various states)
- ✅ 8+ library files (polymarket, kalshi, dome, eden, soup)

**Documentation (100% Complete)**
- ✅ 30,000+ words across 15+ documents
- ✅ Complete technical architecture documented
- ✅ Competitive analysis complete
- ✅ Strategic positioning defined
- ✅ Revenue model clear

**Design Assets**
- ✅ Eden LoRA "Yeah" configured
- ✅ Brand identity established
- ✅ Multiple UI prototypes to learn from

### ❌ Critical Gaps (Beta Blockers)

**1. No Live Data Integration**
- Current UI shows 100% mock/static data
- No connection between Dome API → dashboard
- No real-time market data from Polymarket
- Performance stats are hardcoded

**2. Unclear Trainer Workflow**
- Existing trainer mode shows approval queue but no way to:
  - Browse available markets
  - Filter by criteria (volume, consensus, timing)
  - Generate thesis/script
  - Request video generation
  - Track outcomes

**3. UI/UX Not Production-Ready**
- 30+ prototype pages, none production-polish
- Mock data everywhere
- Unclear information architecture
- No clear path for users

**4. Missing Key Features**
- Market scanner interface
- Opportunity scoring system
- Video request/tracking system
- Social posting automation
- Performance tracking dashboard

---

## 🗓️ 2-Week Sprint Plan

### Week 1: Foundation (Oct 16-22)
**Goal:** Live data pipeline + clear trainer workflow

#### Days 1-2: UI/UX Redesign (Oct 16-17)

**Public Site** (`/public/index.html`)
- Clean, modern performance dashboard
- Real-time stats (connected to Dome API)
- Recent trades section (from database)
- Video feed (from database)
- Remove all mock data
- Professional polish

**About Page** (`/public/about.html`)
- ✅ Already updated with competitive analysis
- Minor polish if needed

**Trainer Mode** (new file: `/public/trainer.html`)
- Complete workflow interface:
  1. Market Scanner tab
  2. Queue Management tab
  3. Performance Analytics tab
  4. Settings tab

**Deliverables:**
- [ ] Redesigned index.html with real data hooks
- [ ] New trainer.html with complete workflow
- [ ] Figma/design mockups (if needed)

#### Days 3-4: Live Data Integration (Oct 18-19)

**Dome API Integration**
- Connect `/api/dome/pnl` to public dashboard
- Display real performance metrics
- Auto-refresh every 30 seconds
- Error handling for API failures

**Polymarket Market Scanner**
- Build `/api/polymarket/scanner` endpoint
- Fetch active markets from CLOB API
- Filter by: volume > $10k, time to close, category
- Return top 50 markets sorted by volume

**Database Integration**
- Create `markets_scanned` table
- Store market snapshots for historical analysis
- Track consensus changes over time

**Deliverables:**
- [ ] Dome PnL connected to dashboard
- [ ] Polymarket scanner endpoint working
- [ ] Real-time data flowing to UI

#### Days 5-7: Trainer Workflow Implementation (Oct 20-22)

**Market Scanner UI**
- Display live Polymarket markets
- Filtering: category, volume, consensus %, days to close
- Sorting: volume, consensus extremes, newest
- "Add to Queue" button per market

**Opportunity Scoring System**
- Calculate contrarian score:
  - Consensus extremity (>70% or <30%)
  - Market volume (liquidity)
  - Time to close (urgency)
  - Historical volatility (if available)
- Display score (0-100) with color coding

**Queue Management**
- View markets added to queue
- Generate AI thesis (using Claude API)
- Edit/approve thesis
- Request video generation (Eden API)
- Track video status (pending/generating/complete)
- Publish to social media

**Deliverables:**
- [ ] Market scanner UI functional
- [ ] Opportunity scoring implemented
- [ ] Queue management workflow complete
- [ ] AI thesis generation working

### Week 2: Polish & Launch (Oct 23-29)
**Goal:** Production-ready beta with first real trade

#### Days 8-9: Video Pipeline Connection (Oct 23-24)

**Eden Integration**
- Test Eden API with Yeah LoRA
- Generate test video from sample script
- Verify character consistency
- Optimize for speed/cost

**Video Workflow Automation**
- Trainer approves thesis → auto-generate script
- Script approved → request Eden video
- Video complete → save to database
- Display in public feed

**Error Handling**
- Retry logic for failed generations
- Fallback for API downtime
- Clear error messages to trainer

**Deliverables:**
- [ ] End-to-end video generation working
- [ ] Test video produced
- [ ] Automation tested

#### Days 10-11: Testing & Refinement (Oct 25-26)

**Load Real Data**
- Scan 100+ Polymarket markets
- Test filtering/sorting
- Verify performance metrics
- Check all API connections

**User Testing**
- Walk through trainer workflow
- Identify friction points
- Fix UX issues
- Performance optimization

**Bug Fixes**
- Address any breaking issues
- Polish UI elements
- Mobile responsiveness
- Cross-browser testing

**Deliverables:**
- [ ] All systems tested with real data
- [ ] Major bugs fixed
- [ ] UX polished

#### Days 12-14: Beta Launch Prep (Oct 27-29)

**First Real Trade**
- Trainer selects first market
- Generate contrarian thesis
- Request video
- Execute trade (manually for beta)
- Track in database

**Social Media Setup**
- Create Twitter/X account
- Create Farcaster account
- Prepare launch post
- Schedule first content

**Beta Launch (Oct 29)**
- Deploy to miyomi.ai
- Publish first video
- Announce on social media
- Monitor performance

**Deliverables:**
- [ ] First real trade executed
- [ ] First video live
- [ ] Beta launched publicly
- [ ] Feedback collected

---

## 🏗️ Technical Architecture

### Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     MIYOMI Beta Architecture                 │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Dome API   │────▶│  Performance │────▶│   Public     │
│ (Order/PnL)  │     │   Tracking   │     │  Dashboard   │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Supabase    │
                     │  Database    │
                     └──────────────┘
                            ▲
                            │
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Polymarket   │────▶│   Market     │────▶│   Trainer    │
│  CLOB API    │     │   Scanner    │     │  Interface   │
└──────────────┘     └──────────────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │   Opp Score  │
                     │   Generator  │
                     └──────────────┘
                            │
                            ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Claude API  │────▶│    Thesis    │────▶│    Video     │
│  (Analysis)  │     │  Generation  │     │   Request    │
└──────────────┘     └──────────────┘     └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │   Eden API   │
                                          │ (Video Gen)  │
                                          └──────────────┘
                                                  │
                                                  ▼
                                          ┌──────────────┐
                                          │  Social      │
                                          │  Posting     │
                                          └──────────────┘
```

### Database Schema (Simplified for Beta)

```sql
-- Core tables (already exist)
trades (
  id, market_slug, position, entry_price, size,
  thesis, outcome, pnl, created_at
)

videos (
  id, trade_id, eden_task_id, video_url, script,
  status, created_at
)

-- NEW for beta
markets_scanned (
  id, market_slug, title, category, end_date,
  volume, yes_price, no_price, consensus_score,
  scanned_at
)

opportunities (
  id, market_id, score, thesis, status,
  added_by, created_at
)
```

### API Endpoints (Beta Essentials)

**Public Endpoints**
```javascript
GET /api/performance
// Returns: { win_rate, total_pnl, trades_count, wins, losses }
// Source: Dome API calculatePnLFromOrders()

GET /api/recent-trades
// Returns: Last 10 trades with outcomes
// Source: Supabase trades table

GET /api/recent-videos
// Returns: Last 10 videos with metadata
// Source: Supabase videos table
```

**Trainer Endpoints**
```javascript
GET /api/markets/scan
// Returns: Top 50 Polymarket markets
// Filters: volume, consensus, time to close
// Includes opportunity scores

POST /api/opportunities/add
// Body: { market_slug, thesis, score }
// Action: Add market to queue

GET /api/opportunities/queue
// Returns: Markets in queue with status

POST /api/video/request
// Body: { opportunity_id, script }
// Action: Request Eden video generation

GET /api/video/status/:task_id
// Returns: Video generation status
```

### Frontend Components

**Public Site (`index.html`)**
```javascript
<div class="dashboard">
  <PerformanceStats />  // Dome API data
  <RecentTrades />      // Database
  <VideoFeed />         // Database
  <About />             // Static + competitive analysis
</div>
```

**Trainer Interface (`trainer.html`)**
```javascript
<div class="trainer-dashboard">
  <MarketScanner />     // Polymarket API
  <OpportunityQueue />  // Database + actions
  <Analytics />         // Dome + Database
  <Settings />          // Config
</div>
```

---

## 🔧 Implementation Details

### 1. Public Dashboard Redesign

**File:** `/public/index.html`

**Current Issues:**
- All data is hardcoded/mock
- No real-time updates
- Unclear information hierarchy

**Beta Solution:**
```html
<!-- Performance Section -->
<div id="performance-stats">
  <div class="stat">
    <span id="win-rate">--</span>
    <span class="label">Win Rate</span>
  </div>
  <div class="stat">
    <span id="total-pnl">--</span>
    <span class="label">Total P&L</span>
  </div>
  <div class="stat">
    <span id="trades-count">--</span>
    <span class="label">Trades</span>
  </div>
</div>

<script>
// Load real performance data
async function loadPerformance() {
  const res = await fetch('/api/performance');
  const data = await res.json();

  document.getElementById('win-rate').textContent = data.win_rate + '%';
  document.getElementById('total-pnl').textContent = '$' + data.total_pnl;
  document.getElementById('trades-count').textContent = data.trades_count;
}

// Auto-refresh every 30 seconds
setInterval(loadPerformance, 30000);
loadPerformance();
</script>
```

**Key Changes:**
- Remove mock data completely
- Connect to `/api/performance` (Dome API)
- Connect to `/api/recent-trades` (Database)
- Connect to `/api/recent-videos` (Database)
- Auto-refresh every 30 seconds
- Loading states while fetching
- Error handling for API failures

### 2. Market Scanner Implementation

**File:** `/api/markets/scan.js` (NEW)

```javascript
import { createClient } from '@supabase/supabase-js';

const POLYMARKET_CLOB = 'https://clob.polymarket.com';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch active markets from Polymarket
    const response = await fetch(`${POLYMARKET_CLOB}/markets`);
    const markets = await response.json();

    // Filter and score
    const opportunities = markets
      .filter(m => {
        const volume = parseFloat(m.volume || 0);
        const daysToClose = (new Date(m.end_date) - Date.now()) / (1000 * 60 * 60 * 24);
        return volume > 10000 && daysToClose > 0 && daysToClose < 30;
      })
      .map(m => ({
        market_slug: m.condition_id,
        title: m.question,
        category: m.category,
        volume: m.volume,
        yes_price: m.outcome_prices[0],
        no_price: m.outcome_prices[1],
        end_date: m.end_date,
        consensus_score: calculateConsensusScore(m),
        opportunity_score: calculateOpportunityScore(m)
      }))
      .sort((a, b) => b.opportunity_score - a.opportunity_score)
      .slice(0, 50);

    // Save to database for historical tracking
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
    await supabase.from('markets_scanned').insert(
      opportunities.map(o => ({ ...o, scanned_at: new Date() }))
    );

    res.status(200).json({ markets: opportunities });
  } catch (error) {
    console.error('Market scan failed:', error);
    res.status(500).json({ error: error.message });
  }
}

function calculateConsensusScore(market) {
  const yesPrice = parseFloat(market.outcome_prices[0]);
  // Extreme consensus = >70% or <30%
  if (yesPrice > 0.7) return yesPrice;
  if (yesPrice < 0.3) return 1 - yesPrice;
  return 0.5; // Not extreme
}

function calculateOpportunityScore(market) {
  const consensus = calculateConsensusScore(market);
  const volume = Math.log10(parseFloat(market.volume));
  const daysToClose = (new Date(market.end_date) - Date.now()) / (1000 * 60 * 60 * 24);
  const urgency = Math.max(0, 1 - (daysToClose / 30));

  // Weighted score: consensus (50%), volume (30%), urgency (20%)
  return (consensus * 0.5) + (volume * 0.03) + (urgency * 0.2);
}
```

### 3. Trainer Workflow UI

**File:** `/public/trainer.html` (NEW)

```html
<!DOCTYPE html>
<html>
<head>
  <title>MIYOMI - Trainer Dashboard</title>
  <!-- Same styling as main site -->
</head>
<body>
  <div class="trainer-dashboard">
    <!-- Tabs -->
    <div class="tabs">
      <button class="tab active" onclick="showTab('scanner')">Market Scanner</button>
      <button class="tab" onclick="showTab('queue')">Queue (5)</button>
      <button class="tab" onclick="showTab('analytics')">Analytics</button>
    </div>

    <!-- Market Scanner Tab -->
    <div id="scanner-tab" class="tab-content">
      <div class="filters">
        <select id="category-filter">
          <option value="all">All Categories</option>
          <option value="politics">Politics</option>
          <option value="crypto">Crypto</option>
          <option value="sports">Sports</option>
        </select>
        <input type="range" id="consensus-filter" min="60" max="90" value="70">
        <span id="consensus-value">70%</span>
      </div>

      <div id="markets-list">
        <!-- Populated by JavaScript -->
      </div>
    </div>

    <!-- Queue Tab -->
    <div id="queue-tab" class="tab-content" style="display:none;">
      <div id="queue-list">
        <!-- Markets added to queue -->
      </div>
    </div>

    <!-- Analytics Tab -->
    <div id="analytics-tab" class="tab-content" style="display:none;">
      <!-- Performance charts -->
    </div>
  </div>

  <script>
    async function loadMarkets() {
      const res = await fetch('/api/markets/scan');
      const data = await res.json();

      const list = document.getElementById('markets-list');
      list.innerHTML = data.markets.map(m => `
        <div class="market-card">
          <h3>${m.title}</h3>
          <div class="market-stats">
            <span>Volume: $${(m.volume / 1000).toFixed(0)}k</span>
            <span>Consensus: ${(m.yes_price * 100).toFixed(1)}% YES</span>
            <span>Score: ${(m.opportunity_score * 100).toFixed(0)}</span>
          </div>
          <button onclick="addToQueue('${m.market_slug}')">
            Add to Queue
          </button>
        </div>
      `).join('');
    }

    async function addToQueue(market_slug) {
      await fetch('/api/opportunities/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ market_slug })
      });

      alert('Market added to queue!');
      loadQueue();
    }

    function showTab(tab) {
      document.querySelectorAll('.tab-content').forEach(t => t.style.display = 'none');
      document.getElementById(tab + '-tab').style.display = 'block';

      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      event.target.classList.add('active');
    }

    // Load markets on page load
    loadMarkets();
    setInterval(loadMarkets, 60000); // Refresh every minute
  </script>
</body>
</html>
```

---

## 📋 Success Metrics

### Technical Milestones

**Week 1 Completion:**
- [ ] All mock data removed from public site
- [ ] Dome API connected and showing real performance
- [ ] Polymarket market scanner returning 50+ markets
- [ ] Trainer can browse markets with filters
- [ ] Opportunity scoring system functional

**Week 2 Completion:**
- [ ] End-to-end video generation tested
- [ ] First real trade executed
- [ ] First video produced and published
- [ ] Beta launched publicly
- [ ] No critical bugs

### Business Milestones

**Beta Launch (Oct 29):**
- [ ] Public site live with real data
- [ ] Trainer workflow validated
- [ ] First contrarian thesis published
- [ ] First video live on social media
- [ ] 10+ early followers/engagement

**Post-Beta (Nov-Dec):**
- [ ] 2-3 videos per week
- [ ] 15+ trades executed
- [ ] 65%+ win rate achieved
- [ ] 1,000+ followers
- [ ] Token launch ready (Dec 15)

---

## 🚨 Risk Assessment

### Technical Risks

**1. Eden API Performance**
- **Risk:** Video generation slow or unreliable
- **Mitigation:** Test extensively in Week 2, have backup plan
- **Fallback:** Use pre-generated clips while debugging

**2. Polymarket API Rate Limits**
- **Risk:** Too many requests, API blocks us
- **Mitigation:** Cache market data, implement rate limiting
- **Fallback:** Reduce scan frequency, manual market selection

**3. Dome API Limitations**
- **Risk:** Only order history works, other endpoints still 404
- **Mitigation:** Use fallback PnL calculation from orders
- **Fallback:** Already implemented in code

### Business Risks

**1. Trainer Time Availability**
- **Risk:** Seth too busy to test/validate workflow
- **Mitigation:** Build workflow that requires minimal input
- **Fallback:** Fully automate for initial testing

**2. Win Rate Pressure**
- **Risk:** First trades lose, damages credibility
- **Mitigation:** Start with high-confidence picks only
- **Fallback:** Be transparent about losses, focus on learning

**3. Content Quality**
- **Risk:** First videos don't resonate
- **Mitigation:** Test multiple scripts/formats
- **Fallback:** Iterate quickly based on engagement

---

## 🎯 Post-Beta Roadmap

### Weeks 3-4: Content Production (Nov 1-15)
- Execute 2-3 trades per week
- Produce 2-3 videos per week
- Grow to 500+ followers
- Refine trainer workflow based on usage

### Weeks 5-6: Partnerships (Nov 16-30)
- Reach out to Kalshi for affiliate program
- Increase content to 3-5 videos per week
- 1,000+ followers milestone
- Begin affiliate revenue tracking

### Weeks 7-8: Token Prep (Dec 1-15)
- Smart contract development (jmill)
- 15+ trades with 65%+ win rate
- $5k+ cumulative P&L
- Token launch (Dec 15)

---

## 📞 Team & Responsibilities

**Seth (Creative/Strategy)**
- UI/UX design decisions
- Market selection for beta
- First video scripts
- Social media setup
- Partnership outreach

**Claude (Technical Implementation)**
- Public site redesign
- API endpoint development
- Trainer workflow implementation
- Database schema updates
- Testing & deployment

**jmill (Video Pipeline - After Beta)**
- Eden API optimization
- Video generation testing
- Smart contract development (Phase 2)

---

## 🚀 Next Immediate Actions

### Tomorrow (Oct 16)
1. **Start public site redesign**
   - Remove all mock data
   - Design clean performance dashboard
   - Connect Dome API for real stats

2. **Build market scanner endpoint**
   - Fetch Polymarket markets
   - Implement filtering logic
   - Calculate opportunity scores

3. **Start trainer UI**
   - Create new trainer.html
   - Build market browsing interface
   - Design queue management

### This Week (Oct 16-22)
- Complete all Week 1 deliverables
- Daily progress updates
- Test each component as built
- Keep sprint focused and on track

### Next Week (Oct 23-29)
- Complete all Week 2 deliverables
- Execute first real trade
- Launch beta publicly
- Collect feedback and iterate

---

**Status:** Ready to execute
**Timeline:** 2 weeks to beta, 8 weeks to token launch
**Critical Path:** Live data → Trainer workflow → Video pipeline → Beta launch
**Success Criteria:** Working beta with real trade by Oct 29, 2025

**Last Updated:** October 15, 2025
**Author:** Claude (implementing Seth's vision)
