// Gera os ícones PNG a partir de public/favicon.svg.
// Uso: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg');
// O iOS aplica a própria máscara arredondada: o ícone dele precisa ser um quadrado cheio.
const squareSvg = Buffer.from(svg.toString().replace('rx="6"', 'rx="0"'));
const sizes = {
  'public/assets/favicon-32x32.png': 32,
  'public/apple-touch-icon.png': 180,
  'public/icon-192.png': 192,
  'public/icon-512.png': 512,
};

for (const [file, size] of Object.entries(sizes)) {
  // density alto para o SVG não ficar serrilhado ao ser rasterizado
  await sharp(file.includes('apple') ? squareSvg : svg, { density: Math.round((72 * size) / 32) * 2 }).resize(size, size).png({ compressionLevel: 9 }).toFile(file);
  console.log(file, size);
}
