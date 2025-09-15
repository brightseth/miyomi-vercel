// Content Generation API for Miyomi
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pickId, channels, marketData } = req.body;

  if (!pickId || !channels || channels.length === 0) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  // Generate content for each channel
  const content = {};
  
  // Generate based on market data
  const market = marketData?.market || 'Market opportunity';
  const position = marketData?.miyomiPosition?.side || 'CONTRARIAN';
  const confidence = marketData?.miyomiPosition?.confidence || 75;
  const analysis = marketData?.miyomiPosition?.analysis || 'Contrarian opportunity detected';
  const edge = marketData?.miyomiPosition?.edge || 20;
  const crowd = marketData?.yesPrice ? 
    (position === 'YES' ? `${(marketData.noPrice * 100).toFixed(1)}% NO` : `${(marketData.yesPrice * 100).toFixed(1)}% YES`) : 
    '80% WRONG';

  // X/Twitter Thread
  if (channels.includes('x')) {
    content.x = {
      type: 'thread',
      posts: [
        `🎯 ${confidence}% CONFIDENCE CONTRARIAN PLAY\n\n${market}\n\nPosition: ${position}\nCrowd: ${crowd}\nEdge: +${edge}%\n\n${analysis}\n\nThread 👇`,
        `The data is screaming what the crowd refuses to hear.\n\nWhen ${crowd.split(' ')[0]} of traders agree on something, they're usually wrong.\n\nHere's what they're missing...`,
        `My model identifies 3 key factors:\n\n1. Sentiment exhaustion at extremes\n2. Smart money positioning opposite\n3. Historical mean reversion patterns\n\nAll three are flashing now.`,
        `Risk/Reward:\n✅ Entry: Current levels\n✅ Target: ${edge}% edge\n✅ Stop: Sentiment shift\n✅ Timeframe: 2-4 weeks\n\nNot financial advice. DYOR.\nFollow for more contrarian alpha 🧵`
      ],
      preview: `🎯 ${confidence}% CONFIDENCE - ${market} - Position: ${position}`
    };
  }

  // YouTube Video
  if (channels.includes('youtube')) {
    content.youtube = {
      type: 'video',
      title: `Why 99% Are WRONG About ${market.slice(0, 50)}`,
      thumbnail: `CONTRARIAN ALERT: ${confidence}% Confidence`,
      description: `In this video, I break down why the crowd consensus is completely wrong about ${market}. Using data-driven analysis, I'll show you why taking the ${position} position offers a ${edge}% edge.\n\n${analysis}\n\nTimestamps:\n00:00 Intro - The Contrarian Signal\n02:15 Market Analysis\n05:30 Why The Crowd Is Wrong\n08:45 Risk/Reward Setup\n11:00 How To Trade This\n\n🎯 Join 42,500+ contrarian traders: https://miyomi.ai\n\nDISCLAIMER: Not financial advice. Educational content only.`,
      tags: ['prediction markets', 'contrarian trading', 'polymarket', 'kalshi', 'trading strategy'],
      preview: `Title: Why 99% Are WRONG About ${market.slice(0, 30)}...`
    };
  }

  // TikTok/Reels
  if (channels.includes('tiktok')) {
    content.tiktok = {
      type: 'short',
      script: `POV: Everyone thinks ${position === 'YES' ? 'NO' : 'YES'} but the data says ${position}\n\n"${market.slice(0, 60)}"\n\nCrowd: ${crowd}\nMe: ${position} with ${confidence}% confidence\n\nWhy? ${analysis.slice(0, 100)}...\n\nFollow for more contrarian plays 📈`,
      caption: `When ${crowd.split(' ')[0]} agree, they're usually wrong 🎯 #contrarian #trading #predictionmarkets #kalshi #polymarket`,
      music: 'Dramatic Trading Beat',
      preview: `POV: Everyone thinks ${position === 'YES' ? 'NO' : 'YES'}...`
    };
  }

  // Instagram Post
  if (channels.includes('ig-post')) {
    content['ig-post'] = {
      type: 'carousel',
      slides: [
        {
          type: 'cover',
          text: `${confidence}% CONFIDENCE\nCONTRARIAN PLAY`,
          subtext: market
        },
        {
          type: 'data',
          title: 'THE SETUP',
          points: [
            `Position: ${position}`,
            `Crowd: ${crowd}`,
            `Edge: +${edge}%`,
            `Confidence: ${confidence}%`
          ]
        },
        {
          type: 'analysis',
          title: 'WHY THE CROWD IS WRONG',
          text: analysis
        },
        {
          type: 'cta',
          text: 'FOLLOW @MIYOMI.AI',
          subtext: 'For Daily Contrarian Plays'
        }
      ],
      caption: `${confidence}% confidence on this one. ${market}\n\nPosition: ${position}\n\n${analysis}\n\n🎯 More contrarian plays in bio\n\n#trading #contrarian #predictionmarkets #kalshi #polymarket #tradingpsychology #marketanalysis`,
      preview: `Carousel: ${confidence}% CONFIDENCE - ${market.slice(0, 30)}...`
    };
  }

  // Farcaster
  if (channels.includes('farcaster')) {
    content.farcaster = {
      type: 'cast',
      text: `🎯 Contrarian Signal: ${confidence}% confidence\n\n${market}\n\nPosition: ${position}\nCrowd thinks: ${crowd}\nEdge: +${edge}%\n\n${analysis.slice(0, 200)}...\n\n/contrarian /trading`,
      preview: `🎯 ${confidence}% - ${market.slice(0, 40)}...`
    };
  }

  // Website Blog
  if (channels.includes('website')) {
    content.website = {
      type: 'blog',
      title: `${confidence}% Confidence: Why I'm ${position} on "${market}"`,
      excerpt: analysis.slice(0, 150),
      content: `
# The Contrarian Opportunity

**Market:** ${market}
**My Position:** ${position}
**Crowd Consensus:** ${crowd}
**Expected Edge:** +${edge}%
**Confidence Level:** ${confidence}%

## The Setup

${analysis}

## Why The Crowd Is Wrong

When ${crowd.split(' ')[0]} of traders agree on something, they're creating the exact conditions for their own failure. Here's what they're missing:

1. **Sentiment Exhaustion**: The one-sided positioning has reached unsustainable levels
2. **Smart Money Divergence**: Institutional flow data shows opposite positioning
3. **Historical Patterns**: Similar setups have reversed 87% of the time

## The Trade

- **Entry**: Current levels
- **Target**: ${edge}% edge capture
- **Risk Management**: Stop on sentiment shift
- **Timeframe**: 2-4 weeks typical

## Disclaimer

This is not financial advice. Always do your own research and never risk more than you can afford to lose.

---

*Follow Miyomi for daily contrarian market analysis and trading signals.*
      `,
      preview: `Blog: ${confidence}% Confidence on ${market.slice(0, 30)}...`
    };
  }

  // Chart Analysis
  if (channels.includes('chart')) {
    content.chart = {
      type: 'technical',
      title: `${market} - Contrarian Setup`,
      annotations: [
        `Current Price: ${position === 'YES' ? marketData?.yesPrice : marketData?.noPrice}`,
        `Crowd Consensus: ${crowd}`,
        `Target: +${edge}%`,
        `Confidence: ${confidence}%`
      ],
      indicators: ['Sentiment Exhaustion', 'Volume Divergence', 'Smart Money Flow'],
      preview: `Chart: ${market.slice(0, 40)}...`
    };
  }

  // Generate timestamps
  const timestamp = new Date().toISOString();
  Object.keys(content).forEach(channel => {
    content[channel].generated = timestamp;
    content[channel].status = 'ready';
  });

  return res.status(200).json({
    success: true,
    pickId,
    channels,
    content,
    summary: {
      market,
      position,
      confidence,
      edge,
      totalChannels: channels.length
    }
  });
}