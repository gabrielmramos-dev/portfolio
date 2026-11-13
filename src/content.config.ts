import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const schema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

// Todo post existe nos dois idiomas, com o mesmo nome de arquivo: src/content/blog (português) e
// src/content/blog-en (inglês). O build falha se um dos lados faltar (veja lib/posts.ts).
const blog = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }), schema });
const blogEn = defineCollection({ loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog-en' }), schema });

export const collections = { blog, blogEn };
