import { t, type Locale } from '@/lib/i18n';
import { getRainbowByIndex, getColorStyle } from '@/lib/colors';

const interests = ['TypeScript', 'React', 'Next.js', 'Rust', 'DevOps', 'UI/UX'];

const links = [
  { label: 'GitHub', href: 'https://github.com/jeremy-kr' },
  { label: 'Email', href: 'mailto:wjddlr905@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeongik-lee-bb0265271/',
  },
];

interface AboutPageProps {
  lang: Locale;
}

export function AboutPage({ lang }: AboutPageProps) {
  const tr = t(lang);

  return (
    <section className="animate-fade-up">
      <h1 className="rainbow-text font-display mb-6 text-2xl font-bold">
        {tr.about}
      </h1>

      <div className="space-y-4 leading-relaxed">
        <p>{tr.aboutGreeting}</p>
        <p>{tr.aboutBio}</p>
      </div>

      <h2 className="font-display mt-10 mb-4 text-lg font-semibold">
        {tr.interests}
      </h2>
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

      <h2 className="font-display mt-10 mb-4 text-lg font-semibold">
        {tr.links}
      </h2>
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
