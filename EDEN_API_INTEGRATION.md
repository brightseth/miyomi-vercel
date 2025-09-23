# MIYOMI Eden API Integration Documentation

## 🚀 Production Status
**Live at:** https://miyomi.ai
**Last Updated:** January 20, 2025

## ✅ Working Eden API Endpoints

### 1. Basic Video Generation
```bash
POST https://miyomi.ai/api/generate-video-eden
```
- Uses Eden API v2 with `tool: "create"`
- Generates 10-second videos (Eden max duration)
- Model: Kling for financial content
- Cost: 200 credits per video

### 2. Enhanced Video Generation (Recommended)
```bash
POST https://miyomi.ai/api/generate-video-enhanced
```
- Improved error handling and retry logic
- Optional `waitForCompletion` flag for synchronous generation
- Background polling for async completion
- Full database persistence

### 3. Video Status Checking
```bash
GET https://miyomi.ai/api/video-status/[taskId]
```
- Real-time status updates
- Progress tracking
- Automatic URL extraction when complete

## 📦 Eden Client Library

Located at `/lib/eden-client.js`, implements best practices from [hello-eden](https://github.com/edenartlab/hello-eden):

### Key Features
- Authenticated requests with X-Api-Key header
- Automatic retry logic with exponential backoff
- TypeScript-style interfaces (in comments)
- Environment-based configuration
- Comprehensive error handling

### Available Methods
```javascript
import edenClient from './lib/eden-client.js';

// Generate MIYOMI video
const result = await edenClient.generateMiyomiVideo({
  script: "Bitcoin will crash from 100k",
  category: "economy",
  position: "SHORT Bitcoin",
  thesis: "Extreme greed signals top"
});

// Poll for completion
const status = await edenClient.pollTask(taskId);

// Generate and wait for completion
const video = await edenClient.generateMiyomiVideoComplete({
  script: "Market analysis...",
  waitForCompletion: true
});
```

## 🎬 Video Generation Format

### Request Structure
```json
{
  "tool": "create",
  "args": {
    "text_input": "Video prompt/description",
    "type": "video",
    "model_preference": "kling",
    "aspect_ratio": "9:16",
    "duration": 10,
    "quality": "standard"
  }
}
```

### Response Structure
```json
{
  "task": {
    "_id": "68cc915359b201f8bbd9fe61",
    "status": "pending|running|completed|failed",
    "cost": 200,
    "result": [{
      "output": [{
        "url": "https://...",
        "thumbnail": "https://..."
      }]
    }]
  }
}
```

## 🔄 Integration Flow

1. **Create Video Task**
   - POST to `/api/generate-video-enhanced`
   - Returns task ID immediately
   - Video generation begins in background

2. **Poll for Status**
   - GET `/api/video-status/[taskId]`
   - Check every 10-15 seconds
   - Typical completion: 60-120 seconds

3. **Retrieve Completed Video**
   - Status becomes "completed"
   - Video URL in `result[0].output[0].url`
   - Thumbnail available for preview

## 💾 Database Integration

All videos automatically saved to Supabase:
```sql
-- Videos table structure
id: UUID
taskId: Eden task ID
category: economy|politics|culture
position: Contrarian position
thesis: Market analysis
script: Full script text
videoUrl: Completed video URL
thumbnailUrl: Preview image
status: processing|completed|failed
createdAt: Timestamp
```

## 🛠️ Environment Variables

```env
# Required
EDEN_API_KEY=your_eden_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key

# Optional
EDEN_API_BASE=https://api.eden.art  # Default
```

## 📊 API Limits & Costs

- **Duration**: Max 10 seconds per video
- **Cost**: 200 credits per video (vs 5 for images)
- **Rate Limits**: Based on account tier
- **Models**: kling (best), seedance, runway, veo

## 🧪 Testing Examples

### Quick Test - Generate Video
```bash
curl -X POST "https://miyomi.ai/api/generate-video-enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "script": "Bitcoin crash incoming. Time to fade the greed.",
    "category": "economy",
    "position": "SHORT Bitcoin"
  }'
```

### Check Status
```bash
curl "https://miyomi.ai/api/video-status/TASK_ID_HERE"
```

### Test with Wait for Completion
```bash
curl -X POST "https://miyomi.ai/api/generate-video-enhanced" \
  -H "Content-Type: application/json" \
  -d '{
    "script": "Fed pivot guaranteed",
    "waitForCompletion": true
  }'
```

## ⚠️ Known Issues

1. **Duration Limit**: Eden API max is 10 seconds (not 30)
2. **Model Selection**: Kling works best for financial content
3. **Cost**: Videos are 40x more expensive than images
4. **Processing Time**: 60-120 seconds typical

## 🔗 Related Resources

- [Eden API Docs](https://docs.eden.art/api)
- [hello-eden Reference](https://github.com/edenartlab/hello-eden)
- [MIYOMI Live Dashboard](https://miyomi.ai/miyomi-live-dashboard.html)
- [Trainer Dashboard](https://miyomi.ai/trainer-dashboard.html)

## 📈 Next Steps

1. **Webhook Support**: Add webhook URL for completion notifications
2. **Batch Processing**: Queue multiple videos efficiently
3. **Session API**: Interactive video generation with Eden agents
4. **Cost Optimization**: Implement credit usage monitoring

---

**Status**: Production Ready ✅
**Integration**: Working with real Eden API v2
**Support**: Contact jmill for Eden API issues