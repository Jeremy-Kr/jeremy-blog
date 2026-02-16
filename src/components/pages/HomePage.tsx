import { t, type Locale } from '@/lib/i18n';
import { getAllPosts } from '@/lib/posts';
import { PostCard } from '@/components/PostCard';

interface HomePageProps {
  lang: Locale;
}

export function HomePage({ lang }: HomePageProps) {
  const posts = getAllPosts(lang);

  return (
    <section>
      <h1 className="rainbow-text font-display mb-8 text-2xl font-bold">
        {t(lang).posts}
      </h1>
      {posts.length === 0 ? (
        <p className="text-muted">{t(lang).noPosts}</p>
      ) : (
        <div className="flex flex-col gap-8">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} lang={lang} />
          ))}
        </div>
      )}
    </section>
  );
}
