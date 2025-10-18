# MIYOMI - AI Prediction Market Influencer

**2-Week Sprint: Oct 20 - Nov 1, 2025**

[![Live](https://img.shields.io/badge/Live-miyomi.ai-green)](https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app)

---

## 🎯 TL;DR

**What**: AI prediction-market influencer (think Emma Chamberlain meets prediction markets)
**Revenue**: Polymarket/Kalshi affiliate fees from user signups
**Content**: Daily 30-45s vertical videos ("Today's Market" + "Today's Pick")
**Distribution**: Twitter + Telegram (3 channels)
**Timeline**: Launch Nov 1, 2025

---

## 🚨 WEEK 1 PRIORITIES (Oct 20-27)

### 1. Character Lock (JMill) - **DUE: TUE OCT 21**
**Goal**: Finalize Miyomi's exact look/voice so she's consistent across all videos

**Tasks**:
- [ ] Generate 10 test videos with Eden LoRA model (67ef2bba6e91dc8e0efc2f1c)
- [ ] Pick best face/wardrobe/tattoo variation
- [ ] Choose voice from 4 samples in `assets/media/`
- [ ] Document in lookbook: "This is Miyomi"
- [ ] Test: Generate 3 videos with same settings - should look like same person

**Why this matters**: Character drift will kill brand consistency. Lock it now.

**Resources**:
- Eden Agent ID: `68aae13174876e833d9ae73b`
- Test endpoint: `/api/generate-video-eden`
- Voice samples: `assets/media/voice-samples/`

---

### 2. Social Setup (JMill) - **DUE: MON OCT 20**
**Goal**: Claim handles and set up 3 Telegram channels

**Tasks**:
- [ ] Twitter: Claim @miyomi____ (check availability first)
- [ ] Telegram: "Miyomi Announcements" (read-only for videos)
- [ ] Telegram: "Miyomi Degen" (open chat for community)
- [ ] Telegram: "Miyomi Signals Pro" (private, gated)
- [ ] Add bio, profile pic, legal disclaimers
- [ ] Set up UTM/Bitly tracking for affiliate links

**Why this matters**: Can't launch without distribution. Do this FIRST.

---

### 3. Video Pipeline (JMill + Jacob) - **DUE: THU OCT 23**
**Goal**: Ship first video end-to-end

**Tasks**:
- [ ] Pick market from scanner (contrarian angle)
- [ ] Jacob writes 30s script (Seth approves)
- [ ] Generate video via Eden API
- [ ] Test voice + visuals
- [ ] Post to Twitter + Telegram
- [ ] Measure: impressions, engagement, clicks

**Target**: Ship 7 videos by Sun Oct 27

**Workflow**:
1. Signal finder suggests topics (or manual scan for now)
2. Jacob drafts script
3. Seth approves (same-day)
4. JMill generates video
5. Post + track

---

### 4. Polymarket Affiliate (Seth) - **DUE: MON OCT 20**
**Goal**: Secure trackable affiliate link/code

**Tasks**:
- [ ] Contact Polymarket affiliate team
- [ ] Request custom code/link
- [ ] Test attribution flow
- [ ] Document CPA terms
- [ ] Add to all video descriptions

**Why this matters**: No revenue tracking = no proof-of-concept

---

## ❓ KEY QUESTIONS FOR THIS WEEK

**Character/World Development**:
- Q: What's Miyomi's exact backstory we're sharing publicly?
- Q: NYC apartment or generic? (affects video backgrounds)
- Q: How much personality vs. pure alpha in videos? (60/40? 80/20?)
- Q: Trading style: pure contrarian or data-driven contrarian?

**Video Model**:
- Q: How realistic can Eden get with Yeah LoRA? (test to find limits)
- Q: Voice: Natural TTS or voice clone? (4 samples ready to test)
- Q: Video length: 30s or 45s? (test both, see retention)
- Q: Aspect ratio: 9:16 only or also 1:1 for Twitter?

**Distribution**:
- Q: Twitter posting schedule: 10am ET? 4pm ET? Both?
- Q: Telegram: Auto-post or manual with custom intro?
- Q: Reply strategy: Miyomi responds to comments? (Phase 2 probably)

---

## 📊 WEEK 1 SUCCESS METRICS

- [ ] 7 videos published (1 per day)
- [ ] 1,000+ impressions/day on Twitter
- [ ] 50+ members in Telegram channels
- [ ] 10+ affiliate link clicks
- [ ] Character locked (no variation across videos)

---

## 🛠️ TECH STACK

**Eden API** (Video Generation):
- Agent ID: `68aae13174876e833d9ae73b`
- LoRA Model: `67ef2bba6e91dc8e0efc2f1c` (Yeah by iflookscouldkill)
- Test: `lib/eden-client.js`

**Polymarket API** (Market Data):
- Endpoint: `/api/markets/scan`
- Returns: Contrarian opportunities ranked by edge

**Dome API** (Performance Tracking):
- Endpoint: `/api/dome/pnl?wallet=ADDRESS`
- Status: PnL working, other endpoints partial

**Deployment**: Vercel serverless
**Database**: Supabase PostgreSQL

---

## 👥 TEAM

**Seth** (PM): Strategy, content approvals, affiliate outreach
**JMill** (Developer): Character lock, social setup, video pipeline
**Jacob** (Growth): Scripts, hooks, community building

**Daily Stand-up**: 60 min (Seth + JMill) starting Mon Oct 20

---

## 🔗 KEY LINKS

**Production**: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app

**Pages**:
- `/` - Public dashboard
- `/trainer.html` - Trainer interface (for picking markets)
- `/about.html` - About Miyomi

**API Endpoints**:
- `/api/markets/scan` - Market scanner
- `/api/generate-video-eden` - Video generation
- `/api/dome/pnl?wallet=ADDRESS` - Performance tracking

---

## 📁 PROJECT STRUCTURE

```
miyomi-vercel/
├── MIYOMI_HQ/              # Command center (start here)
│   ├── GAPS.md             # What's blocking us
│   ├── QUICK_REF.md        # URLs, credentials, contacts
│   └── SPIRIT_TOKENOMICS.md # Future token launch plan
│
├── lib/
│   └── eden-client.js      # Eden API wrapper (CRITICAL)
│
├── api/
│   ├── markets/scan.js     # Market scanner
│   └── generate-video-eden.js # Video generation
│
├── public/
│   ├── index.html          # Public dashboard
│   └── trainer.html        # Market picker interface
│
└── assets/
    ├── brand/eden-images/  # Miyomi character samples
    └── media/              # Voice samples, test videos
```

**Deep Docs**: `MIYOMI_DOCS/` has 50+ files organized by category (strategy, technical, operations). Useful for context but NOT required for sprint execution.

---

## 🚧 KNOWN BLOCKERS

1. **Character not locked** - Need to test Eden model variations
2. **No social handles** - Twitter/Telegram not claimed
3. **No affiliate deal** - Can't track revenue yet
4. **Signal finder not built** - Manual market scanning for now (fine for Week 1)

See `MIYOMI_HQ/GAPS.md` for complete list.

---

## 💰 REVENUE MODEL

**Now (Beta Launch)**:
- Polymarket/Kalshi affiliate fees (PRIMARY)
- Sponsored content (SECONDARY)
- Trading profits (for credibility)

**Later (Q1 2026)**:
- Premium subscriptions (Signals Pro)
- Market making fees (Soup.xyz)
- Content licensing

**Token Launch** (Dec 2025/Jan 2026):
- $MIYOMI on Base L2 via Spirit Protocol
- 1B supply, 25/25/25/25 distribution
- All revenue flows to token holders as royalties

Details: `MIYOMI_HQ/SPIRIT_TOKENOMICS.md`

---

## 🎬 CONTENT STRATEGY

**Format**: 30-45s vertical video
**Cadence**: Daily (1 video/day minimum)
**Tone**: Contrarian, edgy, Gen-Z trader vibes
**Structure**:
  - Hook (3s): "Everyone thinks X, but..."
  - Thesis (20s): "Here's why they're wrong"
  - CTA (7s): "Link in bio to bet on it"

**Example Topics**:
- Trump winning but market says 60% (edge = 40% underpriced)
- Fed pivoting but bonds pricing 2% cuts (contrarian = hold)
- Election volatility spike (bet on calm)

---

## 🎭 MIYOMI CHARACTER

**Who**: 22yo Asian-American NYC trader
**Vibe**: Edgy alt-finance (tattoos, piercings, cyberpunk aesthetic)
**Personality**: Contrarian, confident, slightly chaotic
**Voice**: Gen-Z + trading slang + NYC accent
**Aesthetic**: "Yeah" LoRA model by iflookscouldkill

**Full persona**: Eden agent `68aae13174876e833d9ae73b` has 15k-word character doc (pull via API if needed)

---

## 🆘 HELP

**Stuck?**: Check `MIYOMI_HQ/GAPS.md` first
**Need credentials?**: `MIYOMI_HQ/QUICK_REF.md`
**Deep context?**: `MIYOMI_DOCS/` (but probably overkill for sprint)

**Emergency**: Ping Seth immediately - this is time-sensitive

---

## ⏭️ NEXT STEPS (In Order)

**Monday Oct 20**:
1. JMill: Claim social handles
2. Seth: Contact Polymarket for affiliate
3. JMill: Test Eden video generation (10 samples)
4. Daily stand-up: Review samples, pick character

**Tuesday Oct 21**:
5. Lock character (face + voice)
6. Document in lookbook
7. Jacob: Draft first 3 scripts
8. Seth: Approve scripts (same-day)

**Wednesday Oct 22**:
9. Generate first video
10. Post to Twitter + Telegram
11. Track: impressions, clicks, conversions
12. Ship 2nd video

**Thursday-Sunday Oct 23-27**:
13. Ship videos 3-7
14. Iterate on hooks/CTAs based on engagement
15. Build signal finder if time permits

---

**Status**: Infrastructure 75% done. Content/audience 0%. Let's ship.

**Last Updated**: Oct 18, 2025
**Sprint Start**: Mon Oct 20, 2025
