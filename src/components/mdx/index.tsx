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
    // @ts-expect-error — dynamic heading tag
    <Tag id={id} {...props}>
      {children}
    </Tag>
  );
}

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <Heading level={1} className="mt-8 mb-4 text-3xl font-bold" {...props} />
  ),
  h2: (props) => (
    <Heading level={2} className="mt-8 mb-3 text-2xl font-semibold" {...props} />
  ),
  h3: (props) => (
    <Heading level={3} className="mt-6 mb-2 text-xl font-semibold" {...props} />
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
          className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? '#'}
        className="text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent-hover hover:decoration-accent"
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
      className="my-4 border-l-2 border-accent pl-4 italic text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-border" />,
};
