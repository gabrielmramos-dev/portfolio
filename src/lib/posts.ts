import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type Post = CollectionEntry<'blog'> | CollectionEntry<'blogEn'>;

const WORDS_PER_MINUTE = 200;

export function readingTime(post: Post): number {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

// Rascunhos (draft: true) só aparecem no `astro dev`.
const published = ({ data }: { data: { draft: boolean } }) => import.meta.env.DEV || !data.draft;

let checked: Promise<void> | undefined;

/** Todo post precisa existir em português e em inglês. Sem a tradução, o build falha. */
function assertTranslations(): Promise<void> {
  checked ??= (async () => {
    const [pt, en] = await Promise.all([getCollection('blog', published), getCollection('blogEn', published)]);
    const ptIds = new Set(pt.map((post) => post.id));
    const enIds = new Set(en.map((post) => post.id));
    const missingEn = [...ptIds].filter((id) => !enIds.has(id));
    const missingPt = [...enIds].filter((id) => !ptIds.has(id));
    if (missingEn.length || missingPt.length) {
      throw new Error(
        [
          'Os posts do blog precisam existir nos dois idiomas.',
          missingEn.length ? `Falta a tradução em inglês (src/content/blog-en): ${missingEn.join(', ')}` : '',
          missingPt.length ? `Falta o original em português (src/content/blog): ${missingPt.join(', ')}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
      );
    }
  })();
  return checked;
}

export async function getAllPosts(lang: Lang = 'pt'): Promise<Post[]> {
  await assertTranslations();
  const posts: Post[] =
    lang === 'pt' ? await getCollection('blog', published) : await getCollection('blogEn', published);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
