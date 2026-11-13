import { site } from '../data/site';
import type { Lang } from '../i18n/ui';

type Json = Record<string, unknown>;

const ctx = 'https://schema.org';

export const personId = (origin: string) => `${origin}/#person`;

export function person(origin: string): Json {
  return {
    '@context': ctx,
    '@type': 'Person',
    '@id': personId(origin),
    name: site.name,
    url: origin,
    jobTitle: 'Software Developer Intern',
    worksFor: { '@type': 'Organization', name: 'PRODAM' },
    sameAs: [site.social.github.url, site.social.linkedin.url],
    knowsAbout: ['C#', '.NET', 'ASP.NET Core', 'TypeScript', 'APIs', 'Open data', 'Generative AI', 'RAG'],
  };
}

export function website(origin: string): Json {
  return {
    '@context': ctx,
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: site.name,
    inLanguage: ['pt-BR', 'en'],
    publisher: { '@id': personId(origin) },
  };
}

/** Migalhas de pão. O primeiro item é a página inicial do idioma. */
export function breadcrumbs(items: { name: string; url: string }[]): Json {
  return {
    '@context': ctx,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function blogPosting(args: {
  origin: string;
  url: string;
  lang: Lang;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  image: string;
}): Json {
  return {
    '@context': ctx,
    '@type': 'BlogPosting',
    headline: args.title,
    description: args.description,
    datePublished: args.date.toISOString().slice(0, 10),
    dateModified: args.date.toISOString().slice(0, 10),
    inLanguage: args.lang === 'pt' ? 'pt-BR' : 'en',
    url: args.url,
    mainEntityOfPage: args.url,
    image: args.image,
    keywords: args.tags.join(', '),
    author: { '@id': personId(args.origin) },
    publisher: { '@id': personId(args.origin) },
  };
}

/** Serializa para dentro de <script>: `<` vira < para o texto nunca fechar a tag. */
export const serialize = (items: Json[]) =>
  JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, '\\u003c');

export const homeLabel = (lang: Lang) => (lang === 'pt' ? 'Início' : 'Home');
