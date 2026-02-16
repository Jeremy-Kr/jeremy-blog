import type { Metadata } from 'next';
import { getRainbowByIndex, getColorStyle } from '@/lib/colors';

export const metadata: Metadata = {
  title: 'About',
  description: '소개 페이지',
};

const interests = ['TypeScript', 'React', 'Next.js', 'Rust', 'DevOps', 'UI/UX'];

const links = [
  { label: 'GitHub', href: 'https://github.com/jeremy' },
  { label: 'Email', href: 'mailto:hello@jeremy.blog' },
];

export default function AboutPage() {
  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-6 text-2xl font-bold">
        About
      </h1>

      <div className="space-y-4 leading-relaxed">
        <p>
          안녕하세요, <strong>Jeremy</strong>입니다.
        </p>
        <p>
          소프트웨어를 만들고, 배운 것을 글로 정리하는 개발자입니다. 좋은 코드와
          좋은 디자인 사이 어딘가에서 균형을 찾으려 합니다.
        </p>
      </div>

      <h2 className="font-display mt-10 mb-4 text-lg font-semibold">관심사</h2>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, i) => (
          <span
            key={interest}
            className="rounded-full px-3 py-1 text-sm font-medium"
            style={getColorStyle(getRainbowByIndex(i))}
          >
            {interest}
          </span>
        ))}
      </div>

      <h2 className="font-display mt-10 mb-4 text-lg font-semibold">링크</h2>
      <ul className="space-y-1">
        {links.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
