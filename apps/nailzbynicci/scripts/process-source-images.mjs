import fs from 'node:fs';
import path from 'node:path';

const sourceDir = path.resolve('./public/images/source');
const galleryDir = path.resolve('./public/images/gallery');

fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(galleryDir, { recursive: true });

async function processImages() {
  const files = fs.readdirSync(sourceDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  
  if (files.length === 0) {
    console.log('No images found in /public/images/source/. Drop Nicole\'s original photos here to process.');
    return;
  }

  console.log(`Found ${files.length} images to process...`);
  
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch (e) {
    console.log('Sharp not installed, copying source files directly as webp...');
    files.forEach((f, i) => {
      const id = `nicci-${String(i + 1).padStart(3, '0')}`;
      fs.copyFileSync(path.join(sourceDir, f), path.join(galleryDir, `${id}.webp`));
    });
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const id = `nicci-${String(i + 1).padStart(3, '0')}`;
    const inputPath = path.join(sourceDir, file);

    console.log(`Processing [${id}] from ${file}...`);

    // Standard 800px WebP
    await sharp(inputPath)
      .resize(800, 1067, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(galleryDir, `${id}.webp`));

    // High-res 1600px WebP
    await sharp(inputPath)
      .resize(1600, 2133, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(path.join(galleryDir, `${id}-1600.webp`));

    // Thumbnail 400px WebP
    await sharp(inputPath)
      .resize(400, 533, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(galleryDir, `${id}-400.webp`));
  }

  console.log('All source images converted to multi-resolution WebPs in /public/images/gallery/!');
}

processImages();
