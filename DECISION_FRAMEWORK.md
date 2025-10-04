# Decision Framework - Moving Forward with Miyomi

**Date:** October 3, 2025
**Status:** Ready for decisions
**Purpose:** Clear choices needed to proceed with consolidated build

---

## Critical Decision: Who Is Miyomi?

### The Conflict

**Personality File Says:**
- INTJ-A "Architect" personality
- Contrarian trader who executes positions
- "Tough love teacher" who makes students think
- Track record: 73% win rate, +$127K profit
- Quotes: "The crowd is your exit liquidity"
- Dream: "One trade so contrarian it becomes Harvard case study"

**Consolidation Docs Say:**
- ESTP-A personality
- Oracle/influencer (Maria Bartiromo style)
- Fast-talking NYC energy, not analytical coldness
- Track record: Follower growth + accuracy
- Quotes: "Markets whisper..." + Gen-Z slang
- Dream: Build 1,000 followers → Launch $MIYOMI token

### The Real Question

**Is she:**
A) A trader who shares her positions publicly? (Trade + Commentary)
B) An oracle who comments on interesting markets? (Commentary Only)

### Impact on Everything

| Aspect | If Trader (A) | If Oracle (B) |
|--------|---------------|---------------|
| **Daily practice** | Execute trades, track P&L | Create content, track engagement |
| **Revenue model** | Trading profits (high variance) | Affiliates + subs (predictable) |
| **Risk** | Real capital at risk | Only reputation at risk |
| **Scale** | Limited by capital size | Limited only by audience |
| **Personality** | INTJ (analytical, cold) | ESTP (energetic, social) |
| **Success metric** | % Win rate, $ Profit | % Accuracy, # Followers |
| **Dashboard focus** | Position management | Content calendar |
| **Token value** | Tied to trading skill | Tied to attention/influence |

### Recommendation: **Option B (Oracle/Influencer)** ✅

**Why:**

1. **Aligns with token model:** $MIYOMI represents revenue rights to her attention/influence, not her trading capital.

2. **Safer legally:** Commentary = speech. Trading = financial services (potential regulation).

3. **More scalable:** Audience growth unlimited. Trading limited by capital + time.

4. **Matches timeline:** 10 weeks to build 1,000 followers is realistic. 10 weeks to generate $100K trading profits is high risk.

5. **Better for automation:** AI can scan markets and generate commentary. AI can't execute trades responsibly.

6. **Affiliate revenue proven:** Polymarket/Kalshi have affiliate programs. Trading profits = uncertain.

**But keep contrarian analyst core:**
- She still analyzes markets deeply
- She still highlights crowd being wrong
- She still uses data and probabilities
- Just doesn't execute every position herself

**Analogy:**
- NOT Jim Cramer (who trades his charitable trust)
- YES Maria Bartiromo (who reports on markets)
- YES "The Oracle of Omaha" title (Warren Buffett = investor, but oracle = soothsayer)

---

## Decision 1: Personality Foundation

**Choose ONE:**

### Option A: Update Personality File to Match Oracle Vision ✅

**Changes needed in `lib/personality/miyomi-persona.ts`:**

```typescript
core: {
  title: "The Oracle", // was "The Contrarian Oracle"
  tagline: "Markets whisper...", // new
  mission: "Highlight interesting prediction market opportunities and build a community of independent thinkers"
}

personality: {
  mbti: "ESTP-A", // was INTJ-A
  // Fast-talking, energetic, social vs analytical loner
}

tradingPhilosophy: {
  // Rename to: oraclePhilosophy or contentPhilosophy
  methodology: "I highlight contrarian opportunities with asymmetric risk/reward"
  // Not: "I execute sentiment arbitrage"
}

daily_rituals: [
  "4:45 AM: Scan prediction markets for interesting narratives",
  "6:00 AM: Generate oracle take for most contrarian opportunity",
  "9:00 AM: Create video content for social platforms",
  "2:00 PM: Engage with community, track video performance"
]
```

**Voice adaptation:**
- Keep: Contrarian, data-driven, confident
- Shift: From cold analyst to energetic commentator
- Add: NYC slang, Gen-Z language, faster pace
- Remove: "Your capital, your funeral" coldness

### Option B: Keep Trader Personality, Build Oracle Interface

**Keep INTJ personality** but have her:
- Analyze markets deeply (her nature)
- Share interesting opportunities publicly
- Build following through analysis quality
- Token represents her analysis/reputation

