/**
 * Eden Video Generation API Endpoint
 *
 * POST /api/eden/generate-video
 *
 * Body:
 * {
 *   script: "Video script text",
 *   market: "Market details",
 *   position: "YES/NO",
 *   thesis: "Contrarian thesis"
 * }
 *
 * Returns:
 * {
 *   taskId: "eden_task_id",
 *   status: "pending"
 * }
 */

import edenClient from '../../lib/eden-client.js';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { script, market, position, thesis, category = 'prediction_markets' } = req.body;

    // Validate required fields
    if (!script) {
      return res.status(400).json({ error: 'Script is required' });
    }

    console.log('Generating Miyomi video:', {
      scriptLength: script.length,
      market: market || 'N/A',
      position,
      thesis: thesis?.substring(0, 100) || 'N/A'
    });

    // Generate video task
    const result = await edenClient.generateMiyomiVideo({
      script,
      category,
      position,
      thesis,
    });

    // Return task ID for polling
    return res.status(200).json({
      success: true,
      taskId: result.task._id,
      status: result.task.status,
      message: 'Video generation started. Use /api/eden/poll-video to check status.'
    });

  } catch (error) {
    console.error('Video generation failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Video generation failed'
    });
  }
}
