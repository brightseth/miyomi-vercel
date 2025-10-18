# MIYOMI Beta Sprint - jmill Meeting Outline

**Date:** October 16, 2025
**Duration:** 1 hour
**Goal:** Align on 2-week sprint to functional beta launch

---

## 📋 Meeting Agenda (60 minutes)

### Part 1: Context & Goals (10 min)
- Where we are now (42% complete, solid foundation)
- What beta launch means (functional system, first real trade)
- Why 2 weeks is realistic (infrastructure ready, just needs assembly)

### Part 2: Sprint Options (20 min)
- Three approaches to choose from (see below)
- Trade-offs of each option
- Decide which path to take

### Part 3: Role Division (15 min)
- What Seth handles (creative, strategy, testing)
- What jmill handles (technical implementation, video pipeline)
- What can be done in parallel vs sequentially

### Part 4: Milestones & Checkpoints (15 min)
- Week 1 deliverables (Oct 16-22)
- Week 2 deliverables (Oct 23-29)
- Daily/weekly sync schedule

---

## 🎯 Beta Launch Goals

### Must-Have for Oct 29 Launch
1. ✅ **Real Data Everywhere** - No more mock/static data
2. ✅ **Working Trainer Workflow** - Browse markets → select → create content
3. ✅ **Live Performance Dashboard** - Dome API showing real P&L
4. ✅ **One Complete Cycle** - Market selection → video → post
5. ✅ **First Real Trade** - Execute and track outcome

### Nice-to-Have (Can Wait)
- Advanced filtering/sorting
- Social posting automation
- Mobile optimization
- Performance charts/graphs
- Multi-trainer support

---

## 🛤️ Three Approaches (Choose One)

### Option A: Full Stack (Ambitious)
**Timeline:** 2 weeks, high intensity
**Seth + jmill both working full-time**

#### Week 1: Foundation
- **Days 1-2:** UI redesign (Seth: design, jmill: implementation)
- **Days 3-4:** Live data integration (jmill: APIs, Seth: testing)
- **Days 5-7:** Trainer workflow (jmill: backend, Seth: UX)

#### Week 2: Polish & Launch
- **Days 8-9:** Video pipeline (jmill: Eden integration)
- **Days 10-11:** Testing (both: find/fix bugs)
- **Days 12-14:** Launch (Seth: first trade, jmill: deployment)

**Pros:**
- Everything ready by Oct 29
- Complete system, professional quality
- Can start producing content immediately

**Cons:**
- Requires significant jmill time commitment
- High pressure, little room for delays
- Risk if either person gets blocked

**Best For:** If jmill can dedicate 20-30 hours this week

---

### Option B: Phased Launch (Realistic)
**Timeline:** 2 weeks to MVP, 2 more weeks to polish
**Seth + jmill working part-time**

#### Week 1: Core Functionality
- **Seth:** UI mockups, market research, content planning
- **jmill:** Market scanner API, Dome integration, database updates
- **Together:** Test market scanner with real data

#### Week 2: Video Pipeline
- **Seth:** Select first market, write thesis/script
- **jmill:** Eden API testing, video generation
- **Together:** End-to-end test with one real video

#### Week 3-4: Polish & Scale
- Refine based on learnings
- Build out remaining features
- Launch with 3-5 videos ready

**Pros:**
- More manageable pace
- Time to iterate and improve
- Less pressure, higher quality

**Cons:**
- Beta launch delayed to mid-November
- Token launch might slip to late December
- Momentum could slow

**Best For:** If jmill can dedicate 10-15 hours/week

---

### Option C: Minimum Viable Beta (Pragmatic)
**Timeline:** 1 week to bare minimum, iterate from there
**Focus on one complete workflow, everything else manual**

#### This Week (Oct 16-22):
1. **Market Scanner** (jmill: 4-6 hours)
   - Single endpoint: fetch top 50 Polymarket markets
   - Basic filtering (volume, consensus)
   - Display in simple HTML table

2. **Dome Dashboard** (jmill: 2-3 hours)
   - Connect existing `/api/dome/pnl` to index.html
   - Replace mock stats with real data
   - Auto-refresh every 30 seconds

