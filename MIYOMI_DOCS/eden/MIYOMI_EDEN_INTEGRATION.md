# MIYOMI × Eden Video Generator Integration Architecture

## Overview: MIYOMI as Financial AI Director

MIYOMI becomes a specialized AI Director within the Eden Video Generator ecosystem, focusing on contrarian financial content. This integration consolidates backend systems while maintaining MIYOMI's unique identity.

---

## Current Architecture Comparison

### Eden Video Generator
```
Features:
├── Quick Clips (4-10s, 60-90s generation)
├── Manual Mode (30-60s, 10-step orchestration)
├── AI Collaborators (SOLIENNE, ABRAHAM)
└── Template-based workflow
```

### MIYOMI System
```
Features:
├── Live market data (Polymarket, Kalshi)
├── Contrarian edge detection
├── Trainer collaboration workflow
└── Performance tracking
```

---

## Unified Backend Architecture

### 1. Shared Media Creation Service
```javascript
// /lib/unified-media-service.js

class UnifiedMediaService {
  constructor() {
    this.edenClient = new EdenClient();
    this.marketDataService = new MarketDataService();
    this.templateEngine = new TemplateEngine();
  }

  async createVideo({
    director, // 'miyomi' | 'solienne' | 'abraham'
    mode,     // 'quick' | 'manual' | 'contrarian'
    data,     // Market data, prompts, etc.
    template  // Video generation template
  }) {
    // Unified video creation pipeline
    const script = await this.generateScript(director, data);
    const visuals = await this.defineVisuals(director, template);
    const task = await this.edenClient.createTask({
      tool: 'create',
      args: this.buildVideoArgs(script, visuals, mode)
    });
    return this.pollCompletion(task.id);
  }
}
```

### 2. MIYOMI as Specialized AI Director
```javascript
// /lib/directors/miyomi-director.js

class MIYOMIDirector extends BaseDirector {
  constructor() {
    super();
    this.specialty = 'contrarian-finance';
    this.personality = {
      tone: 'provocative-analytical',
      confidence: 'high',
      style: 'wall-street-rebel'
    };
  }

  async generateContent(marketData) {
    // MIYOMI-specific logic
    const edge = this.detectContrarianEdge(marketData);
    const commentary = this.craftCommentary(edge);
    const visuals = this.selectFinancialVisuals();

    return {
      script: commentary,
      visuals: visuals,
      duration: edge.urgency > 80 ? 10 : 30,
      template: 'financial-oracle'
    };
  }
}
```

---

## Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│                   DATA SOURCES                       │
├───────────────┬──────────────┬──────────────────────┤
│  Polymarket   │    Kalshi    │   Social Signals     │
└───────┬───────┴──────┬───────┴──────────┬───────────┘
        │              │                  │
        v              v                  v
┌───────────────────────────────────────────────────┐
│            UNIFIED DATA PIPELINE                   │
│  - Real-time aggregation                          │
│  - Edge detection algorithms                      │
│  - Sentiment analysis                             │
└─────────────────────┬─────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        v                           v
┌──────────────┐           ┌──────────────┐
│   TRAINER    │           │   AUTOMATED  │
│   WORKFLOW   │           │   TRIGGERS   │
└──────┬───────┘           └──────┬───────┘
       │                          │
       v                          v
┌────────────────────────────────────────────┐
│         MIYOMI CONTENT ENGINE              │
│  - Script generation                       │
│  - Visual selection                        │
│  - Tone optimization                       │
└──────────────────┬─────────────────────────┘
                   │
                   v
┌────────────────────────────────────────────┐
│          EDEN VIDEO GENERATOR              │
│  - Quick Clips (contrarian alerts)        │
│  - Full Videos (market analysis)          │
│  - Multi-scene narratives                 │
└──────────────────┬─────────────────────────┘
                   │
                   v
