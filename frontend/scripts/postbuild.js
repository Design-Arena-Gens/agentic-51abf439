import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
const indexPath = path.join(distDir, 'index.html');
const fallbackPath = path.join(distDir, '200.html');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory not found. Run the build first.');
  process.exit(1);
}

if (!fs.existsSync(indexPath)) {
  console.error('index.html not found in dist directory.');
  process.exit(1);
}

fs.copyFileSync(indexPath, fallbackPath);
console.log('Created SPA fallback dist/200.html');

