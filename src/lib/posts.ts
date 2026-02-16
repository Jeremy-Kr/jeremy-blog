import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
}

export interface Post extends PostMeta {
  content: string;
}

function parseFrontmatter(
  slug: string,
  raw: string,
): { meta: PostMeta; content: string } {
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? '',
    tags: data.tags ?? [],
    readingTime: readingTime(content).text,
  };
  return { meta, content };
}

function getMdxFiles(): string[] {
  return fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
}

export function getAllPosts(): PostMeta[] {
  return getMdxFiles()
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      return parseFrontmatter(slug, raw).meta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, content } = parseFrontmatter(slug, raw);
  return { ...meta, content };
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map((f) => f.replace(/\.mdx$/, ''));
}

/** 모든 태그와 각 태그의 포스트 수를 반환 */
export function getAllTags(): Map<string, number> {
  const tags = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }
  return tags;
}

/** 특정 태그를 가진 포스트 목록 반환 (날짜순 정렬됨) */
export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
