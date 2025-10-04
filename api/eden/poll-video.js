/**
 * Eden Video Polling API Endpoint
 *
 * GET /api/eden/poll-video?taskId=xxx
 *
 * Returns:
 * {
 *   status: "completed" | "pending" | "running" | "failed",
 *   videoUrl: "https://...",
 *   thumbnailUrl: "https://...",
 *   task: { ... }
 * }
 */

import edenClient from '../../lib/eden-client.js';

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { taskId } = req.query;

    // Validate required fields
    if (!taskId) {
      return res.status(400).json({ error: 'taskId is required' });
    }

    console.log('Polling video status for task:', taskId);

    // Poll task status
    const result = await edenClient.pollTask(taskId);
    const task = result.task;

    // Extract video URL if completed
    let videoUrl = null;
    let thumbnailUrl = null;

    if (task.status === 'completed' && task.result) {
      videoUrl = task.result[0]?.output?.[0]?.url || null;
      thumbnailUrl = task.result[0]?.output?.[0]?.thumbnail || null;
    }

    return res.status(200).json({
      success: true,
      status: task.status,
      videoUrl,
      thumbnailUrl,
      task: {
        id: task._id,
        status: task.status,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        error: task.error || null
      }
    });

  } catch (error) {
    console.error('Video polling failed:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Video polling failed'
    });
  }
}
