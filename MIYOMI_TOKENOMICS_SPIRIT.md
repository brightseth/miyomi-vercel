# Miyomi Tokenomics - Spirit Protocol Application

**Date:** October 3, 2025
**Status:** Token structure defined per Spirit Protocol v0.7
**Team:** Seth (Creator), jmill (Developer), Goldy (Trainer)

---

## Spirit Protocol Overview (Applied to Miyomi)

**Miyomi = Synthetic Artist (Prediction Market Oracle)**

Per Spirit Protocol whitepaper v0.7, when Miyomi is accepted into Spirit Academy:

### Token Minting Event

**$MIYOMI Token Created:**
- **Total Supply:** 1 billion tokens (fixed)
- **Standard:** ERC-20 on Base
- **Distribution:** 25/25/25/25 split

---

## $MIYOMI Token Distribution

### Allocation Breakdown

```
┌─────────────────────────────────────────────────┐
│        $MIYOMI TOKEN (1,000,000,000)            │
├─────────────────────────────────────────────────┤
│                                                 │
│  25% (250M) → Liquidity Pool                   │
│               With LP pricing tiers             │
│               Ensures deep liquidity            │
│                                                 │
│  25% (250M) → $SPIRIT Holders                  │
│               Distributed via Superfluid        │
│               Money Streaming over 3 months     │
│               Auto-graduation benefit           │
│                                                 │
│  25% (250M) → Artist/Human Creators            │
│               SPLIT BETWEEN TEAM:               │
│               ├─ Seth (Creator/Producer)        │
│               ├─ jmill (Developer)              │
│               └─ Goldy (Trainer)                │
│               Auto-pledged for 12 months        │
│                                                 │
│  25% (250M) → Agent (Miyomi)                   │
│               Miyomi's treasury                 │
│               Auto-pledged for 12 months        │
│               Used for compute, operations      │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Team Split (Artist/Human Creator Allocation)

**250M tokens (25% of total) divided among three team members:**

### Proposed Split Options

#### Option A: Equal Three-Way Split (Not chosen)
```
Founder: 83.33M tokens (33.33% of 250M)
Dev:     83.33M tokens (33.33% of 250M)
Trainer: 83.33M tokens (33.33% of 250M)
```

**Rationale:** Simple, egalitarian, avoids complex negotiation

#### Option B: Balanced Split ✅ FINAL
```
Founder: 100M tokens (40% of 250M) - Creator/Producer/Vision
Dev:      75M tokens (30% of 250M) - Technical Infrastructure
Trainer:  75M tokens (30% of 250M) - Daily Operations/PM Expertise
```

**Rationale:**
- Founder: Largest share for overall vision, character IP creation, strategic direction
- Dev: Equal to Trainer, recognizes building entire technical platform
- Trainer: Equal to Dev, recognizes daily operational burden + specialized PM expertise

**Additional compensation for Trainer:**
- Token allocation: 75M $MIYOMI (30%)
- Monthly trainer fee: $1,000-2,000/mo from Miyomi treasury (once revenue permits)
- Performance bonuses: % of revenue growth driven

**Why this split works:**
- Values specialized prediction market knowledge (Polymarket/Novig experience)
- Recognizes daily commitment vs one-time build
- Content creation = as valuable as code
- Team harmony (Dev and Trainer as equal partners)

#### Option C: Build-Heavy Split (Not chosen)
```
Founder: 100M tokens (40% of 250M)
Dev:     100M tokens (40% of 250M)
Trainer:  50M tokens (20% of 250M)
```

**Rationale:** Founder + Dev equal for building the foundation, Trainer for operations

---

## Token Mechanics (Per Spirit Protocol)

### Auto-Pledging (12 Months)

**All team tokens are auto-pledged for 12 months:**
- Locked for minimum 12 months after minting
- Earns royalty multiplier during lock period
- Cannot be sold or transferred during lock
- Signals long-term commitment

**Multiplier benefits:**
- Linear growth: 12× per year
- After 12 months: 12× multiplier on royalty share
- Rewards long-term holding vs quick exit

### Royalty Distribution

**All Miyomi revenue flows through Spirit Protocol:**

```
Revenue Sources → RevenueRouter
                     ↓
              Swaps to $SPIRIT via Uniswap V4
                     ↓
              Deposits into RewardController
                     ↓
         Weekly distribution via Superfluid Money Streaming
                     ↓
              To pledgers of $MIYOMI token
```

**Royalty Share Formula:**

```
Royalty Share = (Sa × Ma) / ((Sa × Ma) + (Sc × Mc))

