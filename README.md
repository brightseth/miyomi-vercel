# MIYOMI - Prediction Market Video Oracle

## Project Vision

MIYOMI is an AI-powered prediction market influencer whose daily practice is to source and deliver entertaining, compelling, and profitable trades through short-form video content. She specializes in contrarian analysis of Polymarket and Kalshi prediction markets, generating 6+ videos daily that drive trading revenue through social media engagement.

## Core Value Proposition

**"The Contrarian Oracle of Prediction Markets"**
- Takes opposing positions to crowd consensus on Polymarket (politics/crypto) and Kalshi (economic indicators)
- Generates compelling 30-second video content multiple times per day
- Drives trading income through social media following and prediction market expertise
- 73% win rate with transparent P&L tracking

## Technical Architecture

### Current Implementation (Frontend Prototype)
- Static HTML/CSS/JavaScript dashboard
- Public/Private mode toggle
- Video generation UI with templates
- Polymarket/Kalshi position tracking
- Script generation for 30-second videos

### Required Integrations

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

## Development Priorities

### Phase 1: Video Generation (Current)
- [ ] Integrate Eden API for actual video creation
- [ ] Implement video preview player
- [ ] Add download functionality
- [ ] Store generated videos in cloud

### Phase 2: Market Data Integration
- [ ] Connect Polymarket API for live positions
- [ ] Integrate Kalshi API for economic data
- [ ] Build position tracking database
- [ ] Calculate real-time P&L

### Phase 3: Social Publishing
- [ ] TikTok auto-publishing
- [ ] YouTube Shorts scheduling
- [ ] X/Twitter thread generation
- [ ] Instagram Reels cross-posting

### Phase 4: Performance Analytics
- [ ] View count tracking
- [ ] Engagement metrics (likes, shares, comments)
- [ ] Follower growth attribution
- [ ] Revenue per video calculation

## Environment Variables Required

```env
# Eden API
EDEN_API_KEY=your_eden_api_key
EDEN_CHARACTER_ID=miyomi

# Prediction Markets
POLYMARKET_API_KEY=your_polymarket_key
POLYMARKET_WALLET_ADDRESS=0x...
KALSHI_API_KEY=your_kalshi_key
KALSHI_API_SECRET=your_kalshi_secret

# Social Media
TIKTOK_CLIENT_KEY=your_tiktok_key
TIKTOK_CLIENT_SECRET=your_tiktok_secret
YOUTUBE_API_KEY=your_youtube_key
TWITTER_BEARER_TOKEN=your_twitter_token

# Storage
AWS_S3_BUCKET=miyomi-videos
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

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

## Contact & Resources

- **Frontend Demo**: https://miyomi-federation-m4zfyi5pc-edenprojects.vercel.app
- **Eden API Docs**: https://docs.eden.art/api
- **Polymarket Docs**: https://docs.polymarket.com
- **Kalshi Docs**: https://api.kalshi.com/docs

## Next Steps for jmill

1. Review this documentation and current frontend prototype
2. Set up Eden API access for video generation
3. Implement backend API endpoints for video management
4. Integrate prediction market APIs for live data
5. Build database layer for persistence
6. Add social media publishing capabilities

---

*MIYOMI: "The crowd is always wrong at extremes. I teach you when to fade them."*