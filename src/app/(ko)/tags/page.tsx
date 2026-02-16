import type { Metadata } from 'next';
import { t } from '@/lib/i18n';
import { TagsPage } from '@/components/pages/TagsPage';

export const metadata: Metadata = {
  title: t('ko').tags,
  description: t('ko').tagsDescription,
};

export default function Page() {
  return <TagsPage lang="ko" />;
}
