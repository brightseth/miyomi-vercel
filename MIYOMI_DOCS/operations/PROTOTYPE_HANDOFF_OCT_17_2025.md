# Miyomi Prototype Handoff - October 17, 2025

## What I Built (Past 2 Hours)

Built 3 working prototypes to demonstrate the vision. **Your job: optimize performance and add production features.**

---

## 1. Real Dome API Integration ✅

**File**: `/public/index.html` (lines 1191-1304)

**What it does:**
- Fetches real performance data from `/api/dome/pnl` endpoint
- Updates stats: win rate, P&L, trades count, monthly ROI
- Auto-refreshes every 30 seconds
- Gracefully falls back to mock data if API unavailable

**What works:**
```javascript
async function fetchRealDomeData() {
  const wallet = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'; // Placeholder
  const response = await fetch(`/api/dome/pnl?wallet=${wallet}`);
  const data = await response.json();
  // Updates DOM with real data
}
```

**Your tasks:**
- [ ] Replace placeholder wallet with real Miyomi wallet address
- [ ] Add loading states during fetch
- [ ] Handle network errors more gracefully
- [ ] Add retry logic (3 attempts with exponential backoff)
- [ ] Cache data client-side (localStorage) for offline viewing
- [ ] Optimize: only fetch when tab is active (use Page Visibility API)

**Priority**: Medium (works but needs polish)

---

## 2. Market Scanner API ✅

**File**: `/api/markets/scan.js`

**What it does:**
- Fetches live markets from Polymarket CLOB API
- Filters for contrarian opportunities (consensus >70% or <30%)
- Calculates edge automatically
- Returns top 50 opportunities sorted by highest edge

**Example response:**
```json
{
  "success": true,
  "count": 42,
  "markets": [
    {
      "id": "0x123...",
      "question": "Will Bitcoin reach $100k by EOY?",
      "consensus": 73.5,
      "position": "NO",
      "edge": 156,
      "yesPrice": "0.735",
      "noPrice": "0.265",
      "volume": 125000,
      "url": "https://polymarket.com/..."
    }
  ]
}
```

**Your tasks:**
- [ ] Add 5-minute caching (in-memory or Redis)
- [ ] Handle Polymarket API rate limits (they may throttle)
- [ ] Add pagination (currently returns all, may be slow)
- [ ] Filter by minimum volume ($10k+) to avoid illiquid markets
- [ ] Add error handling for malformed API responses
- [ ] Log failures to monitoring service
- [ ] Add query parameters: `?minEdge=50&position=NO&limit=20`

**Priority**: High (this is core functionality)

---

## 3. Trainer Interface ✅

**File**: `/public/trainer-simple.html`

**What it does:**
- Displays all markets from `/api/markets/scan`
- Shows stats: total opportunities, avg edge, highest edge
- Filters by position (YES/NO) and minimum edge
- Actions: Approve, Schedule Video, View, Reject

**What works:**
- Real-time filtering (no page reload)
- Auto-refresh every 5 minutes
- Clean, functional UI

**What's missing (your job):**
- [ ] Connect approve button to Supabase `opportunities` table
- [ ] Connect reject button to hide/archive markets
- [ ] Schedule video button should call `/api/eden/generate-video`
- [ ] Add "Add to Queue" instead of immediate approve
- [ ] Save user preferences (filters, sorting) to localStorage
- [ ] Add search functionality (search question text)
- [ ] Add sorting options (edge, volume, end date)
- [ ] Show market end date prominently
- [ ] Add "Refresh" button cooldown (prevent spam)

