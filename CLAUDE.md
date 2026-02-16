# Jeremy Blog — 프로젝트 컨벤션

## 기술 스택
- Next.js 15 (App Router, RSC, SSG)
- TypeScript (strict)
- Tailwind CSS v4 (@theme, CSS 기반 설정)
- MDX: next-mdx-remote v6 (`compileMDX` from `/rsc`)
- 코드 하이라이팅: rehype-pretty-code + Shiki (빌드 타임, 듀얼 테마)
- 패키지 매니저: pnpm

## 디렉토리 구조
```
content/blog/       ← MDX 포스트 (.mdx)
src/app/            ← Next.js App Router 페이지
src/components/     ← React 컴포넌트
src/components/mdx/ ← MDX 커스텀 컴포넌트
src/lib/            ← 유틸리티 (posts.ts, mdx.ts)
```

## MDX 포스트 규칙
- 파일: `content/blog/{slug}.mdx`
- 필수 frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `tags` (string[])
- `compileMDX`는 상세 페이지에서만 사용 (목록은 gray-matter)

## 스타일 규칙
- 파스텔 바이올렛 테마 (라이트: #fdf4ff, 다크: #150a1e)
- 액센트 컬러: --accent (바이올렛 계열)
- Tailwind 유틸리티 클래스 우선, 커스텀 CSS 최소화
- 다크모드: `.dark` 클래스 기반 (localStorage + system preference)

## 코드 규칙
- 들여쓰기: 2칸
- 세미콜론: 사용
- 따옴표: 작은따옴표
- Prettier (prettier-plugin-tailwindcss) 사용

## Git 컨벤션
- 메시지: `타입(스코프): 한글 설명`
- 타입: feat/fix/refactor/docs/test/chore/style/perf
- Co-Authored-By: Claude 포함
- 최대한 잘게 쪼개서 자주 커밋

## 빌드 & 실행
```sh
pnpm dev      # 개발 서버
pnpm build    # 정적 빌드
pnpm lint     # ESLint
```
