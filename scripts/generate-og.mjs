// Gera public/assets/og-image.png (1200x630) com o nome, o cargo e o posicionamento.
// Uso: node scripts/generate-og.mjs
import sharp from 'sharp';

const font = "'Schibsted Grotesk', 'DejaVu Sans', 'Noto Sans', sans-serif";
const mono = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f1114"/>
  <rect x="72" y="96" width="4" height="150" fill="#8fb4ff"/>
  <text x="104" y="160" font-family="${font}" font-size="30" fill="#9ba5af" letter-spacing="4">GABRIEL RAMOS</text>
  <text x="104" y="232" font-family="${font}" font-size="62" font-weight="600" fill="#e9ecef">Software Developer Intern</text>
  <text x="104" y="330" font-family="${font}" font-size="38" fill="#e9ecef">Desenvolvedor .NET</text>
  <text x="104" y="386" font-family="${font}" font-size="30" fill="#9ba5af">APIs · dados abertos · IA aplicada</text>
  <g font-family="${mono}" font-size="24" fill="#e9ecef">
    <rect x="104" y="458" width="150" height="48" rx="8" fill="none" stroke="#6b7680" stroke-width="1.5"/><text x="179" y="490" text-anchor="middle">C#/.NET</text>
    <rect x="270" y="458" width="190" height="48" rx="8" fill="none" stroke="#6b7680" stroke-width="1.5"/><text x="365" y="490" text-anchor="middle">TypeScript</text>
    <rect x="476" y="458" width="110" height="48" rx="8" fill="none" stroke="#6b7680" stroke-width="1.5"/><text x="531" y="490" text-anchor="middle">GCP</text>
    <rect x="602" y="458" width="110" height="48" rx="8" fill="none" stroke="#6b7680" stroke-width="1.5"/><text x="657" y="490" text-anchor="middle">RAG</text>
  </g>
  <text x="104" y="570" font-family="${mono}" font-size="26" fill="#9ba5af">gabrielmramos.dev</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/assets/og-image.png');
console.log('public/assets/og-image.png gerado');
