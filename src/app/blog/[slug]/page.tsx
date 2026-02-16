import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';
import { renderMDX } from '@/lib/mdx';
import { getTagColor } from '@/lib/colors';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
      title: post.title,
      description: post.description,
    };
  });
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
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>{post.readingTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                style={{
                  color: `var(--${getTagColor(tag)})`,
                  backgroundColor: `color-mix(in srgb, var(--${getTagColor(tag)}) 12%, transparent)`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <div className="prose">{content}</div>
    </article>
  );
}
