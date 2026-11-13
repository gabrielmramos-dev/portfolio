// Verificação de acessibilidade no navegador: axe-core (WCAG 2.2 AA) em vários modos,
// foco por teclado, reflow em 320 px e texto em 150%.
// Uso: npm run build && npx astro preview --port 4399 &  node scripts/a11y-check.mjs
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const BASE = process.env.BASE_URL ?? 'http://localhost:4399';
const PAGES = ['/', '/projetos/', '/experiencia/', '/formacao/', '/blog/', '/blog/ensinar-para-programar-melhor/', '/acessibilidade/', '/en/', '/en/projects/', '/en/experience/', '/en/education/', '/en/blog/', '/en/blog/ensinar-para-programar-melhor/', '/en/accessibility/'];
const MODES = [
  { name: 'claro', prefs: { theme: 'light' } },
  { name: 'escuro', prefs: { theme: 'dark' } },
  { name: 'alto-contraste-claro', prefs: { theme: 'light', a11y: { contrast: 'high' } } },
  { name: 'alto-contraste-escuro', prefs: { theme: 'dark', a11y: { contrast: 'high' } } },
  { name: 'texto-150', prefs: { theme: 'light', a11y: { text: '150' } } },
];

const port = 9444;
const chrome = spawn('/usr/bin/google-chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', `--remote-debugging-port=${port}`, 'about:blank'], { stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));
const target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page');
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result.value;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await send('Page.enable');

async function load(path, prefs, width = 1280) {
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 700 });
  await send('Page.navigate', { url: `${BASE}/blog/` });
  await wait(600);
  await ev(`localStorage.clear(); localStorage.setItem('theme', ${JSON.stringify(prefs.theme)}); ${prefs.a11y ? `localStorage.setItem('a11y', ${JSON.stringify(JSON.stringify(prefs.a11y))});` : ''} 0`);
  await send('Page.navigate', { url: `${BASE}${path}` });
  await wait(1800);
}

const results = { axe: [], reflow: [], foco: [] };

for (const mode of MODES) {
  for (const path of PAGES) {
    await load(path, mode.prefs);
    await ev(axeSource);
    const out = await ev(`axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice'] } }).then(r => JSON.stringify(r.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, sample: v.nodes[0].target.join(' ') }))))`);
    results.axe.push({ modo: mode.name, pagina: path, violacoes: JSON.parse(out) });
  }
}

// Reflow em 320 px (equivale a zoom de 400% em tela de 1280) e com texto em 150%.
for (const path of PAGES) {
  for (const text of ['100', '150']) {
    await load(path, { theme: 'light', a11y: { text } }, 320);
    const overflow = await ev(`JSON.stringify({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, culprits: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== 'absolute' && !e.closest('pre, table, .gh-graph-scroll')).slice(0,3).map(e => e.tagName + '.' + e.className) })`);
    results.reflow.push({ pagina: path, texto: text, ...JSON.parse(overflow) });
  }
}

// Foco por teclado: percorre com Tab e confere indicador visível e que o foco não fica sob a barra fixa.
for (const [path, width] of [['/', 1280], ['/', 390], ['/projetos/', 390]]) {
  await load(path, { theme: 'light' }, width);
  const seq = [];
  for (let i = 0; i < 40; i++) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    const info = await ev(`(() => { const e = document.activeElement; if (!e || e === document.body) return null; const r = e.getBoundingClientRect(); const cs = getComputedStyle(e); const bar = document.querySelector('.rail'); const barBottom = getComputedStyle(bar).position === 'sticky' && innerWidth <= 900 ? bar.getBoundingClientRect().bottom : 0; return JSON.stringify({ el: e.tagName + (e.getAttribute('href') ? '[' + e.getAttribute('href').slice(0,28) + ']' : '') + ' ' + (e.textContent || '').trim().slice(0,24), outline: cs.outlineStyle + ' ' + cs.outlineWidth, escondido: !e.closest('.rail') && !e.classList.contains('skip-link') && r.top < barBottom - 1 && r.bottom > 0 }); })()`);
    if (info) seq.push(JSON.parse(info));
  }
  results.foco.push({ pagina: path, largura: width, passos: seq.length, semIndicador: seq.filter((s) => s.outline.startsWith('none')).map((s) => s.el), atrasDaBarra: seq.filter((s) => s.escondido).map((s) => s.el), primeiro: seq[0]?.el });
}

console.log(JSON.stringify(results, null, 1));
chrome.kill();
