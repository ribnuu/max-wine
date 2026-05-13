const fs = require('fs');
const path = require('path');

const rawPath = path.join(__dirname, 'raw-products.txt');
if (!fs.existsSync(rawPath)) {
  console.error('raw-products.txt not found in scripts/. Paste your product block into this file.');
  process.exit(1);
}

const text = fs.readFileSync(rawPath, 'utf8');
const lines = text.split(/\r?\n/);

const urlRegex = /(https?:\/\/\S+)/i;
const imgExtRegex = /\.(png|webp|jpg|jpeg|avif|gif)(\?|$)/i;

const BRAND_KEYWORDS = [
  {match: /BAR\s*JUICE/i, name: 'Bar Juice'},
  {match: /YELLOW\s*TAIL/i, name: 'Yellow Tail'},
  {match: /VILL\s*MARIA/i, name: 'Villa Maria'},
  {match: /OYSTER\s*BAY/i, name: 'Oyster Bay'},
  {match: /I\s*HEART/i, name: 'I Heart'},
  {match: /LOST\s*MARY/i, name: 'Lost Mary'},
  {match: /ELUX\s*LEGEND/i, name: 'Elux Legend'},
  {match: /CRYSTAL\s*NIC\s*SALTS/i, name: 'Crystal Nic Salts'},
  {match: /ELFBAR/i, name: 'Elfbar'},
  {match: /PIXL/i, name: 'Pixl'}
];

function pickBrandFromLines(lines) {
  for (let i = lines.length - 1; i >= 0; i--) {
    const l = lines[i];
    for (const b of BRAND_KEYWORDS) {
      if (b.match.test(l)) return {brand: b.name, index: i, raw: l};
    }
  }
  return null;
}

function titleCase(s) {
  return s.toLowerCase().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ').replace(/\s+/g,' ').trim();
}

