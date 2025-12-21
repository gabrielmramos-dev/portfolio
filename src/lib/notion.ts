import { Client } from '@notionhq/client';
import type {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

const apiKey = import.meta.env.NOTION_API_KEY || '';
const databaseId = import.meta.env.NOTION_DATABASE_ID || '';

const isConfigured = Boolean(
  apiKey && 
  (apiKey.startsWith('secret_') || apiKey.startsWith('ntn_')) && 
  databaseId && 
  databaseId.length > 10
);

const notion = isConfigured ? new Client({ auth: apiKey }) : null;

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
}

function extractRichText(richText: RichTextItemResponse[]): string {
  return richText.map((text) => text.plain_text).join('');
}

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!notion || !databaseId) return [];

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  return response.results.map((page) => {
    const p = page as PageObjectResponse;
    const props = p.properties;

    return {
      id: p.id,
      slug: extractRichText((props.Slug as any)?.rich_text || []) || p.id,
      title: extractRichText((props.Title as any)?.title || []),
      description: extractRichText((props.Description as any)?.rich_text || []),
      date: (props.Date as any)?.date?.start || '',
      tags: ((props.Tags as any)?.multi_select || []).map((t: any) => t.name),
      published: (props.Published as any)?.checkbox || false,
    };
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!notion || !databaseId) return null;

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        { property: 'Slug', rich_text: { equals: slug } },
        { property: 'Published', checkbox: { equals: true } },
      ],
    },
  });

  if (response.results.length === 0) return null;

  const page = response.results[0] as PageObjectResponse;
  const props = page.properties;

  return {
    id: page.id,
    slug: extractRichText((props.Slug as any)?.rich_text || []),
    title: extractRichText((props.Title as any)?.title || []),
    description: extractRichText((props.Description as any)?.rich_text || []),
    date: (props.Date as any)?.date?.start || '',
    tags: ((props.Tags as any)?.multi_select || []).map((t: any) => t.name),
    published: (props.Published as any)?.checkbox || false,
  };
}

export async function getPageContent(pageId: string): Promise<BlockObjectResponse[]> {
  if (!notion) return [];

  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
    });

    blocks.push(...(response.results as BlockObjectResponse[]));
    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

export function richTextToHtml(richText: RichTextItemResponse[]): string {
  return richText
    .map((text) => {
      let content = text.plain_text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      if (text.annotations.bold) content = `<strong>${content}</strong>`;
      if (text.annotations.italic) content = `<em>${content}</em>`;
      if (text.annotations.strikethrough) content = `<del>${content}</del>`;
      if (text.annotations.underline) content = `<u>${content}</u>`;
      if (text.annotations.code) content = `<code>${content}</code>`;
      if (text.href) content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`;

      return content;
    })
    .join('');
}

export function blockToHtml(block: BlockObjectResponse): string {
  switch (block.type) {
    case 'paragraph':
      const pText = richTextToHtml(block.paragraph.rich_text);
      return pText ? `<p>${pText}</p>` : '';

    case 'heading_1':
      return `<h1>${richTextToHtml(block.heading_1.rich_text)}</h1>`;

    case 'heading_2':
      return `<h2>${richTextToHtml(block.heading_2.rich_text)}</h2>`;

    case 'heading_3':
      return `<h3>${richTextToHtml(block.heading_3.rich_text)}</h3>`;

    case 'bulleted_list_item':
      return `<li>${richTextToHtml(block.bulleted_list_item.rich_text)}</li>`;

    case 'numbered_list_item':
      return `<li>${richTextToHtml(block.numbered_list_item.rich_text)}</li>`;

    case 'quote':
      return `<blockquote>${richTextToHtml(block.quote.rich_text)}</blockquote>`;

    case 'code':
      const lang = block.code.language || 'plaintext';
      const code = richTextToHtml(block.code.rich_text);
      return `<pre><code class="language-${lang}">${code}</code></pre>`;

    case 'divider':
      return '<hr />';

    case 'image':
      const imgUrl = block.image.type === 'external' 
        ? block.image.external.url 
        : block.image.file.url;
      const caption = block.image.caption.length > 0 
        ? richTextToHtml(block.image.caption) 
        : '';
      return `<figure><img src="${imgUrl}" alt="${caption}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`;

    case 'callout':
      const icon = block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : '💡';
      return `<div class="callout"><span class="callout-icon">${icon}</span><div>${richTextToHtml(block.callout.rich_text)}</div></div>`;

    case 'toggle':
      return `<details><summary>${richTextToHtml(block.toggle.rich_text)}</summary></details>`;

    case 'bookmark':
      return `<a href="${block.bookmark.url}" class="bookmark" target="_blank" rel="noopener noreferrer">${block.bookmark.url}</a>`;

    default:
      return '';
  }
}

export function blocksToHtml(blocks: BlockObjectResponse[]): string {
  const htmlParts: string[] = [];
  let inBulletList = false;
  let inNumberedList = false;

  for (const block of blocks) {
    const type = block.type;

    if (type !== 'bulleted_list_item' && inBulletList) {
      htmlParts.push('</ul>');
      inBulletList = false;
    }
    if (type !== 'numbered_list_item' && inNumberedList) {
      htmlParts.push('</ol>');
      inNumberedList = false;
    }

    if (type === 'bulleted_list_item' && !inBulletList) {
      htmlParts.push('<ul>');
      inBulletList = true;
    }
    if (type === 'numbered_list_item' && !inNumberedList) {
      htmlParts.push('<ol>');
      inNumberedList = true;
    }

    htmlParts.push(blockToHtml(block));
  }

  if (inBulletList) htmlParts.push('</ul>');
  if (inNumberedList) htmlParts.push('</ol>');

  return htmlParts.join('\n');
}
