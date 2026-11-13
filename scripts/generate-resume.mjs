// Gera public/curriculo-en.pdf a partir de resume/curriculo-en.html, com o Chrome (PDF com marcação de acessibilidade).
// Uso: node scripts/generate-resume.mjs   (edite o HTML e rode de novo para atualizar o PDF)
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const chrome = process.env.CHROME_BIN ?? '/usr/bin/google-chrome';
const input = resolve('resume/curriculo-en.html');
const output = resolve('public/curriculo-en.pdf');

execFileSync(chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files', `--print-to-pdf=${output}`, `file://${input}`], { stdio: 'ignore' });
console.log('gerado', output);
