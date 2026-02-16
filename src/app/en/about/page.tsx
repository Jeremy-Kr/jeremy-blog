import type { Metadata } from 'next';
import { t } from '@/lib/i18n';
import { AboutPage } from '@/components/pages/AboutPage';

export const metadata: Metadata = {
  title: t('en').about,
  description: t('en').aboutDescription,
};

export default function Page() {
  return <AboutPage lang="en" />;
}
