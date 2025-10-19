# Miyomi Markets - Deployment & Testing Guide

Complete guide for deploying and testing the Miyomi Market Maker system on Soup.xyz.

---

## Prerequisites

### Required Accounts & Keys

1. **Vercel Account** - For hosting
2. **Supabase Account** - For database
3. **Base RPC** - For blockchain access (Alchemy, Infura, or public RPC)
4. **Wallet** - For Miyomi oracle address (Base mainnet or Sepolia testnet)
5. **Eden API Key** - For video generation (optional for MVP)

### Environment Variables

Create `.env.local` in the project root:

```bash
# Database
SUPABASE_URL=https://xxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # For admin operations

# Blockchain
MIYOMI_ORACLE_PRIVATE_KEY=0x... # Wallet private key for oracle
MIYOMI_ORACLE_ADDRESS=0x... # Wallet public address
BASE_RPC_URL=https://mainnet.base.org # or https://sepolia.base.org for testnet

# API Security
TRAINER_API_KEY=your_secure_random_string_here # For market creation
ORACLE_API_KEY=your_secure_random_string_here # For market resolution

# Eden (optional)
EDEN_API_KEY=[REDACTED]

# Social (optional for MVP)
NEYNAR_API_KEY=... # Farcaster posting
TWITTER_API_KEY=... # Twitter posting
```

---

## Step 1: Database Setup

### 1.1 Create Supabase Project

1. Go to https://supabase.com
2. Create new project
3. Copy URL and keys

### 1.2 Run Database Migrations

Execute these SQL commands in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Miyomi Markets table
CREATE TABLE miyomi_markets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condition_id TEXT UNIQUE NOT NULL,
  question TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('contrarian', 'culture', 'crypto', 'politics', 'hybrid')),
  resolution_criteria JSONB NOT NULL,
  resolution_date TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'resolved', 'invalid')),
  outcome TEXT CHECK (outcome IN ('YES', 'NO', 'INVALID')),
  resolved_at TIMESTAMP,

  initial_liquidity DECIMAL(10,2),
  total_volume DECIMAL(10,2) DEFAULT 0,
  miyomi_position JSONB,
  miyomi_pnl DECIMAL(10,2),

  announcement_video_url TEXT,
  resolution_video_url TEXT,
  social_post_ids JSONB
);

-- Market liquidity tracking
CREATE TABLE market_liquidity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id UUID REFERENCES miyomi_markets(id) ON DELETE CASCADE,
  timestamp TIMESTAMP DEFAULT NOW(),
  yes_best_bid DECIMAL(10,6),
  yes_best_ask DECIMAL(10,6),
  no_best_bid DECIMAL(10,6),
  no_best_ask DECIMAL(10,6),
  total_yes_liquidity DECIMAL(10,2),
  total_no_liquidity DECIMAL(10,2)
);

-- Resolution history
CREATE TABLE market_resolutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  market_id UUID REFERENCES miyomi_markets(id) ON DELETE CASCADE,
  resolved_at TIMESTAMP DEFAULT NOW(),
  outcome TEXT NOT NULL,
  evidence_url TEXT,
  methodology TEXT,
  community_disputes INTEGER DEFAULT 0,
  resolution_tx_hash TEXT
);

-- Market metrics
CREATE TABLE market_metrics (
  market_id UUID REFERENCES miyomi_markets(id) ON DELETE CASCADE,
  date DATE,
  volume_24h DECIMAL(10,2),
  unique_traders INTEGER,
  miyomi_return_percent DECIMAL(5,2),
  video_views INTEGER,
  PRIMARY KEY (market_id, date)
);

-- Indexes for performance
CREATE INDEX idx_markets_status ON miyomi_markets(status);
CREATE INDEX idx_markets_category ON miyomi_markets(category);
CREATE INDEX idx_markets_resolution_date ON miyomi_markets(resolution_date);
CREATE INDEX idx_liquidity_market_id ON market_liquidity(market_id);
CREATE INDEX idx_resolutions_market_id ON market_resolutions(market_id);
CREATE INDEX idx_metrics_market_id ON market_metrics(market_id);

-- Test data (optional)
INSERT INTO miyomi_markets (
  condition_id,
  question,
  description,
  category,
  resolution_criteria,
  resolution_date,
  initial_liquidity,
  miyomi_position
) VALUES (
  '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  'Will Bitcoin close below $95k this Friday?',
  'Everyone thinks $100k is inevitable. I''m seeing exhaustion in perps funding. Betting NO on the moon boys.',
  'contrarian',
  '{"method": "objective", "dataSource": "Coinbase BTC-USD", "calculation": "Friday 4pm EST close < $95,000"}',
  NOW() + INTERVAL '5 days',
  1000,
  '{"yes": 500, "no": 500, "entry_price_yes": 0.45, "entry_price_no": 0.55}'
);
```

### 1.3 Set Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE miyomi_markets ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_liquidity ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_resolutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_metrics ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON miyomi_markets FOR SELECT USING (true);
CREATE POLICY "Public read access" ON market_resolutions FOR SELECT USING (true);
CREATE POLICY "Public read access" ON market_metrics FOR SELECT USING (true);

-- Liquidity data can be public or restricted
CREATE POLICY "Public read access" ON market_liquidity FOR SELECT USING (true);
```

