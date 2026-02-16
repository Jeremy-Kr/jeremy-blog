import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="mb-8 text-2xl font-bold">Posts</h1>
      {posts.length === 0 ? (
        <p className="text-muted">아직 작성된 포스트가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
