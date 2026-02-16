import type { Locale } from '@/lib/i18n';
import { t } from '@/lib/i18n';
import { getPostsByTag } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

interface TagPostsPageProps {
  tag: string;
  lang: Locale;
}

export function TagPostsPage({ tag, lang }: TagPostsPageProps) {
  const posts = getPostsByTag(tag, lang);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        #{tag}
      </h1>
      <p className="text-muted mb-8 text-sm">
        {t(lang).postsCount(posts.length)}
      </p>
      <div className="flex flex-col gap-8">
        {posts.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} lang={lang} />
        ))}
      </div>
    </section>
  );
}
