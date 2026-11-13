import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:4321');

// https://astro.build/config
export default defineConfig({
  site,
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: false } },
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } },
    }),
  ],
});
