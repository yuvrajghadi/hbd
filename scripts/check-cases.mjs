import fs from 'fs';
import path from 'path';

function checkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(full);
    } else if (/\.(tsx|ts|js|mjs)$/.test(entry.name)) {
      const content = fs.readFileSync(full, 'utf8');
      const importRegex = /(?:import|from)\s+['"](@\/[^'"]+|\.\/[^'"]+|\.\.\/[^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        let resolved = '';
        if (importPath.startsWith('@/')) {
          resolved = path.join(process.cwd(), 'src', importPath.slice(2));
        } else {
          resolved = path.resolve(dir, importPath);
        }

        const extensions = ['', '.ts', '.tsx', '.js', '.mjs', '/index.ts', '/index.tsx'];
        let found = false;
        for (const ext of extensions) {
          const testPath = resolved + ext;
          if (fs.existsSync(testPath)) {
            const rel = path.relative(process.cwd(), testPath);
            const segments = rel.split(path.sep);
            let current = process.cwd();
            let caseMatch = true;
            for (const seg of segments) {
              const actualFiles = fs.readdirSync(current);
              if (!actualFiles.includes(seg)) {
                console.error(`CASE MISMATCH in ${entry.name}: import "${importPath}", segment "${seg}" vs "${actualFiles.find(f => f.toLowerCase() === seg.toLowerCase())}"`);
                caseMatch = false;
              }
              current = path.join(current, seg);
            }
            if (caseMatch) found = true;
            break;
          }
        }
        if (!found) {
          console.warn(`Could not resolve exact case for import "${importPath}" in ${entry.name}`);
        }
      }
    }
  }
}

checkDir(path.join(process.cwd(), 'src'));
console.log('Case sensitivity check complete.');