**Interface focuses on:**
- Content creation workflow
- Engagement metrics
- But personality remains analytical/cold

---

## Decision 2: Platform Priority

**First platform for content:** (Pick ONE)

### Option A: TikTok ✅ Recommended
- **Pro:** Highest viral potential, youngest demo
- **Pro:** 30-60sec format = fast production
- **Pro:** Visual aesthetic matches her style
- **Con:** Requires mobile phone number, more restrictive

### Option B: Twitter/X
- **Pro:** Easier API access, thread format
- **Pro:** Prediction market community already there
- **Con:** Algorithm less favorable for growth

### Option C: Farcaster
- **Pro:** Crypto-native, aligned with Web3 vision
- **Pro:** Early adopter advantage
- **Con:** Smaller audience, less proven

**Recommendation:** **TikTok first, then cross-post to Twitter + Farcaster**

**Workflow:**
1. Generate oracle take (text)
2. Create TikTok video (30-60sec, vertical, hook-driven)
3. Post to TikTok with affiliate link
4. Extract key moments → Twitter thread
5. Reframe for crypto audience → Farcaster
6. Longer analysis → YouTube (later)

---

## Decision 3: Content Cadence

**How often to post:** (Pick ONE)

### Option A: Daily (Aggressive)
- 7 predictions per week
- High volume, tests what works
- Risk: Burnout, lower quality

### Option B: Every Other Day (Sustainable) ✅ Recommended
- 3-4 predictions per week
- Time to refine each one
- Better quality control

### Option C: 3x/Week (Conservative)
- Mon/Wed/Fri schedule
- Highest quality per piece
- Risk: Too slow for algorithm

**Recommendation:** **Every other day (3-4x/week)**

**Rationale:**
- Allows time for video production
- Sustainable for 10-week sprint
- Enough volume to test + iterate
- Not overwhelming for audience

---

## Decision 4: Trainer Workflow

**Daily time commitment:** (Pick ONE)

### Option A: <5 Minutes (Hyper-Streamlined)
- AI does everything
- Trainer just approves/rejects
- One-click video generation
- Auto-posts without review

**Risk:** Less control, potential mistakes

### Option B: 15-30 Minutes (Balanced) ✅ Recommended
- AI generates options
- Trainer selects + edits script
- Reviews video before posting
- Manages engagement afterward

**Benefit:** Quality control + authentic voice

### Option C: 1-2 Hours (High Touch)
- Manual market research
- Write all scripts from scratch
- Heavy video editing
- Deep engagement

**Benefit:** Maximum quality
**Risk:** Not sustainable for 10 weeks

**Recommendation:** **Option B (15-30 min/day)**

**Workflow:**
```
Morning (9:00 AM - 10 min)
├─ Review AI-generated morning brief
├─ Select most interesting market
└─ Edit oracle take script (if needed)

Midday (11:00 AM - 10 min)
├─ Review generated video
├─ Approve and post to TikTok
└─ Cross-post to Twitter/Farcaster

Afternoon (2:00 PM - 10 min)
├─ Respond to comments
├─ Track engagement metrics
└─ Note what's working
```

---

## Decision 5: Revenue Model

**Primary monetization:** (Pick ONE)

### Option A: Affiliate Only (Pure) ✅ Recommended
- Polymarket affiliate links
- Kalshi affiliate links
- No premium subscriptions yet

**Pro:** Simple, no obligations, test first
**Con:** Revenue uncertain until proven

### Option B: Hybrid (Affiliate + Premium)
- Free predictions with affiliate links
- $10/mo premium for:
  - Early access to picks
  - Deeper analysis
  - Private Discord

**Pro:** Multiple revenue streams
**Con:** Adds complexity early

### Option C: All Free (Grow First)
- No monetization for first month
- Focus 100% on growth
- Add revenue later

**Pro:** Removes friction
**Con:** No revenue validation

**Recommendation:** **Option A (Affiliate Only)**

**Rationale:**
- Validates affiliate clicks immediately
- Tests if content drives action
- No commitments to subscribers yet
- Can add premium tier after hitting 500 followers

**Tracking:**
- Affiliate link format: `polymarket.com/market/id?ref=miyomi&utm_source=tiktok&utm_medium=video&utm_campaign=pick_id`
- Store clicks in Supabase
- Report in trainer dashboard

---

## Decision 6: Visual Identity

**Character representation:** (Pick ONE)

### Option A: Multiple Moods (Current)
- 5+ different images
- Neon, boardroom, victory, contrarian styles
- Image selector on homepage

