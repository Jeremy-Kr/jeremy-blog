/** ISO 날짜 문자열을 한국어 로케일로 포맷 (예: 2026년 2월 16일) */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
