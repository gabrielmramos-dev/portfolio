import type { APIRoute, GetStaticPaths } from 'astro';
import { getAllPosts } from '../../lib/posts';
import { postOgImage } from '../../lib/og';

// Imagem de compartilhamento de cada post (pt), gerada na montagem do site.
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts('pt');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, date: post.data.date, tags: post.data.tags },
  }));
};

export const GET: APIRoute = ({ props }) => {
  const { title, date, tags } = props as { title: string; date: Date; tags: string[] };
  return postOgImage({ title, date, tags, lang: 'pt' });
};
