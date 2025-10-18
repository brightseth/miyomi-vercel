# MIYOMI Database Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login and create a new project
3. Choose a region close to your users
4. Wait for database to be ready (2-3 minutes)

## 2. Run Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `/database/schema.sql`
3. Click **RUN** to create all tables, indexes, and policies

## 3. Get Database Credentials

From your Supabase project settings:

```bash
# Project Settings > API
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJ... (your anon/public key)
```

## 4. Add to Vercel Environment

```bash
npx vercel env add SUPABASE_URL production
npx vercel env add SUPABASE_ANON_KEY production
```

Or add in Vercel dashboard under **Settings > Environment Variables**.

## 5. Database Tables Created

### `videos` - Generated video storage
- `id` - UUID primary key
- `eden_task_id` - Eden API task ID
- `category` - economy/politics/culture
- `position` - Market position description
- `script` - Generated video script
- `video_url` - Final video URL from Eden
- `status` - processing/completed/failed

### `markets` - Prediction market data
- `platform` - polymarket/kalshi
- `title` - Market description
- `current_price` - Latest odds
- `volume` - Trading volume

### `video_metrics` - Performance tracking
- `video_id` - Links to videos table
- `platform` - tiktok/youtube/twitter
- `views`, `likes`, `shares`, `revenue`

### Other Tables
- `positions` - MIYOMI's actual trades
- `daily_metrics` - Aggregated daily stats

## 6. API Endpoints Available

- `GET /api/database-health` - Check database connection
- `GET /api/video-history` - Get video history
- `GET /api/video-history?category=economy` - Filter by category
- `POST /api/generate-video` - Create video (saves to DB)

## 7. Test Database Connection

After setup, visit:
```
https://your-vercel-app.vercel.app/api/database-health
```

Should return:
```json
{
  "healthy": true,
  "message": "Database connection successful",
  "tables": ["videos", "markets", "positions", "video_metrics", "daily_metrics"]
}
```

## 8. Sample Data Included

The schema includes sample markets from Polymarket and Kalshi to test with.

## 9. Security Notes

- Row Level Security (RLS) enabled on all tables
- Public policies allow all operations (restrict for production)
- Environment variables keep database credentials secure
- Supabase provides automatic API generation

## 10. Troubleshooting

**"Database not configured" error:**
- Check SUPABASE_URL and SUPABASE_ANON_KEY are set
- Verify environment variables in Vercel dashboard

**"Connection failed" error:**
- Check database is active in Supabase dashboard
- Verify credentials are correct
- Check network connectivity

**Import/export failed:**
- Make sure you're using the anon (public) key, not service key
- Check RLS policies allow your operations