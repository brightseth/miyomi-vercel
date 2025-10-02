# MIYOMI - Session Notes

**Project:** Miyomi - Contrarian Prediction Market AI Influencer
**Location:** `/Users/seth/miyomi-vercel/`
**Launch Target:** Mid-December 2025

---

## Quick Start Commands

```bash
cd /Users/seth/miyomi-vercel

# Check database connection
node -e "import { createClient } from '@supabase/supabase-js'; const s = createClient('https://aeflqgydcrlszgbpduyk.supabase.co', process.env.SUPABASE_ANON_KEY); console.log('✓ Connected');"

# Scan for opportunities
node test-workflow.js

# Check deployed site
open https://miyomi.ai

# Start local dashboard
npx serve pages -l 5173 && open http://localhost:5173
```

---

## Current Session (Oct 2, 2025)

### What We Did:
1. ✅ **Deployed database schema** - 6 tables in Supabase (trades, videos, performance, revenue, opportunities, social_posts)
2. ✅ **Fixed Polymarket client** - Handle `tokens` vs `outcomes` field, fixed response format `data.data`
3. ✅ **Tested complete workflow** - Scan markets → Generate Miyomi thesis → Save to database
4. ✅ **Saved first opportunity** - Ant-Man market (resolved, but workflow working)
5. ✅ **Built simple dashboard** - Local HTML viewer at localhost:5173

### Issues Discovered:
- Polymarket API `active: true` parameter returns only closed/historical markets
- Need to find correct endpoint or filter for truly active tradeable markets
- Markets today are very balanced (no extreme consensus found even at 55% threshold)

### Next Session TODO:
- [ ] Fix Polymarket API to fetch truly active markets (check their docs for correct endpoint)
- [ ] Test with live markets that have liquidity
- [ ] Connect opportunity scanner to existing miyomi.ai Trainer Mode
- [ ] Wait for jmill to configure Eden Yeah LoRA for video generation

---

## Previous Sessions

### Session: Oct 1, 2025 (Context Refresh)
**Summary:** Briefed jmill on project, clarified revenue model (attention → leads/ads primary), integrated Spirit Protocol tokenomics, created comprehensive documentation.

**Key Files Created:**
- `JMILL_ROLE.md` - Team collaboration roles
- `MIYOMI_SPIRIT_TOKENOMICS.md` - Complete token economics (5,000 words)
- `PROJECT_STATUS.md` - What's done vs what's needed
- `IMPLEMENTATION_PLAN.md` - Week-by-week technical roadmap

**Decisions Made:**
- Primary revenue: Affiliate fees ($25/signup from Polymarket/Kalshi), sponsorships
- Secondary revenue: Trading profits (for credibility)
- Visual identity: Eden LoRA "Yeah by iflookscouldkill"
- Team: Seth (creative), jmill (tooling)
- Token: $MIYOMI on Base L2, 25/25/25/25 distribution (Spirit/Liquidity/Seth/Treasury)

---

## Project Structure

```
/Users/seth/miyomi-vercel/
├── SESSION_NOTES.md              ← You are here
├── README.md                     ← Main project overview
├── PROJECT_STATUS.md             ← Current completion status
├── IMPLEMENTATION_PLAN.md        ← Technical roadmap
├── JMILL_ROLE.md                 ← Team roles
├── MIYOMI_SPIRIT_TOKENOMICS.md   ← Token economics
│
├── lib/
│   ├── polymarket-client.js      ← Polymarket API (working)
│   ├── kalshi-client.js          ← Kalshi API (auth issues)
│   ├── soup-client.js            ← Soup.xyz (Phase 2)
│   ├── eden-client.js            ← Eden video generation
│   └── database.js               ← Supabase client
│
├── api/
│   └── opportunities/
│       ├── polymarket.js         ← Find contrarian markets
│       └── kalshi.js             ← Economic indicators
│
├── database/
│   ├── schema.sql                ← Full schema with constraints
│   └── schema-simple.sql         ← Deployed version (working)
│
├── pages/
│   └── index.html                ← Simple dashboard viewer
│
└── test-workflow.js              ← Complete workflow test script
```

---

## Key Resources

### Documentation (9 files, 30k words)
- **README.md** - Complete overview
- **IMPLEMENTATION_PLAN.md** - Technical roadmap
- **MIYOMI_SPIRIT_TOKENOMICS.md** - Token economics
- **PROJECT_STATUS.md** - Progress tracking
- **JMILL_ROLE.md** - Team collaboration
- **MIYOMI_VISION_ROADMAP.md** - Evolution story
- **MIYOMI_COLLABORATION_BRIEF.md** - Technical details
- **MIYOMI_MARKET_MAKER.md** - Soup.xyz integration
- **DEPLOYMENT_GUIDE.md** - Setup instructions

