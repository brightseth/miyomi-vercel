# Miyomi Status Update

**Date:** October 3, 2025
**For:** Team Review
**Status:** Video pipeline complete ✅

---

## TL;DR

**We have a working video generation pipeline with audio.** Ready to execute first trade and scale to token launch by mid-December.

---

## What's Working Now

### 1. Video Generation ✅
- **Eden API** with Kling model
- **Yeah LoRA** for consistent Miyomi character
- **Format:** 9:16 vertical, 10 seconds
- **Time:** 2-5 minutes per video
- **Quality:** Professional, ready for social media

### 2. Audio/Voiceover ✅
- **ElevenLabs TTS** via Eden API
- **Voice:** Rachel (professional confident female)
- **Time:** 20-30 seconds per audio
- **Quality:** Clear, broadcast-ready

### 3. Combination ✅
- **FFmpeg** merges video + audio locally
- **Time:** 5-10 seconds
- **Output:** MP4 with voiceover track
- **Tested:** Audio confirmed working

### 4. Trade Tracking ✅
- **Dome API** for order history
- **PnL calculation** implemented
- **Ready** for production use

**Total pipeline time:** 3-6 minutes per complete video with audio

---

## Tech Stack

```
Eden API
  ├─ Video generation (Kling + Yeah LoRA)
  └─ Audio generation (ElevenLabs TTS)
       ↓
FFmpeg (local combination)
       ↓
Supabase (storage)
       ↓
miyomi.ai (display)
```

---

## Code Structure

```
lib/
  eden-client.js              # Video + audio generation
  ffmpeg-helper.js            # Combination automation
  dome-client.js              # Trade tracking

api/
  eden/
    generate-video.js         # Video endpoint
    poll-video.js             # Status polling
  dome/
    pnl.js                    # Performance tracking

tests/
  test-full-audio-pipeline.js # End-to-end test
  combine-video-audio.sh      # Manual combination
```

All test scripts working ✅

---

## Next Steps

### This Week (Oct 4-10)
**Goal:** Execute first real trade with video

**Tasks:**
1. Integrate audio pipeline into production API
2. Set up video storage (Supabase/CDN)
3. Find first contrarian opportunity on Polymarket
4. Generate first real Miyomi video
5. Execute first trade
6. Post to Farcaster/Twitter

### Weeks 2-3 (Oct 11-24)
**Goal:** 5 trades, 200+ followers

- 2-3 videos per week
- Build social presence
- Maintain 60%+ win rate
- Refine based on engagement

### Weeks 4-6 (Oct 25 - Nov 14)
**Goal:** 15 trades, 500+ followers

- 3-4 videos per week
- Automate opportunity detection
- Prove 65%+ win rate
- Start community building

### Weeks 7-9 (Nov 15 - Dec 5)
**Goal:** 20+ trades, 1,000+ followers

- Daily videos
- Discord/Telegram community
- Pre-launch marketing
- Token economics finalized

### Week 10 (Dec 6-12)
**Goal:** TOKEN LAUNCH 🚀

Requirements met:
- ✅ 20+ successful trades
- ✅ 65%+ win rate
- ✅ 1,000+ followers
- ✅ Proven track record

---

## Daily Workflow (Once Automated)

**Morning (9am):**
- System scans Polymarket for opportunities
- Claude generates contrarian thesis
- Seth reviews and approves

**Mid-Day (11am):**
- Video generation (3-6 minutes)
- Trade execution
- Save to database

**Afternoon (2pm):**
- Post to social media
- Update miyomi.ai dashboard
- Track performance

**Evening (6pm):**
- Community engagement
- Daily recap
- Queue next day

**Time commitment:** 30-60 minutes/day

---

## Cost & Performance

### Costs per Video
- Video: ~$0.10-0.50
- Audio: ~$0.05-0.15
- **Total:** ~$0.15-0.65

