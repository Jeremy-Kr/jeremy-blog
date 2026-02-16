const RAINBOW_COLORS = [
  'rainbow-red',
  'rainbow-orange',
  'rainbow-yellow',
  'rainbow-green',
  'rainbow-blue',
  'rainbow-violet',
] as const;

export type RainbowColor = (typeof RAINBOW_COLORS)[number];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

/** 태그 문자열에서 일관된 레인보우 CSS 변수명 반환 */
export function getTagColor(tag: string): RainbowColor {
  return RAINBOW_COLORS[hashString(tag) % RAINBOW_COLORS.length];
}

/** 인덱스 기반 레인보우 색상 순환 */
export function getRainbowByIndex(index: number): RainbowColor {
  return RAINBOW_COLORS[index % RAINBOW_COLORS.length];
}

/** CSS 변수 기반 color + background 스타일 객체 반환 */
export function getColorStyle(colorName: RainbowColor): {
  color: string;
  backgroundColor: string;
} {
  const colorVar = `var(--${colorName})`;
  return {
    color: colorVar,
    backgroundColor: `color-mix(in srgb, ${colorVar} 12%, transparent)`,
  };
}
