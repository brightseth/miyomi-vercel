# Miyomi Team Structure

**Date:** October 3, 2025
**Status:** Team roles defined
**Purpose:** Clear responsibilities for Miyomi build and operations

---

## Team Overview

**Three-person team with complementary skills:**

```
        SETH (Creator/Producer)
               │
       ┌───────┴───────┐
       │               │
   JMILL           GOLDY
(Developer)      (Trainer)
```

---

## Team Members

### Founder (Creator/Producer)
**Role:** Vision, strategy, creative direction

**Responsibilities:**
- Overall creative vision and strategy
- Character development (Miyomi's personality)
- Content strategy (what markets to cover)
- Business model and monetization
- Partnership decisions (Dome, Soup.xyz)
- Token launch planning ($MIYOMI)
- Final approval on major decisions

**Time commitment:** Strategic oversight, creative direction

---

### Dev (Developer) - Full Stack at Eden
**Role:** Technical implementation and infrastructure

**Responsibilities:**
- Build consolidated Miyomi platform (Next.js)
- API integrations:
  - Eden (video generation)
  - Dome (market intelligence)
  - Soup.xyz (market creation)
  - Polymarket/Kalshi (data + affiliates)
- Database architecture (Supabase)
- Deployment and DevOps (Vercel)
- Video pipeline optimization
- Dashboard UI implementation
- Performance and scaling

**Advantage:** Direct Eden access = faster video generation, better support, potential custom features

**Time commitment:** Primary technical builder

**Handoff documents:**
- `MIYOMI_MASTER_CONSOLIDATION.md` (what's been built)
- `IMPLEMENTATION_PATTERNS_FOUND.md` (best patterns)
- `DECISION_FRAMEWORK.md` (architecture decisions)
- `PROPRIETARY_EDGE_ARCHITECTURE.md` (Dome + Soup tech)

---

### Trainer
**Role:** Daily operations and market analysis

**Responsibilities:**
- **Daily workflow** (15-30 min/day):
  - Review AI-generated morning brief
  - Select most interesting contrarian opportunity
  - Edit/approve Miyomi's oracle take
  - Review generated video before posting
  - Post to social platforms
  - Engage with community comments

- **Market expertise:**
  - Identify high-quality prediction opportunities
  - Understand market dynamics and sentiment
  - Validate AI analysis with real market knowledge
  - Track Miyomi's accuracy and performance

- **Voice consistency:**
  - Ensure Miyomi's personality stays authentic
  - Adapt scripts to match her voice
  - Maintain "Markets whisper..." brand
  - Platform-specific content optimization

**Advantage:**
- Real prediction market expertise (Polymarket + Novig experience)
- Industry insider knowledge
- Content creation skills
- Current industry connections

**Time commitment:** 15-30 min daily + community engagement

**Handoff documents:**
- `MIYOMI_STATUS_UPDATE.md` (character personality + voice)
- `DECISION_FRAMEWORK.md` (daily workflow section)
- `MIYOMI_FOR_GOLDY.md` (if exists, or create trainer guide)

---

## Workflow Division

### Phase 1: Building (Week 1-4)

**Founder:**
- Make 8 strategic decisions (Decision Framework)
- Define brand guidelines
- Write initial character voice examples
- Approve major technical decisions
- Set up legal/business structure

**Dev:**
- Build Next.js oracle platform
- Integrate Eden video pipeline
- Set up Dome API connections
- Build trainer dashboard
- Deploy to miyomi.ai
- Create automated workflows

**Trainer:**
- Test trainer dashboard
- Provide feedback on workflow
- Help refine AI prompts for market analysis
- Test video generation quality
- Validate market opportunity selection logic

### Phase 2: Content Launch (Week 5-10)

**Founder:**
- Strategic oversight
- Weekly review of performance
- Adjust strategy based on metrics
- Plan token launch mechanics
- Build community presence

**Dev:**
- Monitor technical performance
- Optimize video generation speed
- Add features based on feedback
- Scale infrastructure as needed
- Integrate Soup.xyz (if ready)

**Trainer (Primary Daily Operator):**
- **Morning (9:00 AM):**
  - Review AI morning brief (3 market options)
  - Select best contrarian opportunity
  - Edit oracle take script if needed

- **Midday (11:00 AM):**
  - Review generated video
  - Approve and post to TikTok
  - Cross-post to Twitter/Farcaster

- **Afternoon (2:00 PM):**
  - Respond to comments
  - Track engagement metrics
  - Note what's working for next day

- **Weekly:**
  - Report to team on performance
  - Suggest new market categories
  - Identify trending opportunities

---

## Communication & Coordination

### Daily Sync (Async)
- **Trainer:** Posts daily update in team chat
  - What market selected
  - Video posted (links)
  - Engagement metrics
  - Any issues or wins

### Weekly Sync (30 min call)
- **Founder:** Strategic review
- **Dev:** Technical updates
- **Trainer:** Operations report
- **All:** Adjust strategy based on metrics

### Tools
- **GitHub:** Code and documentation
- **Discord/Telegram:** Team coordination
- **Notion/Linear:** Task tracking (optional)
- **Analytics Dashboard:** Share metrics

---

## Skills Matrix

| Skill | Founder | Dev | Trainer |
|-------|---------|-----|---------|
| **Strategy** | ★★★ | ★ | ★★ |
| **Development** | ★ | ★★★ | ★ |
| **Prediction Markets** | ★★ | ★ | ★★★ |
| **Content Creation** | ★★ | ★ | ★★★ |
| **AI/ML** | ★★★ | ★★ | ★ |
| **Community** | ★★ | ★ | ★★★ |
| **Eden Ecosystem** | ★★★ | ★★★ | ★ |

**Coverage:** Every critical skill covered by at least one team member at ★★★ level

---

## Compensation Structure (Draft)

### Revenue Split Framework

**Phase 1 (Pre-Token):** Affiliate revenue + any subscriptions
- **Model:** Sweat equity + equal split of early revenue
- All three investing time before meaningful revenue

**Phase 2 (Token Launch):** $MIYOMI tokenomics

**FINAL split (decided):**
```
$MIYOMI Token Distribution:
├─ 25% → $SPIRIT holders (via Spirit Protocol graduation)
├─ 25% → Liquidity pool
├─ 25% → Team (Artist/Human Creator allocation):
│        ├─ 40% Founder (100M tokens) - Vision, strategy, IP
│        ├─ 30% Dev (75M tokens) - Technical infrastructure
│        └─ 30% Trainer (75M tokens) - Daily ops + PM expertise
└─ 25% → Miyomi treasury (Agent allocation)
```

**Rationale:**
- Founder: Largest share (40%) for vision, character creation, strategic direction
- Dev: Equal to Trainer (30%), recognizes building entire platform
- Trainer: Equal to Dev (30%), recognizes daily operational burden + specialized PM expertise

**Why this works:**
- Values specialized prediction market knowledge
- Recognizes daily commitment vs one-time build
- Content creation = as valuable as code
- Team harmony (Dev and Trainer as equal partners)

**Trainer's ongoing compensation:**
- Token allocation: 75M $MIYOMI (30% of team allocation)
- Monthly trainer fee: $1,000-2,000/mo from Miyomi treasury (once revenue permits)
- Bonus structure: % of revenue growth driven

---

## Onboarding Plan

### For Dev (Developer)

**Week 1:**
- [ ] Read all strategic documents
- [ ] Review existing code (`lib/eden-client.js`, `lib/dome-client.js`, etc.)
- [ ] Review 27 HTML prototypes (cherry-pick best patterns)
- [ ] Sync with Founder on architectural decisions

**Week 2:**
- [ ] Start clean Next.js build
- [ ] Implement public oracle page
- [ ] Implement trainer dashboard
- [ ] Deploy MVP to miyomi.ai

**Handoff materials:**
- All documentation in repository
- Working code in `/lib/`
- .env.example for API keys
- Access to Eden API
- Dome API key provided

### For Trainer

**Week 1:**
- [ ] Read `MIYOMI_STATUS_UPDATE.md` (character profile)
- [ ] Read `DECISION_FRAMEWORK.md` (workflow section)
- [ ] Review `data/miyomi-picks.json` (data structure)
- [ ] Understand Miyomi's voice and personality

**Week 2:**
- [ ] Test trainer dashboard (once jmill builds)
- [ ] Practice daily workflow
- [ ] Review first AI-generated briefs
- [ ] Give feedback on UX

**Week 3:**
- [ ] Start daily operations
- [ ] Create first oracle video
- [ ] Post to TikTok
- [ ] Track metrics

**Handoff materials:**
- Character guide (`MIYOMI_STATUS_UPDATE.md`)
- Voice examples and templates
- Platform-specific content guidelines
- Trainer dashboard access
- Social media accounts

---

## Decision-Making Framework

### Strategic Decisions (Founder approval required)
- Brand direction changes
- Major feature additions
- Partnership agreements
- Token launch mechanics
- Budget over $1,000

### Technical Decisions (Dev leads)
- Architecture choices
- Tech stack selection
- API integration approach
- Performance optimization
- Deployment strategy

### Daily Operations (Trainer leads)
- Market selection
- Script editing
- Posting schedule
- Community engagement
- Content iteration

### Collaborative Decisions (All three)
- Weekly strategy adjustments
- Metrics interpretation
- New market categories
- Premium tier pricing
- Token launch timing

---

## Success Metrics (Team KPIs)

### Month 1 (All three)
- [ ] Platform launched (Dev)
- [ ] 10 oracle videos posted (Trainer)
- [ ] 200+ followers (Trainer)
- [ ] First $10 affiliate revenue (Team)

### Month 2
- [ ] 20 oracle videos (Trainer)
- [ ] 500+ followers (Trainer)
- [ ] 10+ premium subscribers (Team)
- [ ] Dome integration complete (Dev)

### Month 3
- [ ] 30+ oracle videos (Trainer)
- [ ] 1,000+ followers (Trainer)
- [ ] $500+ MRR (Team)
- [ ] Token launch ready (Founder + Dev)

### Performance Bonuses
- Hit 1,000 followers early → bonus from treasury
- Revenue exceeds projections → revenue share increase
- Viral video (100k+ views) → celebration bonus

---

## Communication Preferences

### Dev
- **Best for:** Technical questions, feature requests, bug reports
- **Response time:** Within 24 hours
- **Prefers:** Async (Discord/GitHub issues)
- **Deep work time:** Respect dev focus blocks

### Trainer
- **Best for:** Daily operations, market insights, content feedback
- **Response time:** Within 4 hours during business hours
- **Prefers:** Quick messages (Discord/Telegram)
- **Active time:** Morning brief review + afternoon community

### Founder
- **Best for:** Strategic decisions, vision questions, major changes
- **Response time:** Within 48 hours
- **Prefers:** Written proposals for big decisions
- **Weekly sync:** 30 min call to review progress

---

## Trainer's Prediction Market Expertise (Key Asset)

### Polymarket Experience
- Understands platform mechanics
- Knows what markets get volume
- Familiar with resolution edge cases
- Connections in PM community

### Novig Experience
- Current industry knowledge
- Sports betting + prediction markets
- Real-money wagering experience
- Regulatory awareness

### Twitter Presence (@goldytalks)
- Already building audience
- Understands content that resonates
- Can cross-promote Miyomi
- Knows crypto/prediction market Twitter

**This makes Trainer role perfect:**
- Not just executing workflow, adding real expertise
- Can validate AI suggestions against market reality
- Knows when crowd is actually right vs wrong
- Can identify high-quality contrarian opportunities
- Brings credibility from real PM experience

---

## Dev's Eden Advantage (Key Asset)

### Direct Eden Access
- **Faster support:** Internal team member
- **API optimization:** Can request features/improvements
- **Custom workflows:** Potential for Miyomi-specific tools
- **Cost efficiency:** Potential for better rates
- **Technical insight:** Knows Eden architecture deeply

### Full Stack Skills
- Can build entire platform solo
- Frontend + Backend + DevOps
- Quick iteration cycles
- No coordination overhead

**This makes Dev role perfect:**
- One person can ship entire MVP
- Eden expertise = optimal video pipeline
- Can move fast without dependencies
- Understands AI/ML + web3 stack

---

## Team Strengths Summary

**Founder + Dev + Trainer = Complete Coverage:**

- **Vision:** Founder brings creative direction + strategy
- **Execution:** Dev builds entire technical platform
- **Operations:** Trainer runs daily content + brings PM expertise
- **Eden:** Dev's insider access optimizes core feature
- **Prediction Markets:** Trainer's Polymarket/Novig experience validates opportunities
- **Content:** Trainer's social media presence + content skills
- **AI/Agents:** Founder's Eden ecosystem knowledge

**No gaps. Every critical function covered by someone with deep expertise.**

---

## Next Steps for Team Formation

### Next Steps
- [ ] Founder: Share all strategic docs with team
- [ ] Founder: Confirm team structure with both
- [ ] Founder: Discuss compensation framework
- [ ] All: Schedule first team sync call

### Week 1
- [ ] Dev: Review all docs, start build
- [ ] Trainer: Review character docs, learn workflow
- [ ] Founder: Make 8 strategic decisions
- [ ] Team: Daily async updates

### Week 2
- [ ] Dev: Deploy MVP to miyomi.ai
- [ ] Trainer: Test trainer dashboard
- [ ] Founder: Review progress, adjust strategy
- [ ] Team: First weekly sync call

---

## Open Questions

1. **Compensation:** Everyone aligned on token split proposal?
   - Adjust if needed based on team feedback

2. **Time commitment:**
   - Dev: Can dedicate time outside Eden work?
   - Trainer: 15-30 min daily sustainable?

3. **Decision rights:**
   - Everyone comfortable with decision framework?
   - Any areas need clarification?

4. **Legal structure:**
   - LLC for Miyomi before token launch?
   - How to formalize agreements?

5. **Social media:**
   - Cross-promote Miyomi through existing channels?
   - Keep separate or integrate?

---

## Bottom Line

**Perfect team composition:**

- **Founder:** Vision + strategy (the "why")
- **Dev:** Technical execution (the "how")
- **Trainer:** Daily operations + market expertise (the "what")

**Complementary skills, no overlap, complete coverage.**

**Clear workflow:**
- Founder sets direction
- Dev builds platform
- Trainer operates daily
- Team syncs weekly
- Everyone wins when Miyomi succeeds

**Token launch aligns incentives:**
- All three have skin in the game
- Balanced allocation: 40% / 30% / 30%
- Trainer also gets ongoing operational income
- Success = everyone benefits

**Ready to build together.** 🚀

---

## Coordination

**Primary coordinator:** Founder

**Communication:** Team chat (Discord/Telegram)

**Roles:**
- Founder: Creator/Producer
- Dev: Full Stack Developer (Eden)
- Trainer: Daily Operations (Prediction Market Expertise)
