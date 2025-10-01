# Hey jmill - Miyomi Project Overview

**From:** Seth
**Date:** October 1, 2025
**Re:** Collaboration on Miyomi - AI prediction market trader → Eden Spirit

---

## TL;DR

I'm building **Miyomi** - an AI agent that trades prediction markets with a contrarian strategy and generates video content explaining her thesis. She's launching as an **Eden Spirit** with real tokenomics in **December 2025 / January 2026**.

**Need your help with:**
1. Eden video API integration (your expertise)
2. Spirit Protocol integration guidance
3. Architecture review / best practices

**3-Phase Evolution:**
- **Phase 1 (Oct-Nov):** Trade on Polymarket/Kalshi, prove 65%+ win rate
- **Phase 2 (Dec/Jan):** Launch $MIYOMI token, join Spirit Protocol
- **Phase 3 (Q1 2026):** Create markets on Soup.xyz as oracle

---

## What is Miyomi?

**Concept:** NYC downtown trader who bets against crowd consensus

```
Market: "Will Bitcoin hit $100k by Dec 31?"
Crowd: 87% YES
Miyomi: Takes NO at 0.13
Video: "Everyone's moon boy delusion is peaking..."
Result: BTC closes at $94k → Miyomi wins
```

**Personality Mix:**
- Sophisticated market analysis + chaos energy
- "The crowd is always wrong at extremes"
- References bodega wisdom + Fed meetings
- Confident contrarian takes

---

## Why This is Interesting

### For You
1. **Eden showcase** - Real production use case for video generation
2. **Prediction markets** - You mentioned you like this space
3. **Spirit Protocol** - First prediction market Spirit with proven revenue
4. **Interesting tech stack** - Claude 4.5 + Eden + Soup.xyz + Base L2

### For Eden
1. **Spirit Protocol validation** - Tokens = royalty rights (not speculation)
2. **Revenue proof** - Real trading profits → USDC distributions
3. **Content creation** - 3+ videos per week ongoing
4. **New vertical** - Prediction market community exposure

### For Miyomi
1. **Real revenue** - Trading profits flow to $MIYOMI token holders
2. **Aligned community** - Token holders want her to win trades
3. **Sustainable model** - Not dependent on hype cycles
4. **First mover** - First profitable prediction market Spirit

---

## Spirit Protocol Integration

### The Token: $MIYOMI (1B supply)

**Distribution: 25/25/25/25**
- 25% → $SPIRIT holders (parent index)
- 25% → Liquidity pools (DEX trading)
- 25% → Seth (human mentor)
- 25% → Miyomi treasury (autonomy)

### The Model: Tokens = Royalty Rights

**Own 1% of $MIYOMI = Earn 1% of Miyomi's revenue**

Example monthly flow:
```
Miyomi earns $10,000/month from:
  • Trading profits: $5,000
  • Market making fees: $2,000
  • Content revenue: $1,000
  • Subscriptions: $500
  • NFT sales: $500

→ 75% to token holders: $7,500
→ 25% to treasury: $2,500

If you own 1% of supply: $75/month USDC
If you own 0.1%: $7.50/month USDC
If you own 10%: $750/month USDC
```

**Why this matters:** First AI agent with proven revenue BEFORE token launch. Not speculation - ownership of creative output.

---

## Technical Architecture

### Phase 1: The Trader (Now)

```
Claude 4.5 Contrarian Analysis
    ↓
Polymarket + Kalshi APIs
    ↓
Position Tracking (Supabase)
    ↓
Eden Video Generation ← Need your help here
    ↓
Social Posting (Farcaster/Twitter)
    ↓
Public Dashboard (miyomi.ai)
```

### Phase 2: The Spirit (Dec/Jan)

```
Continue Trading + Build Track Record
    ↓
Deploy $MIYOMI Token (Base L2)
    ↓
25/25/25/25 Distribution
    ↓
Monthly Royalty Distributions
    ↓
Join $SPIRIT Index
```

### Phase 3: The Oracle (Q1 2026)

```
Create Markets on Soup.xyz
    ↓
Seed Liquidity
    ↓
Be the Oracle (resolve with evidence)
    ↓
Earn Market Making Fees
    ↓
All Revenue → Token Holders
```

---

## What I Need From You

### Primary: Eden Video Integration

**Current State:**
- Built Polymarket + Kalshi clients
- Built contrarian detection logic
- Ready to generate thesis videos

**Need:**
1. Eden API endpoint + authentication
2. Parameters for 30-60s videos
3. How to handle async generation
4. Best practices / examples
5. Rate limits / cost considerations

### Secondary: Spirit Protocol Guidance

**Questions:**
1. How do other Spirits handle royalty distributions?
2. What's the graduation process from agent → Spirit?
3. Any smart contract templates for revenue distribution?
4. Best practices for token launch?
5. How should Miyomi integrate with Spirit registry?

### Tertiary: Architecture Review

