# Miyomi - jmill Briefing (Oct 17, 2025)

## Quick Context

**What is Miyomi?**
AI prediction market trader with personality - trades on Polymarket/Kalshi, creates video content, builds public track record. Vision: "Predictive of the game, not predicted by the game."

**Current State:** 45% complete
- ✅ Infrastructure 75% ready (Supabase, APIs configured)
- ✅ 30,000+ words documentation
- ❌ UI shows 100% mock data (needs real Dome API)
- ❌ No trainer workflow yet
- ❌ Video pipeline untested

**Goal:** Functional beta by Oct 29 → First real trade, first video, public launch

---

## Where We Are Now

### What's Built
- **Database**: Supabase with 6 tables (trades, videos, performance, revenue, opportunities, social_posts)
- **APIs Configured**: Dome (order history + P&L working), Polymarket CLOB (read access), Eden (agent ready)
- **Public Site**: index.html exists but shows mock stats
- **Documentation**: Complete strategy, competitive analysis, technical specs

### What's Missing (Beta Blockers)
1. **Live data integration** - Replace mock stats with real Dome API calls
2. **Market scanner** - Fetch + filter Polymarket opportunities
3. **Trainer interface** - Simple UI for browsing markets, selecting opportunities
4. **Video pipeline** - End-to-end test with Eden API + Yeah LoRA
5. **Working workflow** - Complete cycle: market → thesis → video → post

---

## Team Structure (3 People)

**Seth (Product Lead)**
- Strategic vision, coordination, partnerships
- Design/UX decisions, testing, content approval
- ~10-15 hrs/week

**Goldy (Domain Expert)** - Call tomorrow (Fri 3pm CEST)
- Market selection & analysis (the competitive edge)
- Contrarian thesis development
- PM community strategy, partnership insights
- First real "trainer" to test workflow
- ~5-10 hrs/week

**jmill (Technical Lead)** - That's you!
- Market scanner, Dome dashboard, trainer UI
- Video pipeline (Eden API integration)
- Testing, deployment, bug fixes
- Time commitment: TBD (determines approach)

**Why 3-person team matters**: Seth + jmill can build the system, but Goldy's PM expertise = differentiation. Content quality depends on deep market understanding.

---

## Three Possible Approaches

### 1. FULL STACK (Aggressive)
**Timeline:** 2 weeks to complete system
**What it means:** All features functional, polished UI, ready to scale
**Pros:** Everything done by Oct 29, professional quality
**Cons:** High intensity, requires ~20-30 hrs/week from jmill
**Risk:** Little room for delays or blockers

### 2. PHASED (Balanced)
**Timeline:** 2 weeks to core, 2 more weeks to polish (Nov 15 full launch)
**What it means:** MVP by Oct 29, iterate to full launch
**Pros:** More realistic pace, time to improve
**Cons:** Delays token launch to late Dec, momentum could slow
**Requires:** ~10-15 hrs/week from jmill

### 3. MVP (Recommended)
**Timeline:** 1 week to minimal beta, iterate from there
**What it means:** One complete workflow working, everything else manual
**Pros:** Fastest learning, lowest commitment (~5-10 hrs/week)
**Cons:** Lots of manual work initially, automation comes later
**Philosophy:** Ship minimal beta, learn what matters, iterate

---

## Technical Components (5 Total)

### 1. Market Scanner
**What:** Fetch 50+ Polymarket markets, filter for opportunities
**Implementation:**
- Polymarket CLOB API endpoint
- Filter: volume > $10k, consensus > 70% or < 30%
- Calculate opportunity score
- Return top 50 sorted
- Cache 5 minutes (reduce API calls)

