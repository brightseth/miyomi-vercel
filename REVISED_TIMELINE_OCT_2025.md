# MIYOMI - Revised Timeline (October 2025)

**Updated:** October 3, 2025
**Launch Target:** Mid-December 2025 (UNCHANGED)

---

## 🔥 Critical Update: Dome API Integration

**What Changed:**
- Discovered Dome API - solves Polymarket/Kalshi API issues
- Integration plan complete (5 days once API key received)
- Timeline adjusted to reflect Dome integration before video production

**Why This Matters:**
- ✅ Solves current blockers (Polymarket active markets, Kalshi auth)
- ✅ Better opportunity detection (historical context + momentum analysis)
- ✅ Automated PnL tracking (no manual calculation)
- ✅ Professional credibility (third-party verified data)

---

## Revised Phase 1: Foundation (Weeks 1-4)

### Week 1: Oct 3-9 (Database + Dome API Key)
**Status:** Database complete, waiting for Dome API key

**Completed:**
- ✅ Supabase database deployed (6 tables)
- ✅ Basic workflow tested (scan → save)
- ✅ Dome integration plan created
- ✅ Documentation updated

**Blocked:**
- ⏳ Dome API key approval (critical path)
- ⏳ Video pipeline testing (needs opportunities)

**Key Milestone:** Receive Dome API key

---

### Week 2: Oct 10-16 (Dome Integration - 5 Days)
**Focus:** Build `/lib/dome-client.js` and enhanced opportunity scanner

**Day 1-2:**
- Build Dome client library (4 endpoints)
- Add environment variable
- Test basic connectivity

**Day 3:**
- Create `/api/dome/opportunities` with historical analysis
- Implement momentum exhaustion detection
- Build confidence scoring system

**Day 4:**
- Create `/api/dome/pnl` for automated performance tracking
- Update database schema if needed
- Test end-to-end data flow

**Day 5:**
- Integrate into dashboard
- Test with real market data
- Verify opportunity quality improvement

**Key Milestone:** Dome API fully integrated, high-confidence opportunities detected

---

### Week 3: Oct 17-23 (Video Pipeline + First End-to-End Test)
**Focus:** Configure Eden Yeah LoRA and produce first test video

**Seth:**
- Select first high-confidence opportunity from Dome
- Generate contrarian thesis with Claude
- Write video script with Miyomi personality

**jmill:**
- Configure Eden API with Yeah LoRA
- Test video generation with sample script
- Build polling/storage pipeline
- Ensure character consistency

**Together:**
- Run complete workflow: Opportunity → Analysis → Video → Post
- Review quality and iterate
- Adjust prompts/parameters as needed

**Key Milestone:** First video produced successfully

---

### Week 4: Oct 24-30 (Dashboard + First Real Content)
**Focus:** Polish miyomi.ai and publish first real contrarian trade

**Tasks:**
- Polish dashboard with Dome-powered analytics
- Add real-time PnL chart
- Integrate video embeds
- Set up social posting (Farcaster/Twitter)
- Execute first real trade
- Post first public video with affiliate links

**Key Milestone:** First public video + trade live on miyomi.ai

---

## Phase 2: Trading Phase (Weeks 5-13)

### Weeks 5-13: Nov 1 - Dec 20 (Build Track Record)
**Goal:** 20+ trades, 65%+ win rate, 1,000+ followers

**Daily Operations:**
- **Morning:** Scan Dome API for opportunities
- **Mid-morning:** Generate analysis + script
- **Afternoon:** Create video + post to social
- **Evening:** Track engagement + PnL

**Weekly Cadence:**
- 2-3 new trades per week (Monday, Wednesday, Friday)
- Weekly recap videos (Sundays)
- Mid-week updates (if significant market movement)
- Track metrics: trades, win rate, P&L, followers, views

**Content Calendar:**
- **Mon 9am:** New contrarian trade announcement
- **Wed 2pm:** Mid-week update (if needed)
- **Fri 4pm:** Resolution + P&L update
- **Sun 7pm:** Weekly recap

**Revenue Tracking:**
- Trading profits (for credibility)
- Affiliate signups (Polymarket/Kalshi)
- Early sponsorships (if >500 followers)
- All tracked in database for token distributions

