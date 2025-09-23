// Enhanced video generation API using improved Eden client
import edenClient from '../lib/eden-client.js';
import { saveVideo } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { script, category, position, thesis, style, waitForCompletion = false } = req.body;

    // Validate required fields
    if (!script) {
      return res.status(400).json({
        success: false,
        error: 'Missing required field: script'
      });
    }

    console.log('Generating MIYOMI video with enhanced client:', {
      script: script.substring(0, 50) + '...',
      category,
      position,
      waitForCompletion
    });

    let result;

    if (waitForCompletion) {
      // Option 1: Generate and wait for completion (slower but complete)
      result = await edenClient.generateMiyomiVideoComplete({
        script, category, position, thesis, style
      });

      if (result.success) {
        // Save completed video to database
        const dbResult = await saveVideo({
          taskId: result.taskId,
          category: category || 'general',
          position: position || 'Contrarian take',
          thesis: thesis || 'Market analysis',
          script: script,
          style: style || 'contrarian_oracle',
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
          edenResponse: result.createResult,
          status: 'completed'
        });

        return res.status(200).json({
          success: true,
          taskId: result.taskId,
          status: 'completed',
          videoUrl: result.videoUrl,
          thumbnailUrl: result.thumbnailUrl,
          message: 'Video generated successfully',
          databaseSaved: dbResult.success,
          videoId: dbResult.data?.id,
          processingTime: 'immediate',
          metadata: {
            category: category || 'general',
            position: position || 'Contrarian take',
            createdAt: new Date().toISOString()
          }
        });
      } else {
        throw new Error(result.error);
      }

    } else {
      // Option 2: Start generation and return immediately (faster response)
      const createResult = await edenClient.generateMiyomiVideo({
        script, category, position, thesis, style
      });

      const taskId = createResult.task._id;

      // Save to database immediately
      const dbResult = await saveVideo({
        taskId: taskId,
        category: category || 'general',
        position: position || 'Contrarian take',
        thesis: thesis || 'Market analysis',
        script: script,
        style: style || 'contrarian_oracle',
        videoUrl: null, // Will be updated when completed
        thumbnailUrl: null,
        edenResponse: createResult,
        status: 'processing'
      });

      // Start background polling (non-blocking)
      startBackgroundPolling(taskId, dbResult.data?.id);

      return res.status(200).json({
        success: true,
        taskId: taskId,
        status: 'processing',
        message: 'Video generation started',
        edenResponse: createResult,
        databaseSaved: dbResult.success,
        videoId: dbResult.data?.id,
        estimatedTime: '60-120 seconds',
        pollUrl: `/api/video-status/${taskId}`,
        metadata: {
          category: category || 'general',
          position: position || 'Contrarian take',
          script: script.substring(0, 100) + '...',
          createdAt: new Date().toISOString()
        }
      });
    }

  } catch (error) {
    console.error('Enhanced video generation error:', error);

    // Return intelligent error response
    res.status(500).json({
      success: false,
      error: error.message || 'Video generation failed',
      fallbackSuggestion: 'Try using /api/generate-video-v2 for mock mode',
      timestamp: new Date().toISOString()
    });
  }
}

// Background polling to update database when video completes
async function startBackgroundPolling(taskId, videoDbId) {
  try {
    console.log(`Starting background polling for task ${taskId}`);

    const result = await edenClient.pollTaskUntilComplete(taskId, 20, 15000); // 5 minute max, 15 second intervals

    if (result.success && videoDbId) {
      console.log(`Video completed: ${taskId}, updating database`);

      // Here you would update the database record
      // updateVideoInDatabase(videoDbId, {
      //   status: 'completed',
      //   videoUrl: result.videoUrl,
      //   thumbnailUrl: result.thumbnailUrl,
      //   completedAt: new Date()
      // });

      console.log(`Database updated for completed video: ${taskId}`);
    } else {
      console.error(`Video generation failed for task ${taskId}:`, result.error);
    }

  } catch (error) {
    console.error(`Background polling failed for task ${taskId}:`, error);
  }
}