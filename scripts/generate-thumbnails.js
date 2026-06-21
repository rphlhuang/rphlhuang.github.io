const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const THUMBNAIL_WIDTH = 300;

const FOLDERS = [
  { index: 'src/blog/index/jrnl_index.json', dir: 'src/blog/img/photos' },
  { index: 'src/blog/index/music_index.json', dir: 'src/blog/img/album_art' },
  { index: 'src/blog/index/etc_index.json', dir: 'src/blog/img/etc' },
  { index: 'src/blog/index/anthropocene_reviewed_index.json', dir: 'src/blog/img/anthropocene_reviewed' },
];

function toSmallFilename(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  return `${base}small${ext}`;
}

function isAlreadySmall(filename) {
  const base = path.basename(filename, path.extname(filename));
  return base.endsWith('small');
}

async function processFolder({ index, dir }) {
  const indexPath = path.resolve(index);
  if (!fs.existsSync(indexPath)) return;

  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  let changed = false;

  for (const [key, filename] of Object.entries(indexData)) {
    if (isAlreadySmall(filename)) continue;

    const smallFilename = toSmallFilename(filename);
    const inputPath = path.resolve(dir, filename);
    const outputPath = path.resolve(dir, smallFilename);

    if (!fs.existsSync(inputPath)) {
      console.warn(`  [skip] ${filename} not found`);
      continue;
    }

    if (!fs.existsSync(outputPath)) {
      console.log(`  Generating ${smallFilename}...`);
      await sharp(inputPath)
        .resize(THUMBNAIL_WIDTH, null, { withoutEnlargement: true })
        .toFile(outputPath);
    }

    indexData[key] = smallFilename;
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 4) + '\n');
    console.log(`  Updated ${index}`);
  }
}

async function main() {
  for (const folder of FOLDERS) {
    console.log(`Processing ${folder.dir}...`);
    await processFolder(folder);
  }
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });