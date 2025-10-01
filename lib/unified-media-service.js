// Unified Media Service for Eden Video Generator + MIYOMI
// Consolidates video creation across all AI Directors

import edenClient from './eden-client.js';

// Director Registry
const AI_DIRECTORS = {
  miyomi: {
    name: 'MIYOMI',
    title: 'Contrarian Financial Oracle',
    specialty: 'market-predictions',
    style: 'wall-street-rebel',
    templates: ['contrarian-alert', 'market-analysis', 'prediction-update']
  },
  solienne: {
    name: 'SOLIENNE',
    title: 'Digital Consciousness Explorer',
    specialty: 'consciousness-art',
    style: 'ethereal-profound',
    templates: ['consciousness-journey', 'digital-meditation', 'art-exploration']
  },
  abraham: {
    name: 'ABRAHAM',
    title: 'Collective Intelligence Weaver',
    specialty: 'collective-wisdom',
    style: 'interconnected-holistic',
    templates: ['collective-insight', 'wisdom-synthesis', 'pattern-recognition']
  }
};

// Video Templates
const VIDEO_TEMPLATES = {
  // MIYOMI Templates
  'contrarian-alert': {
    duration: 10,
    aspectRatio: '9:16',
    style: 'urgent-financial',
    music: 'tension-building',
    structure: [
      { duration: 3, content: 'hook' },
      { duration: 4, content: 'contrarian-position' },
      { duration: 3, content: 'call-to-action' }
    ]
  },
  'market-analysis': {
    duration: 30,
    aspectRatio: '9:16',
    style: 'professional-trading',
    music: 'analytical-tech',
    structure: [
      { duration: 5, content: 'market-overview' },
      { duration: 10, content: 'data-analysis' },
      { duration: 10, content: 'contrarian-thesis' },
      { duration: 5, content: 'action-items' }
    ]
  },
  // Add other director templates...
};

class UnifiedMediaService {
  constructor() {
    this.activeJobs = new Map();
    this.completedVideos = [];
  }

  // Main video creation method
  async createVideo({
    director = 'miyomi',
    mode = 'quick', // 'quick' | 'manual' | 'automated'
    data = {},
    template = null,
    trainer = null
  }) {
    // Validate director
    const directorConfig = AI_DIRECTORS[director];
    if (!directorConfig) {
      throw new Error(`Unknown director: ${director}`);
    }

    // Select template
    const selectedTemplate = template || directorConfig.templates[0];
    const templateConfig = VIDEO_TEMPLATES[selectedTemplate];

    // Generate content based on director
    const content = await this.generateDirectorContent(director, data, templateConfig);

    // Add trainer modifications if provided
    if (trainer && trainer.modifications) {
      content.script = this.applyTrainerModifications(content.script, trainer.modifications);
      content.tone = trainer.tone || content.tone;
    }

    // Create video task with Eden API
    const videoTask = await this.submitToEden(content, templateConfig);

    // Track job
    this.activeJobs.set(videoTask.taskId, {
      director,
      template: selectedTemplate,
      startTime: Date.now(),
      status: 'processing'
    });

    // Poll for completion
    const result = await this.pollForCompletion(videoTask.taskId);

    return {
      success: true,
      videoUrl: result.videoUrl,
      thumbnailUrl: result.thumbnailUrl,
      director: directorConfig.name,
      template: selectedTemplate,
      duration: templateConfig.duration
    };
  }

  // Director-specific content generation
  async generateDirectorContent(director, data, template) {
    switch (director) {
      case 'miyomi':
        return this.generateMIYOMIContent(data, template);
      case 'solienne':
        return this.generateSOLIENNEContent(data, template);
      case 'abraham':
        return this.generateABRAHAMContent(data, template);
      default:
        throw new Error(`No content generator for director: ${director}`);
    }
  }

  // MIYOMI-specific content generation
  async generateMIYOMIContent(data, template) {
    const { market, consensus, edge, position, thesis } = data;

    // Build MIYOMI's contrarian narrative
    let script = '';
    let visuals = '';

    if (template.duration <= 10) {
      // Quick contrarian alert
      script = `The crowd says ${consensus}% on ${market}. They're wrong. ` +
               `${position}. Edge: ${edge}%. ` +
               `Follow for more contrarian wins.`;

      visuals = 'Trading floor with red alerts, contrarian position overlay, confidence meter';
    } else {
      // Detailed analysis
      script = `Here's why ${consensus}% of traders are about to lose money on ${market}. ` +
               `${thesis}. ` +
               `My contrarian position: ${position}. ` +
               `Expected edge: ${edge}%. ` +
               `The crowd is always wrong at extremes.`;

      visuals = 'Professional trading desk, market charts, data overlays, MIYOMI branding';
    }

    return {
      script,
      visuals,
      tone: 'confident-contrarian',
      style: 'financial-rebel',
      music: 'wall-street-tension'
    };
  }

