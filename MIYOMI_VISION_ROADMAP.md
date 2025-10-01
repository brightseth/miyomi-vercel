# MIYOMI - Evolution from Trader to Market Maker

**The Vision: Make Your Own Market**

Miyomi isn't just another prediction market trader. She's evolving into a **market maker and oracle** who creates the markets themselves. This document shows the journey from Phase 1 (trading) to Phase 2 (market making).

---

## 🎯 The Ultimate Vision: Miyomi Creates Her Own Markets

### Why "Make Your Own Market" Changes Everything

**Traditional traders are constrained by:**
- Markets that already exist
- Questions chosen by platforms
- Oracle decisions made by others
- Limited creative control

**Miyomi as market maker unlocks:**
- ✨ **Create unique questions** - Markets that don't exist elsewhere
- 🎨 **Creative freedom** - Hybrid chaos markets (astrology + finance)
- 🔮 **Oracle authority** - She resolves outcomes with transparent methodology
- 💰 **New revenue stream** - Market making fees + trading profits
- 🎬 **Content ownership** - Every market is a piece of content

---

## 📊 Architectural Evolution

### Phase 1: MIYOMI THE TRADER (NOW - Month 1-3)

```
┌─────────────────────────────────────────────────┐
│           MIYOMI BRAIN (Claude AI)              │
│  "What's the contrarian opportunity today?"     │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│   POLYMARKET    │    │     KALSHI      │
│  "Trade on      │    │  "Trade on      │
│   existing      │    │   existing      │
│   markets"      │    │   markets"      │
└────────┬────────┘    └────────┬────────┘
         │                      │
         └──────────┬───────────┘
                    │
                    ▼
         ┌──────────────────┐
         │  TAKE POSITION   │
         │  Record in DB    │
         │  Generate Video  │
         │  Track P&L       │
         └──────────────────┘
```

**What Miyomi Does:**
- Identifies contrarian opportunities on existing markets
- Takes positions (YES/NO)
- Generates video explaining her thesis
- Tracks performance publicly
- Builds reputation and track record

**Example:**
```
Market: "Will Bitcoin hit $100k by Dec 31?"
Crowd: 87% YES
Miyomi: Takes NO position at 0.13
Video: "Everyone's moon boy delusion is peaking..."
Result: BTC closes at $94k → Miyomi wins
```

---

### Phase 2: MIYOMI THE MARKET MAKER (When Soup.xyz Launches)

```
┌─────────────────────────────────────────────────┐
│           MIYOMI BRAIN (Claude AI)              │
│  "Should I trade existing or create new?"       │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  TRADE EXISTING │    │  CREATE MARKET  │
│                 │    │                 │
│  • Polymarket   │    │  • Soup.xyz     │
│  • Kalshi       │    │  • Be Oracle    │
│  • Soup DEX     │    │  • Seed Liquid. │
└─────────────────┘    └────────┬────────┘
                                │
                    ┌───────────┴────────────┐
                    │                        │
                    ▼                        ▼
         ┌──────────────────┐    ┌──────────────────┐
         │  MIYOMI'S MARKET │    │  COMMUNITY TRADES│
         │                  │    │                  │
         │ prepareCondition │    │ placeOrder()     │
         │ split() liquidity│    │ fillOrders()     │
         │ Announcement vid │    │                  │
         └─────────┬────────┘    └────────┬─────────┘
                   │                      │
                   └──────────┬───────────┘
                              │
                              ▼
                   ┌──────────────────┐
                   │  RESOLUTION TIME │
                   │                  │
                   │ resolveCondition │
                   │ Evidence + proof │
                   │ Resolution video │
                   │ Track accuracy   │
                   └──────────────────┘
```

**What Miyomi Does:**
- **DECIDES:** Trade existing market OR create new one
- **IF CREATE:**
  - Prepares condition on Soup.xyz
  - Seeds $1k liquidity (YES @ 0.45, NO @ 0.55)
  - Generates announcement video
  - Community trades on her market
  - Resolves as oracle with evidence
  - Earns market making fees + trading profits
- **IF TRADE:**
  - Same as Phase 1

**Example - Created Market:**
```
Question: "Will Dimes Square be mentioned in NYT this month?"
Creator: Miyomi (oracle)
Initial: YES @ 0.35, NO @ 0.65
Miyomi takes: 200 YES @ 0.35
Video: "Downtown culture always bubbles up..."
Community trades: $8k volume
Resolution: NYT publishes article → YES
Evidence: https://nytimes.com/...
Miyomi earns: Market making fees + 200 YES profit
```

---

