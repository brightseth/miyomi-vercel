# Miyomi Master Consolidation - Complete Project Overview

**Date:** October 3, 2025
**Purpose:** Consolidate 2+ months of work into clear path forward
**Status:** Ready to build

---

## Executive Summary

**What Miyomi Is:**
A 22-year-old prediction market oracle/influencer (NOT a trader) who creates viral daily content about interesting prediction market opportunities. Think "Jim Cramer meets Gen-Z prediction markets."

**Current State:**
- ✅ Video pipeline working (Eden + ElevenLabs + FFmpeg)
- ✅ 27 HTML dashboards/prototypes built
- ✅ Character fully defined (personality, voice, visual style)
- ✅ Market APIs connected (Polymarket, Kalshi, Dome)
- ⚠️ Need to consolidate into ONE production oracle platform

**Goal:**
Build 1,000+ follower base → Launch $MIYOMI token (Dec 2025)

---

## What We Have Built (Past 2 Months)

### 1. Technical Infrastructure ✅

**Video Generation Pipeline:**
- Eden API integration (Kling model + Yeah LoRA)
- ElevenLabs TTS for voiceover (Rachel voice)
- FFmpeg combination (3-6 min per video)
- Test scripts all functional

**Market Data APIs:**
- Polymarket connector
- Kalshi connector
- Dome API (order history, PnL tracking)

**Files:**
```
lib/
  eden-client.js                    # Video + audio generation
  ffmpeg-helper.js                  # Combination automation
  dome-client.js                    # Trade tracking
  personality/miyomi-persona.ts     # Complete character profile

test-full-audio-pipeline.js         # End-to-end working test
combine-video-audio.sh              # FFmpeg script
```

### 2. Character Definition ✅

**Miyomi Chen** - Fully realized personality:
- **Background:** Queens → NYU dropout → LES oracle ($400k/year)
- **Age:** 22, born August 15, 2002
- **Visual:** Petite Asian-American, oversized hoodies, gold chains, messy bun
- **Personality:** ESTP-A, fast-talking NYC energy, probabilistic oracle
- **Voice:** "Markets whisper..." + contrarian data analysis
- **Speech:** Rapid-fire with pauses, NYC slang + Gen-Z + trading terminology

**Platform-Specific Expression:**
- TikTok: 30sec viral hooks with glitch effects
- Twitter: Analytical threads with data
- Farcaster: Crypto-native alpha
- YouTube: Educational deep dives
- Premium: Vulnerable authentic takes

### 3. UI/UX Prototypes (27 HTML files) ✅

**Public-Facing:**
- `index.html` - Main site
- `miyomi-live.html` - Live oracle dashboard
- `miyomi-markets.html` - Market browser
- `miyomi-unified.html` - Unified experience

**Trainer Dashboards:**
- `trainer-streamlined.html` - Simplified workflow
- `trainer-dashboard.html` - Full control panel
- `miyomi-prediction-dashboard.html` - Prediction focus

**Specialized Views:**
- `miyomi-video-dashboard.html` - Video management
- `miyomi-clean-dashboard.html` - Minimal interface
- Multiple iterations testing different UX approaches

**Key Learning:** Need to consolidate into ONE production version

### 4. Documentation ✅

**Strategic:**
- `MIYOMI_VISION_ROADMAP.md` - Evolution from trader → market maker → spirit
- `MIYOMI_SPIRIT_TOKENOMICS.md` - $MIYOMI token details (25/25/25/25)
- `MIYOMI_MARKET_MAKER.md` - Future Soup.xyz integration

**Tactical:**
- `MIYOMI_STATUS_UPDATE.md` - Complete character + platform strategy
- `PLAN_FORWARD.md` - 10-week timeline to token launch
- `AUDIO_FINAL_SOLUTION.md` - Technical video pipeline

**Context:**
- `MIYOMI_TLDR.md` - Non-technical summary
- `MIYOMI_COLLABORATION_BRIEF.md` - Team coordination
- `MIYOMI_FOR_GOLDY.md` - Trainer onboarding

---

## Critical Insights from Past Work

### 1. Miyomi is NOT a Trader (Key Realization)

**What we initially built:**
- Trading dashboards with P&L tracking
- Position management interfaces
- Risk/reward calculators
- Performance analytics

