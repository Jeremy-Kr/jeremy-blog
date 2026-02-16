import type { Metadata } from 'next';
import { t } from '@/lib/i18n';
import { TagsPage } from '@/components/pages/TagsPage';

export const metadata: Metadata = {
  title: t('en').tags,
  description: t('en').tagsDescription,
};

export default function Page() {
  return <TagsPage lang="en" />;
}
