const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const targetDir = 'd:/demo_projects/cravo/public_images';
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const extracted = JSON.parse(fs.readFileSync('d:/demo_projects/cravo/extracted_images.json', 'utf8'));

// Name generator helper based on alt or screen
function getFilename(item) {
  const alt = (item.alt || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 45);
  if (alt.includes('logo')) return 'cravo_logo.png';
  if (alt.includes('profile')) return 'admin_profile.png';
  if (alt.includes('chef') || alt.includes('manager')) return 'chef_elena.png';
  if (alt.includes('truffle') && alt.includes('burger')) return `truffle_burger_${item.id}.jpg`;
  if (alt.includes('margherita') || alt.includes('pizza')) return `margherita_pizza_${item.id}.jpg`;
  if (alt.includes('pepperoni')) return `pepperoni_pizza_${item.id}.jpg`;
  if (alt.includes('fries')) return `truffle_fries_${item.id}.jpg`;
  if (alt.includes('chicken') || alt.includes('tenders') || alt.includes('wings')) return `chicken_${item.id}.jpg`;
  if (alt.includes('cake') || alt.includes('lava') || alt.includes('dessert')) return `lava_cake_${item.id}.jpg`;
  if (alt.includes('beer') || alt.includes('tea') || alt.includes('drink')) return `beverage_${item.id}.jpg`;
  if (alt.length > 5) return `${alt}_${item.id}.jpg`;
  return `asset_${item.id}.jpg`;
}

console.log(`Starting download of ${extracted.length} images using curl.exe -L...`);

const manifest = [];
for (const item of extracted) {
  const filename = getFilename(item);
  const outPath = path.join(targetDir, filename);
  console.log(`Downloading [${item.id}/${extracted.length}]: ${filename}...`);
  try {
    // curl.exe -L --silent --show-error
    execSync(`curl.exe -L --silent --show-error -o "${outPath}" "${item.url}"`, { timeout: 30000 });
    const stats = fs.statSync(outPath);
    console.log(` -> Success (${stats.size} bytes)`);
    manifest.push({
      id: item.id,
      originalUrl: item.url,
      localFile: filename,
      size: stats.size,
      alt: item.alt,
      screen: item.screen
    });
  } catch (err) {
    console.error(` -> Failed to download ${filename}:`, err.message);
  }
}

// Also copy screen PNGs from stitch_assets
const stitchDir = 'd:/demo_projects/cravo/stitch_assets/stitch_fullstack_restaurant_ordering_system';
const screens = [
  { folder: 'home_cravo_kitchen_bar', name: 'stitch_screen_home.png' },
  { folder: 'menu_products_cravo_kitchen', name: 'stitch_screen_menu.png' },
  { folder: 'product_details_cravo_kitchen', name: 'stitch_screen_product_details.png' },
  { folder: 'cart_checkout_cravo_kitchen', name: 'stitch_screen_cart.png' },
  { folder: 'cravo_restaurant_logo', name: 'stitch_screen_logo.png' },
  { folder: 'portrait_headshot_of_a_friendly_professional_restaurant_manager_or_chef_in', name: 'stitch_screen_chef_headshot.png' }
];

for (const s of screens) {
  const src = path.join(stitchDir, s.folder, 'screen.png');
  const dest = path.join(targetDir, s.name);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied screen PNG: ${s.name}`);
  }
}

fs.writeFileSync('d:/demo_projects/cravo/images_manifest.json', JSON.stringify(manifest, null, 2));
console.log(`Download complete! Manifest written to images_manifest.json`);