**What we actually need:**
- Oracle content creation tools
- Audience growth metrics
- Affiliate revenue tracking
- Engagement analytics

**This changes everything** - focus on media/influence, not trading execution

### 2. Daily Workflow Must Be <5 Minutes

**Current:** 27 different dashboards = analysis paralysis
**Need:** Single streamlined interface for daily oracle content

**Ideal flow:**
1. **Morning brief** (1 min) - AI shows 3 interesting markets
2. **Select & generate** (30 sec) - One-click content creation
3. **Review & launch** (30 sec) - Approve and post everywhere

**Total:** <3 minutes per day

### 3. Content Strategy is Clear

**Formula that works:**
1. **Hook** (3 sec): "Markets whisper... everyone thinks X"
2. **Setup** (7 sec): "Crowd at 87%, Wall Street bulls everywhere"
3. **Twist** (10 sec): "But funding rates tell different story"
4. **Probability** (5 sec): "64% chance they're wrong"
5. **CTA** (5 sec): "Check Polymarket, link in bio"

**30 seconds total** - perfect for TikTok/Shorts

### 4. Platform Priority is TikTok First

**Why:**
- Highest viral potential
- Youngest demo = prediction market early adopters
- 30-60sec format matches her energy
- Visual/aesthetic perfect for her style

**Then:**
- Twitter (threads for analysis)
- Farcaster (crypto-native community)
- YouTube (educational long-form)
- Premium Discord ($10/mo subscribers)

### 5. Revenue Model is Attention → Affiliates → Token

**Phase 1 (Oct-Nov):** Build following
- Affiliate clicks to Polymarket/Kalshi
- Premium subscriptions ($10/mo)
- **Goal:** 200+ followers, first $100 affiliate revenue

**Phase 2 (Dec):** Token launch
- $MIYOMI via Spirit Protocol
- 25% to $SPIRIT holders (auto-graduation)
- 25% liquidity pool
- 25% to Seth
- 25% to Miyomi treasury

**Phase 3 (Q1 2026+):** Scale
- Market making fees (Soup.xyz)
- API access
- Licensing deals

---

## What to Build Next (Consolidated Plan)

### Build This ONE Thing: `/miyomi` Oracle Platform

**Single production page that does everything:**

```
┌─────────────────────────────────────────────────────┐
│                    MIYOMI.AI                         │
│              "Markets whisper..."                    │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Hero Section]                                     │
│  • Miyomi's face (Yeah LoRA character)              │
│  • TODAY'S ORACLE TAKE (auto-updates)               │
│  • Live countdown to market resolution              │
│  • Current followers / accuracy stats               │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Featured Video]                                   │
│  • Today's oracle prediction (auto-embedded)        │
│  • 30-second viral content                          │
│  • Pink/cyan cyberpunk aesthetic                    │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [Latest Takes] (scrollable)                        │
│  • Last 5 oracle predictions                        │
│  • Market → Crowd view → Miyomi probability         │
│  • Outcome tracking (for credibility)               │
│                                                      │
├─────────────────────────────────────────────────────┤
│                                                      │
│  [CTAs - The Money Makers]                          │
│  • PRIMARY: "Get Daily Picks on Polymarket →"      │
│    (affiliate link with tracking)                   │
│  • SECONDARY: "Join Inner Circle ($10/mo) →"       │
│    (premium Discord/Telegram)                       │
│  • TERTIARY: Social follow buttons                  │
│                                                      │
└─────────────────────────────────────────────────────┘

[Trainer Mode Toggle] (bottom right, hidden)
```

### Trainer Dashboard (Hidden, Auth Required)

**Ultra-simple 3-step workflow:**

