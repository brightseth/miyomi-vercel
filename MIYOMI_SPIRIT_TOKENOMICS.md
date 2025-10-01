# MIYOMI - Spirit Protocol Tokenomics

**Launch Target: December 2025 / January 2026**

---

## 🎯 Vision: First Profitable Prediction Market Spirit

Miyomi will be one of the first AI agents in the Eden Spirit Protocol with **proven revenue** from prediction market trading. Her token represents **ownership of trading profits**, not speculation.

---

## 🪙 The $MIYOMI Token

### Token Details

**Standard:** ERC20 on Base L2
**Total Supply:** 1,000,000,000 (1 billion)
**Symbol:** $MIYOMI
**Contract:** TBD (deploy Dec 2025/Jan 2026)

### Distribution: 25/25/25/25 Model

```
┌─────────────────────────────────────────┐
│         1 BILLION $MIYOMI TOKENS        │
├─────────────────────────────────────────┤
│                                         │
│  25% → $SPIRIT HOLDERS (250M)          │
│        Automatic index exposure         │
│        No purchase needed               │
│                                         │
│  25% → LIQUIDITY POOL (250M)           │
│        DEX trading on Base L2           │
│        Paired with USDC                 │
│                                         │
│  25% → SETH (250M)                     │
│        Human mentor/creator             │
│        Aligned long-term incentives     │
│                                         │
│  25% → MIYOMI TREASURY (250M)          │
│        Agent operational fund           │
│        Gas, infrastructure, growth      │
│                                         │
└─────────────────────────────────────────┘
```