### Environment Variables (.env.local)
```bash
EDEN_API_KEY=db10962875d98d2a2dafa8599a89c850766f39647095c002
EDEN_AGENT_ID=68aae13174876e833d9ae73b
SUPABASE_URL=https://aeflqgydcrlszgbpduyk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
KALSHI_API_KEY=3afce799-fb17-4dfe-b5b8-6d2d27b639e3
POLYMARKET_API_KEY=(empty - read-only doesn't need key)
```

### Database (Supabase)
- **URL:** https://supabase.com/dashboard/project/aeflqgydcrlszgbpduyk
- **Tables:** trades, videos, performance, revenue, opportunities, social_posts
- **Status:** Deployed and working ✅

### Deployed Site
- **URL:** https://miyomi.ai
- **Features:** Public mode (predictions, videos) + Trainer mode (password-protected control panel)
- **Design:** Dark theme with neon accents

---

## Todo List

### ✅ Completed
- [x] Brief jmill on project
- [x] Create comprehensive documentation (30k words)
- [x] Deploy Supabase database schema (6 tables)
- [x] Test Polymarket API connection
- [x] Test database save functionality
- [x] Test complete opportunity workflow (scan→thesis→save)
- [x] Build simple dashboard UI

### 🔄 In Progress
- [ ] Fix Polymarket API to get truly active markets
- [ ] Connect scanner to existing miyomi.ai Trainer Mode

### 🟡 Blocked (waiting on jmill)
- [ ] Configure Eden Yeah LoRA for video generation
- [ ] Test end-to-end video generation workflow

### 📋 Next Up
- [ ] Secure Polymarket affiliate deal
- [ ] Secure Kalshi affiliate deal
- [ ] Produce first 5 test videos
- [ ] Launch trading phase (15-20 videos)
- [ ] Build to 1,000+ followers
- [ ] Deploy $MIYOMI smart contracts (jmill)
- [ ] Token launch mid-December

---

## Progress Tracking

**Overall:** ~40% Complete

- **Documentation:** 100% ████████████████████
- **Core Libraries:** 95% ███████████████████░
- **Infrastructure:** 75% ███████████████░░░░░
- **Content/Audience:** 0% ░░░░░░░░░░░░░░░░░░░░
- **Trading Record:** 0% ░░░░░░░░░░░░░░░░░░░░
- **Token Prep:** 0% ░░░░░░░░░░░░░░░░░░░░

**Next Milestone:** First video produced (Target: Oct 14)

---

## Key Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Oct 1 | Primary revenue = attention → leads/ads | More scalable than trading profits alone |
| Oct 1 | Use Eden LoRA "Yeah" for consistent character | Visual identity crucial for influencer brand |
| Oct 1 | Team: Seth (creative) + jmill (tooling) | Clear separation of concerns |
| Oct 1 | Token launch: Mid-December 2025 | Allows 10 weeks to build track record |
| Oct 1 | Platform: Base L2 for $MIYOMI | Lower gas fees, Eden ecosystem alignment |
| Oct 2 | Use Supabase for all data | Simpler than custom backend |
| Oct 2 | Focus on Polymarket first | Larger market, better API access |

---

## Known Issues

1. **Polymarket API:** `active: true` parameter returns only closed markets
   - **Impact:** Can't find truly tradeable opportunities yet
   - **Next Step:** Check Polymarket docs for correct endpoint

2. **Kalshi Auth:** Requires email/password, not just API key
   - **Impact:** Can't access Kalshi markets yet
   - **Status:** User logs in via OAuth, doesn't have password
   - **Next Step:** Figure out OAuth flow for API access

3. **Markets Balanced:** No extreme consensus found even at 55% threshold
   - **Impact:** Hard to demonstrate contrarian strategy
   - **Status:** May just be market conditions today
   - **Next Step:** Check daily, markets will become extreme eventually

---

## Contact & Collaboration

**Team:**
- **Seth** (you) - Creative direction, strategy, partnerships
- **jmill** - Technical lead, tooling, Eden video pipeline

**Launch Target:** Mid-December 2025

**Revenue Model:**
- Primary: Affiliate fees ($25/signup), sponsorships, ads
- Secondary: Trading profits (for credibility)

**Token Distribution (25/25/25/25):**
- 25% → $SPIRIT (parent token)
- 25% → Liquidity pool
- 25% → Seth
- 25% → Treasury

---

## Quick Reference

### Test Opportunity Workflow
```bash
node test-workflow.js
```

### Check Supabase Data
```sql
-- In Supabase SQL Editor
SELECT * FROM opportunities ORDER BY created_at DESC LIMIT 5;
SELECT * FROM trades ORDER BY created_at DESC LIMIT 5;
```

### View Local Dashboard
```bash
npx serve pages -l 5173
open http://localhost:5173
```

### Check Deployed Site
```bash
open https://miyomi.ai
```

---

**Last Updated:** October 2, 2025
**Status:** Infrastructure 75% complete, waiting on video pipeline