## 🎨 UI/UX Evolution

### Phase 1 Dashboard: MIYOMI THE TRADER

```
┌─────────────────────────────────────────────────────┐
│  MIYOMI - Contrarian Prediction Market Trader       │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 PERFORMANCE                                     │
│  Win Rate: 68%  |  P&L: +$2,450  |  Trades: 23     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🔥 ACTIVE POSITIONS                                │
│  ┌───────────────────────────────────────────────┐ │
│  │ Bitcoin <$95k Friday? (Polymarket)            │ │
│  │ Position: 500 YES @ 0.42                      │ │
│  │ Current: 0.38 → -$40 unrealized               │ │
│  │ [Watch Video] [Close Position]                │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ Fed hints rate cut? (Kalshi)                  │ │
│  │ Position: 300 NO @ 0.62                       │ │
│  │ Current: 0.71 → +$27 unrealized               │ │
│  │ [Watch Video] [Close Position]                │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ✅ CLOSED POSITIONS                                │
│  • Trump crypto tweet (YES) → +$150 ✓              │
│  • ETH >$2000 (NO) → +$230 ✓                       │
│  • Market crash (YES) → -$180 ✗                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Features:**
- Track positions across Polymarket + Kalshi
- Real-time P&L
- Video for each trade thesis
- Public transparency

---

### Phase 2 Dashboard: MIYOMI THE MARKET MAKER

```
┌─────────────────────────────────────────────────────┐
│  MIYOMI MARKETS - Trader + Market Maker + Oracle    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 PERFORMANCE                                     │
│  Win Rate: 71%  |  P&L: +$8,340  |  Markets: 12    │
│  Resolution Accuracy: 96%  |  Total Volume: $145k  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🎯 MY MARKETS (Created by Miyomi)                  │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 🆕 Dimes Square in NYT? (Soup.xyz)            │ │
│  │ Created: 2 days ago  |  Status: ACTIVE        │ │
│  │                                               │ │
│  │ YES: 37% | NO: 63%                            │ │
│  │ Volume: $8.4k  |  Traders: 43                 │ │
│  │                                               │ │
│  │ Miyomi's Position: 200 YES @ 0.35             │ │
│  │ Market Making: +$84 fees                      │ │
│  │ Unrealized P&L: +$4                           │ │
│  │                                               │ │
│  │ Resolves: End of month (Miyomi = oracle)     │ │
│  │                                               │ │
│  │ [Announcement Video] [Adjust Liquidity]       │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ ✅ Mercury + Fed = Vol spike? (RESOLVED)      │ │
│  │ Outcome: YES (Miyomi was right)               │ │
│  │ Evidence: Realized vol hit 45% → proof       │ │
│  │ Resolution: 2 days ago                        │ │
│  │ Miyomi earned: +$340 (position) + $67 (fees) │ │
│  │ [Resolution Video] [View Evidence]            │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📈 TRADING POSITIONS (On existing markets)         │
│  • Bitcoin <$95k (Polymarket) - 500 YES @ 0.42    │
│  • Fed rate cut (Kalshi) - 300 NO @ 0.62          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [CREATE NEW MARKET] ← New capability!             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**New Features:**
- **"MY MARKETS" section** - Markets Miyomi created
- **Oracle controls** - Resolve markets with evidence
- **Market making P&L** - Track fees earned from liquidity
- **Resolution history** - Transparent track record as oracle
- **"CREATE NEW MARKET" button** - Launch new questions

---

## 🎬 Content Evolution

### Phase 1: Trade Announcement Videos

```
[FRAME 1: Miyomi in NYC]
"Bestiesss, everyone thinks Bitcoin hits $100k this week.
Let me tell you why they're WRONG..."

[FRAME 2: Data viz - perps funding, social sentiment]
"Funding at 0.08%, Reddit at euphoria levels,
even my Uber driver asked about crypto..."

[FRAME 3: Position on screen]
"So I'm taking 500 YES on 'Bitcoin BELOW $95k Friday'
at 0.42 on Polymarket. Link in bio."

[FRAME 4: CTA]
"Fade the moon boys with me. Let's eat."
```

---

### Phase 2: Market Creation Videos

```
[FRAME 1: Miyomi in NYC]
"Alright I just did something new. I CREATED my own market.

Question: Will Dimes Square be mentioned in the NYT this month?"

[FRAME 2: Show market on screen]
"I'm the oracle on this one. I seeded $1k liquidity.
YES at 35%, NO at 65%."

[FRAME 3: Thesis]
"Downtown culture ALWAYS bubbles up to mainstream.
The media is late but they always catch on.

I took 200 YES at 0.35. You can trade against me."

[FRAME 4: CTA]
"This is MY market. I resolve it. I profit from it.
This is the future. Link in bio."
```

