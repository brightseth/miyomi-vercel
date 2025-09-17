# MIYOMI - Prediction Market Video Oracle

## 🚀 Production URL
**Live System:** https://miyomi-federation-3mtdz91sc-edenprojects.vercel.app

## 📊 System Status
- ✅ **Database**: Fully integrated with Supabase
- ✅ **Video Storage**: Persistent video history 
- ✅ **API Endpoints**: All working with mock fallback
- ⏳ **Eden API**: Awaiting proper endpoint from Eden Academy team

## 🔗 Quick Links

### Dashboard Access
- **Main Interface**: https://miyomi-federation-3mtdz91sc-edenprojects.vercel.app
- **Video History API**: https://miyomi-federation-3mtdz91sc-edenprojects.vercel.app/api/video-history
- **Database Health**: https://miyomi-federation-3mtdz91sc-edenprojects.vercel.app/api/database-health

### Development
- **GitHub Repo**: [Add your repo URL here]
- **Vercel Project**: https://vercel.com/edenprojects/miyomi-federation
- **Supabase Dashboard**: https://supabase.com/dashboard/project/aeflqgydcrlszgbpduyk

## 🎯 Current Capabilities

### Working Features
1. **Video Generation API** - Creates video records with full metadata
2. **Database Persistence** - All videos saved to Supabase
3. **Video History** - Retrieve past videos by category
4. **Market Integration** - Polymarket/Kalshi data display
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
1. **Eden Academy** to provide video generation endpoint
2. **Implement** task status polling for video completion
3. **Add** social media auto-publishing
4. **Create** performance tracking dashboard

## 💬 Contact & Support
- **Project Lead**: Seth (you!)
- **Developer**: Can share with jmill
- **Eden Support**: Henry (for API access)

## 🎯 Quick Testing
```bash
# Test video generation (will use mock mode currently)
curl -X POST "https://miyomi-federation-3mtdz91sc-edenprojects.vercel.app/api/generate-video" \
  -H "Content-Type: application/json" \
  -d '{
    "category": "economy",
    "position": "SHORT Bitcoin at 100k",
    "thesis": "Bubble about to burst",
    "script": "30-second contrarian take"
  }'
```

---

**Last Updated**: January 16, 2025
**Session Summary**: Database fully integrated, awaiting Eden API video generation endpoint