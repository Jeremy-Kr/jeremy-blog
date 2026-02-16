import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { getRainbowByIndex } from '@/lib/colors';
import { formatDate } from '@/lib/date';
import { TagList } from './TagList';

interface PostCardProps {
  post: PostMeta;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
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
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime}</span>
        </div>
        <div className="mt-2">
          <TagList tags={post.tags} />
        </div>
      </Link>
    </article>
  );
}
