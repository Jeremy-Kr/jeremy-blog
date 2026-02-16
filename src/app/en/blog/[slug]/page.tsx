import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { BlogPostPage } from '@/components/pages/BlogPostPage';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // 한국어 전체 슬러그 — 미번역 포스트도 안내 페이지로 SSG
  return getAllSlugs('ko').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en') ?? getPostBySlug(slug, 'ko');
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} lang="en" />;
}
