# JMILL - MIYOMI ONBOARDING

**Welcome!** This is your 15-minute onboarding to get you productive on Miyomi sprint (Oct 20 - Nov 1).

---

## 🎯 YOUR ROLE

You're the **daily driver** for Miyomi's 2-week sprint to soft launch.

**What Seth needs from you**:
- Spin up all social channels (Twitter, Telegram) - Mon
- Lock character look/voice - Tue
- Build signal finder v0 - Wed
- Ship 7 videos by end of Week 1
- Create miyomi.ai teaser site - Fri

**Daily**: 60-min stand-up with Seth, same-day script approvals

---

## 🚀 QUICK START (5 Minutes)

### 1. Clone & Install
```bash
cd /Users/seth/miyomi-vercel
npm install
```

### 2. Check Environment
```bash
cat .env.local  # All API keys should be configured
```

### 3. Run Locally
```bash
vercel dev
# Open http://localhost:3000
```

### 4. Test Endpoints
```bash
curl http://localhost:3000/api/markets/scan
curl http://localhost:3000/api/dome/pnl?wallet=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

---

## 📁 PROJECT STRUCTURE (5 Minutes)

```
miyomi-vercel/
├── MIYOMI_HQ/              # ← START HERE
│   ├── QUICK_REF.md        # URLs, credentials, team
│   ├── GAPS.md             # What needs fixing
│   ├── MIYOMI_SPRINT_BRIEF.md  # 2-week plan
│   └── MIYOMI_INVENTORY.md # Everything cataloged
│
├── lib/
│   ├── eden-client.js      # ← CRITICAL - Eden API wrapper
│   ├── polymarket-client.js
│   └── dome-client.js
│
├── api/
│   ├── markets/scan.js     # Market scanner (working)
│   ├── dome/pnl.js         # Performance (working)
│   └── generate-video-eden.js  # Video generation
│
├── public/
│   ├── index.html          # Public dashboard
│   ├── trainer.html        # Trainer interface
│   └── prototypes/         # 30+ archived prototypes
│
├── assets/
│   ├── brand/eden-images/  # 10 Miyomi character images
│   └── media/              # Voice samples, test videos
│
└── MIYOMI_DOCS/            # All documentation organized
```

---

## 🔑 KEY FILES YOU'LL EDIT

### Week 1 Focus

**Social Setup** (Mon):
- Create Twitter @miyomi____
- Create 3 Telegram channels
- Update `MIYOMI_HQ/QUICK_REF.md` with handles

**Character Lock** (Tue):
- Test `/lib/eden-client.js` → `generateMiyomiVideo()`
- Generate 10 samples
- Document in `assets/brand/LOOKBOOK.md`

**Signal Finder** (Wed):
- Create `/api/signals/scan.js` (scrape X lists)
- Rank by engagement velocity
- Deliver top-5 twice daily

**Video Pipeline** (Thu-Fri):
- Connect trainer.html "Schedule Video" button
- Wire to `/api/generate-video-eden.js`
- Poll for completion, save to database

---

## 🛠️ WORKING APIS

### Eden (Video Generation) ✅
```javascript
// lib/eden-client.js
const client = require('./lib/eden-client');

// Generate Miyomi video
const result = await client.generateMiyomiVideo({
  prompt: "Bitcoin just hit $100k...",
  duration: 10,  // Max 10 seconds (not 30!)
  aspectRatio: "9:16"
});

