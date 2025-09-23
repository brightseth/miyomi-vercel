# MIYOMI - Prediction Market Video Oracle

## 🚀 Production URLs
**Main Domain:** https://miyomi.ai
**Latest Deployment:** https://miyomi-federation-g95f40f0b-edenprojects.vercel.app

## 📊 System Status (Updated: January 17, 2025)
- ✅ **Database**: Fully integrated with Supabase
- ✅ **Live Market Data**: Real Polymarket & Kalshi APIs integrated
- ✅ **Trainer Dashboard**: Complete curation system deployed
- ✅ **Video Generation**: Pipeline ready (Eden API pending)
- ✅ **Contrarian Analysis**: Automatic edge detection for >70% or <30% consensus

## 🔗 Quick Links

### Live Features
- **[Live Market Dashboard](https://miyomi.ai/miyomi-live-dashboard.html)** - Real-time market monitoring
- **[Trainer Dashboard](https://miyomi.ai/trainer-dashboard.html)** - Private curation (password: `miyomi2025`)
- **[Original Interface](https://miyomi.ai/eden-api-connector.html)** - Video generation UI

### API Endpoints
- **Live Polymarket Data**: https://miyomi.ai/api/polymarket-live
- **Live Kalshi Data**: https://miyomi.ai/api/kalshi-live
- **Video Generation**: https://miyomi.ai/api/generate-video-v2
- **Video History**: https://miyomi.ai/api/video-history
- **Database Health**: https://miyomi.ai/api/database-health

### Development
- **GitHub Repo**: [Add your repo URL here]
- **Vercel Project**: https://vercel.com/edenprojects/miyomi-federation
- **Supabase Dashboard**: https://supabase.com/dashboard/project/aeflqgydcrlszgbpduyk

## 🎯 Current Capabilities

### New Features (January 17, 2025)
1. **Live Market Data** - Real Polymarket/Kalshi APIs with contrarian analysis
2. **Trainer Dashboard** - Complete pick curation and approval workflow
3. **Enhanced Video Generation** - Multiple Eden endpoint attempts with fallbacks
4. **Automatic Edge Detection** - Identifies extreme consensus opportunities
5. **Real-time Updates** - Auto-refresh every 30 seconds on live dashboard

### Core Features
1. **Video Generation API** - Creates video records with full metadata
2. **Database Persistence** - All videos saved to Supabase
3. **Video History** - Retrieve past videos by category
4. **Market Integration** - Live prediction market data
5. **3 Daily Categories**:
   - Economy/Crypto (9AM)
   - Politics/World Events (2PM)
   - Culture/Lifestyle (7PM)

### API Endpoints
```bash
# Generate Video
POST /api/generate-video
{
  "category": "economy|politics|culture",
  "position": "SHORT Bitcoin at $100k",
  "thesis": "Market analysis...",
  "script": "30-second video script..."
}

# Get Video History
GET /api/video-history
GET /api/video-history?category=economy

# Check Database Health
GET /api/database-health
```

## 🔧 Technical Stack
- **Frontend**: Static HTML/CSS/JavaScript
- **Backend**: Vercel Serverless Functions
- **Database**: Supabase PostgreSQL
- **Video Gen**: Eden API (pending integration)
- **Agent ID**: `68aae13174876e833d9ae73b`

## 📈 Database Schema
- `videos` - Generated video records
- `markets` - Prediction market data
- `positions` - MIYOMI's trading positions
- `video_metrics` - Performance analytics
- `daily_metrics` - Aggregated stats

## 🎬 Eden API Integration Status

### What We Need From Eden Academy
The #1 priority feature request is a video generation endpoint:

```
POST /api/v1/eden/agents/miyomi/generate-video
```

### Current Workaround
System uses mock responses to demonstrate full database integration while awaiting Eden API access.

## 📝 Environment Variables
```bash
SUPABASE_URL=https://aeflqgydcrlszgbpduyk.supabase.co
SUPABASE_ANON_KEY=[configured in Vercel]
EDEN_API_KEY=db10962875d98d2a2dafa8599a89c850766f39647095c002
```

## 🔄 Next Steps
1. **Social Media Automation** - Auto-publish to TikTok, YouTube Shorts, X/Twitter
2. **WebSocket Integration** - Real-time market updates without polling
3. **Advanced Analytics** - Track video performance and trading P&L
4. **ML Edge Detection** - Machine learning for opportunity identification

## 💬 Contact & Support
- **Project Lead**: Seth (you!)
- **Developer**: Can share with jmill
- **Eden Support**: Henry (for API access)

## 🎯 Quick Testing

### Test Live Market Data
```bash
# Get live Polymarket data
curl https://miyomi.ai/api/polymarket-live

# Get live Kalshi markets
curl https://miyomi.ai/api/kalshi-live
```

### Test Video Generation
```bash
# Generate contrarian video
curl -X POST "https://miyomi.ai/api/generate-video-v2" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "economy",
    "position": "SHORT Bitcoin at 100k",
    "thesis": "Extreme greed signals market top",
    "script": "The crowd is always wrong at extremes"
  }'
```

### Access Dashboards
- **Live Markets**: https://miyomi.ai/miyomi-live-dashboard.html
- **Trainer Access**: https://miyomi.ai/trainer-dashboard.html (password: `miyomi2025`)

---

**Last Updated**: January 17, 2025
**Latest Features**: Live market data integration, trainer dashboard, contrarian analysis automation