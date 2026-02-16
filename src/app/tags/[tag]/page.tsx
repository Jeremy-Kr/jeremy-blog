import type { Metadata } from 'next';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

type TagPageProps = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllTags().keys()].map((tag) => ({ tag }));
}

async function resolveTag(params: TagPageProps['params']): Promise<string> {
  const { tag } = await params;
  return decodeURIComponent(tag);
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = await resolveTag(params);
  return {
    title: `#${tag}`,
    description: `"${tag}" 태그 포스트 모아보기`,
  };
}

export default async function TagPostsPage({ params }: TagPageProps) {
  const tag = await resolveTag(params);
  const posts = getPostsByTag(tag);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        #{tag}
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
