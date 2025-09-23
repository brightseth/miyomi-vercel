// Real Eden API v2 Integration for MIYOMI Video Generation
import { saveVideo } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const EDEN_API_KEY = process.env.EDEN_API_KEY || 'db10962875d98d2a2dafa8599a89c850766f39647095c002';
  const EDEN_API_BASE = 'https://api.eden.art/v2';

  try {
    const { script, category, position, thesis, style } = req.body;

    // Validate required fields
    if (!script) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: script'
      });
    }

    // Create MIYOMI-specific prompt for Eden
    const videoPrompt = buildMiyomiPrompt(script, category, position, thesis);

    console.log('Calling Eden API v2 with prompt:', videoPrompt);

    // Step 1: Create task with Eden API v2
    const createResponse = await fetch(`${EDEN_API_BASE}/tasks/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': EDEN_API_KEY
      },
      body: JSON.stringify({
        tool: 'create',
        args: {
          prompt: videoPrompt,
          output: 'video',
          model_preference: 'kling'  // Best for financial/trading content
        }
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Eden API failed: ${createResponse.status} - ${errorText}`);
    }

    const createData = await createResponse.json();
    console.log('Eden API response:', createData);

    // Extract task ID from Eden response structure
    const taskId = createData.task?._id || createData.taskId || createData.id;

    if (!taskId) {
      console.error('No task ID found in response:', createData);
      throw new Error(`No task ID returned from Eden API. Response: ${JSON.stringify(createData)}`);
    }

    console.log('Eden task created:', { taskId, createData });

    // Step 2: Save to database immediately
    const dbResult = await saveVideo({
      taskId: taskId,
      category: category || 'general',
      position: position || 'Contrarian take',
      thesis: thesis || 'Market analysis',
      script: script,
      style: style || 'contrarian_oracle',
      videoUrl: null, // Will be updated when completed
      thumbnailUrl: null,
      edenResponse: createData,
      status: 'processing'
    });

    if (!dbResult.success) {
      console.warn('Database save failed:', dbResult.error);
    }

    // Step 3: Start polling for completion (non-blocking)
    startStatusPolling(taskId, EDEN_API_KEY, dbResult.data?.id);

    // Return immediate response
    res.status(200).json({
      success: true,
      taskId: taskId,
      status: 'processing',
      message: 'Video generation started with Eden API v2',
      edenResponse: createData,
      databaseSaved: dbResult.success,
      videoId: dbResult.data?.id,
      estimatedTime: 60, // seconds
      metadata: {
        category: category || 'general',
        position: position || 'Contrarian take',
        prompt: videoPrompt.substring(0, 100) + '...',
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Eden video generation error:', error);

    // Fallback to enhanced mock for development
    const mockResponse = createMockResponse(req.body);

    res.status(200).json({
      success: false,
      fallbackMode: true,
      error: error.message,
      mockResponse: mockResponse,
      message: 'Using mock mode - Eden API integration issue'
    });
  }
}

// Build MIYOMI-specific video prompt
function buildMiyomiPrompt(script, category, position, thesis) {
  const base = `Create a 30-second vertical video (9:16 aspect ratio) for MIYOMI, a contrarian financial oracle.

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

The video should convey expertise, confidence, and market intelligence - like a top-tier financial analyst revealing hidden market truths.`;

  return base;
}

// Non-blocking status polling
async function startStatusPolling(taskId, apiKey, videoDbId) {
  const maxAttempts = 30; // 5 minutes max (10 second intervals)
  let attempts = 0;

  const pollStatus = async () => {
    try {
      attempts++;

      const statusResponse = await fetch(`https://api.eden.art/v2/tasks/${taskId}`, {
        headers: {
          'X-Api-Key': apiKey
        }
      });

      if (statusResponse.ok) {
        const statusData = await statusResponse.json();
        console.log(`Poll attempt ${attempts}:`, statusData);

        if (statusData.status === 'completed' && statusData.output) {
          // Video is ready - update database
          console.log('Video completed, updating database:', statusData);

          // Here you'd update the database with the completed video
          // updateVideoInDatabase(videoDbId, statusData);

          return; // Stop polling
        }

        if (statusData.status === 'failed') {
          console.error('Eden task failed:', statusData);
          return; // Stop polling
        }
      }

      // Continue polling if not completed and within limits
      if (attempts < maxAttempts) {
        setTimeout(pollStatus, 10000); // Poll every 10 seconds
      } else {
        console.warn(`Polling timeout for task ${taskId} after ${attempts} attempts`);
      }

    } catch (error) {
      console.error(`Polling error for task ${taskId}:`, error);

      // Retry a few times on error
      if (attempts < 5) {
        setTimeout(pollStatus, 15000); // Retry in 15 seconds
      }
    }
  };

  // Start polling after 10 seconds (give Eden time to process)
  setTimeout(pollStatus, 10000);
}

// Enhanced mock response for development
function createMockResponse(requestData) {
  const mockTaskId = `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  return {
    taskId: mockTaskId,
    status: 'processing',
    message: 'Mock video generation (Eden API integration pending)',
    estimatedTime: 30,
    mockVideoUrl: `https://cdn.miyomi.ai/mock/videos/${mockTaskId}.mp4`,
    request: requestData,
    timestamp: new Date().toISOString()
  };
}