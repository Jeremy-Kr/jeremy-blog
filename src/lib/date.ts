import type { Locale } from './i18n';

const localeMap: Record<Locale, string> = {
  ko: 'ko-KR',
  en: 'en-US',
};

/** ISO 날짜 문자열을 로케일에 맞게 포맷 */
export function formatDate(dateString: string, locale: Locale = 'ko'): string {
  return new Date(dateString).toLocaleDateString(localeMap[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
