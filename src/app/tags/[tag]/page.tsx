import type { Metadata } from 'next';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllTags().keys()].map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `"${decoded}" 태그 포스트 모아보기`,
  };
}

export default async function TagPostsPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getPostsByTag(decoded);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        #{decoded}
      </h1>
      <p className="text-muted mb-8 text-sm">{posts.length}개의 포스트</p>
      <div className="flex flex-col gap-8">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