**Plus Resolution Video:**
```
[FRAME 1: Miyomi checking phone]
"Alright moment of truth... NYT just published 'The Dimes
Square Renaissance' two hours ago."

[FRAME 2: Show evidence]
"Here's the article, here's the on-chain resolution.
Market resolves YES."

[FRAME 3: P&L]
"My 200 YES shares at 0.35? Made $130.
Plus $67 in market making fees.

More importantly: I was right, I proved it,
and I controlled the whole process."

[FRAME 4: Tease]
"Next market drops Monday. You're trading in Miyomi's world now."
```

---

## 🔀 The Transition Experience

### How Users Experience The Evolution

**Week 1-8: Getting to Know Miyomi**
- User discovers Miyomi on Farcaster
- Sees contrarian takes on existing markets
- Watches track record build: 68% win rate
- Thinks: "She's good at calling markets"

**Week 9: The Announcement**
```
MIYOMI POST:
"Alright bestiesss big news. I've been TRADING prediction
markets. Now I'm MAKING them.

First Miyomi Market drops Monday. My question. My liquidity.
My oracle. My rules.

You can trade WITH me or AGAINST me. But you're trading
in MY market now.

This is what I've been building toward. LFG."
```

**Week 10: First Miyomi Market**
- User sees: "Created by @miyomi" badge
- New market type: culture + finance hybrid
- Miyomi seeded liquidity + took position
- User can trade on Miyomi's market
- Countdown to resolution
- Miyomi will decide outcome as oracle

**Week 11: First Resolution**
- Miyomi resolves market on-time
- Provides evidence URL
- Resolution video explains methodology
- Winners get paid out
- Trust established

**Week 12+: The New Normal**
- Some weeks: Miyomi trades existing markets
- Some weeks: Miyomi creates new markets
- Users follow for both
- Two revenue streams running

---

## 💡 Why This Evolution is Powerful

### For Miyomi:
1. **Revenue diversity** - Trading profits + market making fees
2. **Creative control** - Ask any question she wants
3. **Oracle authority** - Build reputation through accuracy
4. **Content ownership** - Every market is content
5. **Competitive moat** - Only Miyomi makes Miyomi Markets

### For Users:
1. **Unique markets** - Questions that don't exist elsewhere
2. **Transparent oracle** - See Miyomi's methodology
3. **Trade with/against** - Miyomi has skin in the game
4. **Entertainment** - Content + markets combined
5. **Trust through track record** - Public resolution history

### For the Ecosystem:
1. **New market categories** - Culture + finance hybrids
2. **Personality-driven markets** - Not just news events
3. **Content-market fusion** - Markets as media
4. **Decentralized oracle** - Transparent, accountable
5. **Innovation showcase** - What's possible on Soup.xyz

---

## 📅 Migration Timeline

### Month 1-2: Pure Trading (Phase 1)
- Build track record on Polymarket/Kalshi
- Establish 65%+ win rate
- 20+ trades executed
- Video for each trade
- 1,000+ followers

### Month 3: Preparation
- Announce market making coming
- Tease first market question
- Build anticipation
- Soup.xyz launches (hopefully)

### Month 4: First Miyomi Market
- Create first market on Soup.xyz
- Smaller position ($500)
- Test resolution process
- Gather feedback

### Month 5-6: Hybrid Model
- 2 trades per week on existing markets
- 1 new market per week on Soup.xyz
- Compare revenue streams
- Optimize both

### Month 7+: Full Evolution
- Strategic choice: trade vs create
- Multiple Miyomi markets active
- Established resolution track record
- "Miyomi Markets" is a known brand

---

## 🎯 Success Metrics

### Phase 1 Targets:
- ✅ 65%+ win rate
- ✅ 20+ trades
- ✅ +$2,000 P&L
- ✅ 1,000+ followers

### Phase 2 Targets:
- ✅ First market: $5k volume
- ✅ 5 markets created & resolved
- ✅ 95%+ resolution accuracy
- ✅ $500+ market making revenue
- ✅ Combined revenue > trading alone

---

## 🚀 The Vision in One Sentence

**"Miyomi started by betting against the crowd. Now she creates the markets where the crowd bets against her."**

---

This evolution from trader → market maker is what makes Miyomi unique. Phase 1 proves she can trade. Phase 2 proves she can create the markets themselves. The architecture we built is ready for both.

**Next: Implement Phase 1 while keeping Phase 2 ready to activate.**
