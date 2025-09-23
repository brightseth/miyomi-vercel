// Video status checking endpoint
import edenClient from '../../lib/eden-client.js';

export default async function handler(req, res) {
  const { taskId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!taskId) {
    return res.status(400).json({ error: 'Missing taskId parameter' });
  }

  try {
    console.log(`Checking status for task: ${taskId}`);

    const result = await edenClient.pollTask(taskId);
    const task = result.task;

    // Extract video URLs if completed
    let videoUrl = null;
    let thumbnailUrl = null;

    if (task.status === 'completed' && task.result) {
      const output = task.result[0]?.output?.[0];
      videoUrl = output?.url;
      thumbnailUrl = output?.thumbnail;
    }

    res.status(200).json({
      success: true,
      taskId: taskId,
      status: task.status,
      progress: task.progress || 0,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      error: task.error,
      performance: task.performance,
      cost: task.cost,
      estimatedTimeRemaining: estimateTimeRemaining(task),
      metadata: {
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        tool: task.tool,
        outputType: task.output_type
      }
    });

  } catch (error) {
    console.error(`Error checking status for task ${taskId}:`, error);

    res.status(500).json({
      success: false,
      error: error.message,
      taskId: taskId
    });
  }
}

// Estimate remaining time based on task status and performance
function estimateTimeRemaining(task) {
  if (task.status === 'completed' || task.status === 'failed') {
    return 0;
  }

  if (task.status === 'pending') {
    return 60; // Usually starts within 60 seconds
  }

  if (task.status === 'running') {
    const runTime = task.performance?.runTime || 0;
    const averageVideoTime = 90; // Kling videos typically take 60-120 seconds
    return Math.max(10, averageVideoTime - runTime);
  }

  return 60; // Default estimate
}