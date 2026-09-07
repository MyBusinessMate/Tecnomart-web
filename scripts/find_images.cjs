const fs = require('fs');
const path = require('path');

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

const files = walk('src').concat(['index.html', 'public/manifest.json']);
const refs = new Set();
const srcWithRefs = new Set();

for (const file of files) {
  const c = fs.readFileSync(file, 'utf8');
  const matches = c.match(/['"`][^'"`\n]+?\.(png|jpg|jpeg)['"`]/gi) || [];
  for (const m of matches) {
    const cleaned = m.slice(1, -1);
    refs.add(cleaned);
    srcWithRefs.add(file);
  }
}

console.log('=== Files referencing images ===');
srcWithRefs.forEach(f => console.log(' - ' + f));
console.log('\n=== Total unique refs: ' + refs.size + ' ===');
Array.from(refs).sort().forEach(r => console.log(r));