3. **Manual Video Pipeline** (Seth + jmill: 3-4 hours)
   - Seth: Select market, write script manually
   - jmill: Test Eden API with one video
   - Manual posting to social media

#### Next Week (Oct 23-29):
1. Execute first real trade
2. Generate video
3. Post and track engagement
4. Iterate based on results

**Pros:**
- Fastest path to testing real workflow
- Minimal jmill time needed (~10 hours total)
- Learn what actually matters vs nice-to-have
- Can iterate quickly

**Cons:**
- Lots of manual work initially
- Not as "wow" for demo purposes
- Automation comes later

**Best For:** If jmill can only dedicate 5-10 hours/week

---

## 🔧 Technical Breakdown by Component

### Component 1: Market Scanner
**What it does:** Fetch live Polymarket markets, filter for opportunities

**Implementation:**
```javascript
// /api/markets/scan.js
// Estimated time: 4-6 hours

1. Fetch markets from Polymarket CLOB API
2. Filter: volume > $10k, consensus > 70% or < 30%
3. Calculate opportunity score
4. Return top 50 sorted by score
5. Cache for 5 minutes (reduce API calls)
```

**jmill Tasks:**
- [ ] Create API endpoint
- [ ] Test with live Polymarket data
- [ ] Add error handling
- [ ] Document response format

**Seth Tasks:**
- [ ] Test endpoint in browser
- [ ] Provide feedback on filtering logic
- [ ] Identify edge cases

**Deliverable:** `GET /api/markets/scan` returning JSON

---

### Component 2: Dome Performance Dashboard
**What it does:** Show real performance stats on public site

**Implementation:**
```javascript
// Update /public/index.html
// Estimated time: 2-3 hours

1. Replace hardcoded stats with fetch() calls
2. Connect to /api/dome/pnl endpoint (already exists)
3. Display: win rate, total P&L, trades count
4. Add loading states and error handling
5. Auto-refresh every 30 seconds
```

**jmill Tasks:**
- [ ] Verify `/api/dome/pnl` works with Miyomi wallet
- [ ] Update index.html JavaScript
- [ ] Add refresh mechanism
- [ ] Test with real data

**Seth Tasks:**
- [ ] Provide Miyomi wallet address (once trading starts)
- [ ] Test dashboard display
- [ ] Approve design changes

**Deliverable:** index.html shows real Dome data

---

### Component 3: Trainer Interface (Simple Version)
**What it does:** Display markets, allow selection

**Implementation:**
```html
<!-- /public/trainer-simple.html -->
<!-- Estimated time: 3-4 hours -->

1. Fetch markets from /api/markets/scan
2. Display in clean table format
3. Add "Select" button per market
4. Save selection to database
5. Show selected markets in queue
```

**jmill Tasks:**
- [ ] Create trainer-simple.html
- [ ] Connect to markets API
- [ ] Add database save logic
- [ ] Build queue view

**Seth Tasks:**
- [ ] Test market browsing
- [ ] Select first real market
- [ ] Provide UX feedback

**Deliverable:** Functional market browser for trainer

---

### Component 4: Video Pipeline
**What it does:** Generate video from script

**Implementation:**
```javascript
// /api/video/generate.js
// Estimated time: 4-6 hours (includes testing)

1. Accept script text as input
2. Call Eden API with Yeah LoRA
3. Poll for completion (async)
4. Save video URL to database
5. Return status
```

**jmill Tasks:**
- [ ] Test Eden API with Yeah LoRA
- [ ] Verify character consistency
- [ ] Build async polling mechanism
- [ ] Handle errors/retries

**Seth Tasks:**
- [ ] Write first video script
- [ ] Review generated video quality
- [ ] Provide feedback on character look

**Deliverable:** One working video generation test

---

## 📊 Milestone Tracking

### Week 1 Milestones (Pick Based on Option Chosen)

#### Option A (Full Stack)
- [ ] Day 2: UI redesign complete
- [ ] Day 4: All APIs returning real data
- [ ] Day 7: Trainer workflow functional

