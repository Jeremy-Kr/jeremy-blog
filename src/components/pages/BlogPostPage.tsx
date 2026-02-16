import { notFound } from 'next/navigation';
import Link from 'next/link';
import { t, localePath, type Locale } from '@/lib/i18n';
import { getPostBySlug, hasTranslation } from '@/lib/posts';
import { renderMDX } from '@/lib/mdx';
import { formatDate } from '@/lib/date';
import { TagList } from '@/components/TagList';

interface BlogPostPageProps {
  slug: string;
  lang: Locale;
}

export async function BlogPostPage({ slug, lang }: BlogPostPageProps) {
  const post = getPostBySlug(slug, lang);

  // 영어 포스트가 없으면 미번역 안내
  if (!post && lang === 'en') {
    const koPost = getPostBySlug(slug, 'ko');
    if (!koPost) notFound();

    return (
      <article className="animate-fade-up">
        <header className="mb-8">
          <h1 className="rainbow-text font-display text-3xl font-bold">
            {koPost.title}
          </h1>
        </header>
        <p className="text-muted mb-4">{t(lang).notTranslated}</p>
        <Link href={`/blog/${slug}`} className="text-accent hover:underline">
          한국어로 읽기 →
        </Link>
      </article>
    );
  }

  if (!post) notFound();

  const content = await renderMDX(post.content);
  const otherLocale = lang === 'ko' ? 'en' : 'ko';
  const hasOtherLang = hasTranslation(slug, lang);

  return (
    <article className="animate-fade-up">
      <header className="mb-8">
        <h1 className="rainbow-text font-display text-3xl font-bold">
          {post.title}
        </h1>
        <div className="text-muted mt-2 flex items-center gap-3 text-sm">
          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
          <span>{post.readingTime}</span>
          {hasOtherLang && (
            <Link
              href={localePath(otherLocale, `/blog/${slug}`)}
              className="text-accent hover:underline"
            >
              {otherLocale === 'en' ? 'English' : '한국어'}
            </Link>
          )}
        </div>
        <div className="mt-3">
          <TagList tags={post.tags} size="md" lang={lang} />
        </div>
      </header>
      <div className="prose">{content}</div>
    </article>
  );
}