**Pro:** Shows range, personality depth
**Con:** Inconsistent brand, confusing

### Option B: Single Hero Image (Consistent) ✅ Recommended
- Pick best image (recommend neon aesthetic)
- Use everywhere (TikTok, Twitter, website)
- Build recognition through consistency

**Pro:** Brand consistency, easier to remember
**Con:** Less personality expression

### Option C: AI Avatar (Future)
- Full AI video avatar (talking head)
- Lip-synced to voiceover
- Heygen/D-ID/Synthesia

**Pro:** Scalable, consistent
**Con:** Expensive, uncanny valley risk

**Recommendation:** **Option B (Single Hero Image)** for first month

**Hero image:** Pink/cyan neon aesthetic
- Matches "Markets whisper..." mystique
- Cyberpunk = prediction markets vibe
- Distinctive, memorable

**Future:** Can add talking avatar once revenue proven

---

## Decision 7: Technical Architecture

**Build approach:** (Pick ONE)

### Option A: Clean Next.js Build (Greenfield) ✅ Recommended
- Start fresh project
- Import best patterns from 27 prototypes
- Use Tailwind CSS (faster than custom)
- Deploy to Vercel

**Pro:** Clean, maintainable, modern
**Con:** 3-5 days setup time

### Option B: Refactor Best Prototype (Brownfield)
- Take `miyomi-unified.html` or `trainer-streamlined.html`
- Convert to React components
- Add API routes

**Pro:** Faster start (1-2 days)
**Con:** Technical debt, harder to maintain

### Option C: No-Code First (Rapid)
- Use Webflow/Framer for public page
- Airtable for data
- Zapier for automation

**Pro:** Ship in 1 day
**Con:** Doesn't scale, no video pipeline

**Recommendation:** **Option A (Clean Next.js Build)**

**Rationale:**
- Need API routes for Eden integration
- Need Supabase for data tracking
- Need server-side for affiliate tracking
- 3-5 days acceptable for 10-week timeline

**MVP features (Week 1):**
```
/miyomi
├─ Hero with Miyomi image + tagline
├─ Today's oracle prediction
├─ Quick stats (accuracy, followers, views)
└─ Big CTA: "See Full Prediction →" (affiliate link)

/dashboard/oracle (password protected)
├─ Morning brief (AI-generated, 3 market options)
├─ Script editor (edit AI thesis)
└─ Generate video button → Eden API
```

---

## Decision 8: Metrics Focus

**What to optimize for:** (Pick ONE)

### Option A: Follower Growth (Vanity)
- Track followers across platforms
- Goal: 1,000 followers by Dec

**Pro:** Clear milestone
**Con:** Followers ≠ engagement or revenue

### Option B: Engagement (Depth) ✅ Recommended
- Track: views, comments, shares
- Goal: 10%+ engagement rate

**Pro:** Indicates content quality
**Con:** Harder to predict

### Option C: Affiliate Revenue (Results)
- Track: clicks, conversions, earnings
- Goal: $100 MRR by month 2

**Pro:** Direct business metric
**Con:** Outside our control (Polymarket conversion rates)

**Recommendation:** **Track all three, optimize for engagement (Option B)**

**Dashboard display:**
```
┌─────────────────────────────────────────┐
│ PRIMARY METRICS                          │
├─────────────────────────────────────────┤
│ Engagement Rate: 12.4% (↑ 2.1%)        │
│ Avg Views/Video: 2,347 (↑ 342)         │
│ Comment Rate: 3.2% (target: 2%+)        │
├─────────────────────────────────────────┤
│ GROWTH METRICS                           │
├─────────────────────────────────────────┤
│ Total Followers: 247 (goal: 1,000)     │
│ New Followers: +23 this week            │
├─────────────────────────────────────────┤
│ REVENUE METRICS                          │
├─────────────────────────────────────────┤
│ Affiliate Clicks: 127 (4.2% CTR)       │
│ Est. Earnings: $23 (need 100 for MRR)  │
└─────────────────────────────────────────┘
```

---

## Decision Matrix Summary

