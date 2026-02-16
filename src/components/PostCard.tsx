import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`} className="group block">
        <h2 className="text-lg font-semibold group-hover:text-accent transition-colors">
          {post.title}
        </h2>
        <p className="mt-1 text-sm text-muted line-clamp-2">{post.description}</p>
        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
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
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