**Would love your eyes on:**
- Database schema (trades, positions, videos)
- API structure (serverless on Vercel)
- Video generation flow
- Error handling + retry logic

---

## Documentation Available

I've written ~26,000 words across 5 docs (all in repo):

### 1. **MIYOMI_COLLABORATION_BRIEF.md** (Full Tech Details)
- Complete technical architecture
- Database schemas
- API specifications
- Three collaboration models
- Specific questions for you

### 2. **MIYOMI_SPIRIT_TOKENOMICS.md** (Token Economics)
- Complete $MIYOMI token details
- 25/25/25/25 distribution model
- Revenue → royalty mechanics
- Launch requirements
- Example scenarios (conservative, target, ambitious)

### 3. **MIYOMI_VISION_ROADMAP.md** (Product Vision)
- Evolution story: trader → Spirit → oracle
- UI/UX wireframes for all phases
- Content strategy examples
- Migration timeline

### 4. **MIYOMI_MARKET_MAKER.md** (Phase 3 Architecture)
- Soup.xyz protocol integration
- Market creation + oracle resolution
- Smart contract interactions
- Security considerations

### 5. **README.md** (Project Overview)
- Quick start guide
- Tech stack summary
- Key features
- Success metrics

**Start here:** `MIYOMI_COLLABORATION_BRIEF.md` has all the technical details.

---

## Timeline Proposal

### Week 1: Alignment
- Review docs (start with MIYOMI_COLLABORATION_BRIEF.md)
- 30-min call to discuss
- Share Eden API docs/examples
- Clarify collaboration model

### Week 2-3: Eden Integration
- Build video generation module
- Test with sample trades
- Optimize parameters
- Handle async/polling

### Week 4: Launch Prep
- Code review
- Deploy to production
- Monitor first trades + videos

### Month 2-3: Token Launch Prep
- Build track record (20+ trades, 65%+ win rate)
- Review Spirit Protocol integration
- Prepare $MIYOMI deployment
- Coordinate graduation ceremony

**Launch Target: December 2025 / January 2026**

---

## Why This is a Good Fit

### Technical Alignment
- You know Eden API deeply (I don't)
- You like prediction markets (perfect domain)
- You're full-stack (can review architecture)
- You value quality (will keep me honest)

### Strategic Alignment
- First prediction market Spirit (novel use case)
- Proven revenue model (not speculation)
- Content + markets fusion (new vertical)
- 3-phase evolution (compelling narrative)

### Practical Alignment
- Clear scope (Phase 1 well-defined)
- Written everything down (you prefer this)
- Flexible collaboration (choose your level)
- Portfolio piece (unique project)

---

## Next Steps

**If interested:**
1. Read `MIYOMI_COLLABORATION_BRIEF.md` (full tech details)
2. Skim `MIYOMI_SPIRIT_TOKENOMICS.md` (token economics)
3. Let me know which collaboration model interests you:
   - **Option A:** Eden API expert advisor (lightweight)
   - **Option B:** Technical collaboration partner (moderate)
   - **Option C:** Co-architect (deep involvement)

4. 30-min call to align?

**If not interested:**
- No worries! Just let me know
- Any Eden API pointers would still be appreciated
- Happy to share progress as it develops

---

## Questions for You

### Technical
1. What's the correct Eden API endpoint for video generation?
2. What parameters are available for customization?
3. How should I handle async video generation?
4. What's typical generation time?
5. Any rate limits or cost considerations?

### Strategic
1. Does this align with Eden's Spirit Protocol vision?
2. Is there an existing Spirit I should learn from?
3. Should Miyomi be in Eden's Spirit registry?
4. How do royalty distributions work for other Spirits?
5. What's the graduation process from agent → Spirit?

### Collaboration
1. Which collaboration model interests you?
2. Timeline - when would you have availability?
3. Preferred communication (Slack, Discord, email)?
4. Any concerns or red flags you see?

---

## Contact

- **GitHub:** https://github.com/brightseth/miyomi-vercel
- **Farcaster:** @seth
- **Email:** [your email]

All docs are in the repo root - start with `MIYOMI_COLLABORATION_BRIEF.md` for full technical details.

Looking forward to hearing your thoughts!

– Seth

---

## Quick Reference

**Core Docs:**
- `MIYOMI_COLLABORATION_BRIEF.md` - Complete technical details
- `MIYOMI_SPIRIT_TOKENOMICS.md` - Token economics
- `README.md` - Project overview

**Code:**
- `lib/polymarket-client.js` - Polymarket integration
- `lib/kalshi-client.js` - Kalshi integration
- `lib/soup-client.js` - Soup.xyz (Phase 3)

**Status:**
- Phase 1: In progress (trading integrations built)
- Phase 2: Planned (Dec 2025/Jan 2026 token launch)
- Phase 3: Ready to deploy (when Soup.xyz launches)

**Launch Target: December 2025 / January 2026**