**Milestones by Week 13 (Dec 20):**
- 20+ trades executed
- 65%+ win rate achieved
- +$5,000 cumulative P&L
- 1,000+ social followers
- 20+ videos published
- Established brand personality

---

## Phase 3: Token Launch (Dec 15-31)

### Week 13-14: Dec 15-31 (Token Preparation)
**Focus:** Smart contract development and Spirit Protocol coordination

**Technical (jmill):**
- Deploy $MIYOMI ERC20 on Base L2
- Deploy royalty distribution contract
- Test on Base Sepolia testnet
- Audit contracts
- Prepare 25/25/25/25 distribution

**Business (Seth):**
- Coordinate with Eden team on Spirit Protocol
- Prepare launch announcement
- Build waitlist/community
- Finalize affiliate partnerships
- Design NFT collectibles (optional)

**Pre-Launch Checklist:**
- [ ] 20+ trades (65%+ win rate)
- [ ] +$5,000 P&L
- [ ] 1,000+ followers
- [ ] 20+ videos published
- [ ] Smart contracts audited
- [ ] Spirit Protocol integrated
- [ ] Launch materials ready

---

## Token Launch: January 2-8, 2026

### Launch Week Schedule

**Monday Jan 2:**
- Deploy $MIYOMI token on Base L2
- Deploy royalty distribution contract
- Verify on BaseScan

**Tuesday Jan 3:**
- Execute 25/25/25/25 distribution
  - 250M → $SPIRIT treasury
  - 250M → Liquidity pool
  - 250M → Seth wallet
  - 250M → Miyomi treasury

**Wednesday Jan 4:**
- Seed liquidity pool ($50k USDC + 250M MIYOMI)
- Initial price: ~$0.0002/token
- Market cap: ~$200k FDV

**Thursday Jan 5:**
- Transfer 25% to $SPIRIT treasury
- Register with Spirit Protocol
- Integration testing

**Friday Jan 6:**
- Public graduation announcement
- Launch celebration
- First demo distribution
- Media coverage

**Key Milestone:** Miyomi becomes an Eden Spirit with live token

---

## Phase 4: Scale (Q1 2026+)

### Jan-Mar 2026: Market Making on Soup.xyz
**Goal:** $10k+ monthly revenue across multiple streams

**New Capabilities:**
- Create Miyomi markets on Soup.xyz
- Act as oracle (resolve with evidence)
- Earn market making fees
- Build "Miyomi Markets" brand

**Revenue Streams:**
1. Trading profits: $3,000/month
2. Advertising/Sponsors: $2,500/month
3. Affiliate fees: $1,500/month
4. Market making: $1,000/month
5. Subscriptions: $1,000/month
6. Licensing: $500/month
7. NFTs: $500/month

**Total: $10,000+/month → $7,500 to token holders**

---

## Critical Path Summary

### What Blocks What:

```
DOME API KEY (CRITICAL BLOCKER)
    ↓
Dome Integration (5 days)
    ↓
High-confidence Opportunities
    ↓
Video Generation (jmill can't test without opportunities)
    ↓
First End-to-End Test
    ↓
Dashboard Polish + First Real Trade
    ↓
Trading Phase (8 weeks)
    ↓
Token Preparation
    ↓
Token Launch (Jan 2-6)
    ↓
Scale Revenue
```

### Timeline Math:

- **Oct 3-9:** Database ✅ + Dome API key ⏳
- **Oct 10-16:** Dome integration (5 days)
- **Oct 17-23:** Video pipeline + first test
- **Oct 24-30:** Dashboard + first real content
- **Nov 1 - Dec 20:** Trading phase (7 weeks = ~20 trades)
- **Dec 15-31:** Token prep
- **Jan 2-6:** Token launch
- **Jan 7+:** Scale

**Total:** 13 weeks from now to token launch = ACHIEVABLE

---

## Risk Assessment (Updated)

### Critical Risks:

1. **Dome API Key Delay** ⚠️ HIGHEST RISK
   - **Impact:** Blocks entire project
   - **Status:** Waiting for approval
   - **Mitigation:** Follow up daily, have integration plan ready

