# Video Pipeline Setup - Technical Handoff for jmill

**Date:** October 2, 2025
**Status:** Infrastructure 75% complete, ready for video integration
**Priority:** CRITICAL PATH - Blocks content production

---

## What's Already Done ✅

### Database (Supabase)
- **6 tables deployed:** trades, videos, performance, revenue, opportunities, social_posts
- **Connection working:** Tested with real data saves
- **Location:** `database/schema-simple.sql`

### Opportunity Detection
- **Polymarket client working:** Scanning 500+ markets
- **Contrarian finder:** Identifies >75% or <25% consensus
- **Thesis generator:** Creates Miyomi's take on opportunities
- **Database integration:** Saves opportunities automatically
- **Test script:** `test-workflow.js` (complete end-to-end minus video)

### Eden Client
- **Library exists:** `lib/eden-client.js`
- **API credentials configured:** EDEN_API_KEY + EDEN_AGENT_ID in `.env.local`
- **Miyomi agent ID:** `68aae13174876e833d9ae73b`
- **Methods built:** `generateMiyomiVideo()`, `pollTaskUntilComplete()`

---

## What You Need to Do 🎯

### Task 1: Test Miyomi Agent Video Generation (1 hour)

**Goal:** Verify that Miyomi agent (`68aae13174876e833d9ae73b`) can generate videos with Yeah LoRA.

**Test Script Created:** `test-miyomi-agent-video.js`

**Run:**
```bash
cd /Users/seth/miyomi-vercel
node test-miyomi-agent-video.js
```

**Expected Output:**
```
🎬 Testing Miyomi Agent Video Generation

Agent ID: 68aae13174876e833d9ae73b
API Key: db10962875d98d2a2daf...

Creating task with Miyomi agent...
✅ Task created: [task_id]
Status: pending

⏳ Polling for completion (max 5 minutes)...

✅ VIDEO GENERATED SUCCESSFULLY!

📹 Video URL: https://...
🖼️  Thumbnail: https://...
💰 Cost: $0.XX
⏱️  Duration: 10s

✅ Yeah LoRA is working!
```

**What to Check:**
1. **Does video generate?** (Success/failure)
2. **Does character look like Miyomi?** (Yeah LoRA = edgy aesthetic, tattoos, piercings, black hair)
3. **What's the cost per video?** (For budget planning)
4. **How long does generation take?** (For workflow timing)

**If It Fails:**
- Check API key permissions
- Verify agent ID is correct
- Check Eden API status
- Look at error message for guidance

---

### Task 2: Update Eden Client for Agent-Based Generation (30 mins)

**Current Issue:** `lib/eden-client.js` doesn't use agent ID parameter.

**What to Change:**

**File:** `lib/eden-client.js`

**Current (line 110-123):**
```javascript
async generateMiyomiVideo({ script, category, position, thesis, style }) {
  const prompt = this.buildMiyomiPrompt(script, category, position, thesis);

  const args = {
    text_input: prompt,
    type: 'video',
    model_preference: 'kling',
    aspect_ratio: '9:16',
    duration: 10,
    quality: 'standard'
  };

  return this.createTask({ tool: 'create', args });
}
```

**Update To:**
```javascript
async generateMiyomiVideo({ script, category, position, thesis, style, agentId }) {
  const prompt = this.buildMiyomiPrompt(script, category, position, thesis);

  const args = {
    agentId: agentId || process.env.EDEN_AGENT_ID, // Use Miyomi agent (has Yeah LoRA)
    text_input: prompt,
    type: 'video',
    aspect_ratio: '9:16',
    duration: 10,
    quality: 'standard'
  };

  return this.createTask({ tool: 'create', args });
}
```

**Key Change:** Add `agentId` parameter so agent's LoRA is automatically used.

---

### Task 3: Build Complete Video Workflow (1-2 hours)

**Goal:** Connect opportunity detection → video generation → database save.

**Create:** `workflows/generate-video-from-opportunity.js`

```javascript
import { createClient } from '@supabase/supabase-js';
import edenClient from '../lib/eden-client.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Complete workflow: Opportunity → Video → Database
 */
async function generateVideoFromOpportunity(opportunityId) {
  console.log('\n🎬 MIYOMI VIDEO WORKFLOW\n');

  // 1. Get opportunity from database
  const { data: opp, error } = await supabase
    .from('opportunities')
    .select('*')
    .eq('id', opportunityId)
    .single();

  if (error) throw new Error('Opportunity not found');

  console.log('📊 Opportunity:', opp.question);
  console.log('💭 Thesis:', opp.miyomi_thesis);

  // 2. Build video script
  const script = `
${opp.question}

The consensus is ${(opp.consensus === 'YES' ? opp.yes_price : opp.no_price) * 100}% ${opp.consensus}.

${opp.miyomi_thesis}

