import { slugify } from './slugify';

export interface TocItem {
  level: number;
  text: string;
  id: string;
}

export function extractHeadings(markdown: string): TocItem[] {
  // 코드 블록 내부의 # 기호가 헤딩으로 잘못 인식되지 않도록 제거
  const withoutCodeBlocks = markdown.replace(/```[\s\S]*?```/g, '');
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;

  return [...withoutCodeBlocks.matchAll(headingRegex)].map((match) => {
    const text = match[2].trim();
    return { level: match[1].length, text, id: slugify(text) };
  });
}
