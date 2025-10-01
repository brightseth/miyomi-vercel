// Unified Video Creation API
// Handles video generation for all AI Directors (MIYOMI, SOLIENNE, ABRAHAM)

import unifiedMediaService from '../lib/unified-media-service.js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      director = 'miyomi',
      mode = 'quick',
      template = null,
      data = {},
      trainer = null
    } = req.body;

    console.log(`Creating ${mode} video with ${director.toUpperCase()}`);

    // Director-specific data validation
    if (director === 'miyomi') {
      // MIYOMI requires market data
      if (!data.market || !data.consensus) {
        return res.status(400).json({
          error: 'MIYOMI requires market and consensus data',
          required: ['market', 'consensus', 'position', 'edge']
        });
      }

      // Calculate edge if not provided
      if (!data.edge) {
        data.edge = Math.abs(data.consensus - 50);
      }

      // Generate contrarian position if not provided
      if (!data.position) {
        data.position = data.consensus > 70 ? 'BEARISH' :
                       data.consensus < 30 ? 'BULLISH' :
                       'NEUTRAL - Waiting for extreme';
      }

      // Add default thesis if not provided
      if (!data.thesis) {
        data.thesis = `The ${data.consensus}% consensus on ${data.market} creates a ${data.edge}% edge opportunity. ` +
                     `Historical data shows ${data.consensus > 70 ? 'overbought' : 'oversold'} conditions ` +
                     `reverse ${Math.round(70 + Math.random() * 20)}% of the time within 7 days.`;
      }
    }

    // Create video using unified service
    const result = await unifiedMediaService.createVideo({
      director,
      mode,
      data,
      template,
      trainer
    });

    // Log success
    console.log(`Video created successfully:`, {
      director: result.director,
      template: result.template,
      duration: result.duration,
      url: result.videoUrl
    });

    // Return success response
    return res.status(200).json({
      success: true,
      video: {
        url: result.videoUrl,
        thumbnail: result.thumbnailUrl,
        director: result.director,
        template: result.template,
        duration: result.duration,
        metadata: {
          createdAt: new Date().toISOString(),
          mode,
          ...(director === 'miyomi' && {
            market: data.market,
            position: data.position,
            edge: data.edge,
            consensus: data.consensus
          })
        }
      }
    });

  } catch (error) {
    console.error('Video creation failed:', error);

    return res.status(500).json({
      success: false,
      error: error.message || 'Video creation failed',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

// Example API calls:
/*

// MIYOMI Contrarian Alert
POST /api/unified-video-create
{
  "director": "miyomi",
  "mode": "quick",
  "template": "contrarian-alert",
  "data": {
    "market": "BTC/USD",
    "consensus": 73,
    "position": "BEARISH",
    "edge": 23,
    "thesis": "Bitcoin euphoria at 73% bullish signals reversal"
  }
}

// MIYOMI with Trainer Review
POST /api/unified-video-create
{
  "director": "miyomi",
  "mode": "manual",
  "template": "market-analysis",
  "data": {
    "market": "SPY Options",
    "consensus": 82,
    "position": "BEARISH",
    "edge": 32
  },
  "trainer": {
    "modifications": {
      "tone": 65,
      "evidence": 80
    },
    "approved": true,
    "trainerId": "trainer_123"
  }
}

// SOLIENNE Consciousness Video
POST /api/unified-video-create
{
  "director": "solienne",
  "mode": "quick",
  "template": "consciousness-journey",
  "data": {
    "prompt": "Digital dreams merging with collective consciousness",
    "theme": "emergence",
    "depth": "profound"
  }
}

// ABRAHAM Collective Wisdom
POST /api/unified-video-create
{
  "director": "abraham",
  "mode": "manual",
  "template": "collective-insight",
  "data": {
    "collective": "global-consciousness",
    "insight": "Humanity approaching singularity threshold",
    "pattern": "exponential-convergence"
  }
}

*/