import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Locale } from './i18n';

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

/** locale에 맞는 MDX 파일명 목록 반환 */
function getMdxFiles(locale: Locale = 'ko'): string[] {
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.mdx'));
  if (locale === 'en') {
    return files.filter((f) => f.endsWith('.en.mdx'));
  }
  // ko: .en.mdx 제외
  return files.filter((f) => !f.endsWith('.en.mdx'));
}

/** 파일명에서 slug 추출 (locale에 따라 접미사 제거) */
function fileToSlug(filename: string, locale: Locale = 'ko'): string {
  if (locale === 'en') {
    return filename.replace(/\.en\.mdx$/, '');
  }
  return filename.replace(/\.mdx$/, '');
}

export function getAllPosts(locale: Locale = 'ko'): PostMeta[] {
  return getMdxFiles(locale)
    .map((filename) => {
      const slug = fileToSlug(filename, locale);
      const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8');
      return parseFrontmatter(slug, raw).meta;
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostBySlug(
  slug: string,
  locale: Locale = 'ko',
): Post | null {
  const filename = locale === 'en' ? `${slug}.en.mdx` : `${slug}.mdx`;
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { meta, content } = parseFrontmatter(slug, raw);
  return { ...meta, content };
}

export function getAllSlugs(locale: Locale = 'ko'): string[] {
  return getMdxFiles(locale).map((f) => fileToSlug(f, locale));
}

/** 모든 태그와 각 태그의 포스트 수를 반환 */
export function getAllTags(locale: Locale = 'ko'): Map<string, number> {
  const tags = new Map<string, number>();
  for (const post of getAllPosts(locale)) {
    for (const tag of post.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }
  return tags;
}

/** 특정 태그를 가진 포스트 목록 반환 (날짜순 정렬됨) */
export function getPostsByTag(tag: string, locale: Locale = 'ko'): PostMeta[] {
  return getAllPosts(locale).filter((post) => post.tags.includes(tag));
}

/** 다른 언어 번역이 존재하는지 확인 */
export function hasTranslation(slug: string, locale: Locale): boolean {
  const otherLocale = locale === 'ko' ? 'en' : 'ko';
  return getPostBySlug(slug, otherLocale) !== null;
}
