#!/bin/bash
# Combine Miyomi video with audio using FFmpeg
#
# Usage: ./combine-video-audio.sh <video_url> <audio_url> <output_filename>
# Example: ./combine-video-audio.sh https://...video.mp4 https://...audio.mp3 miyomi-final.mp4

VIDEO_URL=$1
AUDIO_URL=$2
OUTPUT=$3

if [ -z "$VIDEO_URL" ] || [ -z "$AUDIO_URL" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: ./combine-video-audio.sh <video_url> <audio_url> <output_filename>"
  echo ""
  echo "Example:"
  echo "./combine-video-audio.sh \\"
  echo "  https://d14i3advvh2bvd.cloudfront.net/video.mp4 \\"
  echo "  https://d14i3advvh2bvd.cloudfront.net/audio.mp3 \\"
  echo "  miyomi-bitcoin-100k.mp4"
  exit 1
fi

echo "🎬 Combining video + audio..."
echo ""
echo "Video: $VIDEO_URL"
echo "Audio: $AUDIO_URL"
echo "Output: $OUTPUT"
echo ""

# Download video
echo "📥 Downloading video..."
curl -sL "$VIDEO_URL" -o temp_video.mp4

# Download audio
echo "🎙️ Downloading audio..."
curl -sL "$AUDIO_URL" -o temp_audio.mp3

# Combine with FFmpeg
echo "🎞️ Combining with FFmpeg..."
ffmpeg -i temp_video.mp4 -i temp_audio.mp3 \
  -c:v copy \
  -c:a aac \
  -shortest \
  "$OUTPUT" \
  -y

# Clean up
rm temp_video.mp4 temp_audio.mp3

echo ""
echo "✅ Done! Final video: $OUTPUT"
echo ""
echo "Test it: open $OUTPUT"
