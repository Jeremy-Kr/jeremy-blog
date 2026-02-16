#!/usr/bin/env node

// LinkedIn Article 포스팅 스크립트
// 사용법: echo "요약 텍스트" | node scripts/linkedin-post.mjs --title "제목" --url "https://..."
// --dry-run 플래그로 API 호출 없이 페이로드만 확인 가능

const args = process.argv.slice(2);

function getArg(name) {
  const idx = args.indexOf(`--${name}`);
  return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : undefined;
}

const dryRun = args.includes('--dry-run');
const title = getArg('title');
const url = getArg('url');

if (!title || !url) {
  console.error(
    '사용법: echo "요약" | node scripts/linkedin-post.mjs --title "제목" --url "URL" [--dry-run]',
  );
  process.exit(1);
}

// stdin에서 summary 읽기
const chunks = [];
for await (const chunk of process.stdin) {
  chunks.push(chunk);
}
const summary = Buffer.concat(chunks).toString().trim();

if (!summary) {
  console.error('오류: stdin으로 요약 텍스트를 전달해주세요.');
  process.exit(1);
}

// Person URN 정규화 — bare ID도 지원
function normalizePersonUrn(value) {
  if (value.startsWith('urn:li:person:')) return value;
  return `urn:li:person:${value}`;
}

const token = process.env.LINKEDIN_ACCESS_TOKEN;
const personUrn = process.env.LINKEDIN_PERSON_URN;

if (!dryRun && (!token || !personUrn)) {
  console.error(
    '오류: LINKEDIN_ACCESS_TOKEN과 LINKEDIN_PERSON_URN 환경변수가 필요합니다.',
  );
  console.error('.env.example을 참고하세요.');
  process.exit(1);
}

const author = personUrn
  ? normalizePersonUrn(personUrn)
  : 'urn:li:person:PLACEHOLDER';

const payload = {
  author,
  lifecycleState: 'PUBLISHED',
  visibility: 'PUBLIC',
  commentary: summary,
  distribution: {
    feedDistribution: 'MAIN_FEED',
  },
  content: {
    article: {
      source: url,
      title,
      description: summary.slice(0, 200),
    },
  },
};

if (dryRun) {
  console.log('=== DRY RUN — API 호출 없음 ===\n');
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

const res = await fetch('https://api.linkedin.com/rest/posts', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-Restli-Protocol-Version': '2.0.0',
    'Linkedin-Version': '202501',
  },
  body: JSON.stringify(payload),
});

if (res.ok) {
  const postId = res.headers.get('x-restli-id') || '(ID 확인 불가)';
  console.log(`LinkedIn 포스팅 성공! Post ID: ${postId}`);
} else {
  const body = await res.text();

  if (res.status === 401) {
    console.error(
      '오류: 토큰이 만료되었습니다. LinkedIn Developer App에서 새 토큰을 발급받으세요.',
    );
  } else if (res.status === 403) {
    console.error(
      '오류: 권한이 부족합니다. w_member_social 스코프가 있는지 확인하세요.',
    );
  } else if (res.status === 429) {
    console.error(
      '오류: API 호출 제한에 도달했습니다. 잠시 후 다시 시도하세요.',
    );
  } else {
    console.error(`오류: HTTP ${res.status}`);
  }

  console.error(body);
  process.exit(1);
}