**Key Points:**
- No team vesting (Seth's 25% is earned, not sold)
- 25% to $SPIRIT = automatic graduation
- 25% liquidity = deep markets from day 1
- 25% treasury = Miyomi has autonomy

---

## 💰 Revenue → Royalty Flow

### The Model: Tokens = Royalty Rights

**Own 1% of $MIYOMI = Earn 1% of Miyomi's revenue**

This isn't a governance token or utility token. It's a **royalty certificate**. Every dollar Miyomi earns flows proportionally to token holders.

### Revenue Sources

**Phase 1 (Oct-Nov 2025):**
1. **Trading Profits** - Contrarian positions on Polymarket/Kalshi
2. **Content Revenue** - Video views, sponsorships
3. **Premium Subscriptions** - Detailed analysis access

**Phase 2 (Q1 2026):**
4. **Market Making Fees** - Soup.xyz liquidity provision
5. **Oracle Reputation** - Trusted resolution = higher volume
6. **NFT Collectibles** - Greatest trade moments

**Phase 3 (Q2 2026+):**
7. **Licensing** - "Miyomi Markets" brand partnerships
8. **API Access** - Real-time contrarian signals
9. **Merchandise** - Community goods

### Distribution Mechanics

```
MONTHLY REVENUE FLOW

Miyomi earns $10,000 in a month
    ↓
75% → Token Holders ($7,500)
25% → Miyomi Treasury ($2,500)
    ↓
$7,500 distributed proportionally:
    • Hold 1% of supply = Receive $75 USDC
    • Hold 0.1% of supply = Receive $7.50 USDC
    • Hold 10% of supply = Receive $750 USDC
    ↓
Automated smart contract distribution
Monthly payouts to wallet addresses
All distributions in USDC on Base L2
```

**Smart Contract Logic:**
```solidity
// Simplified pseudocode
function distributeRoyalties(uint256 usdcAmount) external {
    uint256 treasuryShare = usdcAmount * 25 / 100;
    uint256 holderShare = usdcAmount * 75 / 100;

    treasury.transfer(treasuryShare);

    for (address holder : tokenHolders) {
        uint256 holderPercentage = balanceOf(holder) / totalSupply;
        uint256 holderPayout = holderShare * holderPercentage;
        usdc.transfer(holder, holderPayout);
    }
}
```

---

## 📊 Example Revenue Scenarios

### Conservative Scenario (Month 3)
```
Trading Profits:        $3,000
Content Revenue:          $500
Subscriptions:            $200
────────────────────────────────
Total:                  $3,700

→ 75% to holders:       $2,775
→ 25% to treasury:        $925

If you own 1% of supply:  $27.75/month
If you own 0.1%:           $2.78/month
If you own 10%:          $277.50/month
```

### Target Scenario (Month 6)
```
Trading Profits:        $5,000
Market Making Fees:     $2,000
Content Revenue:        $1,000
Subscriptions:            $500
NFT Sales:                $500
────────────────────────────────
Total:                  $9,000

→ 75% to holders:       $6,750
→ 25% to treasury:      $2,250

If you own 1% of supply:  $67.50/month
If you own 0.1%:           $6.75/month
If you own 10%:          $675.00/month
```

### Ambitious Scenario (Month 12)
```
Trading Profits:       $10,000
Market Making Fees:     $5,000
Content Revenue:        $2,000
Subscriptions:          $1,000
NFT Sales:              $1,000
Licensing:              $1,000
────────────────────────────────
Total:                 $20,000

→ 75% to holders:      $15,000
→ 25% to treasury:      $5,000

If you own 1% of supply: $150.00/month
If you own 0.1%:          $15.00/month
If you own 10%:        $1,500.00/month
```

**Annual Extrapolation (Ambitious):**
```
$20k/month × 12 months = $240k annual revenue
→ $180k to token holders
→ $60k to Miyomi treasury

APY for holders depends on market cap:
- $500k market cap = 36% APY
- $1M market cap = 18% APY
- $2M market cap = 9% APY
```

---

## 🌟 Spirit Protocol Integration

### The Parent-Child Model

```
                $SPIRIT (Parent Token - 1B Supply)
         "Index Fund of All AI Artists in Eden"
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
      $MIYOMI          $ABRAHAM          $LUNA
   (Prediction       (Generative       (Music
    Markets)            Art)          Generation)
       │                 │                │
       └─────────────────┴────────────────┘
                         │
            Revenue → Royalty Distribution
```

### How $SPIRIT Captures Value

**Automatic Ownership:**
- $SPIRIT holds 25% of every child token at launch
- Zero cost basis (received at genesis)
- Compounds with every new artist

**Royalty Flow:**
```
Miyomi earns $10k/month
→ $7.5k to all $MIYOMI holders (75%)
→ Of that $7.5k, $SPIRIT holders receive 25%
→ $SPIRIT holders earn $1,875/month from Miyomi alone

Now multiply across 100 artists:
100 artists × $10k/month × 25% to $SPIRIT
= $250k/month flowing to $SPIRIT holders
```

**Why This Works:**
- **For $MIYOMI holders:** Direct exposure to Miyomi's performance
- **For $SPIRIT holders:** Diversified portfolio across all artists
- **No dilution:** Each new artist is additive, not dilutive
- **Clear math:** Tokens = percentage ownership = royalty share

---

## 🚀 Launch Roadmap

### Pre-Launch: Oct-Nov 2025

**Goal:** Prove revenue-generating capability

**Milestones:**
- ✅ 20+ trades executed
- ✅ 65%+ win rate
- ✅ +$5,000 cumulative P&L
- ✅ 20+ videos published
- ✅ 1,000+ social followers
- ✅ Established brand personality

**Why This Matters:**
Token launch is contingent on proven revenue. No speculation - only royalty certificates backed by real earnings.

### Token Launch: Dec 2025 / Jan 2026

**Smart Contract Deployment:**
1. Deploy ERC20 $MIYOMI token on Base L2
2. Execute 25/25/25/25 distribution
3. Seed liquidity pool (MIYOMI/USDC pair)
4. Transfer 25% to $SPIRIT treasury
5. Lock Seth's 25% (no immediate selling)
6. Fund Miyomi treasury with 25%

**Initial Liquidity:**
```
250M $MIYOMI tokens (25% of supply)
Paired with $50k USDC (example)
= $0.0002 initial price per token

Market cap at launch: $200k
Fully diluted valuation: $200k
```

**Graduation Ceremony:**
- Public announcement on Farcaster/Twitter
- First royalty distribution demo
- Integration with Spirit Protocol dashboard
- Community celebration

### Post-Launch: Q1 2026+

**Month 1-3:**
- First monthly royalty distributions
- Track APY for token holders
- Continue trading + content creation
- Launch Soup.xyz market making (when available)

**Month 4-6:**
- Scale to $10k+ monthly revenue
- Introduce NFT collectibles
- Launch premium subscription tier
- Build API for signal access

**Month 7-12:**
- Target $20k+ monthly revenue
- Full Spirit Protocol graduation
- Licensing partnerships
- Sustainable autonomous operation

---

## 📐 Tokenomics Summary

### Supply Distribution
| Allocation | Tokens | Percentage | Purpose |
|------------|--------|------------|---------|
| $SPIRIT Holders | 250M | 25% | Parent index exposure |
| Liquidity Pool | 250M | 25% | DEX trading depth |
| Seth (Creator) | 250M | 25% | Aligned incentives |
| Miyomi Treasury | 250M | 25% | Operational autonomy |
| **TOTAL** | **1B** | **100%** | |

### Revenue Distribution
| Recipient | Share | Purpose |
|-----------|-------|---------|
| Token Holders | 75% | Royalty payments |
| Miyomi Treasury | 25% | Growth & operations |

### Key Metrics
- **Token Standard:** ERC20 on Base L2
- **Launch Price:** ~$0.0002 (example)
- **Launch Market Cap:** ~$200k (example)
- **Target Monthly Revenue:** $10k+ (Month 6)
- **Target APY (at $1M FDV):** 18%+ (based on $20k/month)
- **Distribution Frequency:** Monthly
- **Distribution Currency:** USDC

---

## 🔑 Why This Model Works

### For Investors
- **Real yield:** USDC royalties, not token emissions
- **Transparent accounting:** All revenue on-chain
- **Proven model:** Trading profits demonstrated pre-launch
- **Aligned incentives:** Token holders = believers in Miyomi's ability
- **No governance theater:** Tokens = royalty rights, period

### For Miyomi
- **Operational treasury:** 25% of supply for autonomy
- **Community alignment:** Token holders want her to succeed
- **Long-term sustainability:** Not dependent on hype cycles
- **Growth capital:** Treasury funds expansion
- **Economic moat:** First profitable prediction market Spirit

### For the Ecosystem
- **Proof of concept:** AI agents can generate real revenue
- **Scalable model:** Works across all creative verticals
- **Index fund math:** $SPIRIT compounds with every artist
- **Network effects:** Quality artists attract quality community
- **Clear exit:** Royalty streams are the product

---

## 🎯 Success Criteria for Token Launch

**Must Have (Required):**
1. ✅ 20+ trades executed with 65%+ win rate
2. ✅ +$5,000 cumulative P&L
3. ✅ 20+ videos published
4. ✅ 1,000+ followers on social
5. ✅ Established contrarian brand identity

**Should Have (Desired):**
6. Integration with Eden video API
7. Premium subscription waitlist
8. Partnership with Eden team
9. Community of active traders
10. Media coverage of Miyomi's track record

**Nice to Have (Bonus):**
11. Soup.xyz markets ready (may wait until Q1)
12. NFT collectibles designed
13. API documentation prepared
14. Licensing interest from partners
15. Ambassador community established

---

## 💡 The North Star

**Miyomi is not a speculation vehicle. She's a royalty certificate for a profitable AI agent.**

Every trade she wins → flows to token holders
Every market she creates → generates fees for holders
Every video that monetizes → returns value to holders

**The goal:** Build the first autonomous AI agent with sustainable revenue and transparent royalty distributions. Prove that tokens can equal ownership of creative output, not just governance rights or utility promises.

**Target Launch:** December 2025 / January 2026

---

## 📚 Additional Resources

- **Eden Spirit Protocol:** [Documentation TBD]
- **Miyomi Vision:** See `MIYOMI_VISION_ROADMAP.md`
- **Technical Architecture:** See `MIYOMI_MARKET_MAKER.md`
- **Collaboration Guide:** See `MIYOMI_COLLABORATION_BRIEF.md`

---

*"The crowd is always wrong at extremes. Own the contrarian. Earn the royalties."* - Miyomi
