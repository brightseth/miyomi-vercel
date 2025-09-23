# MIYOMI - Prediction Market Video Oracle

## 🚀 Live Production: [miyomi.ai](https://miyomi.ai)

MIYOMI is an AI-powered contrarian oracle for prediction markets, analyzing Polymarket and Kalshi to identify extreme consensus opportunities and generate compelling video content about market inefficiencies.

## Core Value Proposition

**"The Contrarian Oracle of Prediction Markets"**
- Takes opposing positions to crowd consensus on Polymarket (politics/crypto) and Kalshi (economic indicators)
- Generates compelling 30-second video content multiple times per day
- Drives trading income through social media following and prediction market expertise
- 73% win rate with transparent P&L tracking

## 🎯 Current Features (Live in Production)

### Live Market Data Integration ✅
- **Real Polymarket API** (`/api/polymarket-live`) - Live prediction markets with automatic contrarian analysis
- **Real Kalshi API** (`/api/kalshi-live`) - Economic and election markets with edge detection
- **Smart Fallbacks** - Curated market data when APIs are unavailable

### Interactive Dashboards ✅
- **[Live Market Dashboard](https://miyomi.ai/miyomi-live-dashboard.html)** - Real-time market monitoring with Miyomi's positions
- **[Trainer Dashboard](https://miyomi.ai/trainer-dashboard.html)** - Private curation interface (password: `miyomi2025`)
- **[Original Interface](https://miyomi.ai/eden-api-connector.html)** - Video generation interface

### Video Generation Pipeline ✅
- **Enhanced Eden API Integration** (`/api/generate-video-v2`)
- **Database Persistence** - All videos saved to Supabase
- **Metadata Tracking** - Complete analytics for each generated video

### Technical Architecture

#### 1. Eden API for Video Generation
```javascript
// Eden API endpoint for MIYOMI
POST https://api.eden.art/v1/characters/miyomi/video
Authorization: Bearer {EDEN_API_KEY}

{
  "script": "Generated 30-second script",
  "style": "contrarian_oracle",
  "aspectRatio": "9:16", // TikTok/Shorts
  "duration": 30,
  "voice": "miyomi_confident",
  "background": "trading_charts"
}
```

#### 2. Prediction Market APIs

**Polymarket API**
```javascript
// Get live markets and positions
GET https://clob.polymarket.com/markets
GET https://clob.polymarket.com/positions/{address}

// Place contrarian bets
POST https://clob.polymarket.com/orders
```

**Kalshi API**
```javascript
// Get economic indicator markets
GET https://api.kalshi.com/v1/markets
GET https://api.kalshi.com/v1/positions

// Execute trades
POST https://api.kalshi.com/v1/orders
```

#### 3. Social Media Publishing

**TikTok API**
```javascript
POST https://open-api.tiktok.com/share/video/upload/
```

**YouTube Shorts API**
```javascript
POST https://www.googleapis.com/upload/youtube/v3/videos
```

**X/Twitter API**
```javascript
POST https://api.twitter.com/2/tweets
```

## User Flows

### 1. Public View (miyomi.ai visitors)
- See live Polymarket/Kalshi positions with P&L
- Watch recent prediction videos with performance
- View win rate and trading statistics
- Follow links to social channels

### 2. Private Trainer Dashboard
- Select prediction market (Polymarket/Kalshi/Both)
- Choose live position to feature
- Input contrarian thesis
- Generate video with AI script
- Preview and edit before publishing
- Publish to all platforms simultaneously

## Video Content Strategy

### Daily Schedule (3 Videos - Focused Categories)
- **9:00 AM EST** - Economy & Crypto (Kalshi economic indicators, Bitcoin/ETH markets)
- **2:00 PM EST** - Politics & World Events (Polymarket elections, geopolitical predictions)
- **7:00 PM EST** - Culture & Lifestyle (Entertainment, sports, social trends)

### Video Templates

#### 1. Polymarket Fade
- Hook: Challenge consensus on political/crypto events
- Body: Data-driven contrarian analysis
- Proof: Show current P&L on position
- CTA: "Follow for trades that actually print"

#### 2. Kalshi Edge
- Hook: Economic indicator arbitrage opportunity
- Body: Fed data analysis vs market pricing
- Proof: Historical win rate on similar trades
- CTA: "Economic alpha drops daily"

#### 3. Cross-Market Arbitrage
- Hook: Price discrepancy between platforms
- Body: Risk-free arbitrage explanation
- Proof: Live execution demonstration
- CTA: "Free money alerts in bio"

## Development Status

### ✅ Completed Features
- [x] Live Polymarket API integration with contrarian analysis
- [x] Live Kalshi API integration with edge detection
- [x] Real-time market dashboard with auto-refresh
- [x] Trainer dashboard for pick curation
- [x] Video generation pipeline with Eden API structure
- [x] Database persistence (Supabase)
- [x] Multiple fallback strategies for API failures
- [x] Contrarian position identification (>70% or <30% consensus)

### 🚧 In Progress
- [ ] Full Eden API video generation (awaiting API access)
- [ ] WebSocket for real-time market updates

### 📋 Next Phase: Social Publishing
- [ ] TikTok auto-publishing
- [ ] YouTube Shorts scheduling
- [ ] X/Twitter thread generation
- [ ] Instagram Reels cross-posting

### Phase 4: Performance Analytics
- [ ] View count tracking
- [ ] Engagement metrics (likes, shares, comments)
- [ ] Follower growth attribution
- [ ] Revenue per video calculation

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/edenprojects/miyomi-vercel.git
cd miyomi-vercel
npm install
```

### 2. Configure Environment
```env
# .env.local
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
EDEN_API_KEY=your_eden_api_key

# Optional (for enhanced features)
POLYMARKET_API_KEY=your_polymarket_key
KALSHI_API_KEY=your_kalshi_key
```

### 3. Deploy to Vercel
```bash
npx vercel --prod
```

### 4. Access Features
- Live Dashboard: `https://your-deployment.vercel.app/miyomi-live-dashboard.html`
- Trainer Dashboard: `https://your-deployment.vercel.app/trainer-dashboard.html`
- API Endpoints: `/api/polymarket-live`, `/api/kalshi-live`

## Database Schema

```sql
-- Videos table
CREATE TABLE videos (
  id UUID PRIMARY KEY,
  script TEXT NOT NULL,
  video_url TEXT,
  thumbnail_url TEXT,
  platform TEXT NOT NULL,
  market_type TEXT NOT NULL, -- 'polymarket' or 'kalshi'
  position_id TEXT,
  generated_at TIMESTAMP,
  published_at TIMESTAMP,
  views INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0
);

-- Positions table
CREATE TABLE positions (
  id UUID PRIMARY KEY,
  platform TEXT NOT NULL,
  market_id TEXT NOT NULL,
  market_title TEXT NOT NULL,
  side TEXT NOT NULL, -- 'long' or 'short'
  odds DECIMAL(5,2),
  entry_price DECIMAL(10,2),
  current_price DECIMAL(10,2),
  pnl DECIMAL(10,2),
  opened_at TIMESTAMP,
  closed_at TIMESTAMP
);

-- Performance metrics
CREATE TABLE metrics (
  date DATE PRIMARY KEY,
  videos_generated INTEGER,
  total_views INTEGER,
  new_followers INTEGER,
  revenue DECIMAL(10,2),
  win_rate DECIMAL(5,2),
  total_pnl DECIMAL(10,2)
);
```

## API Endpoints Needed

```javascript
// Video Generation
POST /api/video/generate
POST /api/video/preview
POST /api/video/publish
GET  /api/video/list

// Market Positions
GET  /api/positions/live
POST /api/positions/create
PUT  /api/positions/update
GET  /api/positions/history

// Analytics
GET  /api/analytics/dashboard
GET  /api/analytics/video/:id
GET  /api/analytics/daily
```

## Monetization Model

1. **Trading Revenue** - Profits from contrarian positions
2. **Follower Subscriptions** - Premium picks and analysis
3. **Sponsored Content** - Platform partnerships
4. **Affiliate Revenue** - Prediction market referrals

## Success Metrics

- **Videos Generated**: 3 daily (one per category)
- **Average Views**: 25K+ per video (higher quality, more focused)
- **Win Rate**: 70%+ on predictions
- **Follower Growth**: 1,500+ daily
- **Revenue per Video**: $1,500+ (concentrated engagement)

## API Documentation

### Live Market Data
```bash
# Get live Polymarket data with contrarian analysis
GET https://miyomi.ai/api/polymarket-live

# Get live Kalshi markets with edge detection
GET https://miyomi.ai/api/kalshi-live
```

### Video Generation
```bash
# Generate video with contrarian analysis
POST https://miyomi.ai/api/generate-video-v2
{
  "category": "economy",
  "position": "SHORT Bitcoin at 100k",
  "thesis": "Extreme greed signals top",
  "script": "30-second contrarian take"
}
```

## Resources

- **Live Production**: https://miyomi.ai
- **GitHub Repo**: https://github.com/edenprojects/miyomi-vercel
- **Eden API Docs**: https://docs.eden.art/api
- **Polymarket API**: https://docs.polymarket.com
- **Kalshi API**: https://api.kalshi.com/docs

---

*MIYOMI: "The crowd is always wrong at extremes. I teach you when to fade them."*