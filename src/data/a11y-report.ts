// Resultado dos testes citados na página de acessibilidade. Atualize junto com cada revisão
// (rode `npm run a11y` com o site em `astro preview --port 4399`).
export const a11yReport = {
  date: '2026-11-13',
  pt: {
    tested: [
      'Verificação automática com o axe-core 4.14 (regras WCAG 2.0, 2.1 e 2.2, níveis A e AA, mais boas práticas) em 10 páginas e 5 modos: tema claro, tema escuro, alto contraste claro, alto contraste escuro e texto em 150%. Resultado: nenhuma violação.',
      'Lighthouse: nota 100 em acessibilidade nas páginas que medi (início, projetos e esta página, em português e em inglês).',
      'Teclado: percorri 39 vezes a tecla Tab na página inicial (computador e celular) e em projetos (celular). Todo item focado tem indicador visível, o primeiro é "Pular para o conteúdo" e nenhum fica escondido atrás da barra fixa do celular.',
      'Reflow: as 10 páginas em 320 px de largura, com texto em 100% e em 150%, sem rolagem horizontal da página.',
      'Contraste: calculei os pares de cores dos dois temas (texto normal acima de 4,5:1, e acima de 7:1 no alto contraste).',
      'As preferências de texto, contraste e movimento continuam ao navegar entre páginas e voltam ao padrão do sistema ao restaurar.',
    ],
    notTested: [
      'Leitores de tela reais (NVDA, JAWS, VoiceOver e TalkBack). Nenhum foi usado até agora.',
      'Navegadores além do Chrome (Firefox e Safari) e aparelhos reais.',
      'Ampliador de tela e comando por voz.',
      'Revisão ou auditoria feita por outras pessoas, inclusive pessoas com deficiência.',
      'A qualidade das descrições alternativas das imagens: só eu revisei.',
    ],
  },
  en: {
    tested: [
      'Automated check with axe-core 4.14 (WCAG 2.0, 2.1 and 2.2 rules, levels A and AA, plus best practices) on 10 pages and 5 modes: light theme, dark theme, light high contrast, dark high contrast and 150% text. Result: no violations.',
      'Lighthouse: score 100 for accessibility on the pages I measured (home, projects and this page, in Portuguese and English).',
      'Keyboard: I pressed Tab 39 times on the home page (desktop and phone) and on projects (phone). Every focused item has a visible indicator, the first is "Skip to content" and none is hidden behind the phone’s fixed bar.',
      'Reflow: all 10 pages at 320 px wide, with text at 100% and 150%, with no horizontal page scrolling.',
      'Contrast: I calculated the color pairs of both themes (normal text above 4.5:1, and above 7:1 in high contrast).',
      'The text, contrast and motion preferences persist when moving between pages and return to the system default when restored.',
    ],
    notTested: [
      'Real screen readers (NVDA, JAWS, VoiceOver and TalkBack). None has been used so far.',
      'Browsers other than Chrome (Firefox and Safari) and real devices.',
      'Screen magnifiers and voice control.',
      'Review or audit by other people, including people with disabilities.',
      'The quality of the image alternative texts: only I reviewed them.',
    ],
  },
};
