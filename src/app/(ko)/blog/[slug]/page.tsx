import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { BlogPostPage } from '@/components/pages/BlogPostPage';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs('ko').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'ko');
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <BlogPostPage slug={slug} lang="ko" />;
}
