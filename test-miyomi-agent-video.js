// Test Miyomi agent video generation with Yeah LoRA
import edenClient from './lib/eden-client.js';

console.log('\n🎬 Testing Miyomi Agent Video Generation\n');
console.log('Agent ID:', process.env.EDEN_AGENT_ID);
console.log('API Key:', process.env.EDEN_API_KEY?.substring(0, 20) + '...\n');

const testScript = `
Everyone thinks Bitcoin is hitting $100k.
The consensus is 87% YES.
But the crowd is always wrong at extremes.
I'm taking NO at 0.13.
`;

try {
  // Option 1: Use agent ID directly (if Yeah LoRA is configured on agent)
  console.log('Creating task with Miyomi agent...');

  const task = await edenClient.createTask({
    tool: 'create',
    args: {
      agentId: process.env.EDEN_AGENT_ID, // Should use agent's LoRA
      text_input: testScript,
      type: 'video',
      aspect_ratio: '9:16', // Vertical
      duration: 10,
      quality: 'standard'
    }
  });

  console.log('✅ Task created:', task.task._id);
  console.log('Status:', task.task.status);
  console.log('\n⏳ Polling for completion (max 5 minutes)...\n');

  // Poll until complete
  const result = await edenClient.pollTaskUntilComplete(task.task._id, 30, 10000);

  if (result.success) {
    console.log('✅ VIDEO GENERATED SUCCESSFULLY!\n');
    console.log('📹 Video URL:', result.videoUrl);
    console.log('🖼️  Thumbnail:', result.thumbnailUrl);
    console.log('\n💰 Cost:', result.task.cost);
    console.log('⏱️  Duration:', result.task.result?.[0]?.output?.[0]?.duration);
    console.log('\n✅ Yeah LoRA is working!');
  } else {
    console.log('❌ VIDEO GENERATION FAILED\n');
    console.log('Error:', result.error);
    console.log('Task:', result.task);
  }

} catch (error) {
  console.error('❌ Test failed:', error.message);
  console.error('\nFull error:', error);
}
