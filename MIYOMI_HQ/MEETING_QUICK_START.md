# Miyomi Demo - Quick Start (30 min before meeting)

## 🎯 What's Live Right Now

**Production URL**: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app

### 3 Working Prototypes

1. **Market Scanner API**
   - `/api/markets/scan` - Returns 12 contrarian opportunities
   - Uses realistic mock data (Bitcoin $100k, Ukraine NATO, Trump 2024, etc.)
   - Try `/api/markets/scan?live=true` to test real Polymarket API

2. **Trainer Interface**
   - `/trainer-simple.html` - Browse and filter markets
   - Shows: Total opportunities, avg edge, highest edge
   - Actions: Approve, Schedule Video, View, Reject (alerts only - not wired to DB yet)

3. **Public Site**
   - `/` - Main landing page
   - Tries to fetch real Dome API every 30 seconds
   - Falls back to mock data gracefully

## 🚀 Quick Demo Flow

1. **Start with Market Scanner API**
   ```bash
   curl https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app/api/markets/scan
   ```
   - Shows 12 opportunities with extreme consensus
   - All have calculated edge (contrarian profit potential)

2. **Show Trainer Interface**
   - Open: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app/trainer-simple.html
   - Demo filters: Position (YES/NO), Edge threshold
   - Click through to Polymarket with "View" button
   - Show Approve/Video/Reject buttons (not connected yet)

3. **Show Public Site**
   - Open: https://miyomi-federation-mnuiwd0d4-edenprojects.vercel.app/
   - Check console for "Trying real Dome API" or "Using mock data"
   - Clean Helvetica/Swiss design

## 📋 What jmill Needs to Build

**Priority 1 (Core Functionality - 8-10 hours)**
- [ ] Add 5-minute caching to market scanner (prevent rate limits)
- [ ] Wire up database connections (approve/reject to Supabase)
- [ ] Replace placeholder wallet with real Miyomi wallet
- [ ] Add error handling + retry logic

**Priority 2 (Video Pipeline - 4-6 hours)**
- [ ] Connect "Schedule Video" button to Eden API
- [ ] Poll for video completion (check every 10s, max 5 min)
- [ ] Save video URL to database
- [ ] Handle failed generations

**Priority 3 (Polish - 2-3 hours)**
- [ ] Add loading states during fetch
- [ ] Add search functionality (search question text)
- [ ] Add sorting options (edge, volume, end date)
- [ ] Improve filter UX (save to localStorage)

## 📄 Full Documentation

- **PROTOTYPE_HANDOFF_OCT_17_2025.md** - Comprehensive technical handoff (470 lines)
  - What was built and how it works
  - Testing procedures
  - Optimization tasks with code examples
  - Database integration patterns
  - Success metrics

- **JMILL_BRIEFING_OCT_17_2025.md** - Strategic overview
  - Project context
  - Implementation approaches (MVP vs Full Stack)
  - Timeline estimates

## 🔑 Key Points for Meeting

1. **Prototypes work** - All 3 are live and functional
2. **Mock data by design** - Real Polymarket API returns stale markets, mock data ensures reliable demo
3. **Ready for handoff** - Clear documentation, known next steps
4. **Realistic timeline** - MVP functional in 8-10 hours, full build in 20-25 hours

## 🛠️ Environment Variables (Already Configured)

```bash
EDEN_API_KEY=[REDACTED]
EDEN_AGENT_ID=68aae13174876e833d9ae73b
SUPABASE_URL=https://aeflqgydcrlszgbpduyk.supabase.co
SUPABASE_ANON_KEY=[configured]
SUPABASE_SERVICE_KEY=[configured]
DOME_API_KEY=[obtained, working]
```

**Need to add:**
```bash
MIYOMI_WALLET_ADDRESS=0x... # Real wallet for Dome API
```

## 🎬 Next Steps After Meeting

1. jmill reviews handoff docs
2. Decide on approach: MVP (fast) vs Full Stack (complete)
3. jmill starts with caching + database connections
4. Test with Goldy's approval workflow
5. Add video generation pipeline
6. Beta launch when stable

---

**Status**: All prototypes deployed and working. Ready for jmill optimization pass.

**Meeting Goal**: Align on scope, timeline, and approach. Hand off to jmill for production build.

Let's ship this! 🚀
