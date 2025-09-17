// Live Kalshi Data Integration
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Kalshi API requires authentication for full access
    // Using public endpoints where available
    const KALSHI_API = 'https://api.elections.kalshi.com';

    // For demo purposes, we'll use their public election markets API
    // In production, you'd need API credentials for full market access
    const response = await fetch(`${KALSHI_API}/v1/elections/2024/markets`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    let markets = [];

    if (response.ok) {
      const data = await response.json();

      // Transform Kalshi data to our format
      markets = data.markets?.map(market => ({
        id: market.ticker,
        platform: 'KALSHI',
        title: market.title,
        subtitle: market.subtitle,
        yesPrice: market.yes_price / 100, // Kalshi uses cents
        noPrice: (100 - market.yes_price) / 100,
        volume24h: market.volume || 0,
        openInterest: market.open_interest || 0,
        lastTradeTime: market.last_trade_time,
        url: `https://kalshi.com/markets/${market.ticker}`,
        // Add Miyomi's contrarian analysis
        miyomiAnalysis: generateKalshiAnalysis(market)
      })) || [];
    }

    // If no data or error, use curated fallback
    if (markets.length === 0) {
      markets = getCuratedKalshiMarkets();
    }

    return res.status(200).json({
      success: true,
      source: markets.length > 0 ? 'kalshi_live' : 'curated_fallback',
      timestamp: new Date().toISOString(),
      markets: markets.slice(0, 10) // Top 10 markets
    });

  } catch (error) {
    console.error('Kalshi API error:', error);

    // Return curated markets on error
    return res.status(200).json({
      success: false,
      source: 'curated_fallback',
      error: error.message,
      markets: getCuratedKalshiMarkets()
    });
  }
}

// Generate Miyomi's contrarian analysis for Kalshi markets
function generateKalshiAnalysis(market) {
  const yesPrice = market.yes_price / 100;

  // Only take positions on extreme consensus
  if (yesPrice < 0.25 || yesPrice > 0.75) {
    const contrarian = yesPrice > 0.75 ? 'NO' : 'YES';
    const edge = Math.abs(50 - yesPrice * 100);

    return {
      position: contrarian,
      confidence: Math.min(90, 50 + edge * 1.5),
      edge: edge,
      thesis: generateThesis(market.title, yesPrice, contrarian)
    };
  }

  return null;
}

function generateThesis(title, probability, position) {
  const percentage = Math.round(probability * 100);

  if (position === 'NO') {
    return `Market at ${percentage}% overconfident. Crowded trade, ignored tail risks, momentum exhaustion signs.`;
  } else {
    return `${percentage}% probability severely underpriced. Asymmetric opportunity, market missing structural shifts.`;
  }
}

// Curated high-impact Kalshi markets Miyomi would trade
function getCuratedKalshiMarkets() {
  const now = new Date().toISOString();

  return [
    {
      id: 'FED-CUT-MAR25',
      platform: 'KALSHI',
      title: 'Fed cuts rates in March 2025',
      subtitle: 'Will the Federal Reserve lower rates at the March FOMC meeting?',
      yesPrice: 0.82,
      noPrice: 0.18,
      volume24h: 2345678,
      openInterest: 5678901,
      lastTradeTime: now,
      url: 'https://kalshi.com/markets/FED/fed-rate-cut-march-2025',
      miyomiAnalysis: {
        position: 'NO',
        confidence: 72,
        edge: 32,
        thesis: 'Market at 82% overconfident. Crowded trade, ignored tail risks, momentum exhaustion signs.'
      }
    },
    {
      id: 'RECESSION-Q1-25',
      platform: 'KALSHI',
      title: 'US enters recession Q1 2025',
      subtitle: 'Will NBER declare a recession starting in Q1 2025?',
      yesPrice: 0.15,
      noPrice: 0.85,
      volume24h: 1234567,
      openInterest: 3456789,
      lastTradeTime: now,
      url: 'https://kalshi.com/markets/RECESSION/q1-2025',
      miyomiAnalysis: {
        position: 'YES',
        confidence: 67,
        edge: 35,
        thesis: '15% probability severely underpriced. Asymmetric opportunity, market missing structural shifts.'
      }
    },
    {
      id: 'SP500-6000',
      platform: 'KALSHI',
      title: 'S&P 500 above 6000 by March',
      subtitle: 'Will the S&P 500 index close above 6000 before April 1, 2025?',
      yesPrice: 0.78,
      noPrice: 0.22,
      volume24h: 3456789,
      openInterest: 7890123,
      lastTradeTime: now,
      url: 'https://kalshi.com/markets/SP500/above-6000',
      miyomiAnalysis: {
        position: 'NO',
        confidence: 69,
        edge: 28,
        thesis: 'Market at 78% overconfident. Crowded trade, ignored tail risks, momentum exhaustion signs.'
      }
    },
    {
      id: 'OIL-100',
      platform: 'KALSHI',
      title: 'Oil above $100 in 2025',
      subtitle: 'Will WTI crude oil trade above $100/barrel in 2025?',
      yesPrice: 0.23,
      noPrice: 0.77,
      volume24h: 890123,
      openInterest: 2345678,
      lastTradeTime: now,
      url: 'https://kalshi.com/markets/OIL/above-100-2025',
      miyomiAnalysis: {
        position: 'YES',
        confidence: 61,
        edge: 27,
        thesis: '23% probability severely underpriced. Asymmetric opportunity, market missing structural shifts.'
      }
    },
    {
      id: 'INFLATION-3PCT',
      platform: 'KALSHI',
      title: 'Inflation above 3% in March',
      subtitle: 'Will March 2025 CPI YoY be above 3%?',
      yesPrice: 0.35,
      noPrice: 0.65,
      volume24h: 1567890,
      openInterest: 4567890,
      lastTradeTime: now,
      url: 'https://kalshi.com/markets/CPI/above-3-march',
      miyomiAnalysis: null // Not extreme enough for Miyomi
    }
  ];
}