// Poll until complete
const video = await client.pollTaskUntilComplete(result.taskId);
console.log(video.url);
```

**Key**: Agent ID `68aae13174876e833d9ae73b`, Yeah LoRA model `67ef2bba6e91dc8e0efc2f1c`

### Polymarket (Market Data) ✅
```bash
curl https://miyomi.ai/api/markets/scan
# Returns 12 contrarian opportunities (mock data by default)
# Add ?live=true for real Polymarket API
```

### Dome (Performance) ⚠️
```bash
curl https://miyomi.ai/api/dome/pnl?wallet=ADDRESS
# Works for order history, PnL calculation
# Other endpoints 404
```

---

## 🚨 KNOWN ISSUES

1. **Mock Data**: Public dashboard shows fake stats. Connect real Dome API.
2. **No Caching**: Market scanner will hit rate limits. Add 5-min cache.
3. **Placeholder Wallet**: Using `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`. Get real wallet from Seth.
4. **Trainer Buttons**: "Approve/Schedule Video/Reject" just show alerts. Wire to database.

See `MIYOMI_HQ/GAPS.md` for full list.

---

## 📚 REFERENCES

**Eden SDK**: `/Users/seth/hello-eden/` - Cloned for reference patterns

**Key Docs**:
- `MIYOMI_DOCS/eden/MIYOMI_EDEN_INTEGRATION.md` - Full Eden integration guide
- `MIYOMI_DOCS/operations/PROTOTYPE_HANDOFF_OCT_17_2025.md` - Technical handoff from Seth
- `MIYOMI_DOCS/technical/IMPLEMENTATION_PLAN.md` - Complete build plan

**External**:
- Eden API Docs: https://docs.eden.art/api
- Polymarket API: https://docs.polymarket.com
- hello-eden repo: https://github.com/edenartlab/hello-eden

---

## 🎯 WEEK 1 PRIORITIES (In Order)

### Mon Oct 20
1. **Social Setup** (2-3 hours)
   - Claim Twitter @miyomi____
   - Create 3 Telegram channels
   - Set up UTM/Bitly tracking
   - Add legal disclaimers

2. **Environment Check** (1 hour)
   - Verify all API keys work
   - Test Eden video generation
   - Test Polymarket scanner
   - Document any issues

### Tue Oct 21
3. **Character Lock** (3-4 hours)
   - Generate 10 test videos with Yeah LoRA
   - Document acceptable variations
   - Choose voice from 4 samples in `assets/media/`
   - Create lookbook

### Wed Oct 22
4. **Signal Finder v0** (4-5 hours)
   - Scrape X lists (prediction markets, macro, culture)
   - Rank topics by freshness + engagement
   - Auto-deliver top-5 at 10:00 & 16:00 CET
   - Test with Telegram bot or email

### Thu-Fri Oct 23-24
5. **Video Pipeline** (4-6 hours)
   - Connect trainer.html to Eden API
   - Add polling for completion
   - Save to database
   - Test end-to-end

6. **First 3 Videos** (with Jacob)
   - Select markets from scanner
   - Write scripts (Seth approves)
   - Generate videos
   - Post to social

### Weekend Oct 26-27
7. **Finish 7 Videos**
   - Complete Week 1 KPI
   - Miyomi.ai teaser site if time permits

---

## 💬 WHO TO ASK

**Seth**: Strategy, content approvals, Polymarket contacts
**Jacob**: Script ideas, growth tactics, hooks
**Eden Team**: Agent configuration, API issues
**You**: Everything technical 🚀

---

## 🎉 SUCCESS LOOKS LIKE

**End of Week 1** (Fri Oct 24):
- ✅ All socials live
- ✅ Character locked
- ✅ Signal finder running
- ✅ 7 videos published
- ✅ 1,000 impressions/day
- ✅ 50+ Telegram members

**End of Week 2** (Fri Nov 1):
- ✅ 14 videos total
- ✅ 50k cumulative views
- ✅ 100 affiliate clicks
- ✅ Soft launch complete

---

## 🆘 EMERGENCY

**Blocked?** Check `MIYOMI_HQ/GAPS.md` first.

**Still stuck?** Ping Seth immediately. This is time-sensitive.

**API Issues?** All credentials in `.env.local` and `MIYOMI_HQ/QUICK_REF.md`.

---

**You got this!** Read `MIYOMI_HQ/QUICK_REF.md` next, then start with social setup Monday. 🚀

**Questions before Monday?** Ask Seth in daily prep call.
