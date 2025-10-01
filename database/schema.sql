-- MIYOMI Database Schema
-- Deploy this to Supabase via SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trades table: Track all Miyomi's trades
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('polymarket', 'kalshi', 'soup')),
  market_id TEXT NOT NULL,
  question TEXT,
  description TEXT,
  position TEXT NOT NULL CHECK (position IN ('YES', 'NO')),
  entry_price DECIMAL(10,6),
  entry_amount DECIMAL(10,2),
  entry_time TIMESTAMP WITH TIME ZONE,
  exit_price DECIMAL(10,6),
  exit_amount DECIMAL(10,2),
  exit_time TIMESTAMP WITH TIME ZONE,
  pnl DECIMAL(10,2),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'pending')),
  thesis TEXT,
  consensus_price DECIMAL(10,6),
  edge DECIMAL(10,6),
  video_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Videos table: Track all generated videos
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES trades(id),
  eden_creation_id TEXT,
  eden_task_id TEXT,
  prompt TEXT,
  script TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'generating', 'completed', 'failed')),
  farcaster_cast_hash TEXT,
  twitter_tweet_id TEXT,
  views INTEGER DEFAULT 0,
  engagement_score DECIMAL(10,2),
  category TEXT,
  style TEXT,
  eden_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance table: Daily performance tracking
CREATE TABLE IF NOT EXISTS performance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  trades_count INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2),
  daily_pnl DECIMAL(10,2),
  cumulative_pnl DECIMAL(10,2),
  followers_count INTEGER DEFAULT 0,
  video_views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Revenue table: Track all revenue sources for token distributions
CREATE TABLE IF NOT EXISTS revenue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  source TEXT NOT NULL CHECK (source IN (
    'trading',
    'advertising',
    'affiliates',
    'market_making',
    'subscriptions',
    'licensing',
    'nfts',
    'other'
  )),
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  description TEXT,
  platform TEXT,
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Opportunities table: Track found contrarian opportunities
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('polymarket', 'kalshi')),
  market_id TEXT NOT NULL,
  question TEXT,
  description TEXT,
  category TEXT,
  yes_price DECIMAL(10,6),
  no_price DECIMAL(10,6),
  consensus TEXT CHECK (consensus IN ('YES', 'NO')),
  contrarian TEXT CHECK (contrarian IN ('YES', 'NO')),
  edge DECIMAL(10,6),
  volume DECIMAL(15,2),
  liquidity DECIMAL(15,2),
  close_time TIMESTAMP WITH TIME ZONE,
  url TEXT,
  miyomi_thesis TEXT,
  recommended_size DECIMAL(10,2),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'traded', 'skipped')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social posts table: Track all social media posts
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL CHECK (platform IN ('farcaster', 'twitter', 'tiktok')),
  post_id TEXT,
  video_id UUID REFERENCES videos(id),
  trade_id UUID REFERENCES trades(id),
  content TEXT,
  media_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  reposts INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  affiliate_clicks INTEGER DEFAULT 0,
  affiliate_signups INTEGER DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_trades_platform ON trades(platform);
CREATE INDEX IF NOT EXISTS idx_trades_status ON trades(status);
CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_status ON videos(status);
CREATE INDEX IF NOT EXISTS idx_videos_trade_id ON videos(trade_id);
CREATE INDEX IF NOT EXISTS idx_performance_date ON performance(date DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_date ON revenue(date DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_source ON revenue(source);
CREATE INDEX IF NOT EXISTS idx_opportunities_platform ON opportunities(platform);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_platform ON social_posts(platform);

-- Enable Row Level Security (RLS)
ALTER TABLE trades ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for now, can restrict later)
CREATE POLICY "Allow all access to trades" ON trades FOR ALL USING (true);
CREATE POLICY "Allow all access to videos" ON videos FOR ALL USING (true);
CREATE POLICY "Allow all access to performance" ON performance FOR ALL USING (true);
CREATE POLICY "Allow all access to revenue" ON revenue FOR ALL USING (true);
CREATE POLICY "Allow all access to opportunities" ON opportunities FOR ALL USING (true);
CREATE POLICY "Allow all access to social_posts" ON social_posts FOR ALL USING (true);
