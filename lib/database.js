// Supabase database client for MIYOMI
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Database functions for MIYOMI

// Save generated video to database
export async function saveVideo(videoData) {
  if (!supabase) {
    console.warn('Supabase not configured, skipping database save');
    return { success: false, error: 'Database not configured' };
  }

  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([{
        eden_task_id: videoData.taskId,
        category: videoData.category,
        position: videoData.position,
        thesis: videoData.thesis,
        script: videoData.script,
        style: videoData.style,
        video_url: videoData.videoUrl,
        thumbnail_url: videoData.thumbnailUrl,
        eden_response: videoData.edenResponse,
        status: videoData.status || 'processing'
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error saving video:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error saving video:', error);
    return { success: false, error: error.message };
  }
}

// Update video status when Eden processing completes
export async function updateVideoStatus(taskId, status, videoUrl = null, thumbnailUrl = null) {
  if (!supabase) return { success: false, error: 'Database not configured' };

  try {
    const updateData = { status };
    if (videoUrl) updateData.video_url = videoUrl;
    if (thumbnailUrl) updateData.thumbnail_url = thumbnailUrl;

    const { data, error } = await supabase
      .from('videos')
      .update(updateData)
      .eq('eden_task_id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Database error updating video:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating video:', error);
    return { success: false, error: error.message };
  }
}

// Get video history
export async function getVideoHistory(limit = 50) {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty history');
    return { success: true, data: [] };
  }

  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Database error getting video history:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error getting video history:', error);
    return { success: false, error: error.message };
  }
}

// Get videos by category
export async function getVideosByCategory(category) {
  if (!supabase) return { success: true, data: [] };

  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Database error getting videos by category:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error getting videos by category:', error);
    return { success: false, error: error.message };
  }
}

// Save market data
export async function saveMarket(marketData) {
  if (!supabase) return { success: false, error: 'Database not configured' };

  try {
    const { data, error } = await supabase
      .from('markets')
      .upsert([{
        platform: marketData.platform,
        market_id: marketData.marketId,
        title: marketData.title,
        current_price: marketData.price,
        volume: marketData.volume,
        url: marketData.url,
        category: marketData.category
      }], {
        onConflict: 'platform,market_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error saving market:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error saving market:', error);
    return { success: false, error: error.message };
  }
}

// Get markets by category
export async function getMarkets(category = null) {
  if (!supabase) return { success: true, data: [] };

  try {
    let query = supabase
      .from('markets')
      .select('*')
      .order('last_updated', { ascending: false });

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query.limit(20);

    if (error) {
      console.error('Database error getting markets:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error getting markets:', error);
    return { success: false, error: error.message };
  }
}

// Record video performance metrics
export async function recordVideoMetrics(videoId, platform, metrics) {
  if (!supabase) return { success: false, error: 'Database not configured' };

  try {
    const { data, error } = await supabase
      .from('video_metrics')
      .upsert([{
        video_id: videoId,
        platform,
        views: metrics.views || 0,
        likes: metrics.likes || 0,
        shares: metrics.shares || 0,
        comments: metrics.comments || 0,
        revenue: metrics.revenue || 0
      }], {
        onConflict: 'video_id,platform'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error recording video metrics:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error recording video metrics:', error);
    return { success: false, error: error.message };
  }
}

// Get video analytics
export async function getVideoAnalytics() {
  if (!supabase) return { success: true, data: [] };

  try {
    const { data, error } = await supabase
      .from('video_analytics')
      .select('*')
      .limit(50);

    if (error) {
      console.error('Database error getting video analytics:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error getting video analytics:', error);
    return { success: false, error: error.message };
  }
}

// Get daily metrics
export async function getDailyMetrics(days = 30) {
  if (!supabase) return { success: true, data: [] };

  try {
    const { data, error } = await supabase
      .from('daily_metrics')
      .select('*')
      .order('date', { ascending: false })
      .limit(days);

    if (error) {
      console.error('Database error getting daily metrics:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error getting daily metrics:', error);
    return { success: false, error: error.message };
  }
}

// Health check - test database connection
export async function healthCheck() {
  if (!supabase) {
    return { 
      healthy: false, 
      error: 'Supabase not configured',
      details: 'SUPABASE_URL and SUPABASE_ANON_KEY environment variables not set'
    };
  }

  try {
    const { data, error } = await supabase
      .from('videos')
      .select('count')
      .limit(1);

    if (error) {
      return { 
        healthy: false, 
        error: error.message,
        details: 'Database connection failed'
      };
    }

    return { 
      healthy: true, 
      message: 'Database connection successful',
      tables: ['videos', 'markets', 'positions', 'video_metrics', 'daily_metrics']
    };
  } catch (error) {
    return { 
      healthy: false, 
      error: error.message,
      details: 'Database health check failed'
    };
  }
}