import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Blog' },
  { href: '/about', label: 'About' },
] as const;

export function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
        Jeremy
      </Link>
      <nav className="flex items-center gap-4">
        {navLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
