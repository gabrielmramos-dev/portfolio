// Confere o resultado de `npm run build` (pasta dist): paridade PT/EN, hreflang nos dois sentidos, canonical,
// JSON-LD, imagens OG e sitemap. Uso: npm run build && node scripts/validate-seo.mjs
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const problems = [];
const notes = [];
const fail = (msg) => problems.push(msg);

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const pages = walk(DIST).filter((f) => f.endsWith('index.html') || f.endsWith('404.html'));
const toPath = (file) => '/' + file.slice(DIST.length + 1).replace(/index\.html$/, '').replace(/404\.html$/, '404.html');
const pathOf = (url) => new URL(url, 'http://x').pathname;

const info = new Map();
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const path = toPath(file);
  const attr = (re) => (html.match(re) ?? [])[1];
  info.set(path, {
    lang: attr(/<html[^>]*lang="([^"]+)"/),
    canonical: attr(/<link rel="canonical" href="([^"]+)"/),
    alternates: [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], pathOf(m[2])]),
    ogImage: attr(/<meta property="og:image" content="([^"]+)"/),
    twitterCard: attr(/<meta name="twitter:card" content="([^"]+)"/),
    title: attr(/<title>([^<]*)<\/title>/),
    description: attr(/<meta name="description" content="([^"]*)"/),
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1]),
    h1: (html.match(/<h1[ >]/g) ?? []).length,
  });
}

// 1) Paridade PT/EN das rotas principais.
const pairs = [
  ['/', '/en/'],
  ['/projetos/', '/en/projects/'],
  ['/experiencia/', '/en/experience/'],
  ['/formacao/', '/en/education/'],
  ['/acessibilidade/', '/en/accessibility/'],
  ['/blog/', '/en/blog/'],
];
for (const [pt, en] of pairs) {
  if (!info.has(pt)) fail(`falta a rota PT ${pt}`);
  if (!info.has(en)) fail(`falta a rota EN ${en}`);
  if (info.get(pt)?.lang !== 'pt-BR') fail(`${pt}: lang esperado pt-BR, veio ${info.get(pt)?.lang}`);
  if (info.get(en)?.lang !== 'en') fail(`${en}: lang esperado en, veio ${info.get(en)?.lang}`);
}

// 2) hreflang nos dois sentidos (páginas traduzidas). Blog: o conteúdo é só em português, sem hreflang por decisão.
const translated = pairs;
for (const [pt, en] of translated) {
  for (const [from, to, tag] of [[pt, en, 'en'], [en, pt, 'pt-BR']]) {
    const alt = info.get(from)?.alternates ?? [];
    const target = alt.find(([lang]) => lang === tag)?.[1];
    if (target !== to) fail(`${from}: hreflang="${tag}" deveria apontar para ${to}, aponta para ${target ?? 'nada'}`);
    const self = alt.find(([lang]) => lang === (from === pt ? 'pt-BR' : 'en'))?.[1];
    if (self !== from) fail(`${from}: hreflang próprio ausente ou errado (${self ?? 'nada'})`);
    if (!alt.some(([lang, p]) => lang === 'x-default' && p === pt)) fail(`${from}: x-default deveria apontar para ${pt}`);
  }
}
// Posts: cada /blog/<slug>/ tem o par /en/blog/<slug>/, com hreflang nos dois sentidos.
const ptPosts = [...info.keys()].filter((p) => /^\/blog\/[^/]+\/$/.test(p));
const enPosts = [...info.keys()].filter((p) => /^\/en\/blog\/[^/]+\/$/.test(p));
for (const pt of ptPosts) {
  const en = '/en' + pt;
  if (!info.has(en)) {
    fail(`falta a tradução ${en}`);
    continue;
  }
  for (const [from, to, tag] of [[pt, en, 'en'], [en, pt, 'pt-BR']]) {
    const target = info.get(from).alternates.find(([lang]) => lang === tag)?.[1];
    if (target !== to) fail(`${from}: hreflang="${tag}" deveria apontar para ${to}, aponta para ${target ?? 'nada'}`);
  }
  if (info.get(en).lang !== 'en') fail(`${en}: lang esperado en`);
  if (info.get(en).canonical && pathOf(info.get(en).canonical) !== en) fail(`${en}: canonical deveria ser a própria página`);
}
for (const en of enPosts) if (!info.has(en.replace(/^\/en/, ''))) fail(`${en} não tem o original em português`);
notes.push(`Blog: ${ptPosts.length} posts em PT e ${enPosts.length} em EN, com hreflang nos dois sentidos.`);