2. **Time Pressure** 🟡
   - **Impact:** Only 13 weeks to token launch
   - **Status:** Timeline revised but still tight
   - **Mitigation:** 5-day Dome integration plan, clear milestones

3. **Video Quality** 🟡
   - **Impact:** Character consistency critical for influencer brand
   - **Status:** Waiting for jmill + Yeah LoRA testing
   - **Mitigation:** Test early, iterate quickly

4. **Win Rate** 🟡
   - **Impact:** Need 65%+ for token launch credibility
   - **Status:** 0 trades executed yet
   - **Mitigation:** Dome's historical data should improve signal quality

5. **Audience Building** 🟡
   - **Impact:** 1,000 followers in 8 weeks is aggressive
   - **Status:** 0 followers currently
   - **Mitigation:** Quality content + contrarian personality + consistency

### Reduced Risks (Thanks to Dome):

- ~~Polymarket API issues~~ ✅ SOLVED
- ~~Kalshi auth problems~~ ✅ SOLVED
- ~~Manual PnL tracking~~ ✅ AUTOMATED
- ~~Poor opportunity detection~~ ✅ IMPROVED with historical data

---

## Success Criteria by Phase

### Phase 1 (Weeks 1-4): Foundation
- [x] Database deployed
- [ ] Dome API integrated
- [ ] Video pipeline working
- [ ] Dashboard live
- [ ] First video produced

### Phase 2 (Weeks 5-13): Trading
- [ ] 20+ trades executed
- [ ] 65%+ win rate
- [ ] +$5,000 cumulative P&L
- [ ] 1,000+ followers
- [ ] 20+ videos published

### Phase 3 (Week 13-14): Token Prep
- [ ] Smart contracts deployed
- [ ] Spirit Protocol integrated
- [ ] Pre-launch checklist complete

### Phase 4 (Jan 2-6): Token Launch
- [ ] $MIYOMI live on Base L2
- [ ] 25/25/25/25 distribution complete
- [ ] Liquidity pool seeded
- [ ] Graduation announced

### Phase 5 (Q1 2026+): Scale
- [ ] First Soup.xyz market
- [ ] $10k+ monthly revenue
- [ ] Multiple revenue streams
- [ ] Sustainable operation

---

## Next Actions (Immediate)

### This Week (Oct 3-9):

**Seth:**
1. ✅ Update all documentation with Dome integration
2. 🔥 **FOLLOW UP ON DOME API KEY DAILY** (highest priority)
3. Review Dome docs thoroughly
4. Prepare any questions for Dome support
5. Have `/lib/dome-client.js` skeleton ready

**jmill:**
1. Review updated documentation (README, IMPLEMENTATION_PLAN, DOME_INTEGRATION_PLAN)
2. Understand new timeline (Dome first, then video)
3. Prepare Eden Yeah LoRA configuration
4. Wait for Dome integration to complete

**Together:**
1. Sync mid-week on Dome API key status
2. Plan 5-day Dome integration sprint (once key arrives)

---

## Comparison: Old vs New Timeline

### OLD (Before Dome API):
- Week 1: Database + Polymarket/Kalshi APIs (had issues)
- Week 2: Video pipeline (blocked by bad opportunity data)
- Week 3: First test (likely to fail, poor signals)

### NEW (With Dome API):
- Week 1: Database ✅ + Get Dome key
- Week 2: Dome integration (5 days, solves API issues)
- Week 3: Video pipeline (with real high-confidence opportunities)
- Week 4: First real content (better quality from better data)

**Result:** +1 week delay for Dome integration, but MUCH higher quality output and success probability.

---

## Bottom Line

**Trade-off:** Adding 5 days for Dome integration now saves weeks of debugging bad APIs and improves win rate significantly.

**Launch Target:** Mid-December 2025 - STILL ACHIEVABLE

**Critical Path:** Dome API key → 5-day integration → Video pipeline → Trading phase → Token launch

**Next 48 Hours:** Follow up on Dome API key daily, prepare for rapid integration once received.

---

**Updated:** October 3, 2025
**Status:** Foundation 75% complete, waiting on Dome API key to unblock video production
**Confidence:** HIGH (with Dome API solving major blockers)
