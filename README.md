# MIYOMI - The Contrarian Oracle

**AI Prediction Market Influencer | 2-Week Sprint to Launch**

[![Live](https://img.shields.io/badge/Live-miyomi.ai-green)](https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app)
[![Sprint](https://img.shields.io/badge/Sprint-Oct_20--Nov_1-blue)](MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md)
[![Phase](https://img.shields.io/badge/Phase-Beta_Launch-orange)](MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md)

---

## 🚀 Quick Start

### For JMill (Developer)
**Read this first**: [`MIYOMI_HQ/JMILL_ONBOARDING.md`](MIYOMI_HQ/JMILL_ONBOARDING.md) - 15-minute onboarding

```bash
cd /Users/seth/miyomi-vercel
npm install
vercel dev
```

### For Seth (PM)
**Command Center**: [`MIYOMI_HQ/QUICK_REF.md`](MIYOMI_HQ/QUICK_REF.md) - URLs, credentials, team

**Sprint Plan**: [`MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md`](MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md) - 2-week detailed plan

**Gaps**: [`MIYOMI_HQ/GAPS.md`](MIYOMI_HQ/GAPS.md) - What needs fixing

---

## 📁 Project Structure

```
miyomi-vercel/
├── MIYOMI_HQ/                  # ← START HERE - Command center
│   ├── QUICK_REF.md            # URLs, credentials, key files
│   ├── GAPS.md                 # Critical gaps to fill
│   ├── MIYOMI_SPRINT_BRIEF.md  # 2-week plan (Oct 20-Nov 1)
│   ├── MIYOMI_CHECKLIST.json   # Task tracking
│   ├── MIYOMI_INVENTORY.md     # Complete file catalog (372 files)
│   └── JMILL_ONBOARDING.md     # 15-min onboarding for JMill
│
├── MIYOMI_DOCS/                # All documentation organized
│   ├── strategy/               # Vision, tokenomics, competitive
│   ├── technical/              # Architecture, implementation
│   ├── team/                   # Roles, onboarding, workflows
│   ├── operations/             # Launch plans, handoffs
│   ├── eden/                   # Eden integration details
│   └── archive/                # Session notes, old versions
│
├── lib/                        # Core libraries
│   ├── eden-client.js          # ← CRITICAL - Eden API wrapper
│   ├── polymarket-client.js    # Polymarket integration
│   └── dome-client.js          # Performance tracking
│
├── api/                        # API endpoints
│   ├── markets/scan.js         # Market scanner (working)
│   ├── dome/pnl.js             # Performance API (working)
│   └── generate-video-eden.js  # Video generation
│
├── public/                     # Production UI
│   ├── index.html              # Public dashboard
│   ├── trainer.html            # Trainer interface (Jacob/JMill)
│   ├── about.html              # About page
│   └── prototypes/             # 30+ archived prototypes
│
└── assets/                     # Brand & media
    ├── brand/eden-images/      # 10 Miyomi character images
    └── media/                  # Voice samples, test videos
```

---

## 🎯 What is Miyomi?

**AI prediction-market influencer generating attention → driving platform signups → earning affiliate commissions**

**Character**: 22yo Asian-American NYC trader, edgy alt-finance vibe (tattoos, piercings, cyberpunk aesthetic)

**Visual Identity**: [Eden LoRA Model 67ef2bba6e91dc8e0efc2f1c](https://app.eden.art/models/67ef2bba6e91dc8e0efc2f1c) - "Yeah" by iflookscouldkill

**Revenue Model**:
- Primary: Polymarket/Kalshi affiliate fees (user signups)
- Secondary: Sponsored content, premium subscriptions
- Tertiary: Trading profits (for credibility)

**Content**: Daily 30-45s vertical videos ("Today's Market" + "Today's Pick")

**Distribution**: Twitter + Telegram (Announcements, Degen chat, Signals Pro)

---

## 📊 Sprint Status (Oct 20 - Nov 1)

### Week 1 Goals (Days 1-7)
- [ ] Character lock (face + voice)
- [ ] Social channels live (Twitter @miyomi____, 3 Telegrams)
- [ ] Signal finder v0 (X scraping, top-5 topics)
- [ ] Ship 7 videos
- [ ] 1,000 impressions/day
- [ ] 50+ Telegram members

### Week 2 Goals (Days 8-14)
- [ ] Close Polymarket affiliate
- [ ] Gate Signals Pro (100 beta users)
- [ ] miyomi.ai teaser site
- [ ] 50k cumulative views
- [ ] 5 first conversions

---

## 🛠️ Tech Stack

**Backend**: Vercel serverless + Supabase PostgreSQL
**APIs**: Eden (video), Polymarket (markets), Dome (performance)
**Frontend**: Static HTML/CSS/JS (fast, simple)
**AI**: Claude 4.5 Sonnet
**Blockchain**: Base L2 (future $MIYOMI token)

---

## 🔑 Working URLs

**Production**: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app

**Key Pages**:
- `/` - Public dashboard
- `/trainer.html` - Trainer interface
- `/about.html` - About page

**API Endpoints**:
- `/api/markets/scan` - Market scanner (mock by default, `?live=true` for real)
- `/api/dome/pnl?wallet=ADDRESS` - Performance tracking
- `/api/generate-video-eden` - Video generation

---

## 👥 Team

**Seth** (PM): Strategy, content approvals, affiliate outreach
**JMill** (Developer): Social setup, character lock, signal finder, video pipeline
**Jacob** (Growth): Scripts, reply chains, hooks, leaderboard

**Daily Stand-up**: 60 min (Seth + JMill) starting Oct 20

---

## 📚 Documentation

**For Sprint Execution**:
- [`MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md`](MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md) - Complete 2-week plan
- [`MIYOMI_HQ/QUICK_REF.md`](MIYOMI_HQ/QUICK_REF.md) - Quick reference (URLs, credentials)
- [`MIYOMI_HQ/GAPS.md`](MIYOMI_HQ/GAPS.md) - Critical gaps to fill
- [`MIYOMI_HQ/JMILL_ONBOARDING.md`](MIYOMI_HQ/JMILL_ONBOARDING.md) - Developer onboarding

**For Deep Context**:
- [`MIYOMI_HQ/MIYOMI_INVENTORY.md`](MIYOMI_HQ/MIYOMI_INVENTORY.md) - All 372 files cataloged
- `MIYOMI_DOCS/strategy/` - Vision, tokenomics, competitive analysis
- `MIYOMI_DOCS/technical/` - Architecture, implementation details
- `MIYOMI_DOCS/team/` - Roles, workflows, onboarding
- `MIYOMI_DOCS/eden/` - Eden integration guides

**External References**:
- hello-eden SDK: `/Users/seth/hello-eden/` (cloned for reference)
- Eden API Docs: https://docs.eden.art/api
- Polymarket Docs: https://docs.polymarket.com

**Total Documentation**: 30,000+ words across 50+ files, all organized

---

## ⚡ Status

**Infrastructure**: 75% complete (database, APIs, deployment all working)
**Content/Audience**: 0% (no videos published, no followers yet)
**Sprint**: Starting Mon Oct 20
**Soft Launch**: Nov 1, 2025

**Critical Path**: Character lock → Social setup → First video → Launch

---

## 🚨 Known Issues

See [`MIYOMI_HQ/GAPS.md`](MIYOMI_HQ/GAPS.md) for complete list. Top 3:
1. Social handles not claimed yet
2. Character look/voice not finalized
3. Polymarket affiliate not secured

---

## 🔐 Credentials

All API keys configured in `.env.local`. Quick reference in `MIYOMI_HQ/QUICK_REF.md`.

**Eden API**: Agent ID `68aae13174876e833d9ae73b`
**Supabase**: Connected and deployed
**Dome API**: Partial (PnL working)
**Polymarket**: Read-only (no key needed)

---

## 🎬 Content Strategy

**Format**: 30-45s vertical video
**Cadence**: Daily "Today's Market" + "Today's Pick"
**Distribution**: Twitter (primary) + Telegram (3 channels)
**Workflow**: Signal finder → Trainer picks → AI generates → Seth approves → Publish

---

## 💰 Revenue Model

**Primary** (Now - Q1 2026):
- Polymarket/Kalshi affiliate fees (user signups)
- Advertising & sponsorships
- Lead generation

**Secondary** (Q1 2026+):
- Premium subscriptions (Signals Pro)
- Market making fees (Soup.xyz)
- Content licensing

**Token Launch** (Dec 2025/Jan 2026):
- $MIYOMI token on Base L2
- 1B supply, 25/25/25/25 distribution
- All revenue flows to token holders

---

## 🎉 Success Metrics

**Week 1**: 7 videos, 1k impressions/day, 50 Telegram members
**Week 2**: 14 videos total, 50k views, 5 conversions
**Soft Launch** (Nov 1): Functional content flow, proof-of-concept

---

*"I teach you to be predictive of the game, not predicted by the game."* - Miyomi

---

**Last Updated**: Oct 18, 2025
**Next Milestone**: Sprint start (Mon Oct 20)
**Contact**: Seth (PM), JMill (Developer), Jacob (Growth)
