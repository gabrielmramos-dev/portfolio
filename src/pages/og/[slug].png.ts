import type { APIRoute, GetStaticPaths } from 'astro';
import sharp from 'sharp';
import { getAllPosts } from '../../lib/posts';

// Imagem de compartilhamento (1200x630) de cada post, gerada na montagem do site.
// Usa as cores do site; a fonte é a do sistema que monta (o sharp não carrega fontes web).
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, date: post.data.date, tags: post.data.tags },
  }));
};

const escapeXml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    if ((line + ' ' + word).trim().length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = (line + ' ' + word).trim();
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    return kept;
  }
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, date, tags } = props as { title: string; date: Date; tags: string[] };
  const font = "'Schibsted Grotesk', 'DejaVu Sans', 'Noto Sans', sans-serif";
  const mono = "'JetBrains Mono', 'DejaVu Sans Mono', monospace";
  const lines = wrap(title, 27, 4);
  const when = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0f1114"/>
  <rect x="72" y="88" width="4" height="${60 + lines.length * 70}" fill="#8fb4ff"/>
  <text x="104" y="124" font-family="${font}" font-size="26" fill="#9ba5af" letter-spacing="4">BLOG · GABRIEL RAMOS</text>
  ${lines
    .map((l, i) => `<text x="104" y="${204 + i * 70}" font-family="${font}" font-size="56" font-weight="600" fill="#e9ecef">${escapeXml(l)}</text>`)
    .join('\n  ')}
  <text x="104" y="548" font-family="${mono}" font-size="24" fill="#9ba5af">${escapeXml(when)}${tags.length ? ' · ' + escapeXml(tags.join(', ')) : ''}</text>
  <text x="104" y="590" font-family="${mono}" font-size="24" fill="#9ba5af">gabrielmramos.dev</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
};
