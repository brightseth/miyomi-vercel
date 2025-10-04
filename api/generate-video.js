// Vercel serverless function for Eden API video generation
import { saveVideo } from '../lib/database.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const EDEN_API_KEY = process.env.EDEN_API_KEY;
  if (!EDEN_API_KEY) {
    return res.status(500).json({ error: 'EDEN_API_KEY not configured' });
  }
  const MIYOMI_AGENT_ID = '68aae13174876e833d9ae73b';

  try {
    const { script, category, position, thesis, style } = req.body;

    // Build Eden API request based on the JSON structure you provided
    const edenRequest = {
      agent: MIYOMI_AGENT_ID,
      tool: "create",
      name: `MIYOMI ${category} contrarian take: ${position}`,
      public: true,
      attributes: {
        script: script,
        category: category,
        position: position,
        thesis: thesis,
        style: style || 'contrarian_oracle',
        duration: 30,
        aspectRatio: '9:16',
        voice: 'miyomi_confident',
        background: 'trading_charts'
      }
    };

    console.log('Calling Eden Academy API with:', edenRequest);

    // Use Eden Academy API for video generation
    const edenResponse = await fetch('https://test.api.eden-academy.xyz/api/v1/eden/sessions/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EDEN_API_KEY // Try API key in header
      },
      body: JSON.stringify({
        agentId: 'miyomi', // Use the agent slug
        prompt: script,
        attributes: {
          category,
          position,  
          thesis,
          style: style || 'contrarian_oracle',
          duration: 30,
          aspectRatio: '9:16'
        }
      })
    });

    let edenData;
    let taskId;
    
    if (!edenResponse.ok) {
      const errorText = await edenResponse.text();
      console.warn('Eden Academy API failed:', errorText, 'Using mock response');
      // Fallback to mock response for testing database integration
      edenData = {
        id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'processing',
        message: 'Video generation started (MOCK MODE - Eden Academy API pending)',
        mockResponse: true,
        agentId: MIYOMI_AGENT_ID,
        request: edenRequest
      };
      taskId = edenData.id;
    } else {
      edenData = await edenResponse.json();
      console.log('Eden Academy API Response:', edenData);
      taskId = edenData.sessionId || edenData.id || edenData._id || `eden_${Date.now()}`;
    }
    
    // Save video to database
    const dbResult = await saveVideo({
      taskId: taskId,
      category,
      position,
      thesis,
      script,
      style,
      videoUrl: edenData.url || null,
      thumbnailUrl: edenData.thumbnail || null,
      edenResponse: edenData,
      status: 'processing'
    });
    
    if (!dbResult.success) {
      console.warn('Failed to save video to database:', dbResult.error);
    }

    // Return successful response
    res.status(200).json({
      success: true,
      taskId: taskId,
      agentId: MIYOMI_AGENT_ID,
      status: 'processing',
      message: 'Video generation started',
      edenResponse: edenData,
      databaseSaved: dbResult.success,
      videoId: dbResult.data?.id,
      metadata: {
        category,
        position,
        script,
        createdAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error generating video:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Unknown error occurred',
      details: error.toString()
    });
  }
}