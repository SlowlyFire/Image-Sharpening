const {Jimp} = require('jimp');

async function sharpenImage(inputPath: string, outputPath: string) {
  console.log('Loading image...');
  const image = await Jimp.read(inputPath);
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  // Laplacian kernel for edge detection
  const kernel = [
    [ 0, -1,  0],
    [-1,  4, -1],
    [ 0, -1,  0]
  ];
  
  console.log('Applying Laplacian filter...');
  const output = image.clone();
  
  // Apply convolution
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let sumR = 0, sumG = 0, sumB = 0;
      
      // Convolve 3x3 neighborhood
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const idx = ((y + ky) * width + (x + kx)) * 4;
          sumR += image.bitmap.data[idx] * kernel[ky + 1][kx + 1];
          sumG += image.bitmap.data[idx + 1] * kernel[ky + 1][kx + 1];
          sumB += image.bitmap.data[idx + 2] * kernel[ky + 1][kx + 1];
        }
      }
      
      // Original pixel
      const origIdx = (y * width + x) * 4;
      const origR = image.bitmap.data[origIdx];
      const origG = image.bitmap.data[origIdx + 1];
      const origB = image.bitmap.data[origIdx + 2];
      
      // Sharpen: Original - Laplacian
      const outIdx = (y * width + x) * 4;
      output.bitmap.data[outIdx] = Math.max(0, Math.min(255, origR - sumR));
      output.bitmap.data[outIdx + 1] = Math.max(0, Math.min(255, origG - sumG));
      output.bitmap.data[outIdx + 2] = Math.max(0, Math.min(255, origB - sumB));
      output.bitmap.data[outIdx + 3] = 255;
    }
  }
  
  console.log('Saving result...');
  await output.write(outputPath);
  console.log(`Done! Sharpened image saved to: ${outputPath}`);
}

// Change these paths to your input/output images
sharpenImage('input.png', 'output.png')
  .catch(err => console.error('Error:', err));