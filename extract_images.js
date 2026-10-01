const fs = require('fs');
const path = require('path');

const base = 'd:/demo_projects/cravo/stitch_assets/stitch_fullstack_restaurant_ordering_system';
const dirs = fs.readdirSync(base);
const imgMap = new Map();

for (const d of dirs) {
  const codePath = path.join(base, d, 'code.html');
  if (fs.existsSync(codePath)) {
    const content = fs.readFileSync(codePath, 'utf8');
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1];
      const tag = match[0];
      const altMatch = tag.match(/alt=["']([^"']+)["']/i) || tag.match(/data-alt=["']([^"']+)["']/i);
      const alt = altMatch ? altMatch[1] : '';
      if (!imgMap.has(src)) {
        imgMap.set(src, { screen: d, alt });
      }
    }
  }
}

console.log('Total unique images found:', imgMap.size);
const items = [];
let idx = 1;
for (const [url, info] of imgMap.entries()) {
  console.log(`[${idx}] Screen: ${info.screen} | Alt: ${info.alt.slice(0, 60)}`);
  items.push({ id: idx, url, screen: info.screen, alt: info.alt });
  idx++;
}

fs.writeFileSync('d:/demo_projects/cravo/extracted_images.json', JSON.stringify(items, null, 2));
console.log('Saved to extracted_images.json');
