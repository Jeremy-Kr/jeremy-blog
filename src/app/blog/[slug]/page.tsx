import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { renderMDX } from '@/lib/mdx';
import { formatDate } from '@/lib/date';
import { TagList } from '@/components/TagList';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const content = await renderMDX(post.content);

  return (
    <article className="animate-fade-up">
      <header className="mb-8">
        <h1 className="rainbow-text font-display text-3xl font-bold">
          {post.title}
        </h1>
        <div className="text-muted mt-2 flex items-center gap-3 text-sm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-3">
          <TagList tags={post.tags} size="md" />
        </div>
      </header>
      <div className="prose">{content}</div>
    </article>
  );
}
