// API endpoint for creating Miyomi markets
// POST /api/miyomi/create-market

import { MiyomiMarketManager } from '../../lib/soup-client.js'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

// Initialize Miyomi Market Manager
const marketManager = new MiyomiMarketManager({
  protocol: {
    network: process.env.NODE_ENV === 'production' ? 'mainnet' : 'testnet',
    privateKey: process.env.MIYOMI_ORACLE_PRIVATE_KEY
  },
  oracleAddress: process.env.MIYOMI_ORACLE_ADDRESS
})

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify authentication (trainer mode)
  const authHeader = req.headers.authorization
  if (!authHeader || authHeader !== `Bearer ${process.env.TRAINER_API_KEY}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const {
      question,
      description,
      category,
      resolutionDate,
      resolutionCriteria,
      initialLiquidity
    } = req.body

    // Validate inputs
    if (!question || !description || !category || !resolutionDate) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['question', 'description', 'category', 'resolutionDate']
      })
    }

    // Validate category
    const validCategories = ['contrarian', 'culture', 'crypto', 'politics', 'hybrid']
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        error: 'Invalid category',
        validCategories
      })
    }

    // Validate resolution date is in future
    if (new Date(resolutionDate) <= new Date()) {
      return res.status(400).json({ error: 'Resolution date must be in the future' })
    }

    console.log('[Create Market] Starting market creation:', { question, category })

    // 1. Create market on Soup.xyz
    const { conditionId, transactionHash } = await marketManager.createMarket({
      question,
      description,
      category,
      resolutionDate,
      resolutionCriteria: resolutionCriteria || {
        method: 'objective',
        evidence: 'To be provided at resolution'
      },
      initialLiquidity: initialLiquidity || 1000
    })

    console.log('[Create Market] Market created on-chain:', conditionId)

    // 2. Generate announcement video (async, don't wait)
    const videoPromise = generateAnnouncementVideo({
      question,
      description,
      category
    }).catch(err => {
      console.error('[Create Market] Video generation failed:', err)
      return null
    })

    // 3. Save to database
    const { data: market, error: dbError } = await supabase
      .from('miyomi_markets')
      .insert({
        condition_id: conditionId,
        question,
        description,
        category,
        resolution_criteria: resolutionCriteria || { method: 'objective' },
        resolution_date: resolutionDate,
        status: 'active',
        initial_liquidity: initialLiquidity || 1000,
        miyomi_position: {
          yes: (initialLiquidity || 1000) / 2,
          no: (initialLiquidity || 1000) / 2,
          entry_price_yes: 0.45,
          entry_price_no: 0.55
        },
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('[Create Market] Database error:', dbError)
      throw new Error('Failed to save market to database')
    }

    console.log('[Create Market] Saved to database:', market.id)

    // 4. Wait for video (with timeout)
    const videoUrl = await Promise.race([
      videoPromise,
      new Promise(resolve => setTimeout(() => resolve(null), 10000))
    ])

    if (videoUrl) {
      await supabase
        .from('miyomi_markets')
        .update({ announcement_video_url: videoUrl })
        .eq('id', market.id)
    }

    // 5. Publish social announcement (async)
    publishSocialAnnouncement({
      market,
      videoUrl,
      conditionId
    }).catch(err => {
      console.error('[Create Market] Social publishing failed:', err)
    })

    // Return success
    res.status(200).json({
      success: true,
      market: {
        id: market.id,
        conditionId,
        question,
        category,
        transactionHash,
        videoUrl,
        dashboardUrl: `https://miyomi.ai/markets/${conditionId}`
      }
    })

  } catch (error) {
    console.error('[Create Market] Error:', error)
    res.status(500).json({
      error: 'Failed to create market',
      message: error.message
    })
  }
}

/**
 * Generate announcement video using Eden API
 */
async function generateAnnouncementVideo({ question, description, category }) {
  try {
    const script = generateMarketScript({ question, description, category })

    const response = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/generate-video-v2`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        position: `NEW MARKET: ${question}`,
        thesis: description,
        script
      })
    })

    const data = await response.json()
    return data.video_url
  } catch (error) {
    console.error('Video generation error:', error)
    return null
  }
}

/**
 * Generate script for market announcement video
 */
function generateMarketScript({ question, description, category }) {
  const templates = {
    contrarian: `Bestiesss, I just created a new market: "${question}"\n\nEveryone thinks they know what's happening. Let me tell you why they're wrong.\n\n${description}\n\nI'm seeding $1k liquidity. Link in bio. Let's fade the consensus together.`,

    culture: `New market alert: "${question}"\n\nThis is the type of market that combines NYC street wisdom with real money.\n\n${description}\n\nWho else is betting on culture? Link below. Let's get it.`,

    crypto: `Crypto market time: "${question}"\n\nThe moon boys won't like this one.\n\n${description}\n\nI'm putting my capital where my mouth is. Trade with me.`,

    politics: `Political prediction market: "${question}"\n\nThe consensus is adorable but wrong.\n\n${description}\n\nMy oracle, my rules, my market. Let's trade.`,

    hybrid: `Alright this one is spicy: "${question}"\n\n${description}\n\nYour technical analysis is cute but did you check the vibes? Link in bio. Chaos trading starts now.`
  }

  return templates[category] || templates.contrarian
}

/**
 * Publish market announcement to social media
 */
async function publishSocialAnnouncement({ market, videoUrl, conditionId }) {
  // TODO: Implement Farcaster/Twitter posting
  // For now, just log
  console.log('[Social] Publishing announcement:', {
    market: market.question,
    video: videoUrl,
    link: `https://miyomi.ai/markets/${conditionId}`
  })

  // Example: Post to Farcaster via Neynar
  /*
  await fetch('https://api.neynar.com/v2/farcaster/cast', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEYNAR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      signer_uuid: process.env.MIYOMI_FARCASTER_SIGNER,
      text: `New Miyomi Market 📊\n\n${market.question}\n\n${market.description.slice(0, 100)}...\n\nTrade: https://miyomi.ai/markets/${conditionId}`,
      embeds: videoUrl ? [{ url: videoUrl }] : []
    })
  })
  */
}
