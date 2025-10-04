// Eden API client based on official SDK documentation
// Reference: https://docs.eden.art/guides/sdk
// Full API docs: https://api.eden.art/documentation

const EDEN_API_BASE = process.env.EDEN_API_BASE || 'https://api.eden.art';
const EDEN_API_KEY = process.env.EDEN_API_KEY;
const EDEN_API_SECRET = process.env.EDEN_API_SECRET || '';

if (!EDEN_API_KEY) {
  throw new Error('EDEN_API_KEY environment variable is required');
}

// Eden API response interfaces
const EdenTaskStatus = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

class EdenClient {
  constructor(apiKey = EDEN_API_KEY, baseUrl = EDEN_API_BASE) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  // Private method for making authenticated requests
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'X-Api-Key': this.apiKey,
      ...options.headers
    };

    try {
      console.log(`Eden API request: ${options.method || 'GET'} ${url}`);

      const response = await fetch(url, {
        ...options,
        headers
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Eden API error: ${response.status} - ${errorText}`);
        throw new Error(`Eden API failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`Eden API response: ${JSON.stringify(data).substring(0, 200)}...`);

      return data;
    } catch (error) {
      console.error('Eden API request failed:', error);
      throw error;
    }
  }

  // Create a new task (video generation)
  async createTask({ tool = 'create', args }) {
    return this.request('/v2/tasks/create', {
      method: 'POST',
      body: JSON.stringify({ tool, args })
    });
  }

  // Poll task status
  async pollTask(taskId) {
    return this.request(`/v2/tasks/${taskId}`);
  }

  // Create a session for interactive generation
  async createSession({ agentId, name }) {
    return this.request('/v2/sessions', {
      method: 'POST',
      body: JSON.stringify({ agentId, name })
    });
  }

  // Send message to a session
  async sendSessionMessage(sessionId, message) {
    return this.request(`/v2/sessions/${sessionId}/message`, {
      method: 'POST',
      body: JSON.stringify({ message })
    });
  }

  // List available agents
  async listAgents() {
    return this.request('/v2/agents');
  }

  // Get creations feed with cursor pagination
  async getCreations({ cursor, limit = 20, userId, agentId } = {}) {
    const params = new URLSearchParams();
    if (cursor) params.append('cursor', cursor);
    if (limit) params.append('limit', limit.toString());
    if (userId) params.append('userId', userId);
    if (agentId) params.append('agentId', agentId);

    const queryString = params.toString();
    const endpoint = `/v2/feed-cursor/creations${queryString ? `?${queryString}` : ''}`;

    return this.request(endpoint);
  }

  // Get specific creation
  async getCreation(creationId) {
    return this.request(`/v2/creations/${creationId}`);
  }

  // MIYOMI-specific video generation method with Yeah LoRA
  async generateMiyomiVideo({ script, category, position, thesis, style, includeAudio = false }) {
    const promptText = this.buildMiyomiPrompt(script, category, position, thesis);

    const args = {
      prompt: promptText,
      output: 'video',
      model_preference: 'kling', // Best for financial content
      aspect_ratio: '9:16', // Vertical for TikTok/Shorts
      duration: 10, // Max allowed by Eden API
      quality: 'standard',
      // Yeah LoRA for consistent Miyomi character
      lora: '67ef2bba6e91dc8e0efc2f1c',
      lora_strength: 0.8 // Strong character consistency
    };

    // Add audio parameter if requested
    if (includeAudio) {
      args.audio = script;
    }

    return this.createTask({ tool: 'create', args });
  }

  // Generate audio separately using Eden's TTS
  async generateMiyomiAudio({ script }) {
    const args = {
      prompt: script,
      output: 'audio',
      voice: 'alloy', // OpenAI TTS voice (if Eden supports)
      model_preference: 'openai_tts'
    };

    return this.createTask({ tool: 'create', args });
  }

  // Build MIYOMI-specific video prompt
  buildMiyomiPrompt(script, category, position, thesis) {
    return `Create a 10-second vertical video (9:16 aspect ratio) for MIYOMI, a contrarian financial oracle.

CONTENT: "${script}"

VIDEO STYLE:
- Cinematic financial trading floor atmosphere
- Dark theme with neon green/cyan accents
- Multiple floating holographic charts showing market data
- Professional woman in modern business attire speaking confidently
- Dynamic camera movements focusing on her face and gestures
- Text overlays showing key statistics and market positions
- Background: Trading screens, candlestick charts, market tickers

AUDIO: Professional female voice with confident, slightly provocative tone explaining contrarian market analysis

CATEGORY: ${category || 'market analysis'}
POSITION: ${position || 'contrarian take'}
THESIS: ${thesis || 'market inefficiency analysis'}

The video should convey expertise, confidence, and market intelligence - like a top-tier financial analyst revealing hidden market truths.`;
  }

  // Poll task with automatic retries and completion detection
  async pollTaskUntilComplete(taskId, maxAttempts = 30, intervalMs = 10000) {
    let attempts = 0;

    while (attempts < maxAttempts) {
      try {
        const result = await this.pollTask(taskId);
        const task = result.task;

        console.log(`Poll attempt ${attempts + 1}: ${task.status}`);

        if (task.status === EdenTaskStatus.COMPLETED) {
          return {
            success: true,
            task,
            videoUrl: task.result?.[0]?.output?.[0]?.url,
            thumbnailUrl: task.result?.[0]?.output?.[0]?.thumbnail
          };
        }

        if (task.status === EdenTaskStatus.FAILED) {
          return {
            success: false,
            task,
            error: task.error || 'Task failed'
          };
        }

        // Continue polling if pending/running
        if (task.status === EdenTaskStatus.PENDING || task.status === EdenTaskStatus.RUNNING) {
          attempts++;
          if (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, intervalMs));
          }
        }

      } catch (error) {
        console.error(`Poll attempt ${attempts + 1} failed:`, error);
        attempts++;

        if (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, intervalMs * 1.5)); // Longer delay on error
        }
      }
    }

    return {
      success: false,
      error: `Polling timeout after ${maxAttempts} attempts`,
      task: null
    };
  }

  // MIYOMI workflow: Generate video and wait for completion
  async generateMiyomiVideoComplete({ script, category, position, thesis, style }) {
    try {
      // Step 1: Create task
      const createResult = await this.generateMiyomiVideo({
        script, category, position, thesis, style
      });

      const taskId = createResult.task._id;
      console.log(`Created MIYOMI video task: ${taskId}`);

      // Step 2: Poll until complete
      const pollResult = await this.pollTaskUntilComplete(taskId);

      return {
        taskId,
        createResult,
        pollResult,
        success: pollResult.success,
        videoUrl: pollResult.videoUrl,
        thumbnailUrl: pollResult.thumbnailUrl,
        error: pollResult.error
      };

    } catch (error) {
      console.error('MIYOMI video generation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // MIYOMI workflow: Generate video WITH AUDIO (ElevenLabs TTS)
  async generateMiyomiVideoWithAudio({ script, category, position, thesis, style }) {
    try {
      console.log('🎬 Step 1: Generating video (visual only)...');

      // Step 1: Generate video
      const videoResult = await this.generateMiyomiVideo({
        script, category, position, thesis, style
      });

      const videoTaskId = videoResult.task._id;
      console.log(`Created video task: ${videoTaskId}`);

      // Poll video until complete
      const videoPollResult = await this.pollTaskUntilComplete(videoTaskId);

      if (!videoPollResult.success) {
        return {
          success: false,
          error: `Video generation failed: ${videoPollResult.error}`,
          step: 'video'
        };
      }

      console.log(`✅ Video complete: ${videoPollResult.videoUrl}`);
      console.log('🎙️ Step 2: Generating voiceover with ElevenLabs...');

      // Step 2: Generate voiceover using ElevenLabs
      const audioResult = await this.createTask({
        tool: 'elevenlabs',
        args: {
          text: script,
          voice: 'EXAVITQu4vr4xnSDxMaL' // Rachel - professional confident female
        }
      });

      const audioTaskId = audioResult.task._id;
      console.log(`Created audio task: ${audioTaskId}`);

      // Poll audio task until complete
      const audioPollResult = await this.pollTaskUntilComplete(audioTaskId);

      if (!audioPollResult.success) {
        return {
          success: false,
          error: `Audio generation failed: ${audioPollResult.error}`,
          step: 'audio',
          videoUrl: videoPollResult.videoUrl, // Still return video
          thumbnailUrl: videoPollResult.thumbnailUrl
        };
      }

      console.log(`✅ Audio complete: ${audioPollResult.videoUrl}`);
      console.log('⚠️ Note: Video and audio need to be combined with FFmpeg or video editor');

      return {
        success: true,
        videoTaskId,
        audioTaskId,
        videoUrl: videoPollResult.videoUrl,
        audioUrl: audioPollResult.videoUrl, // Eden returns audio in same field
        thumbnailUrl: videoPollResult.thumbnailUrl,
        needsCombining: true // Flag that these need to be merged
      };

    } catch (error) {
      console.error('MIYOMI video with audio generation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
const edenClient = new EdenClient();

export default edenClient;
export { EdenClient, EdenTaskStatus };