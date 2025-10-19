# MIYOMI QUICK REFERENCE

**Last Updated**: Oct 18, 2025
**Sprint**: Oct 20 - Nov 1 (2 weeks to soft launch)

---

## 🔗 WORKING URLS

**Production Site**: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app

**Key Pages**:
- `/` - Public dashboard
- `/trainer.html` - Trainer interface (Jacob/JMill)
- `/about.html` - About page

**API Endpoints** (working):
- `/api/markets/scan` - Polymarket scanner (mock data by default, `?live=true` for real)
- `/api/dome/pnl?wallet=ADDRESS` - Performance tracking
- `/api/generate-video-eden` - Eden video generation

---

## 🔐 CREDENTIALS

**IMPORTANT**: All API keys are in `.env.local` (NOT committed to git)

**What you need**:
- Eden API key (video generation)
- Supabase URL + keys (database)
- Dome API key (performance tracking)
- Twitter API credentials
- Telegram bot token

**Where to find them**:
- Check `.env.local` on your local machine
- Or ask Seth for credentials

---

## 📁 WHERE EVERYTHING IS

**Sprint Planning**:
- `MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md` - 2-week plan
- `MIYOMI_HQ/MIYOMI_CHECKLIST.json` - Task tracking (JSON for Control Center)
- `MIYOMI_HQ/MIYOMI_INVENTORY.md` - Complete file inventory

**Documentation**:
- `MIYOMI_DOCS/strategy/` - Vision, tokenomics, competitive analysis
- `MIYOMI_DOCS/technical/` - Architecture, implementation
- `MIYOMI_DOCS/team/` - Roles, onboarding, workflows
- `MIYOMI_DOCS/operations/` - Launch plans, handoffs
- `MIYOMI_DOCS/eden/` - Eden integration docs
- `MIYOMI_DOCS/archive/` - Session notes, old versions

**Code**:
- `lib/eden-client.js` - Eden API wrapper (CRITICAL)
- `lib/polymarket-client.js` - Polymarket integration
- `lib/dome-client.js` - Dome API
- `api/markets/scan.js` - Market scanner
- `api/dome/pnl.js` - Performance tracking

**Production UI**:
- `public/index.html` - Public dashboard
- `public/trainer.html` - Trainer interface
- `public/about.html` - About page
- `public/prototypes/` - 30+ archived prototypes

**Assets**:
- `assets/brand/eden-images/` - 10 Miyomi character images
- `assets/media/` - Voice samples, test videos

---

## 🎨 BRAND ASSETS

**Eden LoRA Model**:
- ID: `67ef2bba6e91dc8e0efc2f1c`
- Name: "Yeah" by iflookscouldkill
- URL: https://app.eden.art/models/67ef2bba6e91dc8e0efc2f1c

**Character**: Miyomi - 22yo Asian-American, NYC Lower East Side, edgy alt-finance vibe

**Visual Style**: Cyberpunk, pink/cyan neon, tattoos, piercings, black hair

**Voice Samples**: 4 TTS variations in `assets/media/`

---

## 🚀 QUICK START (JMill)

### Local Development
```bash
cd /Users/seth/miyomi-vercel
npm install
vercel dev  # or npm run dev
```

### Test Endpoints
```bash
curl http://localhost:3000/api/markets/scan
curl http://localhost:3000/api/dome/pnl?wallet=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

### Deploy to Production
```bash
vercel --prod
```

---

## 👥 TEAM & ROLES

**Seth** (PM):
- Daily stand-up (60 min)
- Same-day script approvals
- Strategic decisions
- Polymarket affiliate outreach

**JMill** (Developer):
- Spin up socials + UTMs
- Lock character look/voice
- Build signal finder
- Ship 7 videos Week 1
- miyomi.ai teaser site

**Jacob** (Growth):
- Script collaboration
- Reply chains, hooks
- Leaderboard tracking
- Growth mechanics

---

## 📊 WEEK 1 KPIs (Oct 20-26)

- ✅ 7 videos shipped
- ✅ 2/day text posts
- ✅ 1 meme/day
- ✅ 1,000 impressions/day by Day 7
- ✅ 50+ Telegram members
- ✅ 10 affiliate clicks

---

## 📱 SOCIAL HANDLES (JMill: Update this section!)

**Twitter**:
- Handle: @miyomi____ (or update if different)
- URL: https://twitter.com/miyomi____
- Status: ⚠️ NEEDS UPDATE

**Telegram** (3 channels):
1. **Announcements** (read-only):
   - Link: [JMill add link here]
   - Status: ⚠️ NEEDS UPDATE

2. **Degen** (open chat):
   - Link: [JMill add link here]
   - Status: ⚠️ NEEDS UPDATE

3. **Signals Pro** (private/gated):
   - Link: [JMill add link here]
   - Status: ⚠️ NEEDS UPDATE

**Farcaster**:
- Handle: @miyomi
- Status: ⚠️ NEEDS UPDATE

---

## ⚠️ KNOWN GAPS

1. **Real Wallet Address** - Currently using placeholder: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
2. **Polymarket Affiliate** - Agreement not secured yet
3. **Character Lock** - Need to finalize exact visual model + voice

---

## 🆘 EMERGENCY CONTACTS

**Seth**: Primary PM
**JMill**: Full-stack dev at Eden
**Jacob**: Growth/content

**External**:
- Eden Team: For agent configuration, API issues
- Polymarket: Affiliate partnership

---

## 🔄 DAILY WORKFLOW (Starting Oct 20)

**10:00 CET**: Signal finder delivers top-5 topics
**Daily Stand-up** (60 min): Seth + JMill
- Review previous day
- Script approval
- Address blockers
**16:00 CET**: Signal finder delivers top-5 topics
**Same-day**: Seth approves scripts, JMill generates videos

---

## 📚 KEY REFERENCES

**hello-eden**: `/Users/seth/hello-eden/` - Eden SDK patterns
**Full Inventory**: `MIYOMI_HQ/MIYOMI_INVENTORY.md` - All 372 files cataloged
**Sprint Brief**: `MIYOMI_HQ/MIYOMI_SPRINT_BRIEF.md` - Detailed 2-week plan

---

**Status**: Consolidated and ready for sprint execution 🚀
