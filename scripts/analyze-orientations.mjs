import { execSync } from 'child_process';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function analyzeAll() {
  const mapping = JSON.parse(fs.readFileSync('public/photos_mapping.json', 'utf8'));
  const mapByNew = new Map();
  for (const m of mapping) {
    mapByNew.set(m.NewName, m);
  }

  const currentFiles = fs.readdirSync('public/photos')
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();

  console.log(`Found ${currentFiles.length} photos in public/photos`);

  // Also get list of all files in 1d819d2
  const lsOut = execSync('git ls-tree -r -z --name-only 1d819d2 public/photos').toString('utf8');
  const gitFiles = lsOut.split('\0').filter(Boolean);

  const orientationsNeeded = {};

  for (const f of currentFiles) {
    const curPath = path.join('public', 'photos', f);
    const curMeta = await sharp(curPath).metadata();
    let origOrient = curMeta.orientation;
    let origName = null;

    if (mapByNew.has(f)) {
      origName = mapByNew.get(f).Original;
      const matchingGitFile = gitFiles.find(gf => gf.endsWith('/' + origName) || gf === 'public/photos/' + origName);
      if (matchingGitFile) {
        try {
          const buf = execSync(`git show 1d819d2:"${matchingGitFile}"`, { maxBuffer: 35 * 1024 * 1024 });
          const metaOrig = await sharp(buf).metadata();
          origOrient = metaOrig.orientation;
        } catch (e) {
          console.error(`Error reading git original for ${f}:`, e.message);
        }
      }
    }

    if (origOrient && origOrient !== 1) {
      console.log(`${f}: orientation ${origOrient}, size ${curMeta.width}x${curMeta.height} (orig: ${origName || 'n/a'})`);
      orientationsNeeded[f] = {
        origOrient,
        curWidth: curMeta.width,
        curHeight: curMeta.height,
        origName
      };
    }
  }

  console.log(`\nTotal photos needing re-orientation: ${Object.keys(orientationsNeeded).length}`);
  fs.writeFileSync('scripts/orientations.json', JSON.stringify(orientationsNeeded, null, 2));
  console.log('Saved to scripts/orientations.json');
}

analyzeAll().catch(console.error);
