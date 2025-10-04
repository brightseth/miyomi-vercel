/**
 * Test Eden Video Generation with Miyomi
 *
 * Usage: node test-video-generation.js
 */

import edenClient from './lib/eden-client.js';

async function testVideoGeneration() {
  console.log('🎬 Testing Miyomi Video Generation\n');

  // Test script: Contrarian take on Bitcoin
  const testScript = `Everyone thinks Bitcoin will hit $100k this month.
Here's why they're wrong: funding rates are at 3-month highs,
retail euphoria just peaked, and smart money is quietly taking profits.
When consensus gets this extreme, fade the crowd.`;

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

    console.log('Generating video with Yeah LoRA...\n');

    // Use the Miyomi video generation method
    const result = await edenClient.generateMiyomiVideo({
      script: testScript,
      category: 'prediction_markets',
      position: testPosition,
      thesis: testThesis
    });

    console.log('✅ Video generation started!');
    console.log('Task ID:', result.task._id);
    console.log('Status:', result.task.status);
    console.log('\nPolling for completion (this may take 2-5 minutes)...\n');

    // Poll until complete
    const pollResult = await edenClient.pollTaskUntilComplete(result.task._id);

    if (pollResult.success) {
      console.log('\n✅ Video generation COMPLETE!');
      console.log('Video URL:', pollResult.videoUrl);
      console.log('Thumbnail:', pollResult.thumbnailUrl);
      console.log('\nYou can now:');
      console.log('1. Download the video');
      console.log('2. Review character consistency (should look like Yeah LoRA)');
      console.log('3. Check if Miyomi\'s personality comes through');
    } else {
      console.log('\n❌ Video generation FAILED');
      console.log('Error:', pollResult.error);
      console.log('Task:', JSON.stringify(pollResult.task, null, 2));
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.error('Stack:', error.stack);
  }
}

// Run test
testVideoGeneration().catch(console.error);
