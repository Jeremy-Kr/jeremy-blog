import { getTagColor } from '@/lib/colors';

interface TagListProps {
  tags: string[];
  size?: 'sm' | 'md';
}

export function TagList({ tags, size = 'sm' }: TagListProps) {
  if (tags.length === 0) return null;

  const paddingClass = size === 'md' ? 'px-2.5 py-0.5' : 'px-2 py-0.5';

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => {
        const colorVar = `var(--${getTagColor(tag)})`;
        return (
          <span
            key={tag}
            className={`rounded-full ${paddingClass} text-xs font-medium`}
            style={{
              color: colorVar,
              backgroundColor: `color-mix(in srgb, ${colorVar} 12%, transparent)`,
            }}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}
