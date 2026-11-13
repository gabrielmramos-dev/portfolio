// Gera public/assets/og-image.png (1200x630) com o nome, o cargo e o posicionamento.
// Uso: node scripts/generate-og.mjs
import sharp from 'sharp';

const font = "'IBM Plex Sans', 'DejaVu Sans', 'Noto Sans', sans-serif";
const mono = "'IBM Plex Mono', 'DejaVu Sans Mono', monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#2b2b2b" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#1c1c1c"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect x="72" y="96" width="6" height="150" fill="#ffffff"/>
  <text x="104" y="160" font-family="${font}" font-size="30" fill="#a8a8a8" letter-spacing="4">GABRIEL RAMOS</text>
  <text x="104" y="232" font-family="${font}" font-size="62" font-weight="600" fill="#ffffff">Software Developer Intern</text>
  <text x="104" y="330" font-family="${font}" font-size="38" fill="#ffffff">Backend .NET/TypeScript</text>
  <text x="104" y="386" font-family="${font}" font-size="30" fill="#a8a8a8">APIs · dados abertos · IA aplicada</text>
  <g font-family="${mono}" font-size="24" fill="#ffffff">
    <rect x="104" y="458" width="150" height="48" rx="8" fill="#353535"/><text x="179" y="490" text-anchor="middle">C#/.NET</text>
    <rect x="270" y="458" width="190" height="48" rx="8" fill="#353535"/><text x="365" y="490" text-anchor="middle">TypeScript</text>
    <rect x="476" y="458" width="110" height="48" rx="8" fill="#353535"/><text x="531" y="490" text-anchor="middle">GCP</text>
    <rect x="602" y="458" width="110" height="48" rx="8" fill="#353535"/><text x="657" y="490" text-anchor="middle">RAG</text>
  </g>
  <text x="104" y="570" font-family="${mono}" font-size="26" fill="#a8a8a8">gabrielmramos.dev</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/assets/og-image.png');
console.log('public/assets/og-image.png gerado');
