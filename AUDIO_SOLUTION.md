# Miyomi Audio Solution

**Issue:** Video generated without audio

---

## Eden Audio Capabilities ✅

Eden DOES support audio generation! Multiple approaches available:

### Video + Audio Tools (Automatic)
- **Mmaudio** - Generate audio that matches video content + prompt
- **Thinksound** - Generate audio that matches video content + prompt

### Text-to-Speech Tools
- **ElevenLabs** - High-quality voiceovers
- **Zonos** - Alternative TTS option

### Music/Sound Tools
- **ElevenLabs Fx** - Sound effects
- **ElevenLabs Music** - Text-to-music
- **Musicgen** - Music generation

## Solution: Two-Step Process

1. Generate video (visual only with Yeah LoRA)
2. Add voiceover using Eden audio tools
3. Get final video with audio

---

## Implementation Options

### Option 1: Eden Mmaudio (Recommended - Easiest)

**Workflow:**
```javascript
// Step 1: Generate video
const video = await edenClient.createTask({
  tool: 'create',
  args: {
    prompt: miyomiPrompt,
    output: 'video',
    lora: '67ef2bba6e91dc8e0efc2f1c',
    ...
  }
});

// Step 2: Add audio using Mmaudio
const withAudio = await edenClient.createTask({
  tool: 'mmaudio',
  args: {
    video_url: video.result.url,
    prompt: `Professional female voice: "${script}". Trading floor ambience.`
  }
});
```

**Why:**
- Automatic video + audio combination
- Built into Eden platform
- No external tools needed
- Handles sync automatically

### Option 2: Eden ElevenLabs TTS

**Workflow:**
```javascript
// Step 1: Generate TTS audio
const audio = await edenClient.createTask({
  tool: 'elevenlabs',
  args: {
    text_input: script,
    voice: 'Rachel', // Professional female
    model_id: 'eleven_monolingual_v1'
  }
});

// Step 2: Combine with video (needs additional step)
```

**Miyomi Voice Characteristics:**
- Female voice (Rachel or similar)
- Confident, slightly edgy tone
- Professional but casual
- New York downtown vibe

### Option 2: Music/Background Audio Only

Add background music instead of voiceover:
- Financial/trading ambience
- Electronic/modern beats
- Keeps video engaging without voice
- Much simpler to implement

### Option 3: Text-on-Screen Only

Keep videos silent:
- Text overlays convey the message
- Captions/subtitles style
- Works well for social media (many watch muted)
- No additional cost

---

## Recommended Implementation

### Phase 1 (NOW): Test Audio Parameter

**Test if `audio` parameter works directly:**
```javascript
const result = await edenClient.createTask({
  tool: 'create',
  args: {
    prompt: visualPrompt,
    output: 'video',
    audio: script, // Try audio as string
    lora: '67ef2bba6e91dc8e0efc2f1c',
    ...
  }
});
```

**If that doesn't work, use Mmaudio immediately.**

### Phase 2 (This Week): Production Pipeline with Mmaudio

**Implementation:**
```javascript
// lib/eden-client.js - Add method
async generateMiyomiVideoWithAudio({ script, category, position, thesis }) {
  // Step 1: Generate video
  const video = await this.generateMiyomiVideo({
    script, category, position, thesis
  });

  await this.pollTaskUntilComplete(video.task._id);

  // Step 2: Add audio with Mmaudio
  const withAudio = await this.createTask({
    tool: 'mmaudio',
    args: {
      video_url: video.result[0].output[0].url,
      prompt: `Professional confident female voice speaking: "${script}". Modern trading floor ambient sounds with subtle electronic music.`
    }
  });

  return this.pollTaskUntilComplete(withAudio.task._id);
}
```

### Phase 3 (Future): Custom Miyomi Voice

**Why:**
- Unique brand identity
- Consistent across all videos
- Professional polish

**Options:**
- Clone voice with ElevenLabs (~$11/month + usage)
- Create custom TTS model
- Record voice actor samples

---

## Quick Fix for Next Video

### Option A: Just Ship It

Silent videos with strong text overlays are **totally fine** for testing. Many successful creators do this.

**Prompt Enhancement:**
```javascript
buildMiyomiPrompt(script) {
  return `Create a 10-second vertical video for MIYOMI, a contrarian financial oracle.

VISUAL CONTENT:
- Professional woman trader in modern trading floor
- Dark theme with neon green/cyan accents
- Multiple holographic charts and market data
- Confident body language and gestures

TEXT OVERLAYS (CRITICAL - MUST BE READABLE):
"${script}"

Display this text prominently across the video with:
- Large, bold typography
- High contrast (white/neon text on dark background)
- Animated text appearing in sync with visual beats
- Key phrases highlighted

The video tells the story through BOTH visuals AND text, no audio needed.`;
}
```

### Option B: Add ElevenLabs TTS (30 minutes work)

**Steps:**
1. Sign up for ElevenLabs
2. Choose/clone Miyomi voice
3. Add TTS generation step
4. Use FFmpeg to combine

**Code:**
```javascript
// lib/tts-client.js
async function generateMiyomiVoiceover(script) {
  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: script,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75
      }
    })
  });

  return response.body; // Audio stream
}

// Combine with FFmpeg
async function addAudioToVideo(videoUrl, audioBuffer) {
  // Download video
  // Combine with FFmpeg
  // Upload result
}
```

---

## My Recommendation

### For First 5 Videos: Go Silent

**Reasons:**
1. Test visual identity and messaging first
2. Iterate on video style quickly
3. See what resonates with audience
4. Many people watch social videos muted anyway

**Make text overlays STRONG:**
- Large, bold typography
- High contrast colors
- Animated text sync'd with visual beats
- Key phrases stand out

### After First 5: Add Voice

**Why:**
1. You'll know what messaging works
2. Worth investing in voice at that point
3. Professional polish for scaling
4. Miyomi's personality through tone

---

## Next Action

### ✅ IMPLEMENTED: Mmaudio Pipeline

**Production method added:** `generateMiyomiVideoWithAudio()`

**Test it:**
```bash
node test-full-audio-pipeline.js
```

This will:
1. Generate video with Yeah LoRA (2-5 minutes)
2. Add audio with Mmaudio (2-5 minutes)
3. Return final video with voiceover + ambience

**Then update APIs:**
- `/api/eden/generate-video.js` - Use `generateMiyomiVideoWithAudio()`
- Dashboard - Display videos with audio working

### Alternative: Test Simple Audio Parameter First

If you want to verify whether `audio: script` works directly:
```bash
node test-video-with-audio.js
```

If that video has audio, we can use the simpler approach. If not, Mmaudio pipeline is ready to go.
