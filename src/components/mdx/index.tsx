import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import Image from 'next/image';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function Heading({
  level,
  children,
  ...props
}: {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  const Tag = `h${level}` as const;
  const id = typeof children === 'string' ? slugify(children) : undefined;

  return (
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <Heading
      level={1}
      className="rainbow-text font-display mt-8 mb-4 text-3xl font-bold"
      {...props}
    />
  ),
  h2: (props) => (
    <Heading
      level={2}
      className="font-display mt-8 mb-3 border-l-[3px] border-[var(--rainbow-blue)] pl-3 text-2xl font-semibold"
      {...props}
    />
  ),
  h3: (props) => (
    <Heading
      level={3}
      className="font-display mt-6 mb-2 border-l-[3px] border-[var(--rainbow-green)] pl-3 text-xl font-semibold"
      {...props}
    />
  ),
  h4: (props) => (
    <Heading level={4} className="mt-4 mb-2 text-lg font-medium" {...props} />
  ),
  p: (props) => <p className="mb-4 leading-7" {...props} />,
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent decoration-accent/30 hover:text-accent-hover hover:decoration-accent underline underline-offset-2 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-accent decoration-accent/30 hover:text-accent-hover hover:decoration-accent underline underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  img: ({ src, alt, ...props }) => (
    <Image
      src={src ?? ''}
      alt={alt ?? ''}
      width={720}
      height={400}
      className="my-6 rounded-lg"
      {...props}
    />
  ),
  ul: (props) => <ul className="mb-4 list-disc pl-6 leading-7" {...props} />,
  ol: (props) => <ol className="mb-4 list-decimal pl-6 leading-7" {...props} />,
  li: (props) => <li className="mb-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="text-muted relative my-4 overflow-hidden rounded-r-md pl-5 italic before:absolute before:top-0 before:left-0 before:h-full before:w-[3px] before:rounded-full before:bg-[image:var(--rainbow-gradient)]"
      {...props}
    />
  ),
  hr: () => <div className="rainbow-bar my-8 h-[2px] rounded-full" />,
};