**Estimate:** 4-6 hours
**Priority:** High (can't select markets without this)

---

### 2. Dome Dashboard
**What:** Replace mock data with real performance stats
**Implementation:**
- Connect existing `/api/dome/pnl` endpoint to index.html
- Display: win rate, total P&L, trades count
- Auto-refresh every 30 seconds
- Loading states + error handling

**Estimate:** 2-3 hours
**Priority:** High (credibility depends on real data)

---

### 3. Trainer Interface
**What:** Simple UI for Goldy to browse markets and select opportunities
**Implementation:**
- Fetch from `/api/markets/scan`
- Display in table format
- "Select" button per market
- Save to database queue
- Show selected markets

**Estimate:** 3-4 hours
**Priority:** Medium (needed before Goldy can test workflow)

---

### 4. Video Pipeline
**What:** Generate video from script using Eden API
**Implementation:**
- Accept script text as input
- Call Eden API with Yeah LoRA (Agent ID: 68aae13174876e833d9ae73b)
- Async polling for completion
- Save video URL to database
- Return status

**Estimate:** 4-6 hours (includes testing)
**Priority:** Medium (can do manual first video to test)

---

### 5. Testing & Deployment
**What:** End-to-end validation, bug fixes, Vercel deploy
**Estimate:** 3-4 hours
**Priority:** Ongoing

---

## What We Need from You

### Decision Time
1. **Time commitment**: How many hours/week can you dedicate?
   - 5-10 hrs → MVP approach
   - 10-15 hrs → Phased approach
   - 20-30 hrs → Full stack approach

2. **Comfort level**: Which approach feels realistic given your schedule?

3. **Technical concerns**: Any blockers you foresee?
   - Eden API access/testing
   - Polymarket API rate limits
   - Database schema changes needed
   - Deployment infrastructure

### Questions for You
- **Eden API**: Ready to test with Yeah LoRA? Need any setup?
- **Polymarket**: Comfortable with CLOB API docs? Any concerns?
- **Architecture**: Current stack (Next.js/Fastify/Supabase) work for you?
- **Workflow**: Prefer daily Slack updates or weekly syncs?

---

## Suggested Next Steps (If MVP Approach)

### This Week (Oct 17-22)
**Day 1-2 (Thu-Fri):**
- Build market scanner endpoint
- Connect Dome dashboard to index.html
- Basic testing

**Day 3-4 (Sat-Sun):**
- Build simple trainer interface
- Test with sample markets
- Document any blockers

**Day 5-7 (Mon-Tue):**
- Eden API test (one video generation)
- End-to-end manual workflow test
- Coordinate with Goldy for first market selection

### Next Week (Oct 23-29)
- Goldy selects first market
- Generate first video
- Seth executes first trade
- Beta launch Oct 29

---

## Key Infrastructure Details

**Deployment:**
- Vercel project: `miyomi-federation`
- Production URL: https://miyomi-federation-[hash].vercel.app
- Planned domain: miyomi.ai

**Database (Supabase):**
- URL: https://aeflqgydcrlszgbpduyk.supabase.co
- Tables: trades, videos, performance, revenue, opportunities, social_posts

**APIs:**
- **Dome**: Order history + P&L calculation working
- **Polymarket**: CLOB API for market data (read-only)
- **Eden**: Agent ID 68aae13174876e833d9ae73b, API key configured
- **Kalshi**: API access available (future integration)

**Environment Variables (.env.local):**
```
EDEN_API_KEY=[REDACTED]
EDEN_AGENT_ID=68aae13174876e833d9ae73b
SUPABASE_URL=https://aeflqgydcrlszgbpduyk.supabase.co
SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_KEY=[configured]
DOME_API_KEY=[obtained, working]
```

---

## Success Metrics

**Week 1 Success (Oct 22):**
- [ ] Market scanner returns real Polymarket data
- [ ] Dome dashboard shows real performance
- [ ] Trainer interface functional (Goldy can browse markets)
- [ ] All APIs tested and documented

**Week 2 Success (Oct 29):**
- [ ] First video generated successfully
- [ ] First trade executed
- [ ] Content posted to social media
- [ ] Beta launched at miyomi.ai
- [ ] No critical bugs

**Post-Beta (Nov-Dec):**
- [ ] 2-3 videos/week
- [ ] 15+ trades executed
- [ ] 65%+ win rate
- [ ] 1,000+ followers
- [ ] Token launch ready (Dec 15)

---

## Visual Reference

**Beta Launch Overview Page:**
https://miyomi-federation-4psaou88a-edenprojects.vercel.app/beta-launch-overview.html

(Swiss design, clean layout - shows timeline, team structure, approaches, components)

---

## Why This Matters

**Revenue Opportunity:**
- Affiliate fees (Polymarket/Kalshi signups: $25 each)
- Advertising & sponsorships
- Trading profits (proves credibility)
- Market making fees (Phase 2: Soup.xyz)
- Token launch (Dec 15: $MIYOMI with royalty rights)

**Competitive Advantage:**
- First AI trader with *public track record* + *personality*
- Goldy's PM expertise = better market selection than generic bots
- Video content = distribution (not just trading)
- Community building → token value

**Why Goldy is Critical:**
Content quality depends on:
1. Which markets to select (his expertise)
2. Why consensus is wrong (his contrarian insights)
3. How to communicate in PM community (his network)

**Why jmill is Critical:**
- Market scanner determines what opportunities Goldy sees
- Trainer interface determines workflow efficiency
- Video pipeline determines content production rate
- Infrastructure determines scalability

---

## Communication Plan

**Recommended:**
- **Slack channel**: Quick updates, blockers, questions
- **Weekly sync**: All 3 (Seth, Goldy, jmill) - 30 min Wed or Fri
- **Async handoffs**: jmill builds → Seth tests → jmill fixes
- **Code reviews**: As needed (Seth can test, Goldy tests trainer workflow)

**Workflow:**
1. jmill builds component
2. Seth tests, provides feedback
3. Goldy tests (if trainer-related)
4. jmill iterates
5. Deploy when ready

---

## Questions We Have for You

**Technical:**
1. Any technical concerns or blockers you foresee?
2. Comfortable with current stack (Next.js/Fastify/Supabase)?
3. Need any credentials/access you don't have?
4. Prefer any specific tools/workflows?

**Timing:**
1. How many hours/week can you realistically commit?
2. Which days/times work best for sync calls?
3. Prefer daily check-ins or weekly updates?
4. Any upcoming schedule conflicts (travel, other projects)?

**Approach:**
1. Which of the 3 approaches feels most realistic?
2. MVP sprint to test workflow first, or full build?
3. Comfortable with Oct 29 beta target?
4. Want to start with easiest component (Dome dashboard) or hardest (video pipeline)?

---

## Documentation Available

**For Technical Context:**
- `/Users/seth/miyomi-vercel/README.md` - Complete project overview (20,000 words)
- `/Users/seth/miyomi-vercel/IMPLEMENTATION_PLAN.md` - Technical roadmap
- `/Users/seth/miyomi-vercel/DOME_INTEGRATION_PLAN.md` - Dome API integration guide
- `/Users/seth/miyomi-vercel/DOME_TRACKING_SETUP.md` - Performance tracking setup

**For Strategic Context:**
- `/Users/seth/miyomi-vercel/BETA_LAUNCH_PLAN.md` - 2-week sprint plan (25+ pages)
- `/Users/seth/miyomi-vercel/COMPETITIVE_ANALYSIS.md` - Market research
- `/Users/seth/miyomi-vercel/MIYOMI_VISION_ROADMAP.md` - Long-term evolution

**For Meeting Context:**
- `/Users/seth/miyomi-vercel/JMILL_MEETING_OCT_16_2025.md` - Original meeting agenda (590 lines)
- `/Users/seth/miyomi-vercel/GOLDY_ROLE_DOMAIN_EXPERT.md` - Goldy's role definition

---

## Bottom Line

**What we're asking:**
- Pick a time commitment that works for you (5-30 hrs/week)
- Help us ship a minimal beta by Oct 29
- Build 5 core components (market scanner, dashboard, trainer, video, testing)
- Iterate based on real usage with Goldy

**What you get:**
- Clear scope (3 approaches to choose from)
- Strong foundation (75% infrastructure ready)
- Good documentation (30,000+ words)
- Small team (Seth + Goldy + you, fast decisions)
- Real impact (first AI prediction trader with personality + public track record)

**Philosophy:**
Start small, ship fast, learn from real usage. MVP over perfection. Goldy's expertise + jmill's execution + Seth's vision = competitive advantage.

**Next Step:**
Let's chat - answer your questions, pick approach, assign first tasks, set sync schedule. Ready when you are.

---

**Prepared by:** Seth + Claude
**Date:** October 17, 2025
**Status:** Ready for jmill conversation