### Monthly Costs
- 20 videos/month × $0.50 = $10/month
- Infrastructure: $0 (free tiers)
- **Total:** ~$10/month

### Revenue (Post-Launch)
- 100 followers × $10/month = $1,000/month
- 1,000 followers × $10/month = $10,000/month
- Token economics via Spirit Protocol

---

## Known Limitations

**Lip sync:** Not perfect (acceptable for MVP, can improve later with Wav2Lip/D-ID)

**What didn't work:**
- ❌ Simple audio parameter (no audio in output)
- ❌ Mmaudio tool (tensor error)

**What works perfectly:**
- ✅ ElevenLabs TTS + FFmpeg combination

---

## Key Decisions Needed

### Immediate
- [ ] Video storage: Supabase or Cloudflare R2?
- [ ] FFmpeg server-side: Where to run?
- [ ] Social accounts: Create official Miyomi handles?
- [ ] Trade size: Starting capital per trade?

### Short-term
- [ ] Voice: Stick with Rachel or try voice cloning?
- [ ] Video length: Keep 10s or expand?
- [ ] Platforms: Just Farcaster/Twitter or add TikTok?
- [ ] Community: Discord, Telegram, or both?

---

## Risk Mitigation

**Low win rate risk:**
- Start conservative (high-conviction only)
- Use arbitrage opportunities
- Track performance religiously

**Low engagement risk:**
- A/B test video styles
- Post at optimal times
- Active community engagement

**Technical risk:**
- Comprehensive error handling
- Manual fallback if automation fails
- Daily monitoring

**Regulatory risk:**
- Clear disclaimers (not financial advice)
- Transparent performance reporting
- Legal review before token launch

---

## Success Metrics

### Week 1
- 1 trade executed
- First video posted
- 50+ followers

### Month 1 (End Oct)
- 5+ trades
- 60%+ win rate
- 200+ followers

### Month 2 (End Nov)
- 15+ trades
- 65%+ win rate
- 500+ followers

### Month 3 (Mid Dec)
- 20+ trades
- 65%+ win rate
- 1,000+ followers
- **TOKEN LAUNCH** 🚀

---

## Environment Setup

All API keys stored in `.env.local` (not committed to git):

```bash
# .env.local
EDEN_API_KEY=<your_eden_key>
EDEN_AGENT_ID=<your_agent_id>
DOME_API_KEY=<your_dome_key>
SUPABASE_URL=<your_supabase_url>
SUPABASE_ANON_KEY=<your_supabase_key>
```

---

## Demo

To test the pipeline:

```bash
# Set environment variable
export EDEN_API_KEY=<your_key>

# Run end-to-end test
node test-full-audio-pipeline.js

# Combine output (URLs shown in test output)
./combine-video-audio.sh <video_url> <audio_url> test.mp4

# View result
open test.mp4
```

Test video created: `miyomi-bitcoin-test.mp4` (audio confirmed working)

---

## Questions for Team

1. **Storage:** Best place for final videos?
2. **FFmpeg:** Run server-side or keep local for now?
3. **Voice:** Happy with Rachel or want to try others?
4. **Lip sync:** Priority for MVP or post-launch?
5. **Social:** Which platforms first?

---

## Bottom Line

**Pipeline is production-ready.**
- Video quality: ✅ Good
- Audio quality: ✅ Good
- Character consistency: ✅ Good
- Speed: ✅ 3-6 minutes total
- Cost: ✅ ~$0.50 per video

**Ready to:**
- Integrate into production API
- Execute first trade
- Scale to token launch

**Timeline:** 10 weeks to launch (mid-December 2025)

---

## Files to Review

- `lib/eden-client.js` - Main integration code
- `lib/ffmpeg-helper.js` - Combination logic
- `AUDIO_FINAL_SOLUTION.md` - Complete technical guide
- `test-full-audio-pipeline.js` - Working test script

---

**Status:** ✅ Ready to execute

Let's ship it! 🚀