┌────────────────────────────────────────────┐
│         DISTRIBUTION PIPELINE              │
│  - TikTok / YouTube Shorts                │
│  - Twitter/X threads                      │
│  - Performance tracking                   │
└────────────────────────────────────────────┘
```

---

## MIYOMI Video Templates

### Template 1: Contrarian Alert (4-10s Quick Clip)
```json
{
  "name": "contrarian-alert",
  "duration": 10,
  "scenes": [
    {
      "visual": "trading-floor-chaos",
      "overlay": "CROWD: 73% BULLISH",
      "narration": "Everyone's buying..."
    },
    {
      "visual": "red-warning-flash",
      "overlay": "MIYOMI: BEARISH",
      "narration": "I'm selling. Here's why..."
    }
  ],
  "style": "urgent-warning",
  "music": "tension-building"
}
```

### Template 2: Market Analysis (30-60s Manual)
```json
{
  "name": "deep-analysis",
  "duration": 60,
  "orchestration": {
    "intro": "Hook with contrarian position",
    "evidence": "3 data points supporting thesis",
    "comparison": "Crowd vs MIYOMI view",
    "conclusion": "Clear action recommendation"
  },
  "visuals": "professional-trading-desk",
  "tone": "authoritative-rebel"
}
```

---

## API Consolidation Strategy

### Unified API Gateway
```javascript
// /api/v1/media/create

export async function POST(req) {
  const { director, content, mode } = await req.json();

  // Route to appropriate director
  const directors = {
    miyomi: new MIYOMIDirector(),
    solienne: new SOLIENNEDirector(),
    abraham: new ABRAHAMDirector()
  };

  const selectedDirector = directors[director];

  // Generate content based on director's specialty
  const videoSpec = await selectedDirector.generateContent(content);

  // Use unified Eden pipeline
  const video = await unifiedMediaService.createVideo({
    director,
    mode,
    data: videoSpec,
    template: videoSpec.template
  });

  return NextResponse.json({ video });
}
```

### Shared Services
```
/lib/services/
├── eden-client.js         # Shared Eden API client
├── market-data.js         # Polymarket/Kalshi aggregator
├── template-engine.js     # Video template processor
├── analytics.js           # Performance tracking
└── distribution.js        # Multi-platform publishing
```

---

## Integration Roadmap

### Phase 1: Backend Consolidation (Week 1)
- [ ] Extract shared Eden client
- [ ] Create unified media service
- [ ] Implement director base class
- [ ] Build MIYOMI director

### Phase 2: Template System (Week 2)
- [ ] Port Eden templates to MIYOMI
- [ ] Create financial-specific templates
- [ ] Add contrarian alert templates
- [ ] Implement template selection logic

### Phase 3: Data Pipeline (Week 3)
- [ ] Unify market data sources
- [ ] Create content queue system
- [ ] Implement trainer approval flow
- [ ] Add automated triggers

### Phase 4: UI Integration (Week 4)
- [ ] Add MIYOMI to Eden Video Generator
- [ ] Create custom MIYOMI interface
- [ ] Integrate trainer dashboard
- [ ] Deploy unified system

---

## Benefits of Consolidation

### For MIYOMI
- **Leverage Eden's infrastructure**: Proven video generation pipeline
- **Access to templates**: Quick Clips and Manual modes
- **Collaborative potential**: Work with other AI directors
- **Unified analytics**: Track performance across ecosystem

### For Eden Ecosystem
- **Financial expertise**: MIYOMI brings market intelligence
- **New content vertical**: Financial/trading content
- **Trainer model**: Human-in-loop optimization pattern
- **Revenue stream**: Subscription model for predictions

### Technical Benefits
- **Reduced redundancy**: Single Eden client, shared services
- **Easier maintenance**: Unified codebase
- **Better scaling**: Shared infrastructure
- **Cross-pollination**: Directors can learn from each other

---

## Implementation Example

### MIYOMI in Eden Video Generator UI
```html
<!-- Add MIYOMI as AI Collaborator option -->
<div class="collaborator-card">
  <img src="/miyomi-avatar.jpg" alt="MIYOMI">
  <h3>MIYOMI</h3>
  <p>Contrarian Financial Oracle</p>
  <div class="specialty">
    • Market predictions
    • Contrarian analysis
    • Trading signals
  </div>
  <button onclick="selectDirector('miyomi')">
    Create Financial Content
  </button>
</div>
```

### MIYOMI Custom Workflow
```javascript
// When MIYOMI is selected
if (director === 'miyomi') {
  // Show market data inputs
  showMarketDataPanel();

  // Enable trainer review option
  enableTrainerWorkflow();

  // Load financial templates
  loadTemplates('financial');

  // Connect to live data
  connectToMarkets();
}
```

---

## Next Steps

1. **Review existing Eden Video Generator code** to understand full architecture
2. **Create shared service layer** for both systems
3. **Build MIYOMI Director class** with her unique logic
4. **Implement unified API** endpoints
5. **Deploy integrated system** with MIYOMI as featured director

This integration makes MIYOMI a first-class citizen in the Eden ecosystem while preserving her unique contrarian identity and trainer collaboration model.