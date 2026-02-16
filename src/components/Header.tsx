import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
] as const;

export function Header() {
  return (
    <>
      <div className="rainbow-bar fixed top-0 left-0 z-50 h-[3px] w-full" />
      <header className="flex items-center justify-between pt-8 pb-6">
        <Link
          href="/"
          className="rainbow-text font-display text-xl font-bold tracking-tight"
        >
          Jeremy
        </Link>
        <nav className="flex items-center gap-5">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="group text-muted hover:text-foreground relative text-sm transition-colors"
            >
              {label}
              <span className="rainbow-bar absolute -bottom-0.5 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}
