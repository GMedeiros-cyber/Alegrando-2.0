// One-off: converte imagens de assets/ para WebP otimizado (qualidade ~80) e
// redimensiona o que está exagerado. Gera também public/og-image.jpg (1200x630).
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdirSync, statSync, mkdirSync, existsSync } from 'fs';
import { join, parse } from 'path';

const ASSETS = 'assets';
const PUBLIC = 'public';

// Largura máxima por arquivo (override). Default p/ fotos = 1280.
const MAX_WIDTH = {
  'logo.png': 256,        // ícone da Jade, exibido ~55px
  'alegrando.png': 480,   // logo navbar/footer (h-12)
  'cadastur.png': 600,    // logo largo
  'adventista.png': 420,  // logo de escola
};
const DEFAULT_MAX = 1280;

// Não converter: duplicata e órfãos (não importados em lugar nenhum).
const SKIP = new Set(['pain-points.jpg', 'escritorio.jpeg', 'favicon.ico']);

const isRaster = (f) => /\.(png|jpe?g)$/i.test(f);

let totalIn = 0, totalOut = 0;

for (const file of readdirSync(ASSETS)) {
  if (!isRaster(file) || SKIP.has(file)) continue;
  const src = join(ASSETS, file);
  const { name, ext } = parse(file);
  const out = join(ASSETS, `${name}.webp`);
  const inBytes = statSync(src).size;

  const img = sharp(src);
  const meta = await img.metadata();
  const max = MAX_WIDTH[file] ?? DEFAULT_MAX;
  const pipeline = meta.width > max ? img.resize({ width: max, withoutEnlargement: true }) : img;
  // PNG (com alpha/logos) → qualidade um pouco maior p/ bordas/texto nítidos.
  const quality = /\.png$/i.test(ext) ? 86 : 80;
  await pipeline.webp({ quality }).toFile(out);

  const outBytes = statSync(out).size;
  totalIn += inBytes; totalOut += outBytes;
  const pct = ((1 - outBytes / inBytes) * 100).toFixed(0);
  console.log(`${file.padEnd(22)} ${(inBytes / 1024).toFixed(0).padStart(5)}KB → ${(outBytes / 1024).toFixed(0).padStart(5)}KB  (-${pct}%)`);
}

// ── og:image (1200x630, JPG, fundo branco com logo centralizado) ──────────────
if (!existsSync(PUBLIC)) mkdirSync(PUBLIC, { recursive: true });
const logoBuf = await sharp(join(ASSETS, 'alegrando.png'))
  .resize({ width: 760, fit: 'inside' })
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#ffffff' } })
  .composite([{ input: logoBuf, gravity: 'center' }])
  .jpeg({ quality: 82 })
  .toFile(join(PUBLIC, 'og-image.jpg'));
console.log('\npublic/og-image.jpg gerado (1200x630).');

console.log(`\nTOTAL: ${(totalIn / 1024 / 1024).toFixed(2)}MB → ${(totalOut / 1024 / 1024).toFixed(2)}MB`);
