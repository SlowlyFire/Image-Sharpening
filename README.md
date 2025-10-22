# Image Sharpening - Laplacian Filter

Sharpen images using Laplacian filter.

## Installation
```bash
npm install
```

## Usage
```bash
npm start <image_filename>
```

### Examples
```bash
npm start bird.png
npm start photo.jpg
```

Output saved as `output.png`

## How It Works

1. Applies 3×3 Laplacian kernel to detect edges
2. Sharpens image using: `Sharpened = Original - Laplacian`
3. Saves result

### Laplacian Kernel
```
 0  -1   0
-1   4  -1
 0  -1   0
```

## Project Structure
```
├── src/
│   └── sharpen.ts       # Main code
├── dist/                # Compiled output
├── package.json
├── tsconfig.json
├── input.png
└── README.md
```

## Dependencies

- `jimp` - Image processing
- `typescript` - Compiler
- `@types/node` - Type definitions

## Author

Gal Giladi

## Course

Image Processing - Question 1 (25%)
