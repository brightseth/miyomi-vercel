// API endpoint for resolving Miyomi markets
// POST /api/miyomi/resolve-market

import { MiyomiMarketManager } from '../../lib/soup-client.js'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

const marketManager = new MiyomiMarketManager({
  protocol: {
    network: process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet',
    privateKey: process.env.MIYOMI_ORACLE_PRIVATE_KEY
  },
  oracleAddress: process.env.MIYOMI_ORACLE_ADDRESS
})

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify oracle authentication
  const authHeader = req.headers.authorization
  if (!authHeader || authHeader !== `Bearer ${process.env.ORACLE_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized - Oracle only' })
  }

  try {
    const {
      marketId,
      outcome, // 'YES' | 'NO' | 'INVALID'
      evidence,
      methodology
    } = req.body

    // Validate inputs
    if (!marketId || !outcome || !evidence) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['marketId', 'outcome', 'evidence']
      })
    }

    if (!['YES', 'NO', 'INVALID'].includes(outcome)) {
      return res.status(400).json({
        error: 'Invalid outcome',
        validOutcomes: ['YES', 'NO', 'INVALID']
      })
    }

    console.log('[Resolve Market] Starting resolution:', { marketId, outcome })

    // 1. Get market from database
    const { data: market, error: fetchError } = await supabase
      .from('miyomi_markets')
      .select('*')
      .eq('id', marketId)
      .single()

    if (fetchError || !market) {
      return res.status(404).json({ error: 'Market not found' })
    }

    // Check if already resolved
    if (market.status === 'resolved') {
      return res.status(400).json({ error: 'Market already resolved' })
    }

    // Check if resolution date has passed
    if (new Date(market.resolution_date) > new Date()) {
      return res.status(400).json({ error: 'Resolution date has not passed yet' })
    }

    // 2. Validate resolution against criteria
    const isValid = await validateResolution({
      market,
      outcome,
      evidence,
      methodology
    })

    if (!isValid.valid) {
      return res.status(400).json({
        error: 'Resolution validation failed',
        reason: isValid.reason
      })
    }

    console.log('[Resolve Market] Validation passed')

    // 3. Resolve on Soup.xyz
    const { transactionHash } = await marketManager.resolveMarket(
      market.condition_id,
      outcome,
      evidence
    )

    console.log('[Resolve Market] On-chain resolution:', transactionHash)

    // 4. Calculate Miyomi's P&L
    const pnl = calculatePnL(market, outcome)

    // 5. Update market in database
    const { data: resolvedMarket, error: updateError } = await supabase
      .from('miyomi_markets')
      .update({
        status: 'resolved',
        outcome,
        resolved_at: new Date().toISOString(),
        miyomi_pnl: pnl
      })
      .eq('id', marketId)
      .select()
      .single()

    if (updateError) {
      console.error('[Resolve Market] Database update error:', updateError)
    }

    // 6. Record resolution in history
    const { error: historyError } = await supabase
      .from('market_resolutions')
      .insert({
        market_id: marketId,
        resolved_at: new Date().toISOString(),
        outcome,
        evidence_url: evidence,
        methodology: methodology || 'Per resolution criteria',
        resolution_tx_hash: transactionHash,
        community_disputes: 0
      })

    if (historyError) {
      console.error('[Resolve Market] History insert error:', historyError)
    }

    // 7. Update market metrics
    await updateMarketMetrics(marketId)

    // 8. Generate resolution video (async)
    const videoPromise = generateResolutionVideo({
      market,
      outcome,
      pnl,
      evidence
    }).catch(err => {
      console.error('[Resolve Market] Video generation failed:', err)
      return null
    })

    // 9. Wait for video (with timeout)
    const videoUrl = await Promise.race([
      videoPromise,
      new Promise(resolve => setTimeout(() => resolve(null), 10000))
    ])

    if (videoUrl) {
      await supabase
        .from('miyomi_markets')
        .update({ resolution_video_url: videoUrl })
        .eq('id', marketId)
    }

    // 10. Publish resolution announcement (async)
    publishResolutionAnnouncement({
      market,
      outcome,
      pnl,
      videoUrl,
      evidence,
      transactionHash
    }).catch(err => {
      console.error('[Resolve Market] Social publishing failed:', err)
    })

    // Return success
    res.status(200).json({
      success: true,
      resolution: {
        marketId,
        conditionId: market.condition_id,
        outcome,
        evidence,
        transactionHash,
        miyomiPnl: pnl,
        videoUrl,
        resolvedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('[Resolve Market] Error:', error)
    res.status(500).json({
      error: 'Failed to resolve market',
      message: error.message
    })
  }
}

/**
 * Validate resolution against criteria
 */
async function validateResolution({ market, outcome, evidence, methodology }) {
  const criteria = market.resolution_criteria

  // Basic validation
  if (!evidence || evidence.length < 10) {
    return {
      valid: false,
      reason: 'Evidence must be provided'
    }
  }

  // For objective criteria, could add automated validation
  // For example, fetch data from source and verify
  if (criteria.method === 'objective' && criteria.dataSource) {
    // TODO: Implement automated data verification
    // For now, trust the oracle
  }

  // Subjective criteria always valid (oracle decides)
  return { valid: true }
}

/**
 * Calculate Miyomi's P&L for the market
 */
function calculatePnL(market, outcome) {
  const position = market.miyomi_position

  if (!position) return 0

  // Calculate based on outcome
  if (outcome === 'YES') {
    // YES wins, NO loses
    const yesProfit = position.yes * (1 - position.entry_price_yes)
    const noLoss = position.no * position.entry_price_no
    return yesProfit - noLoss
  } else if (outcome === 'NO') {
    // NO wins, YES loses
    const noProfit = position.no * (1 - position.entry_price_no)
    const yesLoss = position.yes * position.entry_price_yes
    return noProfit - yesLoss
  } else {
    // INVALID - 50/50 split
    const yesReturn = position.yes * 0.5
    const noReturn = position.no * 0.5
    const totalCost = (position.yes * position.entry_price_yes) + (position.no * position.entry_price_no)
    return (yesReturn + noReturn) - totalCost
  }
}

/**
 * Update market metrics
 */
async function updateMarketMetrics(marketId) {
  // TODO: Fetch actual volume and trader data from Soup indexer
  // For now, just log
  console.log('[Metrics] Updating metrics for market:', marketId)

  // Example metric update
  const { error } = await supabase
    .from('market_metrics')
    .insert({
      market_id: marketId,
      date: new Date().toISOString().split('T')[0],
      volume_24h: 0, // TODO: Fetch from indexer
      unique_traders: 0,
      miyomi_return_percent: 0,
      video_views: 0
    })

  if (error && error.code !== '23505') { // Ignore duplicate errors
    console.error('[Metrics] Insert error:', error)
  }
}

/**
 * Generate resolution video
 */
async function generateResolutionVideo({ market, outcome, pnl, evidence }) {
  try {
    const script = generateResolutionScript({ market, outcome, pnl, evidence })

    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/generate-video-v2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category: market.category,
        position: `RESOLVED: ${market.question} → ${outcome}`,
        thesis: evidence,
        script
      })
    })

    const data = await response.json()
    return data.video_url
  } catch (error) {
    console.error('Resolution video generation error:', error)
    return null
  }
}

/**
 * Generate script for resolution video
 */
function generateResolutionScript({ market, outcome, pnl, evidence }) {
  const isWin = pnl > 0
  const pnlFormatted = Math.abs(pnl).toFixed(2)

  if (isWin) {
    return `Alright alright, moment of truth.\n\n"${market.question}"\n\nResolved: ${outcome}\n\nI was RIGHT. Made $${pnlFormatted} on this one.\n\n${evidence}\n\nThis is why you don't follow the herd. See you Monday for the next market.`
  } else {
    return `OK let's talk about it.\n\n"${market.question}"\n\nResolved: ${outcome}\n\nI was WRONG. Lost $${pnlFormatted}.\n\n${evidence}\n\nMarkets humbled me this week. That's the game. I own it, learn from it, move on.\n\nNext market Monday. I'll be better.`
  }
}

/**
 * Publish resolution announcement
 */
async function publishResolutionAnnouncement({
  market,
  outcome,
  pnl,
  videoUrl,
  evidence,
  transactionHash
}) {
  const isWin = pnl > 0
  const emoji = isWin ? '✅' : '❌'

  console.log('[Social] Publishing resolution:', {
    market: market.question,
    outcome,
    pnl: pnl.toFixed(2),
    video: videoUrl
  })

  // TODO: Implement actual social posting
  // Example message:
  /*
  `${emoji} MARKET RESOLVED\n\n"${market.question}"\n\nOutcome: ${outcome}\nMiyomi P&L: ${pnl > 0 ? '+' : ''}$${pnl.toFixed(2)}\n\nEvidence: ${evidence}\nTX: ${transactionHash.slice(0, 10)}...\n\nNext market Monday 9am.`
  */
}