Position: ${opp.contrarian} at ${opp.recommended_size} dollars.
`;

  console.log('\n📝 Script prepared\n');

  // 3. Generate video with Eden
  console.log('🎥 Generating video with Miyomi agent...\n');

  const result = await edenClient.generateMiyomiVideoComplete({
    script,
    category: opp.platform,
    position: opp.contrarian,
    thesis: opp.miyomi_thesis
  });

  if (!result.success) {
    throw new Error(`Video generation failed: ${result.error}`);
  }

  console.log('✅ Video generated:', result.videoUrl);

  // 4. Save video to database
  const { data: video, error: saveError } = await supabase
    .from('videos')
    .insert([{
      trade_id: null, // No trade yet
      eden_task_id: result.taskId,
      script,
      video_url: result.videoUrl,
      thumbnail_url: result.thumbnailUrl,
      duration: 10,
      status: 'completed',
      category: opp.platform,
      style: 'Yeah LoRA contrarian',
      created_at: new Date().toISOString()
    }])
    .select()
    .single();

  if (saveError) throw saveError;

  console.log('💾 Saved to database:', video.id);

  // 5. Update opportunity with video link
  await supabase
    .from('opportunities')
    .update({ video_id: video.id })
    .eq('id', opportunityId);

  console.log('\n✅ COMPLETE WORKFLOW SUCCESSFUL\n');

  return {
    opportunity: opp,
    video,
    videoUrl: result.videoUrl
  };
}

// CLI usage
const opportunityId = process.argv[2];
if (!opportunityId) {
  console.error('Usage: node generate-video-from-opportunity.js <opportunity_id>');
  process.exit(1);
}

generateVideoFromOpportunity(opportunityId)
  .then(result => {
    console.log('🎉 Success! Video ready at:', result.videoUrl);
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Workflow failed:', error);
    process.exit(1);
  });
```

**To Test:**
```bash
# Get an opportunity ID from database
node test-workflow.js  # This creates one

# Check database for opportunity ID
# Then generate video
node workflows/generate-video-from-opportunity.js <opportunity_id>
```

---

## Critical Questions to Answer

After testing, document these answers:

### 1. Video Generation
- ✅ Does Miyomi agent generate videos?
- ✅ Does Yeah LoRA work (correct visual style)?
- ✅ What's the generation time? (X minutes)
- ✅ What's the cost per video? ($X.XX)

### 2. Quality
- ✅ Does the character look consistent?
- ✅ Is the video quality acceptable for social media?
- ✅ Do we need to adjust any parameters?

### 3. Rate Limits
- ✅ How many videos can we generate per hour?
- ✅ Are there daily limits?
- ✅ Do we need to batch requests?

### 4. Error Handling
- ✅ What errors can occur?
- ✅ How should we handle failures?
- ✅ Do we need retry logic?

---

## Success Criteria

**You're done when:**

1. ✅ Test script runs successfully
2. ✅ Video generates with correct character (Yeah LoRA)
3. ✅ Complete workflow tested (opportunity → video → database)
4. ✅ Cost and timing documented
5. ✅ You can generate a video on demand

**Then we can:**
- Schedule daily opportunity scans
- Auto-generate videos for top picks
- Post to social media automatically
- Start building Miyomi's content library

---

## Timeline

**Target: End of Week (Oct 7)**

- **Monday-Tuesday:** Test agent video generation, document findings
- **Wednesday:** Update Eden client, test workflow
- **Thursday:** Debug any issues, optimize parameters
- **Friday:** Generate first 3 production videos

**Milestone:** First video published to social media by Oct 14

---

## Resources

### Files You'll Work With
- `lib/eden-client.js` - Eden API integration
- `test-miyomi-agent-video.js` - Test script (already created)
- `workflows/generate-video-from-opportunity.js` - Full workflow (create this)
- `.env.local` - API credentials (already configured)

### Database Tables
- `opportunities` - Contrarian market picks
- `videos` - Generated video metadata
- `trades` - Track positions (Phase 2)

### API Credentials
- **Eden API Key:** `db10962875d98d2a2dafa8599a89c850766f39647095c002`
- **Miyomi Agent ID:** `68aae13174876e833d9ae73b`
- **Supabase:** Credentials in `.env.local`

### Documentation
- Eden API: https://api.eden.art/documentation
- Yeah LoRA: https://app.eden.art/models/67ef2bba6e91dc8e0efc2f1c
- Miyomi Agent: https://app.eden.art/agents/68aae13174876e833d9ae73b

---

## What Seth Will Do (Parallel)

While you work on videos, Seth will:
- Fix Polymarket API to get live markets
- Begin affiliate partnership discussions
- Prepare social media accounts
- Create posting automation

---

## Communication

**Questions?** Ping Seth anytime.

**Progress Updates:** Daily standup in Farcaster or GitHub issues.

**Blockers?** Flag immediately - this is critical path.

---

## Next Session Handoff

When you're done testing, update:
1. `SESSION_NOTES.md` - What you found
2. `PROJECT_STATUS.md` - Update video pipeline to 100%
3. GitHub commit with results

**Commit message template:**
```
Video pipeline tested: [SUCCESS/BLOCKED]

- Eden agent video generation: [working/needs setup]
- Yeah LoRA character: [correct/needs adjustment]
- Cost per video: $X.XX
- Generation time: X minutes
- [Any blockers or issues]
```

---

**Let's ship this.** 🚀

The infrastructure is ready. We just need the video engine running, then we can start producing content and building Miyomi's audience.

**Target: First video by Oct 14, token launch by mid-December.**
