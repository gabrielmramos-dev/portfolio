// Gera os dois currículos em PDF com o Chrome (PDF com marcação de acessibilidade):
//   resume/curriculo-pt.html -> public/curriculo.pdf
//   resume/curriculo-en.html -> public/curriculo-en.pdf
// Os dois HTML têm a mesma estrutura e o mesmo conteúdo: ao mudar um, mude o outro.
// Uso: node scripts/generate-resume.mjs   (ou npm run resume)
import { execFileSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const chrome = process.env.CHROME_BIN ?? '/usr/bin/google-chrome';
const targets = [
  ['resume/curriculo-pt.html', 'public/curriculo.pdf'],
  ['resume/curriculo-en.html', 'public/curriculo-en.pdf'],
];

// Perfil temporário: não se mistura com outro Chrome que esteja aberto.
const profile = mkdtempSync(join(tmpdir(), 'resume-chrome-'));
try {
  for (const [source, output] of targets) {
    execFileSync(
      chrome,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        `--user-data-dir=${profile}`,
        '--no-pdf-header-footer',
        '--allow-file-access-from-files',
        `--print-to-pdf=${resolve(output)}`,
        `file://${resolve(source)}`,
      ],
      { stdio: 'ignore' },
    );
    console.log('gerado', output);
  }
} finally {
  rmSync(profile, { recursive: true, force: true });
}