| Decision | Options | Recommendation | Why |
|----------|---------|----------------|-----|
| **1. Identity** | Trader / Oracle | **Oracle (B)** | Scalable, aligns with token model |
| **2. Platform** | TikTok / Twitter / Farcaster | **TikTok first** | Viral potential, young demo |
| **3. Cadence** | Daily / Every other day / 3x week | **Every other day** | Sustainable quality |
| **4. Workflow** | <5 min / 15-30 min / 1-2 hrs | **15-30 min/day** | Quality + sustainability |
| **5. Revenue** | Affiliate / Hybrid / Free | **Affiliate only** | Simple, validates model |
| **6. Visual** | Multiple / Single / Avatar | **Single hero image** | Consistency |
| **7. Tech** | Next.js / Refactor / No-code | **Clean Next.js** | Scalable, maintainable |
| **8. Metrics** | Followers / Engagement / Revenue | **Engagement** | Quality indicator |

---

## Action Items for Tomorrow

### 1. Make Final Decisions ✅
- [ ] Confirm: Miyomi = Oracle (not trader)
- [ ] Confirm: ESTP personality (update personality file)
- [ ] Confirm: TikTok first platform
- [ ] Confirm: Every-other-day cadence
- [ ] Confirm: Single hero image (neon aesthetic)

### 2. Update Personality File
- [ ] Edit `lib/personality/miyomi-persona.ts`
- [ ] Change INTJ → ESTP
- [ ] Update daily rituals (content, not trading)
- [ ] Add platform-specific voice examples
- [ ] Add "Markets whisper..." catchphrase

### 3. Initialize Clean Build
```bash
cd /Users/seth
npx create-next-app@latest miyomi-oracle --typescript --tailwind --app
cd miyomi-oracle

# Copy working code
cp ../miyomi-vercel/lib/eden-client.js lib/
cp ../miyomi-vercel/lib/ffmpeg-helper.js lib/
cp ../miyomi-vercel/.env.local .env.local

# Copy data structures
cp ../miyomi-vercel/data/miyomi-picks.json app/data/
```

### 4. Build Week 1 MVP (Oct 7-13)
- [ ] Public oracle page at `/miyomi`
- [ ] Trainer dashboard at `/dashboard/oracle`
- [ ] Connect to Polymarket API for market data
- [ ] Integrate Eden API for video generation
- [ ] Deploy to miyomi.ai

### 5. Create First Oracle Video
- [ ] Find contrarian opportunity on Polymarket
- [ ] Write Miyomi's oracle take (her voice)
- [ ] Generate video with audio (Eden + ElevenLabs)
- [ ] Post to TikTok with affiliate link
- [ ] Track: views, clicks, engagement

**Success criteria:** 100+ views, 10+ clicks to Polymarket

---

## Timeline to Token Launch

**Week 1 (Oct 7-13):** Foundation
- Public page live
- First oracle video posted
- Affiliate tracking working

**Week 2-3 (Oct 14-27):** Growth
- 5-10 videos posted
- 200+ followers
- First affiliate revenue

**Week 4-6 (Oct 28 - Nov 17):** Scale
- 15+ videos
- 500+ followers
- Consistent engagement

**Week 7-10 (Nov 18 - Dec 15):** Launch Prep
- 25-30+ videos
- 1,000+ followers
- Premium tier launched
- $MIYOMI token ready

**Dec 16, 2025:** 🚀 **Token Launch**

---

## Open Questions

1. **Account Creation:**
   - Create new TikTok account or use existing?
   - Username: @miyomi_oracle or @miyomimarkets?

2. **Affiliate Setup:**
   - Apply for Polymarket affiliate program (how long?)
   - Apply for Kalshi affiliate program
   - What's the commission structure?

3. **Legal:**
   - Need disclaimers? ("Not financial advice")
   - What jurisdiction applies? (She's "in NYC")
   - Any prediction market regulatory issues?

4. **Team:**
   - Who is trainer? (Seth only? Or Goldy/jmill help?)
   - Who responds to comments?
   - Who tracks metrics?

5. **Brand:**
   - Register miyomi.ai domain?
   - Trademark "Miyomi" name?
   - Create logo/wordmark?

---

## Bottom Line

**You now have three complete documents:**

1. **`MIYOMI_MASTER_CONSOLIDATION.md`** - What's been built (past 2 months)
2. **`IMPLEMENTATION_PATTERNS_FOUND.md`** - What patterns work (27 dashboards analyzed)
3. **`DECISION_FRAMEWORK.md`** (this doc) - What to decide (8 critical choices)

**Next step:** Make the 8 decisions above, then start Week 1 build.

**Core insight:** Miyomi is an **oracle who creates viral content about prediction markets**, not a trader. Build for attention and engagement, not P&L and position management. The 27 HTML prototypes show you've been exploring this question - the answer is clear now.

**Let's consolidate and ship.** 🚀