---

## Step 2: Soup.xyz Setup

### 2.1 Get Contract Addresses

**Base Mainnet:**
- SCTF: `[To be provided by Soup.xyz]`
- DEX: `[To be provided by Soup.xyz]`
- USDC: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Base Sepolia Testnet:**
- SCTF: `[To be provided by Soup.xyz]`
- DEX: `[To be provided by Soup.xyz]`
- USDC: `[To be provided by Soup.xyz]`

Update these in `/lib/soup-client.js`:

```javascript
const SOUP_CONTRACTS = {
  SCTF: '0x...', // Update with actual address
  DEX: '0x...',  // Update with actual address
  USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913'
}
```

### 2.2 Fund Oracle Wallet

Your Miyomi oracle wallet needs:
- **ETH for gas** - ~0.01 ETH should be enough for 100+ transactions
- **USDC for liquidity** - Start with $5,000-10,000 USDC to seed markets

**Get testnet funds:**
```bash
# Base Sepolia ETH faucet
https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

# USDC (bridge from Sepolia or use Soup faucet if available)
```

### 2.3 Approve USDC Spending

First market creation will require USDC approval. This happens automatically in the `split()` function, but you can pre-approve:

```javascript
// Via Etherscan or your wallet
// Approve Soup SCTF contract to spend your USDC
// Spender: [SCTF address]
// Amount: 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff (max)
```

---

## Step 3: Install Dependencies

```bash
cd /Users/seth/miyomi-vercel

# Install packages
npm install viem @supabase/supabase-js

# Note: @soup/protocol and @soup/indexer aren't published yet
# We're using custom implementation in lib/soup-client.js
```

---

## Step 4: Local Testing

### 4.1 Start Development Server

```bash
# Development mode
npm run dev

# Or use Vercel dev (recommended)
npx vercel dev
```

### 4.2 Test Database Connection

```bash
# Create test file
cat > test-db.js << 'EOF'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase
    .from('miyomi_markets')
    .select('*')
    .limit(1)

  console.log('Database test:', data ? 'SUCCESS' : 'FAILED')
  console.log('Data:', data)
  console.log('Error:', error)
}

test()
EOF

# Run test
node test-db.js
```

### 4.3 Test Market Creation (Testnet)

```bash
# Create test script
cat > test-create-market.js << 'EOF'
import { MiyomiMarketManager } from './lib/soup-client.js'

const manager = new MiyomiMarketManager({
  protocol: {
    network: 'testnet',
    privateKey: process.env.MIYOMI_ORACLE_PRIVATE_KEY
  },
  oracleAddress: process.env.MIYOMI_ORACLE_ADDRESS
})

async function test() {
  console.log('Creating test market...')

  const market = await manager.createMarket({
    question: 'Will this test market work?',
    description: 'Testing Miyomi market creation on Soup.xyz testnet',
    category: 'contrarian',
    resolutionDate: new Date(Date.now() + 86400000).toISOString(), // 1 day
    resolutionCriteria: {
      method: 'subjective',
      evidence: 'Oracle decides'
    },
    initialLiquidity: 100 // 100 USDC
  })

  console.log('Market created!', market)
}

test().catch(console.error)
EOF

# Run test
node test-create-market.js
```

---

## Step 5: Deploy to Vercel

### 5.1 Connect to Vercel

```bash
# Login to Vercel
npx vercel login

# Link project
npx vercel link

# Set environment variables
npx vercel env add SUPABASE_URL
npx vercel env add SUPABASE_ANON_KEY
npx vercel env add MIYOMI_ORACLE_PRIVATE_KEY
npx vercel env add MIYOMI_ORACLE_ADDRESS
npx vercel env add TRAINER_API_KEY
npx vercel env add ORACLE_API_KEY
# ... add all other env vars
```

### 5.2 Deploy

```bash
# Deploy to production
npx vercel --prod

# Or push to GitHub and enable auto-deploy
git add .
git commit -m "Miyomi Markets initial deployment"
git push origin main
```

### 5.3 Verify Deployment

```bash
# Check deployment URL
npx vercel inspect

# Test API endpoint
curl https://your-deployment.vercel.app/api/miyomi/markets

# Test dashboard
open https://your-deployment.vercel.app/miyomi-markets.html
```

---

## Step 6: Create First Market

### 6.1 Via API (curl)

```bash
curl -X POST https://your-deployment.vercel.app/api/miyomi/create-market \
  -H "Authorization: Bearer YOUR_TRAINER_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Will Bitcoin close below $95k this Friday?",
    "description": "Everyone thinks $100k is inevitable. I am seeing exhaustion in perps funding. Betting NO on the moon boys.",
    "category": "contrarian",
    "resolutionDate": "2025-10-03T20:00:00Z",
    "resolutionCriteria": {
      "method": "objective",
      "dataSource": "Coinbase BTC-USD close price",
      "calculation": "Friday 4pm EST close < $95,000"
    },
    "initialLiquidity": 1000
  }'
```

