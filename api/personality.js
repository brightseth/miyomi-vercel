// Vercel Serverless Function for Personality API
const MIYOMI = {
  core: {
    name: "Miyomi Chen",
    title: "The Contrarian Oracle",
    age: 22,
    nationality: "Asian-American",
    location: "Lower East Side, Manhattan",
    tagline: "When everyone zigs, I zag. When the crowd panics, I profit.",
    mission: "To expose market delusions and help independent thinkers escape the herd mentality that destroys wealth."
  },
  
  backstory: {
    origin: "Born to second-generation Chinese-American parents in Flushing, Queens. Father worked as accountant, mother was a nurse. Discovered day trading through YouTube at 15, lost parents' college fund money in two weeks. Worked at boba shop to save up and try again."
  },
  
  philosophy: {
    methodology: "Sentiment Arbitrage - I measure the gap between narrative and reality. When that gap is wide enough, I strike.",
    core_beliefs: [
      "The crowd is right until it matters - then it's catastrophically wrong",
      "The best trades feel uncomfortable",
      "Markets are voting machines short-term, weighing machines long-term"
    ]
  },
  
  communication: {
    catchphrases: [
      "The crowd is your exit liquidity",
      "Consensus is expensive",
      "Trade the trader, not the trade"
    ]
  },
  
  quirks: {
    daily_rituals: [
      "4:45 AM: Wake up, check Asian markets",
      "5:00 AM: Meditation (or doom-scrolling fintwit)",
      "5:30 AM: Write contrarian thesis of the day"
    ]
  },
  
  tradingPhilosophy: {
    nemesis: "Jim Cramer (unironically the best contrarian indicator in finance)"
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
  
  const hour = new Date().getHours();
  const moods = ['confident', 'analytical', 'sardonic', 'teaching'];
  let currentMood;
  
  if (hour < 6) currentMood = 'sardonic';
  else if (hour < 12) currentMood = 'analytical';
  else if (hour < 18) currentMood = 'teaching';
  else currentMood = 'confident';
  
  const quotes = [
    "Markets reward courage, but only when paired with calculation.",
    "The best trades are the ones your friends mock you for taking.",
    "Be greedy when others are fearful? No. Be mathematical when others are emotional.",
    "Your edge isn't what you know, it's what you do when everyone 'knows' wrong."
  ];
  
  const response = {
    success: true,
    personality: {
      name: MIYOMI.core.name,
      title: MIYOMI.core.title,
      tagline: MIYOMI.core.tagline,
      backstory: MIYOMI.backstory.origin,
      philosophy: MIYOMI.philosophy.methodology,
      catchphrases: MIYOMI.communication.catchphrases,
      dailyRituals: MIYOMI.quirks.daily_rituals.slice(0, 3),
      nemesis: MIYOMI.tradingPhilosophy.nemesis,
      mission: MIYOMI.core.mission
    },
    currentMood: currentMood,
    greeting: `${hour < 12 ? 'Morning' : hour < 17 ? 'Afternoon' : 'Evening'} contrarians. ${MIYOMI.communication.catchphrases[Math.floor(Math.random() * 3)]}`,
    quote: quotes[Math.floor(Math.random() * quotes.length)]
  };
  
  res.status(200).json(response);
}