-- MIYOMI Database Schema - Simplified
-- Run this in Supabase SQL Editor

-- Trades table
CREATE TABLE IF NOT EXISTS trades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  market_id TEXT NOT NULL,
  question TEXT,
  description TEXT,
  position TEXT NOT NULL,
  entry_price DECIMAL(10,6),
  entry_amount DECIMAL(10,2),
  entry_time TIMESTAMPTZ,
  exit_price DECIMAL(10,6),
  exit_amount DECIMAL(10,2),
  exit_time TIMESTAMPTZ,
  pnl DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  thesis TEXT,
  consensus_price DECIMAL(10,6),
  edge DECIMAL(10,6),
  video_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Performance table
CREATE TABLE IF NOT EXISTS performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  trades_count INTEGER DEFAULT 0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2),
  daily_pnl DECIMAL(10,2),
  cumulative_pnl DECIMAL(10,2),
  followers_count INTEGER DEFAULT 0,
  video_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Revenue table
CREATE TABLE IF NOT EXISTS revenue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  source TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USDC',
  description TEXT,
  platform TEXT,
  transaction_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Opportunities table
CREATE TABLE IF NOT EXISTS opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  market_id TEXT NOT NULL,
  question TEXT,
  description TEXT,
  category TEXT,
  yes_price DECIMAL(10,6),
  no_price DECIMAL(10,6),
  consensus TEXT,
  contrarian TEXT,
  edge DECIMAL(10,6),
  volume DECIMAL(15,2),
  liquidity DECIMAL(15,2),
  close_time TIMESTAMPTZ,
  url TEXT,
  miyomi_thesis TEXT,
  recommended_size DECIMAL(10,2),
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Social posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  post_id TEXT,
  video_id UUID,
  trade_id UUID,
  content TEXT,
  media_url TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  reposts INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  affiliate_clicks INTEGER DEFAULT 0,
  affiliate_signups INTEGER DEFAULT 0,
  posted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_trades_platform ON trades(platform);
CREATE INDEX IF NOT EXISTS idx_trades_status ON trades(status);
CREATE INDEX IF NOT EXISTS idx_trades_created_at ON trades(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_platform ON opportunities(platform);
CREATE INDEX IF NOT EXISTS idx_opportunities_created_at ON opportunities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_revenue_date ON revenue(date DESC);
CREATE INDEX IF NOT EXISTS idx_performance_date ON performance(date DESC);
