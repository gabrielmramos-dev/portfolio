// Dados do site que se repetem em várias páginas. Mude aqui, e só aqui.
export const site = {
  name: 'Gabriel Ramos',
  url: 'https://gabrielmramos.dev',

  // E-mail de contato. Nunca aparece em texto puro no HTML: veja components/Email.astro.
  email: 'gabrieldotech@gmail.com',
  // TODO(gabriel): quando contato@gabrielmramos.dev existir e encaminhar para a sua caixa, troque `email` por ele.
  emailCandidate: 'contato@gabrielmramos.dev',

  // Mesmo rótulo e mesmo handle em todos os links externos.
  social: {
    github: { label: 'GitHub', handle: 'gabrielmramos-dev', url: 'https://github.com/gabrielmramos-dev' },
    linkedin: { label: 'LinkedIn', handle: 'ongabrielramos', url: 'https://www.linkedin.com/in/ongabrielramos/' },
  },

  // Itens entregues na PRODAM. Atualize `count` e `until` juntos: o texto sempre mostra o período a que o número se refere.
  prodamWorkItems: { count: 70, from: '2026-03', until: '2026-11' },

  // Currículos. O PDF em inglês é gerado de resume/curriculo-en.html (npm run resume:en).
  resume: { pt: '/curriculo.pdf', en: '/curriculo-en.pdf' },
} as const;