function cleanFlavor(rawLines, brandIndex) {
  // take lines after brandIndex (if brandIndex provided), else last up to 4 lines
  let flavorParts = [];
  if (brandIndex != null) {
    // if the brand line itself contains extra tokens after the brand, include them
    const brandLine = rawLines[brandIndex] || '';
    const afterBrand = brandLine.replace(/BAR\s*JUICE|LOST\s*MARY|YELLOW\s*TAIL|ELUX\s*LEGEND|CRYSTAL\s*NIC\s*SALTS|ELFBAR|PIXL/gi, '').trim();
    if (afterBrand) flavorParts.push(afterBrand);
    for (let i = brandIndex + 1; i < rawLines.length; i++) {
      const l = rawLines[i].trim();
      if (!l) continue;
      // stop at a header or price token
      if (/^PRODUCT\s+NAME|^IMAGE\s+URL|^PRICE|^\d+mg|^75CL|^2\s*for|^Each|^EACH/i.test(l)) break;
      if (l.match(urlRegex)) break;
      flavorParts.push(l);
    }
  }
  if (flavorParts.length === 0) {
    // fallback: use last three non-url lines before url
    for (let i = rawLines.length - 1; i >= 0 && flavorParts.length < 3; i--) {
      const l = rawLines[i].trim();
      if (!l) continue;
      if (l.match(urlRegex)) continue;
      if (/^PRODUCT\s+NAME|^IMAGE\s+URL|^PRICE/i.test(l)) continue;
      flavorParts.unshift(l);
    }
  }
  // join and remove header tokens
  let flavor = flavorParts.join(' ').replace(/PRODUCT\s+NAME|IMAGE\s+URL|PICTURE|DESCRIPTION|PRICE/gi, '').trim();
  // remove stray 'BAR JUICE' or brand words inside flavor
  flavor = flavor.replace(/BAR\s*JUICE|LOST\s*MARY|BM\s*6000|BM6000|REFILLABLE|PREFILLED|VAPE|KIT|POD|1PK/gi, '').trim();
  // remove any 'http' artifacts
  flavor = flavor.replace(/https?:\/\/\S+/gi, '').replace(/https?\s*:\/\//gi, '').replace(/\s+\//g,' ').replace(/[^\w\s&'-]/g,' ').replace(/\s+/g,' ').trim();
  return titleCase(flavor);
}

function extractPromoAndEach(linesAround) {
  const joined = linesAround.join(' ');
  let promo = null;
  let each = null;
  const promoRe = /(\d+)\s*for\s*£?\s*(\d+(?:\.\d+)?)/i;
  const mPromo = joined.match(promoRe);
  if (mPromo) promo = `${mPromo[1]} for £${parseFloat(mPromo[2]).toFixed(2)}`;
  const eachRe = /\bEach\b\s*£?\s*(\d+(?:\.\d+)?)/i;
  const mEach = joined.match(eachRe);
  if (mEach) each = parseFloat(mEach[1]);
  return {promo, each};
}

function extractWasNow(linesAround) {
  const joined = linesAround.join(' ');
  const m = joined.match(/was\s*£?\s*(\d+(?:\.\d+)?)[^\n]*now\s*£?\s*(\d+(?:\.\d+)?)/i);
  if (m) return {original: parseFloat(m[1]), now: parseFloat(m[2])};
  return null;
}

const products = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i] || '';
  const urlMatch = line.match(urlRegex);
  if (!urlMatch) continue;
  const url = urlMatch[1].trim();

  // collect surrounding lines
  const blockBefore = [];
  for (let j = Math.max(0, i - 8); j < i; j++) {
    if (lines[j] && lines[j].trim()) blockBefore.push(lines[j].trim());
  }
  const blockAfter = [];
  for (let j = i + 1; j <= Math.min(lines.length - 1, i + 4); j++) {
    if (lines[j] && lines[j].trim()) blockAfter.push(lines[j].trim());
  }

  const brandInfo = pickBrandFromLines(blockBefore) || pickBrandFromLines(blockAfter) || {brand: null, index: null};
  let brandDisplay = brandInfo.brand || 'Unknown Brand';

  // Special handling for Lost Mary: detect BM6000 or Nera
  if (/lost\s*mary/i.test(brandInfo && brandInfo.raw || blockBefore.join(' '))) {
    if (/bm\s*6000|bm6000/i.test(blockBefore.join(' ') + ' ' + blockAfter.join(' '))) {
      brandDisplay = 'Lost Mary BM6000';
    } else if (/nera/i.test(blockBefore.join(' ') + ' ' + blockAfter.join(' '))) {
      brandDisplay = 'Lost Mary Nera';
    } else {
      brandDisplay = 'Lost Mary';
    }
    // prefer 'Prefilled Pod' vs 'Kit'
    if (/prefill|prefilled|pod/i.test(blockBefore.join(' ') + ' ' + blockAfter.join(' '))) {
      brandDisplay += ' Prefilled Pod';
    } else if (/refill|refillable|kit/i.test(blockBefore.join(' ') + ' ' + blockAfter.join(' '))) {
      brandDisplay += ' Kit';
    }
  }

  // Flavor extraction
  const brandIndex = brandInfo ? brandInfo.index : null;
  const flavor = cleanFlavor(blockBefore.concat(blockAfter), brandIndex);

  // Compose final name
  const finalName = `${brandDisplay} - ${flavor}`.replace(/\s+-\s+$/,'').replace(/\s+/g,' ').trim();

  // Was/Now
  const {promo, each} = extractPromoAndEach(blockBefore.concat(blockAfter));
  const wasNow = extractWasNow(blockBefore.concat(blockAfter));

  let price = null;
  let original_price = null;
  let is_offer = false;
  if (wasNow) {
    original_price = wasNow.original;
    price = wasNow.now;
    is_offer = true;
  } else if (each) {
    price = each;
    original_price = each;
  } else if (promo) {
    const m = promo.match(/(\d+)\s*for\s*£?(\d+(?:\.\d+)?)/i);
    if (m) {
      const count = parseInt(m[1], 10);
      const total = parseFloat(m[2]);
      if (count > 0) {
        price = parseFloat((total / count).toFixed(2));
        original_price = price;
      }
    }
  } else {
    const any = (blockBefore.concat(blockAfter).join(' ').match(/£\s*(\d+\.\d+)/) || [])[1];
    if (any) price = parseFloat(any);
  }
  if (!price) price = 3.99;
  if (!original_price) original_price = price;

  // Description: build after computing price so 'Each' reflects computed per-item
  const strengthMatch = (blockBefore.concat(blockAfter).join(' ').match(/\d+mg/gi) || []).map(s=>s.toLowerCase());
  const strength = Array.from(new Set(strengthMatch)).join('/');
  const parts = [];
  if (strength) parts.push(strength.replace(/mg/g,'mg'));
  if (promo) parts.push(promo);
  if (price) parts.push(`Each £${price.toFixed(2)}`);
  const description = parts.join(' | ');

  // category: prefer brand-based categorization
  let category = 'Vapes & E-Liquids';
  if (/yellow tail|villa maria|oyster bay|i heart|villamaria|oysterbay/i.test(brandDisplay)) category = 'Wines';
  if (/Yellow Tail|Villa Maria|Oyster Bay|I Heart/i.test(brandDisplay)) category = 'Wines';

  // fix truncated url
  let imageUrl = url;
  if (!imgExtRegex.test(imageUrl)) {
    if (imageUrl.includes('/cache/820ee75d12c53d9')) {
      imageUrl = imageUrl.replace(/\/cache\/820ee75d12c53d9.*$/, '/cache/820ee75d12c53d94951b63cd75c573c1/b/l/blackberry-ice-pod_1.webp');
    }
  }

  products.push({ name: finalName, description, price, original_price, category, images: [imageUrl], is_offer });
}

// Generate SQL
const sqlLines = products.map(p => {
  const orig = (p.original_price || p.price).toFixed(2);
  const isOffer = p.is_offer ? 'true' : 'false';
  const images = `ARRAY['${(p.images[0]||'').replace(/'/g, "''")}']`;
  const safeName = (p.name||'').replace(/'/g, "''");
  const safeDesc = (p.description||'').replace(/'/g, "''");
  return `INSERT INTO products (name, description, price, original_price, category, images, is_active, is_offer) VALUES ('${safeName}', '${safeDesc}', ${p.price.toFixed(2)}, ${orig}, '${p.category.replace(/'/g, "''")}', ${images}, true, ${isOffer});`;
});

const outPath = path.join(__dirname, 'seed-all-products.sql');
fs.writeFileSync(outPath, sqlLines.join('\n') + '\n', 'utf8');
console.log(`Wrote ${products.length} INSERT statements to ${outPath}`);