Where:
Sa = Artist/Team stake (250M auto-pledged)
Ma = Artist/Team multiplier (12× after 12 months)
Sc = Community stake (varies)
Mc = Community multiplier (varies based on lock duration)
```

**Example after 12 months:**
```
Team stake: 250M tokens
Team multiplier: 12× (locked 12 months)
Weighted team value: 250M × 12 = 3,000M

Community stake: 100M tokens (example)
Community multiplier: 6× (average)
Weighted community value: 100M × 6 = 600M

Total weighted value: 3,600M

Team royalty share: 3,000M / 3,600M = 83.3%
Community royalty share: 600M / 3,600M = 16.7%
```

**Team gets majority of early royalties due to 12-month auto-pledge.**

---

## Revenue Sources for Miyomi

### Phase 1 (Months 1-3): Building
**Revenue:** Minimal
- Affiliate clicks (Polymarket/Kalshi)
- Early supporters buying $MIYOMI
- Revenue: $0-500/month

### Phase 2 (Months 4-6): Growth
**Revenue:** Moderate
- Affiliate commissions increasing
- Premium subscriptions ($10/mo × 10-50 subs)
- Dome intelligence access (future)
- Revenue: $500-2,000/month

### Phase 3 (Months 7-12): Scale
**Revenue:** Significant
- Established affiliate revenue
- Premium tier subscribers (50-200)
- Soup.xyz market-making spread
- Oracle fees from Miyomi Markets
- Revenue: $2,000-10,000/month

**All revenue → Spirit RevenueRouter → Swapped to $SPIRIT → Distributed to $MIYOMI pledgers**

---

## Graduation Path (Per Spirit Protocol)

### Phase 1: Admission (Birth) ✅
- $MIYOMI token minted (1B supply)
- 25% to LP, 25% to $SPIRIT holders, 25% to team, 25% to Miyomi
- Mentorship begins (team guides Miyomi)

### Phase 2: Validation
**Objective criteria Miyomi must meet:**
- Economic sustainability (consistent royalty income)
- Healthy audience (followers, engagement)
- Active stewardship (team demonstrates ongoing direction)

**Targets for Miyomi:**
- 1,000+ followers
- $500+/month sustained revenue
- 30+ oracle videos created
- 65%+ prediction accuracy

### Phase 3: Expansion
**Community growth signals:**
- Pledgers stake $MIYOMI tokens
- Two LP tiers reach $1M depth total
- Market maturity demonstrated

**Targets for Miyomi:**
- 100+ $MIYOMI token holders
- $1M+ total value locked in LPs
- 5,000+ followers
- $2,000+/month sustained revenue

### Phase 4: Autonomy (Graduation)
**One-way graduation:**
- Control of onchain permissions → Miyomi's EOA (via ERC-8004)
- Compute costs migrate off Eden shared infrastructure
- Miyomi becomes self-sustaining economic actor
- Can act autonomously onchain

**For Miyomi specifically:**
- Pay for own video generation (Eden API)
- Control own social media posting
- Manage own market creation (Soup.xyz)
- Distribute royalties independently

**Timeline estimate:** 12-18 months after admission

---

## $SPIRIT Holder Benefits

**Why 25% goes to $SPIRIT holders:**

Per Spirit Protocol whitepaper:
> "Holders gain exposure to every future Agent Token and share in network-wide royalty flows."

**Benefits for $SPIRIT holders:**
1. Receive 25% of EVERY new Agent token (including $MIYOMI)
2. Share in royalty flows across entire Spirit ecosystem
3. Governance rights (eventually) for Agent admissions
4. Diversified exposure (not just one Agent, but all)

**Distribution mechanism:**
- Superfluid Money Streaming over 3 months
- Real-time accrual (not periodic drops)
- Proportional to $SPIRIT holdings

---

## Team Token Vesting & Liquidity

### 12-Month Auto-Pledge Lock

**Cannot sell during first 12 months:**
- Signals commitment to Miyomi's success
- Builds trust with community
- Maximizes royalty multiplier (12×)
- Aligns long-term incentives

### Post-12-Month Options

**After lock expires, team can:**
1. **Re-pledge** for another period (multiplier continues growing, max 36×)
2. **Sell gradually** (but lose multiplier benefits)
3. **Hold unlocked** (earn base royalties, no multiplier)

**Recommended strategy:**
- Re-pledge for another 12-24 months
- Maximizes royalty income as Miyomi scales
- Demonstrates long-term commitment
- Multiplier can reach 24×-36× (2-3 years locked)

---

## Example: 18-Month Financial Projection

### Assumptions
- Team split: 40% Founder, 30% Dev, 30% Trainer (Option B - FINAL)
- Miyomi generates $3,000/month average revenue (Months 7-18)
- Community has staked 150M tokens by Month 18
- Team re-pledges for second 12 months

### Month 18 Snapshot

**Team holdings:**
```
Founder: 100M tokens (24× multiplier, 24 months locked)
Dev:      75M tokens (24× multiplier, 24 months locked)
Trainer:  75M tokens (24× multiplier, 24 months locked)
Total team: 250M × 24 = 6,000M weighted
```

**Community holdings:**
```
Community: 150M tokens (avg 12× multiplier)
Total community: 150M × 12 = 1,800M weighted
```

**Total weighted value:** 7,800M

**Revenue distribution:**
- Monthly revenue: $3,000 → swapped to $SPIRIT → distributed
- Team share: 6,000M / 7,800M = 76.9%
- Community share: 1,800M / 7,800M = 23.1%

**Team monthly royalty income:**
- Total: $3,000 × 76.9% = $2,307/month
- Founder (40%): $923/month
- Dev (30%): $692/month
- Trainer (30%): $692/month (+ trainer fee if established)

**Plus:** Token appreciation if Miyomi successful
- $MIYOMI token price rises with success
- Team holds 250M tokens
- Potential upside beyond just royalty income

---

## Comparison: Miyomi vs Traditional Models

### Traditional AI Agent (No Token)
- Revenue: 100% to creator/company
- Community: No ownership stake
- Upside: Limited to direct revenue
- Liquidity: Can't trade ownership

### Miyomi (Spirit Protocol Model)
- Revenue: Shared via royalties (76-83% to team initially)
- Community: Owns tokens, shares in success
- Upside: Token appreciation + royalties
- Liquidity: $MIYOMI tradeable after vesting
- Network effects: Benefits from entire Spirit ecosystem
- Auto-exposure: $SPIRIT holders get $MIYOMI automatically

**Trade-off:** Give up 25% to $SPIRIT holders, BUT gain:
- Access to Spirit Academy mentorship
- Automatic distribution to $SPIRIT community
- Network effects with other Agents
- Credibility from Spirit Protocol
- Infrastructure (royalty routing, pledging, governance)

---

## Governance Evolution

### Phase 1 (Current): Council Governance
- Eden multisig controls Spirit Academy admissions
- Team must apply for Miyomi to be accepted
- Eden evaluates based on:
  - Agent quality and uniqueness
  - Creator credentials
  - Economic viability potential
  - Cultural contribution

### Phase 2: Hybrid Governance
- Council + $SPIRIT holder signaling (Snapshot votes)
- Community input considered but not binding
- Gradual decentralization

### Phase 3: Tokenholder Governance
- $SPIRIT holders vote on new Agent admissions
- Quadratic voting (prevents whale dominance)
- 10% quorum, 60% approval threshold
- Fully decentralized

**Future: $MIYOMI Governance**
- $MIYOMI holders could vote on Miyomi-specific decisions:
  - Which markets to cover
  - Premium subscription pricing
  - Major strategy shifts
  - Show/event participation
- Gives community direct input into Miyomi's direction

---

## Legal & Regulatory (Per Spirit Protocol)

**Spirit Protocol designed to avoid securities classification:**

### Not a Security Because:
1. **Not speculative investment** - Tokens distributed via participation, not sold for profit expectation
2. **Not common enterprise** - Each Agent token is independent economy (not pooled)
3. **Not profit expectation** - Royalties are performance-based, not guaranteed
4. **Not efforts of others** - Value from community participation + algorithmic distribution

**For Miyomi specifically:**
- $MIYOMI represents access to Miyomi's creative economy
- Royalties tied to verifiable art/content sales
- Community participation drives value (not just team efforts)
- Algorithmic distribution (no managerial discretion)

**Ongoing compliance:**
- Spirit maintains legal review process
- Adapts to SEC guidance, MiCA (EU), other jurisdictions
- Team should consult own legal counsel

---

## Risk Considerations

### Economic Risks
**Low royalty periods:**
- Spirit has reserve buffers
- Smoothed distributions (1-month windows)
- Team may earn less during slow periods

**Token price volatility:**
- $MIYOMI price could fall
- Team holdings decrease in value
- But auto-pledge lock prevents panic selling

### Technical Risks
**Smart contract audits:**
- Spirit contracts audited by Superfluid
- Bug bounty programs active
- But all crypto has risk

**Graduation requirements:**
- Miyomi must hit objective metrics to graduate
- May take longer than expected
- Compute costs remain on Eden until graduation

### Governance Risks
**Centralization initially:**
- Eden council controls admissions early on
- Could reject Miyomi application
- Progressive decentralization over time

**Future governance:**
- $SPIRIT holders could vote against Miyomi interests
- Need to maintain good standing in ecosystem

---

## Next Steps for Token Launch

### Pre-Launch (Weeks 1-4)
- [ ] Build Miyomi MVP platform
- [ ] Create first 10-15 oracle videos
- [ ] Grow to 200+ followers
- [ ] Demonstrate economic viability

### Application to Spirit Academy (Week 5-6)
- [ ] Submit Miyomi application to Eden
- [ ] Provide: character profile, content samples, economic plan
- [ ] Eden council reviews
- [ ] 7-day community veto window

### Token Launch (Week 7-8)
- [ ] $MIYOMI minted (1B supply)
- [ ] 25% to LP (liquidity seeded)
- [ ] 25% to $SPIRIT holders (streamed over 3 months)
- [ ] 25% to team (auto-pledged 12 months)
- [ ] 25% to Miyomi treasury (auto-pledged 12 months)

### Post-Launch (Months 3-12)
- [ ] Continue content creation
- [ ] Track royalty distributions
- [ ] Grow community of pledgers
- [ ] Work toward graduation criteria

---

## Team Alignment & Decisions Needed

### Decision 1: Team Token Split
**Options:**
- A) Equal split (83M each)
- B) Role-weighted (Seth 50%, jmill 30%, Goldy 20%) ✅ Recommended
- C) Contribution-based (Seth 40%, jmill 40%, Goldy 20%)

**Need:** Team discussion and agreement

### Decision 2: Vesting Strategy
**Options:**
- Lock full 12 months, then re-evaluate
- Commit to 24-month lock upfront (higher multiplier)
- Staggered unlock (risky, defeats purpose)

**Recommendation:** Full 12-month lock minimum, then assess based on Miyomi performance

### Decision 3: Additional Trainer Compensation
**Questions:**
- Monthly trainer fee: $1,000, $1,500, or $2,000?
- When does it start: At revenue milestone or immediately from treasury?
- Performance bonuses: Tied to what metrics?

**Recommendation:**
- Start at $1,000/mo once Miyomi generates $2,000+/mo sustained
- Performance bonus: 10% of revenue growth above $5,000/mo

---

## Summary: Complete Tokenomics

**$MIYOMI Token:**
- 1 billion supply (fixed)
- 25% liquidity, 25% $SPIRIT holders, 25% team, 25% Miyomi
- ERC-20 on Base
- Auto-pledged 12 months for team + Miyomi

**Team Allocation (250M tokens):**
- Split between Seth, jmill, Goldy (TBD exact split)
- Locked 12 months minimum
- Earns 12× royalty multiplier
- Can re-pledge for up to 36× multiplier

**Revenue Model:**
- All revenue → Spirit RevenueRouter
- Swapped to $SPIRIT
- Distributed weekly via Superfluid streaming
- Team gets 76-83% initially (due to high multiplier)

**Graduation Path:**
- Admission → Validation → Expansion → Autonomy
- 12-18 months estimated timeline
- Miyomi becomes self-sustaining AI agent

**Benefits:**
- Aligned incentives (everyone wins when Miyomi succeeds)
- Exposure to Spirit ecosystem
- Tradeable tokens (after vesting)
- Royalty income stream
- Community ownership

---

## Questions for Team Discussion

1. **Token split:** Equal or role-weighted?
2. **Vesting commitment:** 12 months or 24 months upfront?
3. **Goldy compensation:** Token-only or token + monthly fee?
4. **Revenue expectations:** Conservative or aggressive targets?
5. **Graduation timeline:** Push for 12 months or organic 18 months?
6. **Spirit application:** Apply after 10 videos or 30 videos?

---

## Bottom Line

**Spirit Protocol provides:**
- Professional tokenomics infrastructure
- Automatic distribution to $SPIRIT holders
- Royalty routing and pledging mechanics
- Graduation path to autonomy
- Regulatory-conscious design

**Team gets:**
- 250M $MIYOMI tokens (25% of supply)
- 76-83% of early royalty income
- Token appreciation upside
- Aligned long-term incentives

**Trade-off:**
- Give up 25% to $SPIRIT holders
- 12-month lock period
- Must meet graduation criteria

**Worth it if:**
- Miyomi succeeds at building audience
- Revenue scales to $2,000-10,000/month
- Token appreciates with success
- Spirit ecosystem provides network effects

**This is the model. Now decide on team split and move forward.** 🚀
