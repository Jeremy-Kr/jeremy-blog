import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants';
import '../globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION.en,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    types: { 'application/rss+xml': '/en/feed.xml' },
    languages: { ko: '/' },
  },
};

const themeScript = `
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${pretendard.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6">
          <Header lang="en" />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
