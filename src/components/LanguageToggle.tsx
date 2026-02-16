'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageToggle() {
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');

  // 현재 경로에서 언어 전환 경로 생성
  const targetPath = isEn
    ? pathname.replace(/^\/en/, '') || '/'
    : `/en${pathname}`;

  return (
    <Link
      href={targetPath}
      className="text-muted hover:text-foreground text-sm transition-colors"
      title={isEn ? '한국어' : 'English'}
    >
      {isEn ? 'KO' : 'EN'}
    </Link>
  );
}
