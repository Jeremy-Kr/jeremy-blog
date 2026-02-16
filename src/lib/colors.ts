const RAINBOW_COLORS = [
  'rainbow-red',
  'rainbow-orange',
  'rainbow-yellow',
  'rainbow-green',
  'rainbow-blue',
  'rainbow-violet',
] as const;

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/** 태그 문자열에서 일관된 레인보우 CSS 변수명 반환 */
export function getTagColor(tag: string): string {
  return RAINBOW_COLORS[hashString(tag) % RAINBOW_COLORS.length];
}

/** 인덱스 기반 레인보우 색상 순환 */
export function getRainbowByIndex(index: number): string {
  return RAINBOW_COLORS[index % RAINBOW_COLORS.length];
}
