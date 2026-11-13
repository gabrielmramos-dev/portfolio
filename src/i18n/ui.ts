export type Lang = 'pt' | 'en';

export const htmlLang: Record<Lang, string> = { pt: 'pt-BR', en: 'en' };
export const ogLocale: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US' };

export const langFromPath = (pathname: string): Lang =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';

// Páginas que existem nos dois idiomas: id -> caminho por idioma.
export const routes = {
  home: { pt: '/', en: '/en/' },
  projects: { pt: '/projetos/', en: '/en/projects/' },
  experience: { pt: '/experiencia/', en: '/en/experience/' },
} as const;

export type RouteId = keyof typeof routes;

export const ui = {
  pt: {
    skip: 'Pular para o conteúdo',
    back: 'Voltar',
    siteDescription:
      'Gabriel Ramos — Software Developer Intern na PRODAM (Prefeitura de São Paulo). Backend .NET/TypeScript, APIs, dados abertos e IA aplicada.',
    nav: {
      home: 'Home',
      projects: 'Projetos',
      education: 'Formação',
      experience: 'Experiência',
      blog: 'Blog',
    },
    navLabel: 'Principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    photoAlt: 'Foto de Gabriel Ramos',
    switchLabel: 'Mudar idioma para inglês',
    footerContact: 'Email',
  },
  en: {
    skip: 'Skip to content',
    back: 'Back',
    siteDescription:
      'Gabriel Ramos — Software Developer Intern at PRODAM (São Paulo City Hall). .NET/TypeScript backend, APIs, open data and applied AI.',
    nav: {
      home: 'Home',
      projects: 'Projects',
      education: 'Education (PT)',
      experience: 'Experience',
      blog: 'Blog (PT)',
    },
    navLabel: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    photoAlt: 'Photo of Gabriel Ramos',
    switchLabel: 'Switch language to Portuguese',
    footerContact: 'Email',
  },
} as const;
