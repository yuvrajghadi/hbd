import { execSync } from 'child_process';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// List of all 39 photos that had non-standard orientation in git 1d819d2
const PHOTOS_NEEDING_ROTATION = [
  'mem_03.jpg',
  'mem_04.jpg',
  'mem_06.jpg',
  'mem_07.jpg',
  'mem_08.jpg',
  'mem_10.jpg',
  'mem_11.jpg',
  'mem_12.jpg',
  'mem_13.jpg',
  'mem_14.jpg',
  'mem_15.jpg',
  'mem_16.jpg',
  'mem_19.jpg',
  'mem_20.jpg',
  'mem_21.jpg',
  'mem_22.jpg',
  'mem_23.jpg',
  'mem_24.jpg',
  'mem_25.jpg',
  'mem_26.jpg',
  'mem_27.jpg',
  'mem_28.jpg',
  'mem_29.jpg',
  'mem_31.jpg',
  'mem_33.jpg',
  'mem_41.jpg',
  'mem_42.jpg',
  'mem_45.jpg',
  'mem_46.jpg',
  'mem_50.jpg',
  'mem_51.jpg',
  'mem_52.jpg',
  'mem_53.jpg',
  'mem_54.jpg',
  'mem_55.jpg',
  'mem_56.jpg',
  'mem_57.jpg',
  'mem_61.jpg',
  'mem_62.jpg'
];

async function fixOrientations() {
  console.log(`Starting orientation normalization for ${PHOTOS_NEEDING_ROTATION.length} photos...`);

  // Ensure backup directory exists
  const backupDir = path.join(process.cwd(), 'public', 'photos_backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  let fixedCount = 0;

  for (const filename of PHOTOS_NEEDING_ROTATION) {
    const targetPath = path.join(process.cwd(), 'public', 'photos', filename);
    const backupPath = path.join(backupDir, filename);

    // Backup current file if not already backed up
    if (fs.existsSync(targetPath) && !fs.existsSync(backupPath)) {
      fs.copyFileSync(targetPath, backupPath);
    }

    try {
      // 1. Fetch original buffer from git 1d819d2 where full EXIF tags exist
      const gitCmd = `git show 1d819d2:public/photos/${filename}`;
      const origBuf = execSync(gitCmd, { maxBuffer: 40 * 1024 * 1024 });

      const origMeta = await sharp(origBuf).metadata();
      const origOrient = origMeta.orientation;

      // 2. Normalize orientation using sharp .rotate() and web-optimize
      const processedBuf = await sharp(origBuf)
        .rotate() // Automatically rotates based on EXIF and removes orientation tag
        .resize({
          width: 1600,
          height: 1600,
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 88,
          mozjpeg: true
        })
        .toBuffer();

      const newMeta = await sharp(processedBuf).metadata();

      fs.writeFileSync(targetPath, processedBuf);

      console.log(`✓ Fixed ${filename}: was orient=${origOrient} (${origMeta.width}x${origMeta.height}) -> now upright (${newMeta.width}x${newMeta.height})`);
      fixedCount++;
    } catch (err) {
      console.error(`✗ Error processing ${filename}:`, err.message);
    }
  }

  console.log(`\nSuccessfully normalized ${fixedCount}/${PHOTOS_NEEDING_ROTATION.length} photos!`);
}

fixOrientations().catch(console.error);