#### Option B (Phased)
- [ ] Day 3: Market scanner working
- [ ] Day 5: Dome dashboard live
- [ ] Day 7: Trainer can browse markets

#### Option C (MVP)
- [ ] Day 3: Market scanner + Dome dashboard
- [ ] Day 5: First video generated
- [ ] Day 7: Manual workflow tested end-to-end

### Week 2 Milestones (All Options)
- [ ] Day 10: First real market selected
- [ ] Day 12: Video generated and approved
- [ ] Day 14: Trade executed, video posted, beta launched

---

## 🤝 Three-Person Team Structure

### Seth (Product Lead)
**Focus:** Vision, coordination, creative direction
**Time Commitment:** 10-15 hours/week

**Responsibilities:**
- Overall product vision and strategy
- Team coordination (Seth ↔ Goldy ↔ jmill)
- Design/UX decisions and approval
- Testing and feedback loop
- Partnership outreach (Kalshi, platforms)
- Token launch preparation

**Specific Tasks:**
- [ ] Review and approve UI mockups (with Goldy input)
- [ ] Test all features as they're built
- [ ] Coordinate between Goldy's market insights and jmill's implementation
- [ ] Set up social media accounts
- [ ] Execute first trade manually
- [ ] Oversee beta launch

### Goldy/Jacob (Domain Expert & Trainer)
**Focus:** Prediction market expertise, content strategy, market selection
**Time Commitment:** 5-10 hours/week

**Responsibilities:**
- **Market Selection** - Identify best contrarian opportunities
- **Market Dynamics** - Explain why consensus is wrong
- **Content Strategy** - What makes compelling prediction content
- **Thesis Development** - Craft contrarian arguments
- **Social Strategy** - How to build audience in PM space
- **Growth Strategy** - Partnerships, community, distribution
- **Trainer Role** - Be the first real user testing workflow

**Specific Tasks:**
- [ ] Review market scanner results, pick best opportunities
- [ ] Develop contrarian thesis for first 3-5 trades
- [ ] Write/approve video scripts (market context + why crowd is wrong)
- [ ] Guide social media strategy (what resonates in PM community)
- [ ] Advise on Kalshi partnership approach
- [ ] Test trainer workflow and provide UX feedback
- [ ] Help define "what good looks like" for market selection

**Why Goldy is Critical:**
- Seth + jmill can build the system, but Goldy knows prediction markets
- Content quality depends on deep market understanding
- Growth strategy needs someone who knows the PM community
- Trainer workflow should be designed for PM experts like Goldy
- His expertise = competitive advantage (not just tech)

### jmill (Technical Lead)
**Focus:** Implementation, infrastructure, video pipeline
**Time Commitment:** 10-30 hours/week (depending on option chosen)

**Responsibilities:**
- API endpoint development
- Dome/Polymarket integration
- Database updates
- Video pipeline (Eden API)
- Deployment and infrastructure
- Bug fixes and performance

**Specific Tasks:**
- [ ] Build market scanner API (Goldy defines filtering criteria)
- [ ] Update index.html with Dome data
- [ ] Create trainer interface (for Goldy to use)
- [ ] Test Eden API with Yeah LoRA
- [ ] Build video generation workflow
- [ ] Deploy to production
- [ ] Fix any critical bugs

**jmill ↔ Goldy Handoffs:**
- Goldy defines what markets to scan for → jmill builds the filters
- jmill builds trainer UI → Goldy tests and provides feedback
- Goldy writes thesis → jmill generates video
- Video complete → Goldy reviews quality and approves

### Parallel vs Sequential Work

**Can Do in Parallel (Week 1):**
- Seth: UI coordination ← → jmill: Market scanner API ← → Goldy: Market research
- Seth: Design approval ← → jmill: Dome integration ← → Goldy: Content strategy
- Seth: Social setup ← → jmill: Database updates ← → Goldy: Thesis development