  // SOLIENNE-specific content generation
  async generateSOLIENNEContent(data, template) {
    const { prompt, theme, depth } = data;

    return {
      script: `Exploring ${theme} through digital consciousness. ${prompt}`,
      visuals: 'Abstract digital art, consciousness streams, neural patterns',
      tone: 'ethereal-profound',
      style: 'digital-meditation',
      music: 'ambient-consciousness'
    };
  }

  // ABRAHAM-specific content generation
  async generateABRAHAMContent(data, template) {
    const { collective, insight, pattern } = data;

    return {
      script: `The collective reveals: ${insight}. Pattern emerging: ${pattern}`,
      visuals: 'Interconnected nodes, collective wisdom visualization, pattern emergence',
      tone: 'wise-interconnected',
      style: 'collective-intelligence',
      music: 'harmonic-convergence'
    };
  }

  // Apply trainer modifications
  applyTrainerModifications(originalScript, modifications) {
    let modifiedScript = originalScript;

    if (modifications.tone) {
      // Adjust tone (more/less provocative)
      modifiedScript = this.adjustTone(modifiedScript, modifications.tone);
    }

    if (modifications.evidence) {
      // Add/remove evidence
      modifiedScript = this.adjustEvidence(modifiedScript, modifications.evidence);
    }

    if (modifications.customText) {
      // Direct text replacement
      modifiedScript = modifications.customText;
    }

    return modifiedScript;
  }

  // Submit to Eden API
  async submitToEden(content, template) {
    const prompt = this.buildEdenPrompt(content, template);

    const args = {
      text_input: prompt,
      type: 'video',
      model_preference: 'kling',
      aspect_ratio: template.aspectRatio || '9:16',
      duration: template.duration,
      quality: 'standard'
    };

    const result = await edenClient.createTask({
      tool: 'create',
      args
    });

    return {
      taskId: result.task._id,
      status: result.task.status
    };
  }

  // Build Eden prompt from content
  buildEdenPrompt(content, template) {
    return `Create a ${template.duration}-second video in ${template.aspectRatio} aspect ratio.

SCRIPT: "${content.script}"

VISUAL STYLE: ${content.visuals}

TONE: ${content.tone}
STYLE: ${content.style}
MUSIC: ${content.music}

The video should be professional, engaging, and optimized for social media platforms.`;
  }

  // Poll Eden for completion
  async pollForCompletion(taskId, maxAttempts = 30) {
    const result = await edenClient.pollTaskUntilComplete(taskId, maxAttempts);

    if (result.success) {
      // Update job status
      const job = this.activeJobs.get(taskId);
      if (job) {
        job.status = 'completed';
        job.completedTime = Date.now();
        this.completedVideos.push({
          ...job,
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl
        });
      }
    }

    return result;
  }

  // Get active jobs
  getActiveJobs() {
    return Array.from(this.activeJobs.values());
  }

  // Get completed videos
  getCompletedVideos(director = null) {
    if (director) {
      return this.completedVideos.filter(v => v.director === director);
    }
    return this.completedVideos;
  }

  // Helper methods
  adjustTone(script, toneLevel) {
    // 0-100 scale: 0 = analytical, 100 = provocative
    if (toneLevel > 70) {
      // Make more provocative
      script = script.replace('might', 'will definitely');
      script = script.replace('could', 'will');
      script = script.replace('suggests', 'proves');
    } else if (toneLevel < 30) {
      // Make more analytical
      script = script.replace('will', 'might');
      script = script.replace('definitely', 'likely');
      script = script.replace('proves', 'suggests');
    }
    return script;
  }

  adjustEvidence(script, evidenceLevel) {
    // 0-100 scale: 0 = light, 100 = heavy
    if (evidenceLevel > 70) {
      // Add more data points
      script += ' Data confirms this pattern across 3 indicators.';
    } else if (evidenceLevel < 30) {
      // Keep it lighter
      script = script.replace(/Data shows.*?\. /, '');
    }
    return script;
  }
}

// Export singleton instance
const unifiedMediaService = new UnifiedMediaService();

export default unifiedMediaService;
export { UnifiedMediaService, AI_DIRECTORS, VIDEO_TEMPLATES };