```
Step 1: MORNING BRIEF (AI-generated)
┌─────────────────────────────────────────┐
│ 🔮 Interesting Markets Today            │
├─────────────────────────────────────────┤
│ 1. Bitcoin $100k by Dec 31              │
│    Crowd: 87% YES                       │
│    Contrarian angle: Funding exhaustion │
│    [Create Oracle Take →]               │
│                                         │
│ 2. Trump wins PA                        │
│    Crowd: 58% YES                       │
│    Contrarian angle: Poll mismatch      │
│    [Create Oracle Take →]               │
│                                         │
│ 3. Mercury retrograde affects markets   │
│    Crowd: 62% NO                        │
│    Contrarian angle: Chaos market fun   │
│    [Create Oracle Take →]               │
└─────────────────────────────────────────┘

Step 2: ONE-CLICK GENERATION
┌─────────────────────────────────────────┐
│ Selected: Bitcoin $100k                 │
├─────────────────────────────────────────┤
│ AUTO-GENERATED ORACLE TAKE:             │
│                                         │
│ Hook: "Markets whisper... everyone     │
│ screaming $100k Bitcoin"                │
│                                         │
│ Analysis: "Crowd at 87%, but funding   │
│ rates at 3-month highs. Retail FOMO    │
│ peaking. Smart money exiting."          │
│                                         │
│ Probability: "64% chance they're wrong" │
│                                         │
│ [Edit] [Generate Video →]               │
└─────────────────────────────────────────┘

Step 3: REVIEW & LAUNCH
┌─────────────────────────────────────────┐
│ VIDEO PREVIEW:                          │
│ [30sec video player]                    │
│                                         │
│ WILL POST TO:                           │
│ ✓ TikTok (with affiliate link)         │
│ ✓ Twitter (thread version)              │
│ ✓ Farcaster (crypto version)            │
│                                         │
│ [← Back] [Launch Everything →]         │
└─────────────────────────────────────────┘
```

**Total time: <3 minutes**

---

## Technical Architecture (Clean & Simple)

### Frontend (Next.js + React)

```
app/
  page.tsx                          # Public oracle page
  dashboard/
    page.tsx                        # Trainer dashboard (auth)
  api/
    oracle/
      brief.ts                      # Morning market brief
      generate.ts                   # Video + content generation
      post.ts                       # Multi-platform posting
```

### Backend Services

```
lib/
  eden/
    video.ts                        # Video generation
    audio.ts                        # TTS generation
    combine.ts                      # FFmpeg wrapper

  markets/
    polymarket.ts                   # Market data
    kalshi.ts                       # Market data
    dome.ts                         # Analytics

  ai/
    brief-generator.ts              # Morning brief AI
    script-writer.ts                # Oracle take generation
    social-adapter.ts               # Platform-specific formatting

  social/
    tiktok.ts                       # Auto-posting
    twitter.ts                      # Auto-posting
    farcaster.ts                    # Auto-posting
```

### Data Layer (Supabase)

```sql
-- oracle_takes table
CREATE TABLE oracle_takes (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ,
  market_name TEXT,
  crowd_consensus NUMERIC,
  miyomi_probability NUMERIC,
  script TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  views INT DEFAULT 0,
  clicks INT DEFAULT 0,
  outcome TEXT, -- 'correct' | 'incorrect' | 'pending'
  resolved_at TIMESTAMPTZ
);

-- affiliate_clicks table
CREATE TABLE affiliate_clicks (
  id UUID PRIMARY KEY,
  oracle_take_id UUID REFERENCES oracle_takes(id),
  platform TEXT, -- 'polymarket' | 'kalshi'
  clicked_at TIMESTAMPTZ,
  converted BOOLEAN DEFAULT FALSE,
  revenue NUMERIC
);

-- social_posts table
CREATE TABLE social_posts (
  id UUID PRIMARY KEY,
  oracle_take_id UUID REFERENCES oracle_takes(id),
  platform TEXT, -- 'tiktok' | 'twitter' | 'farcaster'
  post_url TEXT,
  posted_at TIMESTAMPTZ,
  views INT DEFAULT 0,
  likes INT DEFAULT 0,
  shares INT DEFAULT 0
);
```

---

## Implementation Phases (4 Weeks)

### Week 1: Foundation (Oct 7-13)

**Goal:** Public oracle page live with first video

**Tasks:**
- [ ] Set up Next.js project structure
- [ ] Build public oracle page (`/miyomi`)
- [ ] Integrate existing video pipeline
- [ ] Add Polymarket/Kalshi affiliate links with tracking
- [ ] Deploy to miyomi.ai

**Success:** One page live, one video embedded, affiliate clicks tracking

### Week 2: Automation (Oct 14-20)

**Goal:** Trainer dashboard with AI morning brief

**Tasks:**
- [ ] Build `/dashboard/oracle` with auth
- [ ] Create morning brief generator (AI scans markets)
- [ ] Implement one-click video generation
- [ ] Add social post formatting (TikTok, Twitter, Farcaster)

