import type { ReactNode } from 'react';

export type Locale = 'ko' | 'en';

export const locales: Locale[] = ['ko', 'en'];
export const defaultLocale: Locale = 'ko';

/** locale에 따른 URL prefix 생성 ('ko' → '', 'en' → '/en') */
export function localePath(locale: Locale, path: string = ''): string {
  const prefix = locale === 'ko' ? '' : '/en';
  return `${prefix}${path}`;
}

export interface Translations {
  posts: string;
  tags: string;
  about: string;
  noPosts: string;
  postsCount: (n: number) => string;
  aboutGreeting: ReactNode;
  aboutBio: string;
  interests: string;
  links: string;
  notTranslated: string;
  aboutDescription: string;
  tagsDescription: string;
  tagDescription: (tag: string) => string;
  toc: string;
}

const translations: Record<Locale, Translations> = {
  ko: {
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    noPosts: '아직 작성된 포스트가 없습니다.',
    postsCount: (n) => `${n}개의 포스트`,
    aboutGreeting: (
      <>
        안녕하세요, <strong>Jeremy</strong>입니다.
      </>
    ),
    aboutBio:
      '소프트웨어를 만들고, 배운 것을 글로 정리하는 개발자입니다. 좋은 코드와 좋은 디자인 사이 어딘가에서 균형을 찾으려 합니다.',
    interests: '관심사',
    links: '링크',
    notTranslated: '',
    aboutDescription: '소개 페이지',
    tagsDescription: '태그별 포스트 모아보기',
    tagDescription: (tag) => `"${tag}" 태그 포스트 모아보기`,
    toc: '목차',
  },
  en: {
    posts: 'Posts',
    tags: 'Tags',
    about: 'About',
    noPosts: 'No posts yet.',
    postsCount: (n) => `${n} post${n === 1 ? '' : 's'}`,
    aboutGreeting: (
      <>
        Hi, I&apos;m <strong>Jeremy</strong>.
      </>
    ),
    aboutBio:
      'I build software and write about what I learn. I try to find a balance between good code and good design.',
    interests: 'Interests',
    links: 'Links',
    notTranslated: 'This post is not yet available in English.',
    aboutDescription: 'About page',
    tagsDescription: 'Browse posts by tag',
    tagDescription: (tag) => `Posts tagged "${tag}"`,
    toc: 'Table of Contents',
  },
};

export function t(locale: Locale): Translations {
  return translations[locale];
}
