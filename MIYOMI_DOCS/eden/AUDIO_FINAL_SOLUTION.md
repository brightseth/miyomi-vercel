# Miyomi Audio - Final Working Solution

**Date:** October 3, 2025
**Status:** ✅ WORKING - Audio confirmed

---

## What Works

**Complete pipeline tested and verified:**
1. ✅ Video generation (Eden + Yeah LoRA)
2. ✅ Voiceover generation (ElevenLabs TTS via Eden)
3. ✅ Combination (FFmpeg local)
4. ✅ **Audio confirmed audible!**

**Known limitation:** Lip sync not perfect (can improve later with Wav2Lip/D-ID)

---

## Production Pipeline

### Step 1: Generate Video (2-5 minutes)
```javascript
const videoResult = await edenClient.createTask({
  tool: 'create',
  args: {
    prompt: miyomiPrompt,
    output: 'video',
    model_preference: 'kling',
    aspect_ratio: '9:16',
    duration: 10,
    lora: '67ef2bba6e91dc8e0efc2f1c',
    lora_strength: 0.8
  }
});
```

### Step 2: Generate Voiceover (20-30 seconds)
```javascript
const audioResult = await edenClient.createTask({
  tool: 'elevenlabs',
  args: {
    text: script,
    voice: 'EXAVITQu4vr4xnSDxMaL' // Rachel - professional female
  }
});
```

### Step 3: Combine with FFmpeg (5-10 seconds)
```bash
ffmpeg -i video.mp4 -i audio.mp3 -c:v copy -c:a aac -shortest output.mp4
```

---

## Code Implementation

### Use the Production Method

```javascript
import edenClient from './lib/eden-client.js';
import { combineVideoAudio } from './lib/ffmpeg-helper.js';

// Generate video + audio
const result = await edenClient.generateMiyomiVideoWithAudio({
  script: "Everyone thinks Bitcoin will hit $100k...",
  category: 'prediction_markets',
  position: 'NO',
  thesis: 'Funding rate exhaustion'
});

// result.videoUrl - Silent video
// result.audioUrl - Voiceover MP3

// Combine them
const finalVideo = await combineVideoAudio(
  result.videoUrl,
  result.audioUrl,
  'miyomi-bitcoin-100k.mp4'
);

// Upload finalVideo to storage/CDN
// Save URL to database
```

---

## Files Created

**Core Implementation:**
- `lib/eden-client.js` - `generateMiyomiVideoWithAudio()` method
- `lib/ffmpeg-helper.js` - `combineVideoAudio()` helper
- `combine-video-audio.sh` - Shell script for manual combining

**Test Scripts:**
- `test-full-audio-pipeline.js` - End-to-end test (video + audio generation)
- `test-elevenlabs-tts.js` - ElevenLabs TTS test
- `test-video-generation.js` - Basic video generation test

**Documentation:**
- `AUDIO_SOLUTION.md` - Complete audio research
- `AUDIO_FINAL_SOLUTION.md` - This file (working solution)
- `VIDEO_PIPELINE_STATUS.md` - Full pipeline status

---

## Timing & Costs

**Generation Time:**
- Video: 2-5 minutes
- Audio: 20-30 seconds
- Combination: 5-10 seconds
- **Total: 3-6 minutes per video**

**Estimated Costs (per video):**
- Video (Eden/Kling): ~$0.10-0.50
- Audio (ElevenLabs): ~$0.05-0.15
- **Total: ~$0.15-0.65 per complete video**

---

## Quick Start Commands

### Generate Complete Video
```bash
# Set API key
export EDEN_API_KEY=[REDACTED]

# Generate video + audio
node test-full-audio-pipeline.js

# Combine them (it will show URLs in output)
./combine-video-audio.sh <video_url> <audio_url> output.mp4

# Open result
open output.mp4
```

### Manual Step-by-Step
```bash
# 1. Generate video
node test-video-generation.js

# 2. Generate audio separately
node test-elevenlabs-tts.js

# 3. Combine with script
./combine-video-audio.sh \
  "https://d14i3advvh2bvd.cloudfront.net/VIDEO_ID.mp4" \
  "https://d14i3advvh2bvd.cloudfront.net/AUDIO_ID.mp3" \
  "miyomi-trade-1.mp4"
```

---

## Next Steps for Production

### Immediate (Tomorrow)
1. Update `/api/eden/generate-video.js` to use full pipeline
2. Add FFmpeg step to backend (server-side combination)
3. Upload final video to Supabase storage or CDN
4. Save final video URL to database

### Week 1 (Oct 4-10)
1. Generate first real trade video
2. Test end-to-end workflow
3. Post to social media (test distribution)
4. Verify audio quality with users

### Future Improvements
1. **Lip sync** - Use Wav2Lip or D-ID for better mouth movement
2. **Voice cloning** - Create custom Miyomi voice with ElevenLabs
3. **Background music** - Add subtle trading floor ambience
4. **Multiple voices** - Try different ElevenLabs voices for variety

---

## Voice Options (ElevenLabs)

Current: `EXAVITQu4vr4xnSDxMaL` (Rachel - professional female)

**Other professional female voices to try:**
- `Xb7hH8MSUJpSbSDYk0k2` (Dorothy - pleasant)
- `pNInz6obpgDQGcFmaJgB` (Adam - but this might be male)
- `21m00Tcm4TlvDq8ikWAM` (Rachel alternative)

Test different voices by changing the `voice` parameter in the code.

---

## Working Example Video

**Test video created:** `miyomi-bitcoin-test.mp4`

**Contains:**
- Miyomi character (Yeah LoRA consistency)
- Professional female voiceover
- Bitcoin contrarian take
- 10 seconds, 9:16 vertical format

**Audio confirmed working!** (Not perfectly lip-synced, but audible and clear)

---

## Environment Variables

```bash
# .env.local
EDEN_API_KEY=[REDACTED]
EDEN_AGENT_ID=68aae13174876e833d9ae73b
```

---

## Summary

**Status:** ✅ Complete and working
**Blocker:** None
**Ready for:** Production integration

The audio pipeline is fully functional. Video + voiceover generation works perfectly. FFmpeg combination is fast and reliable. Ready to integrate into the main API and generate first real trade video tomorrow!

---

**Test Result:** Audio confirmed audible in final video ✅