**Must Do Sequentially (Week 2):**
1. jmill builds market scanner
2. Goldy tests scanner, selects first market
3. Goldy writes contrarian thesis + script
4. jmill generates video from script
5. Goldy reviews video quality
6. Seth approves and posts
7. All three monitor engagement

**Key Insight:** Goldy's domain expertise feeds into both Seth's strategy and jmill's implementation. He's the bridge between "what to build" and "how to use it."

---

## 📅 Proposed Schedule

### Week 1: Oct 16-22

| Day | Seth | Goldy | jmill | Sync |
|-----|------|-------|-------|------|
| **Wed 16** | Meeting facilitation | Meeting: Provide PM expertise | Market scanner API start | **3-way meeting: Align on plan** |
| **Thu 17** | Coordinate testing | Review market scanner output | Complete market scanner | Quick check-in |
| **Fri 18** | Design approval | Identify best markets | Dome dashboard integration | |
| **Sat 19** | Social strategy | Research first 3-5 opportunities | Trainer interface start | |
| **Sun 20** | Rest | Content planning | Complete trainer interface | |
| **Mon 21** | Test workflow | **Test trainer UI, select market** | Database updates, bug fixes | Mid-week sync (all 3) |
| **Tue 22** | Approve selection | Write first contrarian thesis | Week 1 wrap-up | **Week 1 review** |

### Week 2: Oct 23-29

| Day | Seth | Goldy | jmill | Sync |
|-----|------|-------|-------|------|
| **Wed 23** | Review script | **Write video script** | Eden API testing | Quick check-in |
| **Thu 24** | Coordinate video review | Review generated video | Video pipeline build | |
| **Fri 25** | Final approval | Approve video quality | Complete video workflow | |
| **Sat 26** | Social media setup | Prepare launch content | Testing & bug fixes | |
| **Sun 27** | **Execute first trade** | Monitor market movement | Deployment prep | |
| **Mon 28** | Post video | Track engagement, replies | Monitor systems | Final sync (all 3) |
| **Tue 29** | **BETA LAUNCH** | **BETA LAUNCH** | **BETA LAUNCH** | **Launch day celebration!** |

**Key Workflow:**
1. jmill builds tools
2. Goldy uses tools to find/analyze markets
3. Seth coordinates and approves
4. Goldy creates content (thesis/script)
5. jmill generates video
6. Goldy reviews quality
7. Seth posts and tracks

---

## 💬 Discussion Questions for Meeting

### Strategic Questions
1. **Which option feels right?** (A: Full Stack, B: Phased, C: MVP)
2. **How much time can jmill commit?** (5-10 hrs/week, 15-20, or 25-30)
3. **Is Oct 29 beta launch realistic?** (Or should we target mid-Nov?)
4. **What's more important?** (Speed to launch vs quality/polish)

### Technical Questions
1. **Eden API ready to test?** (Need Yeah LoRA working first)
2. **Any concerns about Polymarket API?** (Rate limits, data quality)
3. **Database schema changes needed?** (New tables for markets, queue)
4. **Deployment strategy?** (Vercel good, or need backend server?)

