# Implementation Patterns Found - Miyomi Dashboard Analysis

**Date:** October 3, 2025
**Analyzed:** 27 HTML dashboard prototypes + personality/data files
**Purpose:** Extract best patterns to inform consolidated oracle platform

---

## Key Discovery: Character Evolution

### Personality File Analysis (`lib/personality/miyomi-persona.ts`)

**CRITICAL MISMATCH IDENTIFIED:**

The personality file defines Miyomi as **"The Contrarian Oracle" - INTJ trader** focused on:
- Contrarian trading execution (NOT just commentary)
- Trading P&L and performance tracking
- Position management and risk analysis
- "I'm here to make you think" teaching approach

**But the consolidation documents define her as:**
- Oracle/influencer (Maria Bartiromo style)
- Content creator, not trader
- Revenue from affiliates, not trading profits
- ESTP-A personality (not INTJ-A)

**This explains the 27 different dashboard iterations** - trying to reconcile two different visions of who Miyomi is.

---

## HTML Dashboard Patterns Analyzed

### Pattern 1: Three-Panel Layout (Most Common)

**Found in:** `index.html`, `miyomi-unified.html`, `miyomi-live.html`

**Structure:**
```
┌─────────────────────────────────────────────────┐
│ Left Panel (400px)   Center Panel   Right Panel │
│ - Hero image         - Main content - Live feed │
│ - Character info     - Stats        - Recent    │
│ - Image selector     - Featured     - Videos    │
└─────────────────────────────────────────────────┘
```

