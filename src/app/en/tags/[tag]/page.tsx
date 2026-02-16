import type { Metadata } from 'next';
import { getAllTags } from '@/lib/posts';
import { t } from '@/lib/i18n';
import { TagPostsPage } from '@/components/pages/TagPostsPage';

type Props = { params: Promise<{ tag: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...getAllTags('en').keys()].map((tag) => ({ tag }));
}

async function resolveTag(params: Props['params']): Promise<string> {
  const { tag } = await params;
  return decodeURIComponent(tag);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await resolveTag(params);
  return {
    title: `#${tag}`,
    description: t('en').tagDescription(tag),
  };
}

export default async function Page({ params }: Props) {
  const tag = await resolveTag(params);
  return <TagPostsPage tag={tag} lang="en" />;
}