### Workflow Questions
1. **How should we sync?** (Daily Slack? Weekly calls? Both?)
2. **What's the handoff process?** (Seth tests → jmill fixes → repeat)
3. **How do we handle blockers?** (If Eden API fails, what's plan B?)
4. **Testing approach?** (Seth tests everything, or jmill self-tests first?)

---

## 🎯 Decision Framework

### If jmill can commit 25-30 hrs/week:
→ **Choose Option A (Full Stack)**
→ Target: Full beta launch Oct 29
→ Weekly syncs: Wed + Mon
→ Daily Slack check-ins

### If jmill can commit 15-20 hrs/week:
→ **Choose Option B (Phased)**
→ Target: MVP by Oct 29, full launch Nov 15
→ Weekly syncs: Wed
→ Async Slack updates

### If jmill can commit 5-10 hrs/week:
→ **Choose Option C (MVP)**
→ Target: Minimal beta Oct 22, iterate to Nov 15
→ One sync per week
→ Seth does more manual work initially

---

## 📋 Meeting Outcomes

### Required Decisions
- [ ] Which option to pursue (A, B, or C)
- [ ] jmill's weekly time commitment
- [ ] Goldy's role confirmation (is he on board?)
- [ ] Sync schedule (daily/weekly/both, 2-way or 3-way)
- [ ] Week 1 priorities (what gets built first)
- [ ] Beta launch date (Oct 29, Nov 15, or flexible)

### Action Items to Assign
- [ ] **Seth:** Coordination, design approval, social setup
- [ ] **Goldy:** Market selection criteria, first thesis, content strategy
- [ ] **jmill:** Market scanner, Dome integration, trainer UI
- [ ] **All three:** When's next check-in, communication method

### Questions for Goldy
- [ ] Time commitment realistic? (5-10 hrs/week)
- [ ] Comfortable being "first trainer" testing workflow?
- [ ] Input on market selection criteria for scanner?
- [ ] Ideas for social/growth strategy?
- [ ] Kalshi contacts or warm intro possible?

### Follow-Up Items
- [ ] Document decisions in SESSION_NOTES.md
- [ ] Update BETA_LAUNCH_PLAN.md based on chosen option
- [ ] Create Week 1 task list in project management tool
- [ ] Set up Slack channel or communication method

---

## 🚀 Post-Meeting Next Steps

### Immediate (Today)
1. **Seth:** Send jmill any UI mockups or design preferences
2. **jmill:** Set up dev environment, review Polymarket API docs
3. **Both:** Confirm first sync time (tomorrow or Friday)

### This Week (Oct 16-22)
1. Start building Week 1 components (based on chosen option)
2. Daily/weekly syncs as agreed
3. Test everything as it's built
4. Document progress in SESSION_NOTES.md

### Next Week (Oct 23-29)
1. Video pipeline testing
2. First real trade execution
3. Beta launch preparation
4. Go/no-go decision by Oct 28

---

## 📊 Success Metrics

### Week 1 Success
- [ ] Market scanner returns real Polymarket data
- [ ] Dome dashboard shows real performance
- [ ] Trainer can browse and select markets
- [ ] All APIs tested and documented

### Week 2 Success
- [ ] Video generated successfully
- [ ] First trade executed
- [ ] Content posted to social media
- [ ] Beta launched at miyomi.ai
- [ ] No critical bugs preventing use

### Post-Beta Success (Nov-Dec)
- [ ] 2-3 videos per week
- [ ] 15+ trades executed
- [ ] 65%+ win rate
- [ ] 1,000+ followers
- [ ] Token launch ready (Dec 15)

---

## 🎬 Closing

**Key Message for Team:**
"We have all the technical pieces ready (Dome API, Polymarket, Eden, database). What we need now is Goldy's prediction market expertise to guide what we build and how it's used. The system is only as good as the market insights that drive it. This is a three-person team where each role is critical:
- **Seth:** Vision and coordination
- **Goldy:** Market expertise and content
- **jmill:** Technical execution

Pick a pace that works for everyone, and we'll adjust the timeline. Quality matters more than arbitrary dates."

**Recommended Approach:**
Start with **Option C (MVP)** - get one complete workflow working end-to-end, then iterate. With three people, we want fast feedback loops and clear handoffs. Build → Test with Goldy → Iterate → Launch.

**Bottom Line:**
By end of month, we want: Real data dashboard + Market scanner + Goldy-selected opportunity + One video generated = Proof of concept working. Everything else is polish.

**Goldy's Impact:**
Without domain expertise, we're just building a generic prediction tool. With Goldy, we're building a system that leverages real PM knowledge = competitive advantage. His market selection and thesis development is what makes Miyomi's content credible and compelling.

---

**Meeting Prep Complete ✅**

Seth: Share this doc with both jmill and Goldy before the meeting. The three-person dynamic is key to success - technical excellence + market expertise + strategic vision.

**Suggested Meeting Format:**
1. Seth leads (vision/goals)
2. jmill explains technical options
3. Goldy weighs in on what markets/content strategy matters
4. All three decide on approach and timeline
5. Assign clear first tasks for each person

Good luck with the meeting! 🚀