**Priority**: High (Goldy will use this daily)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│  PUBLIC SITE (index.html)                       │
│  - Shows mock data by default                   │
│  - Fetches real Dome API every 30s              │
│  - Falls back gracefully if API fails           │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  TRAINER INTERFACE (trainer-simple.html)        │
│  - Browse markets from scanner API              │
│  - Filter by position/edge                      │
│  - Approve/reject opportunities                 │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  MARKET SCANNER API (/api/markets/scan.js)      │
│  - Fetches from Polymarket CLOB                 │
│  - Filters for extremes (>70% or <30%)          │
│  - Calculates contrarian edge                   │
│  - Returns top 50 opportunities                 │
└─────────────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│  DOME API (/api/dome/pnl.js)                    │
│  - Already exists                               │
│  - Calculates win rate, P&L, trades             │
│  - Just needs real wallet address               │
└─────────────────────────────────────────────────┘
```

---

## Database Integration (Next Step)

**Tables to use** (already exist in Supabase):

### 1. `opportunities` table
```sql
-- Store approved markets from scanner
INSERT INTO opportunities (
  market_id,
  question,
  consensus,
  position,
  edge,
  status  -- 'pending', 'approved', 'rejected'
) VALUES (...);
```

### 2. `videos` table
```sql
-- Track video generation status
INSERT INTO videos (
  market_id,
  script,
  status,  -- 'queued', 'generating', 'completed', 'failed'
  eden_task_id,
  video_url
) VALUES (...);
```

### 3. `trades` table
```sql
-- Track actual trades executed
INSERT INTO trades (
  market_id,
  position,
  entry_price,
  size,
  status  -- 'open', 'closed', 'won', 'lost'
) VALUES (...);
```

---

## Eden API Integration (For Video Generation)

**Existing endpoint**: `/api/eden/generate-video.js`

**How to use:**
```javascript
// In trainer interface, when user clicks "Schedule Video"
async function scheduleVideo(marketId) {
  const response = await fetch('/api/eden/generate-video', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      agentId: '68aae13174876e833d9ae73b', // Miyomi agent
      prompt: `Create a 30-second video about: ${market.question}.
               Contrarian thesis: Crowd is ${market.consensus}% wrong.
               My position: ${market.position}`,
      duration: 30
    })
  });

  const data = await response.json();
  // data.taskId - poll this for completion
  // Save to videos table with status='generating'
}
```

**Your tasks:**
- [ ] Build video generation workflow
- [ ] Poll Eden API for completion (check every 10s, max 5 min)
- [ ] Save video URL to database when complete
- [ ] Handle errors (retry failed generations)
- [ ] Add queue management (don't generate 10 videos at once)

---

## Testing Checklist

Before considering this "done," test:

### Dome API Integration
- [ ] Visit `/` - does it try to fetch real data?
- [ ] Open console - see "✅ Real Dome data loaded" or "Using mock data"
- [ ] Wait 30 seconds - does it auto-refresh?
- [ ] Check stats update with real numbers

### Market Scanner
- [ ] Visit `/api/markets/scan` - returns JSON with markets
- [ ] Check console logs - "Found X markets" and "X contrarian opportunities"
- [ ] Verify extreme consensus (all >70% or <30%)
- [ ] Check edge calculations make sense

### Trainer Interface
- [ ] Visit `/trainer-simple.html`
- [ ] Markets load automatically
- [ ] Stats show correct totals
- [ ] Filters work (position, edge)
- [ ] "Refresh" button reloads data
- [ ] "View" button opens Polymarket link
- [ ] Approve/Video/Reject buttons trigger alerts (not connected yet)

---

## Performance Optimization Tasks

### Critical (Do First)
1. **Add caching to market scanner**
   - In-memory cache (5 minutes)
   - Prevents hitting Polymarket API every request
   - Use `node-cache` or simple object with timestamp

2. **Handle Polymarket rate limits**
   - They may return 429 if we spam
   - Add retry with exponential backoff
   - Consider caching longer (10-15 min)

3. **Optimize Dome API**
   - Currently fetches full order history every time
   - Cache results for 30 seconds server-side
   - Only recalculate when new trades occur

### Nice to Have (Do Later)
4. **Add loading states**
   - Show skeleton screens while fetching
   - Prevent button spam (disable during request)

5. **Error boundaries**
   - Catch and display errors gracefully
   - Don't let one failing API break the whole page

6. **Analytics**
   - Track which markets Goldy approves
   - Log video generation success rate
   - Monitor API response times

---

## Code Quality Improvements

### For Market Scanner (`/api/markets/scan.js`)
```javascript
// Add this caching layer at the top:
let cachedData = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  // Check cache first
  if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return res.status(200).json(cachedData);
  }

  // ... fetch from Polymarket ...

  // Save to cache
  cachedData = result;
  cacheTimestamp = Date.now();

  return res.status(200).json(result);
}
```

### For Dome API (`/public/index.html`)
```javascript
// Add retry logic:
async function fetchRealDomeData(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`/api/dome/pnl?wallet=${wallet}`);
      // ... existing code ...
      return data;
    } catch (error) {
      if (i === retries - 1) {
        console.error('All retries failed');
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

---

## What's NOT Built Yet (Future Work)

**Video Pipeline Workflow:**
- Goldy approves market → creates script
- Script → Eden API → video generation
- Poll for completion → save to database
- Post to social media

**Trade Execution:**
- No integration with Polymarket trading yet
- Would need wallet connection + signing
- That's Phase 2 (after video content works)

**Social Media Posting:**
- No auto-posting to Twitter/etc yet
- Manual for now
- Can add later with Twitter API

**Advanced Analytics:**
- No tracking of which markets perform best
- No A/B testing of thesis types
- No engagement metrics
- All "nice to have" post-beta

---

## Success Metrics (How to Know It Works)

### Week 1 (By Oct 22):
- [ ] Market scanner returns 20+ opportunities
- [ ] Dome API shows real performance data
- [ ] Trainer interface loads in <2 seconds
- [ ] Goldy can browse and filter markets
- [ ] No critical errors in production

### Week 2 (By Oct 29 - Beta Launch):
- [ ] First market approved and published
- [ ] First video generated via Eden API
- [ ] Public site shows real Dome stats (not mock)
- [ ] System runs stable for 24 hours
- [ ] Goldy uses trainer interface successfully

---

## Environment Variables Needed

Already configured in `.env.local`:
```
EDEN_API_KEY=db10962875d98d2a2dafa8599a89c850766f39647095c002
EDEN_AGENT_ID=68aae13174876e833d9ae73b
SUPABASE_URL=https://aeflqgydcrlszgbpduyk.supabase.co
SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_KEY=[configured]
DOME_API_KEY=[obtained, working]
```

**Add these if needed:**
```
MIYOMI_WALLET_ADDRESS=0x... # Real wallet for Dome API
POLYMARKET_API_KEY=xxx # If they require auth (they don't currently)
CACHE_DURATION_MINUTES=5 # Configurable cache time
```

---

## Quick Start Commands

```bash
# Local development
cd /Users/seth/miyomi-vercel
npm install
npm run dev  # or however you run Vercel locally

# Test endpoints
curl http://localhost:3000/api/markets/scan
curl http://localhost:3000/api/dome/pnl?wallet=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb

# Deploy to production
vercel --prod
```

---

## Files Changed Today

1. `/public/index.html` - Added real Dome API integration
2. `/api/markets/scan.js` - Created market scanner endpoint
3. `/public/trainer-simple.html` - Created trainer interface

**All code is committed and pushed to `main` branch.**

---

## Bottom Line for jmill

**What's working:**
- ✅ Dome API integration (tries real data, falls back to mock)
- ✅ Market scanner API (fetches from Polymarket, filters, calculates edge)
- ✅ Trainer interface (browse markets, filter, basic actions)

**What needs work:**
- ⚠️ Caching (will hit rate limits without it)
- ⚠️ Database connections (approve/reject don't save yet)
- ⚠️ Video generation (button exists but doesn't call Eden API)
- ⚠️ Error handling (needs retry logic)
- ⚠️ Performance optimization (no caching = slow)

**Estimated time to production-ready:**
- **Option A (Full build)**: 20-25 hours → Complete system by Oct 29
- **Option B (Phased)**: 12-15 hours → Core working, polish later
- **Option C (MVP)**: 8-10 hours → Minimal but functional

**My recommendation**: Start with caching + database connections (4-5 hours), test with Goldy, then add video pipeline (4-6 hours). That gets you to functional MVP without perfection.

---

## Questions for Tomorrow's Meeting

1. **Real wallet address** - Do you have it or do we create one?
2. **Polymarket API limits** - Have you checked their rate limits/terms?
3. **Video generation priority** - Is this Week 1 or Week 2?
4. **Database schema** - Do the existing tables work or need changes?
5. **Caching strategy** - In-memory OK or should we use Redis?

---

**Status**: Prototype complete. Ready for your optimization pass.

**Next**: Meet tomorrow ~3pm, decide on approach, assign Week 1 tasks.

Let's ship this! 🚀
