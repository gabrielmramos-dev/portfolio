import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getAllPosts } from '../../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getAllPosts('en');

  return rss({
    title: 'Blog | Gabriel Ramos',
    description: 'Articles and notes on technology and software development.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/en/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
