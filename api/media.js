// Vercel Serverless Function for Media API
const mediaAssets = {
  profileMain: {
    id: "miyomi-profile-main",
    type: "image",
    url: "/eden-images/miyomi-main.png",
    description: "22-year-old Asian-American woman at multi-monitor trading setup, oversized hoodie, messy bun, pink/cyan lighting, NYC apartment vibes",
    mood: "confident-professional",
    style: "cyberpunk-streetwear"
  },
  profileAnalysis: {
    id: "miyomi-analysis-mode",
    type: "image",
    url: "/eden-images/miyomi-analysis.png",
    description: "Deep focus analysis mode, intense concentration, surrounded by data and charts, cyberpunk UI elements",
    mood: "focused-analytical",
    style: "data-intensive-cyberpunk"
  },
  profileVictory: {
    id: "miyomi-victory-celebration",
    type: "image",
    url: "/eden-images/miyomi-victory.png",
    description: "Miyomi celebrating massive trading win, fist pump, triumphant expression, multiple monitors showing profits",
    mood: "victorious-energetic",
    style: "celebration-cyberpunk"
  },
  profileContrarian: {
    id: "miyomi-contrarian-split",
    type: "image",
    url: "/eden-images/miyomi-contrarian.png",
    description: "Split-screen composition showing mainstream financial panic vs Miyomi's calm contrarian analysis, cyberpunk aesthetic",
    mood: "analytical-contrarian",
    style: "split-screen-cyberpunk"
  },
  morningRoutine: {
    id: "miyomi-morning-6am",
    type: "image",
    url: "/eden-images/miyomi-morning.png",
    description: "6 AM morning routine, checking phone for market data, tired but determined, NYC apartment morning light",
    mood: "determined-sleepy",
    style: "morning-realistic"
  },
  tradingSetup: {
    id: "miyomi-trading-desk",
    type: "image",
    url: "/eden-images/miyomi-trading.png",
    description: "Full trading desk surrounded by multiple monitors showing prediction markets, pink/cyan data overlays",
    mood: "professional-focused",
    style: "tech-heavy-cyberpunk"
  }
};

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  const { key, mood } = req.query;
  
  if (key) {
    // Get specific asset
    const asset = mediaAssets[key];
    if (asset) {
      res.status(200).json({ success: true, asset });
    } else {
      res.status(404).json({ success: false, error: 'Asset not found' });
    }
  } else {
    // Get gallery (optionally filtered by mood)
    let gallery = Object.values(mediaAssets);
    
    if (mood) {
      gallery = gallery.filter(asset => 
        asset.mood.includes(mood) || asset.style.includes(mood)
      );
    }
    
    res.status(200).json({ success: true, gallery });
  }
}