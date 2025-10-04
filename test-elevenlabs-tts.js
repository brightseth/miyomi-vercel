/**
 * Test Eden ElevenLabs TTS Integration
 *
 * Tests generating voiceover separately, then combining with video
 *
 * Usage: node test-elevenlabs-tts.js
 */

import edenClient from './lib/eden-client.js';

async function testElevenLabsTTS() {
  console.log('🎙️ Testing ElevenLabs TTS via Eden\n');

  const testScript = `Everyone thinks Bitcoin will hit one hundred thousand dollars this month. Here's why they're wrong: funding rates are at three-month highs, retail euphoria just peaked, and smart money is quietly taking profits. When consensus gets this extreme, fade the crowd.`;

  try {
    // Step 1: Generate TTS audio
    console.log('Step 1: Generating voiceover with ElevenLabs...\n');

    const ttsResult = await edenClient.createTask({
      tool: 'elevenlabs',
      args: {
        text: testScript,
        voice: 'EXAVITQu4vr4xnSDxMaL' // Rachel - professional female
      }
    });

    console.log('✅ TTS generation started!');
    console.log('Task ID:', ttsResult.task._id);
    console.log('\nPolling for completion...\n');

    const pollResult = await edenClient.pollTaskUntilComplete(ttsResult.task._id);

    if (pollResult.success) {
      console.log('\n✅ TTS generation COMPLETE!');
      console.log('Audio URL:', pollResult.videoUrl); // Eden returns URLs in same field
      console.log('\n🎉 Can now combine this audio with video!');

      // Next step would be to combine with video using ffmpeg or similar
      console.log('\nNext: Use this audio URL to add voiceover to Miyomi video');

    } else {
      console.log('\n❌ TTS generation failed:', pollResult.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  }
}

testElevenLabsTTS().catch(console.error);
