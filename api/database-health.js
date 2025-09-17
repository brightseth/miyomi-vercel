// API endpoint to check database health
import { healthCheck } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const health = await healthCheck();
    
    const statusCode = health.healthy ? 200 : 500;
    
    res.status(statusCode).json({
      healthy: health.healthy,
      message: health.message || health.error,
      details: health.details,
      tables: health.tables,
      timestamp: new Date().toISOString(),
      environment: {
        hasSupabaseUrl: !!process.env.SUPABASE_URL,
        hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY
      }
    });

  } catch (error) {
    console.error('Database health check error:', error);
    
    res.status(500).json({
      healthy: false,
      error: error.message || 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
}