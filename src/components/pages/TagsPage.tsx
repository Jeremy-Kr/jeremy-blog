import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { t, localePath } from '@/lib/i18n';
import { getAllTags } from '@/lib/posts';
import { getTagColor, getColorStyle } from '@/lib/colors';

interface TagsPageProps {
  lang: Locale;
}

export function TagsPage({ lang }: TagsPageProps) {
  const tags = getAllTags(lang);
  const sorted = [...tags.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        {t(lang).tags}
      </h1>
      <div className="flex flex-wrap gap-3">
        {sorted.map(([tag, count]) => (
          <Link
            key={tag}
            href={localePath(lang, `/tags/${tag}`)}
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
