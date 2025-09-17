-- 📋 COPY ALL OF THIS INTO SUPABASE SQL EDITOR
-- ===================================================

-- Videos table - stores all generated videos
CREATE TABLE videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  eden_task_id TEXT UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('economy', 'politics', 'culture')),
  position TEXT NOT NULL,
  thesis TEXT NOT NULL,
  script TEXT NOT NULL,
  style TEXT DEFAULT 'contrarian_oracle',
  video_url TEXT,
  thumbnail_url TEXT,
  eden_response JSONB,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Markets table - stores prediction market positions
CREATE TABLE markets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL CHECK (platform IN ('polymarket', 'kalshi')),
  market_id TEXT NOT NULL,
  title TEXT NOT NULL,
  current_price DECIMAL(5,2),
  volume BIGINT,
  url TEXT,
  category TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(platform, market_id)
);

-- User positions table - tracks MIYOMI's actual positions
CREATE TABLE positions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  market_id UUID REFERENCES markets(id),
  side TEXT NOT NULL CHECK (side IN ('long', 'short')),
  entry_price DECIMAL(10,2),
  size DECIMAL(10,2),
  current_pnl DECIMAL(10,2),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
  opened_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closed_at TIMESTAMP WITH TIME ZONE
);

-- Video performance metrics
CREATE TABLE video_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  video_id UUID REFERENCES videos(id),
  platform TEXT NOT NULL,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  revenue DECIMAL(10,2) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(video_id, platform)
);

-- Daily aggregated metrics
CREATE TABLE daily_metrics (
  date DATE PRIMARY KEY,
  videos_generated INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0,
  new_followers INTEGER DEFAULT 0,
  win_rate DECIMAL(5,2),
  total_pnl DECIMAL(10,2)
);

-- Enable Row Level Security
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations)
CREATE POLICY "Allow all operations on videos" ON videos FOR ALL TO anon, authenticated USING (true);
CREATE POLICY "Allow all operations on markets" ON markets FOR ALL TO anon, authenticated USING (true);
CREATE POLICY "Allow all operations on positions" ON positions FOR ALL TO anon, authenticated USING (true);
CREATE POLICY "Allow all operations on video_metrics" ON video_metrics FOR ALL TO anon, authenticated USING (true);
CREATE POLICY "Allow all operations on daily_metrics" ON daily_metrics FOR ALL TO anon, authenticated USING (true);

-- Create indexes for performance
CREATE INDEX idx_videos_category ON videos(category);
CREATE INDEX idx_videos_status ON videos(status);
CREATE INDEX idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX idx_markets_platform ON markets(platform);
CREATE INDEX idx_markets_category ON markets(category);
CREATE INDEX idx_positions_status ON positions(status);
CREATE INDEX idx_video_metrics_platform ON video_metrics(platform);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_videos_updated_at BEFORE UPDATE ON videos 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_markets_updated_at BEFORE UPDATE ON markets 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO markets (platform, market_id, title, current_price, volume, category) VALUES
('polymarket', 'trump-2024', 'Trump wins 2024 Republican nomination', 45.00, 12847000, 'politics'),
('kalshi', 'fed-cuts-q1', 'Fed cuts rates in Q1 2025', 78.00, 2847000, 'economy'),
('polymarket', 'btc-100k', 'Bitcoin above $100K by March', 34.00, 5422000, 'economy'),
('kalshi', 'cpi-above-35', 'CPI above 3.5% next print', 61.00, 1892000, 'economy'),
('polymarket', 'taylor-swift-retirement', 'Taylor Swift announces retirement', 8.00, 842000, 'culture');

-- Create analytics view
CREATE VIEW video_analytics AS
SELECT 
  v.id,
  v.category,
  v.position,
  v.created_at,
  COALESCE(SUM(vm.views), 0) as total_views,
  COALESCE(SUM(vm.likes), 0) as total_likes,
  COALESCE(SUM(vm.revenue), 0) as total_revenue,
  COUNT(vm.platform) as platforms_published
FROM videos v
LEFT JOIN video_metrics vm ON v.id = vm.video_id
WHERE v.status = 'completed'
GROUP BY v.id, v.category, v.position, v.created_at
ORDER BY v.created_at DESC;