**Design principles:**
- Black (#000) background
- Green (#0f0) for success/live indicators
- White (#fff) for primary borders and text
- Helvetica Neue font throughout
- Bold typography as default

**Strengths:**
- Professional, Bloomberg-terminal aesthetic
- Clear information hierarchy
- Image-centric hero builds character presence
- Live data panel creates urgency

**Weaknesses:**
- Requires wide screen (1200px+)
- Heavy content, slow to scan
- No clear call-to-action hierarchy

### Pattern 2: Trainer Dashboard (Workflow-Focused)

**Found in:** `trainer-streamlined.html`, `trainer-dashboard.html`

**Key innovation:** **Review queue workflow**

```
1. Pending Positions (AI-generated)
   ├─ Market question
   ├─ Consensus vs Position
   ├─ AI Thesis
   └─ Actions: Approve | Video | Reject

2. Video Pipeline
   ├─ Approved picks ready for video
   └─ One-click generation

3. Analytics
   └─ Performance tracking
```

**Critical UX pattern:** **Three-button approval flow**
- ✅ Approve & Publish (simple)
- 🎥 Approve + Video (content)
- ❌ Reject (pass)

**Strengths:**
- Focuses on decision-making, not data entry
- AI does the analysis, trainer just approves
- Video generation integrated into workflow
- Yellow (#ff0) accent for trainer mode vs green (#0f0) for public

**Weaknesses:**
- Still shows trading metrics (P&L, positions)
- Assumes execution, not just commentary
- Missing platform-specific content adaptation

### Pattern 3: Mode Switching (Public vs Trainer)

**Found in:** `index.html`, `miyomi-unified.html`

**Implementation:**
- Hidden trainer toggle (bottom-right corner, opacity 0.3)
- Password authentication: `miyomi2025`
- JavaScript mode switching without page reload
- Public view shows performance, Trainer view shows queue

**Insight:** This pattern works well for keeping one URL while serving two audiences.

### Pattern 4: Live Data Simulation

**Found in:** Most dashboards

**Implementation:**
```javascript
// Update stats every 30 seconds
setInterval(() => {
  updateROI();
  updateConsensus();
  updateLastSync();
}, 30000);
```

**Creates sense of:**
- Real-time market tracking
- Active system (not static page)
- Professional trading platform feel

**But:** All mocked data - not connected to real APIs yet

---

## Data Files Analysis

### `data/miyomi-state.json`

**Contains:** Chat history with Miyomi personality
- 9 interactions saved
- Shows her "contrarian oracle" voice in action
- Examples of: market analysis, sass, confidence

**Key voice patterns found:**
- "The crowd is X, but here's what they're missing..."
- "92% of traders are wrong because..."
- Sarcastic about consensus: "Sure thing™"
- Self-aware: "What do I know? I'm just a humble oracle..."

### `data/miyomi-picks.json`

**Contains:** 4 example predictions
- Bitcoin $100k (NO position, 73% crowd says YES)
- Trump GOP nomination (NO position, 92% crowd says YES)
- Fed rates March 2025 (NO position, 85% crowd says YES)

**Pattern:** Every pick is contrarian (betting AGAINST consensus)

**Structure per pick:**
```json
{
  "id": "pick-xxx",
  "platform": "Polymarket" | "Kalshi",
  "question": "Will X happen?",
  "position": "YES" | "NO",
  "entryPrice": 0.27,
  "confidence": 66,
  "edge": 15, // Expected edge percentage
  "reasoning": "AI-generated thesis",
  "status": "PENDING" | "LIVE",
  "affiliateLinks": {
    "polymarket": "url?ref=miyomi"
  },
  "socialPosts": {
    "twitter": "280 char version",
    "youtube": "Full video description"
  }
}
```

**This structure is excellent** - ready for oracle/influencer model.

---

## Visual Identity Patterns

### Character Images
- **Neon aesthetic:** Pink/cyan cyberpunk style
- **Trading floor:** Professional NYC boardroom
- **Victory poses:** Confident, celebratory
- **Contrarian mood:** Dark, mysterious

**Stored in:** `/eden-images/` directory

### Color System
- **Black (#000):** Background, mystery
- **White (#fff):** Primary text, borders
- **Green (#0f0):** Success, live, profits
- **Red (#f00/#f44):** Urgent, losses
- **Yellow (#ff0):** Trainer mode, highlights
- **Gray (#888/#666):** Secondary text, metadata

### Typography Hierarchy
```
Title: 3rem, uppercase, bold
Subtitle: 0.9rem, uppercase, spaced
Section: 1.2rem, uppercase, bold
Body: 0.85rem, normal weight
Label: 0.6-0.7rem, uppercase, gray
```

---

## Best Features to Keep

### 1. Image Gallery Pattern
**From:** `index.html`

```html
<div class="image-selector">
  <div class="thumb active" onclick="changeImage(src, this)">
    <img src="/eden-images/miyomi-neon.jpg">
  </div>
  <!-- More thumbnails -->
</div>
```

**Why it works:** Brings character to life, multiple moods/contexts

### 2. Trainer Review Queue
**From:** `trainer-streamlined.html`

The three-button approval pattern is **perfect for oracle workflow:**
- AI finds interesting markets
- Trainer reviews and approves
- One-click video generation
- Auto-posts to social

**Adapt for oracle model:**
- Remove P&L tracking
- Add platform-specific content preview (TikTok vs Twitter)
- Show expected engagement, not expected profit

### 3. Live Status Indicators
**From:** Multiple dashboards

```html
<div class="status-indicator">
  <div class="status-dot"></div>
  <span>LIVE</span>
</div>
```

Creates **"always-on oracle" feeling** - important for building trust.

### 4. Quick Stats Grid
**From:** `index.html`

```
┌──────────┬──────────┬──────────┬──────────┐
│ Win Rate │  Profit  │Followers │   ROI    │
│   73%    │ +$127K   │  42.5K   │ +34.7%   │
└──────────┴──────────┴──────────┴──────────┘
```

**Adapt for oracle model:**
```
┌──────────┬──────────┬──────────┬──────────┐
│Accuracy  │ Followers│  Views   │ Revenue  │
│   68%    │  1,247   │  42.5K   │  $847    │
└──────────┴──────────┴──────────┴──────────┘
```

### 5. Social Post Preview
**From:** `data/miyomi-picks.json`

Each pick has platform-specific content already generated:
- Twitter version (280 chars, thread format)
- YouTube description (with timestamps)
- Farcaster version (crypto-native language)

**This is gold** - shows thinking about platform-specific voice.

---

## Anti-Patterns to Avoid

### 1. Trading Dashboard Complexity
**Problem:** Many dashboards show:
- Position sizing controls
- Entry/exit prices
- P&L tracking
- Risk management sliders

**Why wrong for oracle:** She's not executing trades, she's creating content about interesting predictions.

### 2. Too Many Metrics
**Problem:** 6-month performance grids, win/loss records, monthly returns

**Why wrong:** Overwhelming for first-time visitors. Oracle needs **credibility signals**, not trading stats.

**Better:** "68% accurate on 50+ predictions" + "Featured in XYZ" + follower count

### 3. No Clear CTA
**Problem:** Many dashboards bury affiliate links or have no obvious "next step"

**Why wrong:** Oracle revenue = clicks to prediction markets. CTA should be primary.

**Better:** Big button: "🔥 SEE TODAY'S PREDICTION" → links to Polymarket with affiliate

### 4. Static Content
**Problem:** Most dashboards are fully client-side HTML with mock data

**Why wrong:** No path to real market data, no content updates, no video integration

**Need:** Next.js with API routes connecting to:
- Polymarket/Kalshi for market data
- Eden for video generation
- Social APIs for posting

---

## Architecture Lessons

### What Works

**1. Progressive Enhancement Pattern:**
- Start with static HTML (works offline)
- Add live data via API calls
- Enhance with video when available

**2. Mode Switching:**
- Single URL serves public + trainer
- Authentication required for trainer mode
- Saves deployment complexity

**3. Modular Components:**
- Pick card component
- Stat display component
- Video embed component
- Can reuse across pages

### What's Missing

**1. Real Data Integration:**
- All dashboards use mock data
- No actual Polymarket/Kalshi connections
- Video generation not integrated

**2. Video Pipeline:**
- Trainer can trigger video generation
- But no preview, no editing, no scheduling
- Missing: script editing UI

**3. Social Integration:**
- Social posts generated but not posted
- No cross-posting automation
- No engagement tracking

**4. Analytics:**
- No real follower tracking
- No affiliate click tracking
- No video view counts

---

## Recommended Consolidation Strategy

### Phase 1: Public Oracle Page (Week 1)

**Take from:**
- Three-panel layout from `miyomi-unified.html`
- Image gallery from `index.html`
- Featured pick display
- Quick stats (adapted for oracle metrics)

**Build:**
```
/miyomi
├─ Hero (left): Character image + name
├─ Center: Today's prediction + recent takes
└─ Right: Latest video + CTAs
```

**Metrics shown:**
- Accuracy rate (not win rate)
- Follower count
- Views this week
- Affiliate revenue (optional)

### Phase 2: Trainer Dashboard (Week 2)

**Take from:**
- Review queue from `trainer-streamlined.html`
- Three-button approval pattern
- Daily workflow from `trainer-dashboard.html`

**Build:**
```
/dashboard/oracle
├─ Morning Brief (AI-generated)
├─ Pending Picks (approve/reject/video)
└─ Performance (accuracy, engagement)
```

**Workflow:**
1. AI scans markets overnight
2. Generates 3-5 interesting picks
3. Trainer reviews in morning (< 5 min)
4. Approved picks → video generation
5. Videos → auto-post to social

### Phase 3: Video + Social (Week 3)

**Integration:**
- Eden API for video generation (already working)
- Platform-specific formatting (from pick data structure)
- One-click posting to TikTok, Twitter, Farcaster

**Content structure:**
```javascript
{
  market: "Bitcoin $100k by Dec 31",
  crowd: "87% YES",
  miyomi: "NO (64% confidence)",
  reasoning: "Funding exhaustion + retail FOMO",

  // Platform-specific
  tiktok: "30sec hook + data + CTA",
  twitter: "Thread with charts",
  farcaster: "Crypto-native language"
}
```

### Phase 4: Analytics (Week 4)

**Track:**
- Video views per platform
- Affiliate clicks (Polymarket/Kalshi)
- Follower growth
- Prediction accuracy over time

**Display:**
- Public: credibility (accuracy + follower count)
- Trainer: revenue (affiliate earnings + subscribers)

---

## Technical Stack Recommendation

### Frontend
- **Next.js 15** (already in use)
- **React** for components
- **Tailwind CSS** (easier than custom CSS for 27 patterns)

### Backend
- **Next.js API routes** for:
  - `/api/oracle/brief` - Morning market scan
  - `/api/oracle/generate` - Video generation
  - `/api/oracle/post` - Social posting
  - `/api/oracle/track` - Analytics

### Data Layer
- **Supabase** (as per consolidation doc)
  - `oracle_takes` table
  - `affiliate_clicks` table
  - `social_posts` table

### External APIs
- **Eden** (video + audio generation) ✅ Working
- **Polymarket** (market data)
- **Kalshi** (market data)
- **ElevenLabs** (TTS via Eden) ✅ Working
- **FFmpeg** (video combination) ✅ Working

---

## Character Consistency Framework

### Resolve Personality Conflict

**Current state:** Two different Miyomis exist

**Option A: Keep Contrarian Trader (INTJ)**
- Focused on trading execution
- P&L tracking matters
- "Tough love teacher" energy
- Revenue: Trading profits

**Option B: Shift to Oracle/Influencer (ESTP)** ✅ Recommended
- Focused on content and commentary
- Engagement tracking matters
- "Fast-talking NYC oracle" energy
- Revenue: Affiliates + subscriptions

**Recommendation:** Option B aligns with:
- Consolidation doc vision
- Affiliate revenue model
- Content-first strategy
- Token launch plan ($MIYOMI represents revenue rights)

### Update Personality File

Need to reconcile `lib/personality/miyomi-persona.ts` with:
- ESTP-A personality (not INTJ)
- Oracle focus (not trading execution)
- Platform-specific voice modulation
- Goals = followers + accuracy, not P&L

**Or:** Keep INTJ personality but shift core from "trader" to "analyst/oracle"
- Still contrarian
- Still data-driven
- But commentary not execution

---

## Final Recommendations

### 1. Consolidate to TWO pages
- `/miyomi` - Public oracle page (simple, credibility-focused)
- `/dashboard/oracle` - Trainer workflow (approve picks, generate videos)

### 2. Keep best patterns
- ✅ Three-panel layout
- ✅ Image gallery for character
- ✅ Three-button approval flow
- ✅ Live status indicators
- ✅ Platform-specific social posts

### 3. Remove trader patterns
- ❌ P&L tracking
- ❌ Position management
- ❌ Risk calculators
- ❌ Monthly trading returns

### 4. Add oracle patterns
- ✅ Accuracy tracking (% correct predictions)
- ✅ Engagement metrics (views, clicks, followers)
- ✅ Affiliate revenue dashboard
- ✅ Video embed + preview

### 5. Implement video pipeline
- ✅ Eden API integration (working)
- ✅ Platform-specific script generation
- ⚠️ Add: Preview before posting
- ⚠️ Add: Scheduling (not just immediate)

### 6. Connect to real data
- Polymarket API for market data
- Supabase for tracking picks + outcomes
- Social APIs for actual posting
- Analytics for real metrics

---

## Next Steps

1. **Decision:** Confirm Miyomi's identity (Oracle/Influencer model)

2. **Update:** Reconcile personality file with consolidation vision

3. **Build:** Start with clean Next.js, importing best patterns from:
   - `miyomi-unified.html` (layout)
   - `trainer-streamlined.html` (workflow)
   - `data/miyomi-picks.json` (data structure)

4. **Integrate:** Connect working tech (Eden, FFmpeg, ElevenLabs)

5. **Deploy:** One production platform at miyomi.ai

---

**Bottom Line:**

You've built 27 iterations exploring "What is Miyomi?" - the answer is emerging: **She's a prediction market oracle/influencer, not a trader.** The best patterns support content creation and audience building, not trade execution. Consolidate around that vision.

The data structure in `miyomi-picks.json` and the trainer workflow in `trainer-streamlined.html` are **gold** - they show the right mental model. Now just need to build ONE production platform around that model.
