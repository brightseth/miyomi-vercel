/**
 * Test Eden Audio Generation Pipeline
 *
 * Tests the two-step process:
 * 1. Generate video (visual only)
 * 2. Add voiceover using Eden's audio tools
 *
 * Usage: node test-audio-pipeline.js
 */

import edenClient from './lib/eden-client.js';

async function testAudioPipeline() {
  console.log('🎬 Testing Miyomi Audio Pipeline\n');

  const testScript = `Everyone thinks Bitcoin will hit one hundred thousand dollars this month. Here's why they're wrong: funding rates are at three-month highs, retail euphoria just peaked, and smart money is quietly taking profits. When consensus gets this extreme, fade the crowd.`;

  try {
    // Step 1: Generate video with audio parameter
    console.log('Step 1: Generating video WITH audio parameter...\n');

    const videoResult = await edenClient.createTask({
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
        audio: testScript // Try audio as string
      }
    });

    console.log('✅ Video generation started!');
    console.log('Task ID:', videoResult.task._id);
    console.log('\nPolling for completion...\n');

    const pollResult = await edenClient.pollTaskUntilComplete(videoResult.task._id);

    if (pollResult.success) {
      console.log('\n✅ Video generation COMPLETE!');
      console.log('Video URL:', pollResult.videoUrl);
      console.log('Thumbnail:', pollResult.thumbnailUrl);
      console.log('\n🎙️ Testing if video has audio...\n');

      // Step 2: If no audio, try Mmaudio tool
      console.log('Step 2: Generating audio with Mmaudio...\n');

      const audioResult = await edenClient.createTask({
        tool: 'mmaudio',
        args: {
          video_url: pollResult.videoUrl,
          prompt: `Professional female voice with confident tone explaining: "${testScript}". Modern trading floor ambience with subtle electronic background music.`
        }
      });

      console.log('✅ Audio generation started!');
      console.log('Task ID:', audioResult.task._id);
      console.log('\nPolling for audio completion...\n');

      const audioPollResult = await edenClient.pollTaskUntilComplete(audioResult.task._id);

      if (audioPollResult.success) {
        console.log('\n✅ Audio generation COMPLETE!');
        console.log('Video with Audio URL:', audioPollResult.videoUrl);
        console.log('\n🎉 Final video should have audio!');
      } else {
        console.log('\n❌ Audio generation failed:', audioPollResult.error);
      }

    } else {
      console.log('\n❌ Video generation failed:', pollResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testAudioPipeline().catch(console.error);
