import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags } from '@/lib/posts';
import { getTagColor, getColorStyle } from '@/lib/colors';

export const metadata: Metadata = {
  title: 'Tags',
  description: '태그별 포스트 모아보기',
};

export default function TagsPage() {
  const tags = getAllTags();
  const sorted = [...tags.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        Tags
      </h1>
      <div className="flex flex-wrap gap-3">
        {sorted.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-full px-3 py-1.5 text-sm font-medium transition-opacity hover:opacity-80"
            style={getColorStyle(getTagColor(tag))}
          >
            {tag}
            <span className="ml-1 opacity-60">({count})</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
