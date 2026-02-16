import type { Metadata } from 'next';
import { RootShell } from '@/components/RootShell';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION.ko,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: { 'application/rss+xml': '/feed.xml' },
    languages: { en: '/en' },
  },
};

export default function KoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell lang="ko">{children}</RootShell>;
}
