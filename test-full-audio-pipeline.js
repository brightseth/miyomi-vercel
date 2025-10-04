/**
 * Test Complete Miyomi Video + Audio Pipeline
 *
 * Tests the production-ready two-step process:
 * 1. Generate video with Yeah LoRA (visual only)
 * 2. Add audio using Mmaudio (voiceover + ambience)
 *
 * Usage: node test-full-audio-pipeline.js
 */

import edenClient from './lib/eden-client.js';

async function testFullAudioPipeline() {
  console.log('🎬 Testing COMPLETE Miyomi Video + Audio Pipeline\n');
  console.log('This will take 4-10 minutes (video generation + audio generation)\n');

  const testScript = `Everyone thinks Bitcoin will hit one hundred thousand dollars this month. Here's why they're wrong: funding rates are at three-month highs, retail euphoria just peaked, and smart money is quietly taking profits. When consensus gets this extreme, fade the crowd.`;

  const testMarket = 'Bitcoin $100k by October 31?';
  const testPosition = 'NO';
  const testThesis = 'Extreme consensus + funding rate exhaustion = reversal imminent';

  try {
    console.log('Test Parameters:');
    console.log('----------------');
    console.log('Market:', testMarket);
    console.log('Position:', testPosition);
    console.log('Script:', testScript);
    console.log('\n');

    // Use the new two-step audio method
    const result = await edenClient.generateMiyomiVideoWithAudio({
      script: testScript,
      category: 'prediction_markets',
      position: testPosition,
      thesis: testThesis
    });

    if (result.success) {
      console.log('\n🎉 SUCCESS! Video with audio complete!\n');
      console.log('Silent Video URL:', result.silentVideoUrl);
      console.log('Final Video (with audio):', result.finalVideoUrl);
      console.log('Thumbnail:', result.thumbnailUrl);
      console.log('\nVideo Task ID:', result.videoTaskId);
      console.log('Audio Task ID:', result.audioTaskId);
      console.log('\n✅ This video should have:');
      console.log('  - Miyomi character (Yeah LoRA consistency)');
      console.log('  - Professional voiceover speaking the script');
      console.log('  - Trading floor ambient sounds');
      console.log('  - Subtle background music');
      console.log('\n🎧 Download and verify audio works!');
    } else {
      console.log('\n❌ Pipeline FAILED at step:', result.step);
      console.log('Error:', result.error);

      if (result.silentVideoUrl) {
        console.log('\n📹 Silent video was generated successfully:');
        console.log(result.silentVideoUrl);
        console.log('(Audio generation failed, but video is usable)');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Run test
console.log('Starting Miyomi Video + Audio Pipeline Test...\n');
testFullAudioPipeline().catch(console.error);
