import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { getTagColor, getRainbowByIndex } from '@/lib/colors';

export function PostCard({
  post,
  index = 0,
}: {
  post: PostMeta;
  index?: number;
}) {
  const borderColor = `var(--${getRainbowByIndex(index)})`;

  return (
    <article
      className="animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-lg border-l-[3px] py-1 pl-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        style={{ borderColor }}
      >
        <h2 className="font-display group-hover:text-accent text-lg font-semibold transition-colors">
          {post.title}
        </h2>
        <p className="text-muted mt-1 line-clamp-2 text-sm">
          {post.description}
        </p>
        <div className="text-muted mt-2 flex items-center gap-3 text-xs">
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
                className="rounded-full px-2 py-0.5 text-xs font-medium"
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
      </Link>
    </article>
  );
}
