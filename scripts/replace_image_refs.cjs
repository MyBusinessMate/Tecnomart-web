const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const mapPath = path.join(__dirname, 'image_map.json');

if (!fs.existsSync(mapPath)) {
  console.error('image_map.json not found!');
  process.exit(1);
}

const rawMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

// Build sorted replacement pairs (longest keys first to avoid partial substring collisions)
const pairs = Object.entries(rawMap).sort((a, b) => b[0].length - a[0].length);

function walk(d) {
  let r = [];
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      r = r.concat(walk(p));
    } else {
      r.push(p);
    }
  }
  return r;
}

const targetFiles = walk(path.join(PROJECT_ROOT, 'src'))
  .concat([
    path.join(PROJECT_ROOT, 'index.html'),
    path.join(PROJECT_ROOT, 'public', 'manifest.json')
  ]);

let modifiedCount = 0;
let totalReplacements = 0;

for (const file of targetFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let fileReplacements = 0;

  for (const [oldPath, newPath] of pairs) {
    // If content contains oldPath, replace all occurrences
    if (content.includes(oldPath)) {
      const regex = new RegExp(oldPath.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      const matches = content.match(regex) || [];
      if (matches.length > 0) {
        content = content.replace(regex, newPath);
        fileReplacements += matches.length;
      }
    }
  }

  if (fileReplacements > 0) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${path.relative(PROJECT_ROOT, file)}: ${fileReplacements} replacements`);
    modifiedCount++;
    totalReplacements += fileReplacements;
  }
}

console.log(`\nDone: ${totalReplacements} image references updated across ${modifiedCount} files.`);
