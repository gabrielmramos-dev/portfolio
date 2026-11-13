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
  education: { pt: '/formacao/', en: '/en/education/' },
  blog: { pt: '/blog/', en: '/en/blog/' },
  accessibility: { pt: '/acessibilidade/', en: '/en/accessibility/' },
} as const;

export type RouteId = keyof typeof routes;

export const ui = {
  pt: {
    skip: 'Pular para o conteúdo',
    back: 'Voltar',
    siteDescription:
      'Gabriel Ramos — Software Developer Intern na PRODAM (Prefeitura de São Paulo). Desenvolvedor .NET: APIs, dados abertos e IA aplicada.',
    nav: {
      home: 'Início',
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
    menu: 'Menu',
    a11y: 'Acessibilidade',
    newTab: ' (abre em nova aba)',
    theme: { dark: 'Escuro', light: 'Claro', label: 'Tema', toLight: 'Mudar para o tema claro', toDark: 'Mudar para o tema escuro' },
  },
  en: {
    skip: 'Skip to content',
    back: 'Back',
    siteDescription:
      'Gabriel Ramos — Software Developer Intern at PRODAM (São Paulo City Hall). .NET developer: APIs, open data and applied AI.',
    nav: {
      home: 'Home',
      projects: 'Projects',
      education: 'Education',
      experience: 'Experience',
      blog: 'Blog',
    },
    navLabel: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    photoAlt: 'Photo of Gabriel Ramos',
    switchLabel: 'Switch language to Portuguese',
    footerContact: 'Email',
    menu: 'Menu',
    a11y: 'Accessibility',
    newTab: ' (opens in a new tab)',
    theme: { dark: 'Dark', light: 'Light', label: 'Theme', toLight: 'Switch to the light theme', toDark: 'Switch to the dark theme' },
  },
} as const;
