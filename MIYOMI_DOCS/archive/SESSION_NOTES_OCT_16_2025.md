# Miyomi Session Notes - October 16, 2025

## Session Summary

Applied Swiss design principles to Miyomi beta launch overview page and simplified for Friday call with Goldy.

---

## What We Built

### Beta Launch Overview Page
**File**: `/Users/seth/miyomi-vercel/public/beta-launch-overview.html`
**Production URL**: https://miyomi-federation-4psaou88a-edenprojects.vercel.app/beta-launch-overview.html

**Design Transformation**:
- Terminal aesthetic (Courier New, green on black) → Professional Swiss design (Helvetica, black on white)
- Mathematical grid layout with 20px/40px/60px spacing units
- Helvetica Neue typography system with proper hierarchy (56px → 14px)
- Classic invert-on-hover interactions (0.15s transitions)
- WCAG AAA contrast compliance (21:1 black/white ratio)
- Mobile-responsive (320px → 2560px)

**Content Simplification**:
- Removed all hourly time estimates (25-30 hrs/week, 4-6 hours, etc.)
- Removed "Decision Framework" section tied to specific hour commitments
- Updated timeline for Friday Oct 17, 3pm CEST call with Goldy
- Focus on strategic approaches (Full Stack, Phased, MVP) without prescriptive hours
- Cleaner presentation of 5 technical components

---

## Git Commits

```
edfe2ac - Simplify beta launch overview for Goldy call
a42b8ca - Apply Swiss design to beta launch overview page
22221d7 - Add visual beta launch overview page for meeting
```

**All changes pushed to GitHub and deployed to Vercel production**

---

## Project Context

### Miyomi Overview
- **What**: AI prediction market trader personality (Polymarket/Kalshi)
- **Vision**: "Predictive of the game, not predicted by the game"
- **Visual**: Eden LoRA "Yeah by iflookscouldkill" (edgy alt finance aesthetic)
- **Timeline**: Beta Oct 29 → Token Launch Dec 15, 2025

### Current Status: 45% Complete
- ✅ 75% infrastructure (Supabase, APIs configured)
- ✅ 30,000+ words documentation
- ✅ Swiss design beta overview page deployed
- ❌ No live data yet (100% mock data currently)
- ❌ No trainer workflow
- ❌ Video pipeline untested

### Team Structure
- **Seth Goldstein**: Product lead, strategic vision, partnerships
- **Goldy (Jacob Goldstein)**: Domain expert, market selection, thesis development
- **jmill**: Technical lead, implementation (time commitment TBD)

### Three Launch Approaches
1. **Full Stack**: Complete production system in 2 weeks (aggressive)
2. **Phased**: Core in 2 weeks, polish in 4 weeks (balanced)
3. **MVP**: Minimal beta, learn fast, iterate (recommended)

### Five Technical Components
1. Market Scanner - Polymarket API, opportunity scoring
2. Dome Dashboard - Live P&L tracking
3. Trainer Interface - Market browsing, thesis generation
4. Video Pipeline - Eden API integration
5. Testing & Deployment

---

## Next Steps (Friday Oct 17, 3pm CEST)

**Call with Goldy**:
- Share beta launch overview page
- Discuss domain expert role (market selection, thesis development)
- Align on launch approach based on natural capacity
- Confirm 5-10 hrs/week commitment
- Identify first markets to analyze

**For Morning**:
- Review this session note
- Prepare talking points for Goldy call
- Check if any documentation needs updating
- Consider preparing example markets for discussion

---

## Key Files

**Meeting Materials**:
- `/Users/seth/miyomi-vercel/public/beta-launch-overview.html` - Visual overview (deployed)
- `/Users/seth/miyomi-vercel/JMILL_MEETING_OCT_16_2025.md` - Meeting agenda
- `/Users/seth/miyomi-vercel/GOLDY_ROLE_DOMAIN_EXPERT.md` - Role definition

**Planning Docs**:
- `/Users/seth/miyomi-vercel/BETA_LAUNCH_PLAN.md` - Complete 2-week sprint (25+ pages)
- `/Users/seth/miyomi-vercel/COMPETITIVE_ANALYSIS.md` - Market research
- `/Users/seth/miyomi-vercel/README.md` - Full project overview (20,000 words)

**Infrastructure**:
- Supabase: https://supabase.com/dashboard/project/aeflqgydcrlszgbpduyk
- Vercel: miyomi-federation project
- Eden API: Agent ID 68aae13174876e833d9ae73b

---

## Design Standards Applied

**Typography**:
```css
font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
H1: 48px bold uppercase (-1px letter-spacing)
H2: 24px bold uppercase (-0.5px letter-spacing)
Body: 16px regular (1.6 line-height)
```

**Color Palette**:
```css
Background: #FFFFFF
Primary text: #000000
Secondary text: #666666
Borders: #000000 (2px solid)
Subtle backgrounds: #F5F5F5
```

**Layout**:
```css
Container: max-width 1200px, centered
Spacing: 20px/40px/60px/80px units
Grid: repeat(auto-fill, minmax(300-320px, 1fr))
```

**Interaction**:
```css
Hover: Background/color invert (#000 ↔ #fff)
Transition: 0.15s ease
```

---

## What's Working

1. **Swiss Design Applied**: Professional Helvetica system matches PARISEYE/SOLIENNE aesthetic
2. **Clean Presentation**: Beta overview ready for Friday call
3. **Simplified Approach**: No prescriptive hour commitments, focus on strategy
4. **All Deployed**: Changes pushed to GitHub and live on Vercel
5. **Documentation Complete**: 15+ markdown files with 30,000+ words

---

## What's Next

**Short Term (This Week)**:
- Friday 3pm CEST: Call with Goldy
- Align on domain expert role
- Choose launch approach
- Identify first 5-10 markets to analyze

**Medium Term (Next 2 Weeks)**:
- Implement chosen approach (likely MVP)
- Build market scanner + Dome dashboard
- Create trainer interface for Goldy
- Test video pipeline end-to-end

**Long Term (Oct 29)**:
- Beta launch with first real trade
- First video generated and posted
- Public announcement at miyomi.ai

---

## Session End State

**Branch**: main
**Status**: Clean working tree, all changes committed and pushed
**Deployment**: Production (latest)
**Ready for**: Friday 3pm CEST call with Goldy

Good night! Ready to pick up in the morning. 🌙
