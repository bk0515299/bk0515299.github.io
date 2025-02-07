import FFmpeg from 'ffmpeg.js';

async function convertAudio(inputFile, outputFile) {
  const ffmpeg = new FFmpeg();
  await ffmpeg.load();

  try {
    // Determine the input file format
    const inputFormat = inputFile.endsWith('.mp3') ? 'mp3' : 'wav';

    // Set the output format based on the input format
    const outputFormat = inputFormat === 'mp3' ? 'wav' : 'mp3';

    // Create a progress bar or other visual feedback mechanism
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = '0%';

    // Execute the conversion process with progress updates
    await ffmpeg.execute('-i', inputFile, '-c:a', outputFormat === 'mp3' ? 'libmp3lame' : 'pcm_s16le', '-progress', 'pipe:1', outputFile);

    // Update the progress bar to 100%
    progressBar.style.width = '100%';

    console.log('Conversion successful!');
  } catch (error) {
    console.error('Error during conversion:', error);
    // Handle the error, e.g., display an error message to the user
  }
}

// Example usage:
const inputFile = 'input.mp3';
const outputFile = 'output.wav';
convertAudio(inputFile, outputFile);