import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts();

  return rss({
    title: 'Blog | Gabriel Ramos',
    description: 'Artigos, reflexões e aprendizados sobre tecnologia e desenvolvimento.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>pt-BR</language>',
  });
}
