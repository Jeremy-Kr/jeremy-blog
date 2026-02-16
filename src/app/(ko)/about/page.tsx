import type { Metadata } from 'next';
import { t } from '@/lib/i18n';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: t('ko').about,
  description: t('ko').aboutDescription,
};

export default function Page() {
  return <AboutPage lang="ko" />;
}
