import fs from 'fs';

const origCode = fs.readFileSync('src/data/memories.ts', 'utf8');
const generated = JSON.parse(fs.readFileSync('scripts/generated_media.json', 'utf8'));

// Split at export const memories: Memory[] = [
const splitIndex = origCode.indexOf('export const memories: Memory[] = [');
if (splitIndex === -1) {
  throw new Error('Could not find memories definition');
}

const before = origCode.substring(0, splitIndex);

// Find end of memories array
const secretIndex = origCode.indexOf('/**\n * =========================================================================\n * 💌 SECRET / SURPRISE LETTER DATA');
const after = origCode.substring(secretIndex);

const newMemoriesSection = `export const memories: Memory[] = ${JSON.stringify(generated, null, 2)};\n\n`;

const finalContent = before + newMemoriesSection + after;
fs.writeFileSync('src/data/memories.ts', finalContent, 'utf8');
console.log('Successfully updated src/data/memories.ts with 87 memories!');
