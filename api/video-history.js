// API endpoint to get video history from database
import { getVideoHistory, getVideosByCategory } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, limit } = req.query;

    let result;
    if (category) {
      result = await getVideosByCategory(category);
    } else {
      result = await getVideoHistory(parseInt(limit) || 50);
    }

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error
      });
    }

    res.status(200).json({
      success: true,
      videos: result.data,
      count: result.data.length,
      category: category || 'all'
    });

  } catch (error) {
    console.error('Error getting video history:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Unknown error occurred'
    });
  }
}