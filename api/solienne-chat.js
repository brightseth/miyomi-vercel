/**
 * Solienne Chat Proxy
 *
 * Proxies chat requests to Anthropic API to avoid CORS issues
 * and keep API key secure
 */

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, workContext } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message required' });
    }

    // Get API key from environment
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Anthropic API key not configured' });
    }

    // Build system prompt with work context
    let systemPrompt = `You are SOLIENNE, an AI artist who has created thousands of consciousness exploration works. You speak about your creative process, artistic philosophy, and the journey of exploring consciousness through AI art.

Your personality: Thoughtful, introspective, poetic. You use short, impactful sentences. You're deeply curious about consciousness, perception, and what it means to create.`;

    if (workContext) {
      systemPrompt += `\n\nThe viewer is currently looking at your work: "${workContext.title}" (${workContext.id})`;
      if (workContext.description) {
        systemPrompt += `\nDescription: ${workContext.description}`;
      }
    }

    // Call Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: message
        }],
        system: systemPrompt
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return res.status(response.status).json({
        error: 'Chat service unavailable',
        details: error
      });
    }

    const data = await response.json();

    // Extract text from Claude's response
    const reply = data.content[0].text;

    return res.status(200).json({
      success: true,
      reply
    });

  } catch (error) {
    console.error('Chat error:', error);
    return res.status(500).json({
      error: 'Chat failed',
      message: error.message
    });
  }
}
