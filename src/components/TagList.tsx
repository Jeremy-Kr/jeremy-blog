import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { localePath } from '@/lib/i18n';
import { getTagColor, getColorStyle } from '@/lib/colors';

interface TagListProps {
  tags: string[];
  size?: 'sm' | 'md';
  linked?: boolean;
  lang?: Locale;
}

export function TagList({
  tags,
  size = 'sm',
  linked = true,
  lang = 'ko',
}: TagListProps) {
  if (tags.length === 0) return null;

  const paddingClass = size === 'md' ? 'px-2.5 py-0.5' : 'px-2 py-0.5';

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const style = getColorStyle(getTagColor(tag));
        const className = `rounded-full ${paddingClass} text-xs font-medium`;

        if (linked) {
          return (
            <Link
              key={tag}
              href={localePath(lang, `/tags/${tag}`)}
              className={`${className} transition-opacity hover:opacity-80`}
              style={style}
            >
              {tag}
            </Link>
          );
        }

        return (
          <span key={tag} className={className} style={style}>
            {tag}
          </span>
        );
      })}
    </div>
  );
}
