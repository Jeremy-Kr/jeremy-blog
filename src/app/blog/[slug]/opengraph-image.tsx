import { ImageResponse } from 'next/og';
import { getAllSlugs, getPostBySlug } from '@/lib/posts';

export const alt = 'Blog post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const RAINBOW = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#3b82f6',
  '#8b5cf6',
];

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? slug;
  const description = post?.description ?? '';

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#150a1e',
        color: '#f5f5f5',
        fontFamily: 'sans-serif',
      }}
    >
      {/* 레인보우 상단 바 */}
      <div style={{ display: 'flex', width: '100%', height: '6px' }}>
        {RAINBOW.map((color) => (
          <div key={color} style={{ flex: 1, backgroundColor: color }} />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              fontSize: 24,
              color: '#a1a1aa',
              lineHeight: 1.5,
            }}
          >
            {description}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 80px 40px',
          fontSize: 20,
          color: '#71717a',
        }}
      >
        <span>Jeremy Blog</span>
        <span>jeremy.blog</span>
      </div>
    </div>,
    { ...size },
  );
}
