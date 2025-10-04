/**
 * FFmpeg helper for combining video + audio
 *
 * This runs FFmpeg locally to merge video and audio files.
 * For production, this should run server-side.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

/**
 * Download file from URL
 */
async function downloadFile(url, outputPath) {
  const { stdout, stderr } = await execAsync(`curl -sL "${url}" -o "${outputPath}"`);
  if (stderr && !fs.existsSync(outputPath)) {
    throw new Error(`Failed to download ${url}: ${stderr}`);
  }
  return outputPath;
}

/**
 * Combine video and audio using FFmpeg
 *
 * @param {string} videoUrl - URL to video file
 * @param {string} audioUrl - URL to audio file
 * @param {string} outputFilename - Output filename (e.g., "miyomi-trade-1.mp4")
 * @returns {Promise<string>} - Path to combined video
 */
export async function combineVideoAudio(videoUrl, audioUrl, outputFilename = 'output.mp4') {
  const tempDir = path.join(process.cwd(), 'temp');

  // Create temp directory if it doesn't exist
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const tempVideo = path.join(tempDir, 'temp_video.mp4');
  const tempAudio = path.join(tempDir, 'temp_audio.mp3');
  const outputPath = path.join(process.cwd(), outputFilename);

  try {
    console.log('📥 Downloading video...');
    await downloadFile(videoUrl, tempVideo);

    console.log('🎙️ Downloading audio...');
    await downloadFile(audioUrl, tempAudio);

    console.log('🎞️ Combining with FFmpeg...');

    // Combine with FFmpeg
    // -c:v copy = copy video codec (fast, no re-encoding)
    // -c:a aac = encode audio as AAC
    // -shortest = match duration to shortest stream
    // -y = overwrite output file
    const ffmpegCmd = `ffmpeg -i "${tempVideo}" -i "${tempAudio}" -c:v copy -c:a aac -shortest "${outputPath}" -y`;

    const { stdout, stderr } = await execAsync(ffmpegCmd);

    // Clean up temp files
    fs.unlinkSync(tempVideo);
    fs.unlinkSync(tempAudio);

    console.log('✅ Video combined successfully:', outputPath);
    return outputPath;

  } catch (error) {
    // Clean up on error
    if (fs.existsSync(tempVideo)) fs.unlinkSync(tempVideo);
    if (fs.existsSync(tempAudio)) fs.unlinkSync(tempAudio);

    throw new Error(`FFmpeg combination failed: ${error.message}`);
  }
}

/**
 * Check if FFmpeg is available
 */
export async function checkFFmpeg() {
  try {
    const { stdout } = await execAsync('ffmpeg -version');
    return stdout.includes('ffmpeg version');
  } catch (error) {
    return false;
  }
}

export default {
  combineVideoAudio,
  checkFFmpeg
};
