import type { TocItem } from '@/lib/toc';

interface TableOfContentsProps {
  items: TocItem[];
  title: string;
}

export function TableOfContents({ items, title }: TableOfContentsProps) {
  if (items.length < 2) return null;

  return (
    <nav
      aria-label={title}
      className="border-border bg-surface relative mb-8 overflow-hidden rounded-lg border"
    >
      <div className="rainbow-bar absolute top-0 right-0 left-0 h-[2px]" />
      <div className="px-5 pt-5 pb-4">
        <p className="text-muted mb-3 text-sm font-medium">{title}</p>
        <ul className="space-y-1.5 text-sm">
          {items.map((item, i) => (
            <li
              key={`${item.id}-${i}`}
              className={item.level === 3 ? 'pl-4' : ''}
            >
              <a
                href={`#${item.id}`}
                className="text-foreground/80 hover:text-accent transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
