import Link from 'next/link';
import { getTagColor } from '@/lib/colors';

interface TagListProps {
  tags: string[];
  size?: 'sm' | 'md';
  linked?: boolean;
}

export function TagList({ tags, size = 'sm', linked = true }: TagListProps) {
  if (tags.length === 0) return null;

  const paddingClass = size === 'md' ? 'px-2.5 py-0.5' : 'px-2 py-0.5';

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const colorVar = `var(--${getTagColor(tag)})`;
        const className = `rounded-full ${paddingClass} text-xs font-medium`;
        const style = {
          color: colorVar,
          backgroundColor: `color-mix(in srgb, ${colorVar} 12%, transparent)`,
        };

        return linked ? (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className={`${className} transition-opacity hover:opacity-80`}
            style={style}
          >
            {tag}
          </Link>
        ) : (
          <span key={tag} className={className} style={style}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}
