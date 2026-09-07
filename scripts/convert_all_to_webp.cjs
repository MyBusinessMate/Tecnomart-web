const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const WEBP_DIR = path.join(PUBLIC_DIR, 'webp');

// Ensure base webp directory exists
if (!fs.existsSync(WEBP_DIR)) {
  fs.mkdirSync(WEBP_DIR, { recursive: true });
}

// Directories to process
const sourceDirs = [
  'images/accessories',
  'images/gaming',
  'images/landing',
  'images/laptops',
  'images/mobiles',
  'images/refurbished',
  'images',
  'bento-grid-images',
  'assets',
  '' // public root
];

const imageExtensions = ['.png', '.jpg', '.jpeg'];
const conversions = [];

for (const relDir of sourceDirs) {
  const fullDir = path.join(PUBLIC_DIR, relDir);
  if (!fs.existsSync(fullDir)) continue;

  const entries = fs.readdirSync(fullDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const inputPath = path.join(fullDir, entry.name);
        const baseName = path.basename(entry.name, ext) + '.webp';
        
        // Target in webp
        // If relDir starts with 'images/', e.g. 'images/landing', target is both 'webp/landing/...' and 'webp/images/landing/...'
        let targetSubDir = relDir;
        conversions.push({
          relDir,
          inputPath,
          fileName: entry.name,
          baseName
        });
      }
    }
  }
}

console.log(`Found ${conversions.length} images to convert.`);

let totalOldSize = 0;
let totalNewSize = 0;
const pathMap = {}; // mapping from old web path to new web path

for (let i = 0; i < conversions.length; i++) {
  const item = conversions[i];
  const oldWebPath = item.relDir ? `/${item.relDir}/${item.fileName}`.replace(/\\/g, '/') : `/${item.fileName}`;
  
  // Decide new web path:
  // e.g. /images/landing/xyz.png -> /webp/landing/xyz.webp
  // and /bento-grid-images/xyz.png -> /webp/bento-grid-images/xyz.webp
  // and /assets/xyz.png -> /webp/assets/xyz.webp
  // and /logo.png -> /webp/logo.webp
  let newRelSubDir = item.relDir;
  if (newRelSubDir.startsWith('images/')) {
    newRelSubDir = newRelSubDir.replace(/^images\//, '');
  } else if (newRelSubDir === 'images') {
    newRelSubDir = '';
  }

  const outputDir1 = path.join(WEBP_DIR, newRelSubDir);
  if (!fs.existsSync(outputDir1)) fs.mkdirSync(outputDir1, { recursive: true });
  const outputPath1 = path.join(outputDir1, item.baseName);

  // Convert via ffmpeg
  try {
    const cmd = `ffmpeg -y -i "${item.inputPath}" -c:v libwebp -quality 82 "${outputPath1}"`;
    execSync(cmd, { stdio: 'ignore' });
    
    // Also make sure we have a mirror in webp/images/ if it came from images/
    if (item.relDir.startsWith('images') || item.relDir === 'images') {
      const mirrorSubDir = path.join(WEBP_DIR, item.relDir);
      if (!fs.existsSync(mirrorSubDir)) fs.mkdirSync(mirrorSubDir, { recursive: true });
      const mirrorPath = path.join(mirrorSubDir, item.baseName);
      if (!fs.existsSync(mirrorPath)) {
        fs.copyFileSync(outputPath1, mirrorPath);
      }
    }

    const oldSize = fs.statSync(item.inputPath).size;
    const newSize = fs.statSync(outputPath1).size;
    totalOldSize += oldSize;
    totalNewSize += newSize;

    const newWebPath = newRelSubDir ? `/webp/${newRelSubDir}/${item.baseName}`.replace(/\\/g, '/') : `/webp/${item.baseName}`;
    pathMap[oldWebPath] = newWebPath;
    // Also record the mirror web path if accessed via /webp/images/...
    if (item.relDir.startsWith('images')) {
      pathMap[`/webp/${item.relDir}/${item.baseName}`] = newWebPath;
    }

    console.log(`[${i + 1}/${conversions.length}] ${oldWebPath} -> ${newWebPath} (${Math.round(oldSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB)`);
  } catch (err) {
    console.error(`Error converting ${item.inputPath}:`, err.message);
  }
}

console.log('\n=== SUMMARY ===');
console.log(`Total original size: ${(totalOldSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Total WebP size:     ${(totalNewSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Reduction:          ${(((totalOldSize - totalNewSize) / totalOldSize) * 100).toFixed(1)}%`);

// Save mapping file
fs.writeFileSync(path.join(__dirname, 'image_map.json'), JSON.stringify(pathMap, null, 2));
console.log(`Saved image map to scripts/image_map.json with ${Object.keys(pathMap).length} entries.`);