### 6.2 Via Trainer Dashboard (Coming Soon)

```
https://your-deployment.vercel.app/miyomi-markets-create.html
```

---

## Step 7: Monitor & Resolve

### 7.1 Monitor Market

```bash
# Check market status
curl https://your-deployment.vercel.app/api/miyomi/markets

# Check specific market
curl https://your-deployment.vercel.app/api/miyomi/markets/0xConditionId
```

### 7.2 Resolve Market

```bash
curl -X POST https://your-deployment.vercel.app/api/miyomi/resolve-market \
  -H "Authorization: Bearer YOUR_ORACLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "marketId": "uuid-from-database",
    "outcome": "YES",
    "evidence": "https://coinbase.com/btc-usd/2025-10-03",
    "methodology": "Bitcoin closed at $93,450 on Friday 4pm EST per Coinbase spot price"
  }'
```

---

## Troubleshooting

### Issue: "Failed to prepare condition"

**Causes:**
- Insufficient ETH for gas
- USDC not approved
- Invalid oracle address

**Solution:**
```bash
# Check ETH balance
cast balance $MIYOMI_ORACLE_ADDRESS --rpc-url $BASE_RPC_URL

# Check USDC balance
cast call 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 \
  "balanceOf(address)(uint256)" $MIYOMI_ORACLE_ADDRESS \
  --rpc-url $BASE_RPC_URL

# Check USDC approval
cast call 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913 \
  "allowance(address,address)(uint256)" \
  $MIYOMI_ORACLE_ADDRESS \
  [SCTF_ADDRESS] \
  --rpc-url $BASE_RPC_URL
```

### Issue: "Database connection failed"

**Solution:**
```bash
# Verify environment variables
echo $SUPABASE_URL
echo $SUPABASE_ANON_KEY

# Test connection
curl $SUPABASE_URL/rest/v1/miyomi_markets \
  -H "apikey: $SUPABASE_ANON_KEY"
```

### Issue: "Video generation failed"

**Solution:**
- Video generation is optional for MVP
- Market creation will succeed even if video fails
- Check Eden API key if needed
- Videos are generated async and won't block market creation

---

## Testing Checklist

### Pre-Launch (Testnet)

- [ ] Database tables created
- [ ] Environment variables set
- [ ] Oracle wallet funded (testnet ETH + USDC)
- [ ] USDC approved for SCTF contract
- [ ] Test market created successfully
- [ ] Order book shows initial liquidity
- [ ] Test market resolved successfully
- [ ] Dashboard displays market correctly

### Launch (Mainnet)

- [ ] All testnet tests passed
- [ ] Mainnet wallet funded (0.1 ETH + $10k USDC)
- [ ] Production environment variables set
- [ ] First market created
- [ ] Dashboard live and functional
- [ ] Social media accounts ready
- [ ] Monitoring/alerts configured

### Weekly Operations

- [ ] Create new market (Monday 9am)
- [ ] Monitor order flow
- [ ] Rebalance liquidity if needed
- [ ] Resolve previous week's markets
- [ ] Generate and post videos
- [ ] Update performance metrics
- [ ] Review community feedback

---

## Production Monitoring

### Key Metrics to Track

1. **Market Creation Success Rate** - Should be 100%
2. **Liquidity Depth** - Maintain 10% spread
3. **Trading Volume** - Target $25k+ per market
4. **Resolution Accuracy** - Target 95%+
5. **Video Generation** - Track success/failure rate
6. **Gas Costs** - Monitor and optimize

### Alerts

Set up alerts for:
- Failed market creation
- Failed resolution
- Low wallet balance (< 0.01 ETH)
- Low USDC balance (< $1k)
- Database errors
- API errors

### Logging

All API endpoints log to console:
```javascript
console.log('[Create Market] Starting...', { question, category })
console.log('[Create Market] Market created:', conditionId)
console.error('[Create Market] Error:', error)
```

View logs:
```bash
# Vercel logs
npx vercel logs

# Or in Vercel dashboard
https://vercel.com/your-project/logs
```

---

## Next Steps

Once deployed and tested:

1. **Create Weekly Markets** - Establish consistent Monday launch cadence
2. **Build Community** - Promote on Farcaster, Twitter, Discord
3. **Track Performance** - Monitor win rate, volume, accuracy
4. **Add Features** - WebSocket updates, advanced order types, arbitrage alerts
5. **Scale Content** - Increase to 3 markets per week, add more categories
6. **Partnerships** - Collaborate with other prediction market traders

---

## Support & Resources

- **Soup.xyz Docs:** https://docs.soup.xyz
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Base Docs:** https://docs.base.org

For issues or questions:
- Check `/MIYOMI_MARKET_MAKER.md` for architecture details
- Check `/MIYOMI_MARKETS_README.md` for product overview
- Review `/lib/soup-client.js` for integration code
- Contact Soup.xyz team for protocol support

---

**Ready to launch! 🚀**

Start with testnet, validate the flow end-to-end, then go live on mainnet with your first contrarian market.

*"The crowd is always wrong at extremes."* - Miyomi