**Success:** Generate oracle video in <3 minutes end-to-end

### Week 3: Distribution (Oct 21-27)

**Goal:** Auto-posting to social platforms

**Tasks:**
- [ ] TikTok auto-posting API integration
- [ ] Twitter thread auto-posting
- [ ] Farcaster auto-posting
- [ ] Affiliate link injection
- [ ] Click tracking and analytics

**Success:** One-click launches to all platforms

### Week 4: Optimization (Oct 28 - Nov 3)

**Goal:** Premium subscriptions + performance tracking

**Tasks:**
- [ ] Premium Discord/Telegram setup
- [ ] Stripe integration for subscriptions
- [ ] Oracle accuracy tracking
- [ ] Engagement analytics dashboard
- [ ] A/B testing framework for hooks

**Success:** First paying subscribers, first affiliate revenue

---

## Success Metrics (NOT Trading P&L!)

### Week 1
- [ ] 1 oracle video posted
- [ ] 100+ views
- [ ] 10+ clicks to Polymarket

### Month 1 (End Oct)
- [ ] 10+ oracle videos
- [ ] 200+ followers across platforms
- [ ] First $10 in affiliate revenue

### Month 2 (End Nov)
- [ ] 20+ oracle videos
- [ ] 500+ followers
- [ ] 10+ premium subscribers
- [ ] $100+ monthly recurring revenue

### Month 3 (Mid Dec)
- [ ] 30+ oracle videos
- [ ] 1,000+ followers
- [ ] 50+ premium subscribers
- [ ] $500+ MRR
- [ ] **Token launch ready**

---

## Key Decisions Needed This Week

### 1. Which HTML to Use as Base?
**Options:**
- `miyomi-live.html` - Most complete
- `miyomi-unified.html` - Best UX
- `index.html` - Current landing page

**Recommendation:** Start fresh with clean Next.js, cherry-pick best elements

### 2. Social Platform Priority?
**Recommendation:**
1. TikTok (viral potential)
2. Twitter (analysis threads)
3. Farcaster (token community)

### 3. Premium Pricing?
**Options:**
- $10/mo (accessible)
- $25/mo (premium)
- $50/mo (VIP)

**Recommendation:** Start at $10/mo, add higher tiers later

### 4. Content Cadence?
**Options:**
- Daily (aggressive)
- Every other day (sustainable)
- 3x/week (conservative)

**Recommendation:** Every other day for first month, then daily

---

## What to Retire/Archive

**Stop building:**
- ❌ Trading dashboards (she's not executing trades)
- ❌ Position management UIs
- ❌ Risk calculators
- ❌ P&L trackers

**Archive these 27 HTML prototypes:**
- Move to `/archive/prototypes/`
- Keep as reference but don't maintain
- Focus on ONE production platform

**Consolidate docs:**
- Keep: `MIYOMI_STATUS_UPDATE.md`, `PLAN_FORWARD.md`, `AUDIO_FINAL_SOLUTION.md`
- Archive: Old status docs, redundant planning docs

---

## Next Actions (Tomorrow Morning)

### 1. Read This Document
Complete mental model of past work + path forward

### 2. Make Final Decisions
- Social platform priority
- Premium pricing
- Content cadence
- Which dashboard elements to keep

### 3. Start Week 1 Build
```bash
# Create clean Next.js project
npx create-next-app@latest miyomi-oracle --typescript

# Copy over working code
cp lib/eden-client.js miyomi-oracle/lib/
cp lib/ffmpeg-helper.js miyomi-oracle/lib/
cp .env.local miyomi-oracle/

# Build public oracle page
# Deploy to miyomi.ai
```

### 4. Generate First Oracle Video
- Find interesting Polymarket opportunity
- Use existing pipeline
- Post manually to test conversion
- Track clicks and engagement

---

## Bottom Line

**What we've built:** Solid technical foundation + complete character
**What we need:** ONE consolidated production platform
**Timeline:** 4 weeks to fully automated oracle system
**Goal:** 1,000 followers → $MIYOMI token launch (Dec 2025)

**Key insight:** Miyomi is media personality, not trader. Build for content creation and audience growth, not trade execution.

---

**Ready to consolidate and build the final platform** 🎬🔮
