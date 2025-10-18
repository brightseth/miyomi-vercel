# MIYOMI - CRITICAL GAPS TO FILL

**Date**: Oct 18, 2025
**Sprint Start**: Oct 20 (Monday)

---

## 🚨 BLOCKING GAPS (Must Fix Before Launch)

### 1. Character Lock ⚠️ HIGH PRIORITY
**Status**: Not finalized
**Impact**: Character drift will ruin brand consistency
**Action Required**:
- [ ] Finalize exact Eden model settings
- [ ] Test 10 sample generations with Yeah LoRA
- [ ] Document acceptable variations in lookbook
- [ ] Lock voice (TTS settings or voice clone)
- [ ] Create 10-shot lookbook for reference

**Owner**: JMill
**Due**: Tue Oct 21

---

### 2. Social Media Handles 🔴 CRITICAL
**Status**: Not claimed
**Impact**: Can't launch without distribution channels
**Action Required**:
- [ ] Twitter: @miyomi____ (4 underscores) - check availability, claim
- [ ] Telegram: Create "Miyomi Announcements" (read-only)
- [ ] Telegram: Create "Miyomi Degen" (open chat)
- [ ] Telegram: Create "Miyomi Signals Pro" (private, gated)
- [ ] Farcaster: @miyomi - check availability
- [ ] TikTok: Decide handle, claim

**Owner**: JMill
**Due**: Mon Oct 20

---

### 3. Polymarket Affiliate Agreement 💰 HIGH PRIORITY
**Status**: Not secured
**Impact**: No revenue tracking for proof-of-concept
**Action Required**:
- [ ] Contact Polymarket affiliate team
- [ ] Request trackable code/link
- [ ] Set up custom landing page if needed
- [ ] Test attribution flow
- [ ] Document CPA terms

**Owner**: Seth
**Due**: Mon Oct 20

---

## ⚠️ TECHNICAL GAPS (Affects Functionality)

### 4. Eden Agent System Prompt
**Status**: Unknown
**Impact**: Can't optimize Miyomi's responses without knowing base config
**Action Required**:
- [ ] Request from Eden team OR
- [ ] Extract via API: `GET /v2/agents/68aae13174876e833d9ae73b`
- [ ] Document in `MIYOMI_DOCS/eden/AGENT_CONFIG.md`

**Owner**: JMill
**Due**: Wed Oct 22

---

### 5. Real Wallet Address
**Status**: Using placeholder `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`
**Impact**: Can't show real Dome performance data
**Action Required**:
- [ ] Create dedicated Miyomi wallet OR
- [ ] Provide existing wallet address
- [ ] Update all references in code
- [ ] Test Dome API with real wallet

**Owner**: Seth
**Due**: Mon Oct 20

---

### 6. API Rate Limit Handling
**Status**: No caching implemented
**Impact**: Market scanner will hit Polymarket rate limits
**Action Required**:
- [ ] Add 5-minute cache to `/api/markets/scan.js`
- [ ] Implement retry with exponential backoff
- [ ] Add error logging
- [ ] Monitor API usage

**Owner**: JMill
**Due**: Wed Oct 22

---

## 📝 DOCUMENTATION GAPS (Nice to Have)

### 7. Production Deployment Guide
**Status**: Partial
**Impact**: JMill may face issues deploying
**Action Required**:
- [ ] Document environment variables
- [ ] Vercel deployment steps
- [ ] Rollback procedure
- [ ] Monitoring setup

**Owner**: JMill
**Due**: Fri Oct 24

---

### 8. Testing Suite
**Status**: Test scripts exist but not organized
**Impact**: Hard to verify endpoints are working
**Action Required**:
- [ ] Create `/tests/endpoint-tests.sh`
- [ ] Document expected responses
- [ ] Add to CI/CD if time permits

**Owner**: JMill
**Due**: Fri Oct 24

---

## 🔄 WORKFLOW GAPS (Process Issues)

### 9. Signal Finder Not Built
**Status**: Market scanner API exists, but no automated signal detection
**Impact**: Manual topic curation is slow
**Action Required**:
- [ ] Build X list scraper
- [ ] Implement engagement velocity ranking
- [ ] Auto-deliver top-5 at 10:00 & 16:00 CET
- [ ] Connect to Telegram or email

**Owner**: JMill
**Due**: Wed Oct 22

---

### 10. Video Request Workflow
**Status**: Eden API works, but no trainer interface connection
**Impact**: Manual video generation only
**Action Required**:
- [ ] Connect "Schedule Video" button in trainer.html
- [ ] Wire to Eden API via `/api/generate-video-eden`
- [ ] Add polling for completion
- [ ] Save result to database

**Owner**: JMill
**Due**: Thu Oct 23

---

### 11. Database Integration
**Status**: Schema exists, but not connected to UI
**Impact**: No persistence for approved opportunities, videos, trades
**Action Required**:
- [ ] Connect "Approve" button to `opportunities` table
- [ ] Connect "Reject" button to hide/archive
- [ ] Store video generation results in `videos` table
- [ ] Query recent trades for dashboard

**Owner**: JMill
**Due**: Fri Oct 24

---

## 🎨 BRAND/CONTENT GAPS

### 12. Miyomi Voice Finalization
**Status**: 4 TTS samples exist, not chosen
**Impact**: Inconsistent voice across videos
**Action Required**:
- [ ] Listen to 4 samples in `assets/media/`
- [ ] Choose best fit for brand
- [ ] Document ElevenLabs settings
- [ ] Test in production video

**Owner**: Seth + JMill
**Due**: Tue Oct 21

---

### 13. First 7 Scripts
**Status**: Not written
**Impact**: Can't ship videos without scripts
**Action Required**:
- [ ] Jacob + JMill collaborate
- [ ] Seth same-day approval
- [ ] Target markets from scanner
- [ ] Follow contrarian thesis format

**Owner**: Jacob + JMill (approved by Seth)
**Due**: Mon-Sun (Oct 21-27)

---

## 🔮 PHASE 2 GAPS (Post-Launch)

### 14. Trading Execution
**Status**: Not implemented
**Impact**: No actual trades = no track record
**Action**: Manual trading during beta, automate in Phase 2

### 15. Social Media Auto-Posting
**Status**: Not implemented
**Impact**: Manual posting only
**Action**: Twitter/Telegram APIs in Phase 2

### 16. Analytics Dashboard
**Status**: Not built
**Impact**: No visibility into attribution, engagement
**Action**: Build post-beta if needed

---

## 📊 GAP SUMMARY

| Priority | Count | Status |
|----------|-------|--------|
| 🔴 Blocking | 3 | Must fix Mon-Tue |
| ⚠️ High | 4 | Must fix by Wed |
| 📝 Medium | 4 | Nice to have by Fri |
| 🔮 Low | 3 | Post-launch |

**Total Gaps**: 14 identified

**Critical Path**: Character lock → Social setup → First video

---

**Next Review**: Mon Oct 20 (daily stand-up)