// 3) Metadados de cada página.
for (const [path, i] of info) {
  if (path === '/404.html') continue;
  if (!i.title) fail(`${path}: sem <title>`);
  if (!i.description) fail(`${path}: sem meta description`);
  if (!i.canonical) fail(`${path}: sem canonical`);
  if (i.h1 !== 1) fail(`${path}: esperado 1 <h1>, há ${i.h1}`);
  if (i.twitterCard !== 'summary_large_image') fail(`${path}: twitter:card = ${i.twitterCard}`);
  if (i.ogImage) {
    const local = pathOf(i.ogImage);
    if (!existsSync(join(DIST, local))) fail(`${path}: og:image ${local} não existe`);
  } else fail(`${path}: sem og:image`);
}

// 4) JSON-LD: JSON válido e propriedades mínimas por tipo.
const required = {
  Person: ['name', 'url', 'jobTitle', 'sameAs'],
  WebSite: ['name', 'url'],
  BlogPosting: ['headline', 'datePublished', 'author', 'url', 'image'],
  BreadcrumbList: ['itemListElement'],
};
let blocks = 0;
for (const [path, i] of info) {
  for (const raw of i.jsonLd) {
    let data;
    try {
      data = JSON.parse(raw);
    } catch (e) {
      fail(`${path}: JSON-LD inválido (${e.message})`);
      continue;
    }
    for (const item of Array.isArray(data) ? data : [data]) {
      blocks++;
      if (item['@context'] !== 'https://schema.org') fail(`${path}: JSON-LD sem @context schema.org`);
      const type = item['@type'];
      for (const key of required[type] ?? []) if (item[key] === undefined) fail(`${path}: ${type} sem "${key}"`);
      if (type === 'BreadcrumbList') {
        item.itemListElement.forEach((el, n) => {
          if (el.position !== n + 1 || !el.name || !el.item) fail(`${path}: BreadcrumbList item ${n + 1} incompleto`);
        });
      }
    }
  }
}
notes.push(`JSON-LD: ${blocks} blocos conferidos.`);

// 5) Sitemap e robots.
const sitemapFiles = walk(DIST).filter((f) => /sitemap-\d+\.xml$/.test(f));
const sitemapUrls = new Set();
for (const f of sitemapFiles) for (const m of readFileSync(f, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(pathOf(m[1]));
for (const [path] of info) {
  const shouldBeListed = path !== '/404.html';
  if (shouldBeListed && !sitemapUrls.has(path)) fail(`sitemap sem ${path}`);
  if (!shouldBeListed && sitemapUrls.has(path)) fail(`sitemap não deveria listar ${path}`);
}
for (const url of sitemapUrls) if (!info.has(url)) fail(`sitemap lista ${url}, que não existe no build`);
notes.push(`Sitemap: ${sitemapUrls.size} URLs.`);
if (!/Sitemap:/i.test(existsSync(join(DIST, 'robots.txt')) ? readFileSync(join(DIST, 'robots.txt'), 'utf8') : '')) {
  notes.push('robots.txt sem linha "Sitemap:" (o sitemap está declarado no <head> de cada página).');
}

console.log(notes.join('\n'));
console.log(problems.length ? `\n${problems.length} problema(s):\n- ${problems.join('\n- ')}` : '\nNenhum problema encontrado.');
process.exit(problems.length ? 1 : 0);
