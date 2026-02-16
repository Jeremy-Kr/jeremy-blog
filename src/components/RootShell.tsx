import localFont from 'next/font/local';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import type { Locale } from '@/lib/i18n';

const pretendard = localFont({
  src: '../app/fonts/PretendardVariable.woff2',
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

const fontClasses = `${pretendard.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} font-sans antialiased`;

// 정적 테마 초기화 스크립트 (FOUC 방지, 사용자 입력 없음)
const themeScript = `
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

interface RootShellProps {
  lang: Locale;
  children: React.ReactNode;
}

export function RootShell({ lang, children }: RootShellProps) {
  return (
    <html lang={lang} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- App Router root layout shell */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={fontClasses}>
        <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6">
          <Header lang={lang} />
          <main className="flex-1 py-8">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
