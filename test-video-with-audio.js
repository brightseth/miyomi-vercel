/**
 * Test Eden Video Generation WITH AUDIO
 *
 * Usage: node test-video-with-audio.js
 */

import edenClient from './lib/eden-client.js';

async function testVideoWithAudio() {
  console.log('🎬 Testing Miyomi Video Generation WITH AUDIO\n');

  const testScript = `Everyone thinks Bitcoin will hit one hundred thousand dollars this month. Here's why they're wrong: funding rates are at three-month highs, retail euphoria just peaked, and smart money is quietly taking profits. When consensus gets this extreme, fade the crowd.`;

  try {
    console.log('Generating video with audio...\n');

    // Try different audio parameter formats
    const result = await edenClient.createTask({
      tool: 'create',
      args: {
        prompt: 'A professional female trader with edgy style, tattoos and piercings, speaking confidently about Bitcoin predictions in a modern trading floor with holographic charts and neon lights',
        output: 'video',
        model_preference: 'kling',
        aspect_ratio: '9:16',
        duration: 10,
        quality: 'standard',
        lora: '67ef2bba6e91dc8e0efc2f1c',
        lora_strength: 0.8,
        // Audio parameter - trying different formats
        audio: testScript
      }
    });

    console.log('✅ Video generation started!');
    console.log('Task ID:', result.task._id);
    console.log('\nPolling for completion...\n');

    const pollResult = await edenClient.pollTaskUntilComplete(result.task._id);

    if (pollResult.success) {
      console.log('\n✅ Video generation COMPLETE WITH AUDIO!');
      console.log('Video URL:', pollResult.videoUrl);
      console.log('Thumbnail:', pollResult.thumbnailUrl);
      console.log('\n🎙️ Check if this one has audio!');
    } else {
      console.log('\n❌ Failed:', pollResult.error);
      console.log('Task:', JSON.stringify(pollResult.task, null, 2));
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testVideoWithAudio().catch(console.error);
