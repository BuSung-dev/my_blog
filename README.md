# busung blog

Next.js 기반 정적 블로그입니다. 글은 `content/posts/*.md`에 추가하면 페이지와 목록이 자동으로 생성됩니다.

## 시작

```bash
npm install
npm run dev
```

## 글 작성

```md
---
title: "글 제목"
date: "2026-03-07"
category: "Development"
tags:
  - Nextjs
  - Markdown
excerpt: "목록과 SEO에 사용할 짧은 설명"
coverImage: "https://example.com/image.jpg"
---

여기부터 본문입니다.
```

## 배포

- `main` 브랜치에 push 하면 GitHub Actions가 정적 파일을 빌드해서 GitHub Pages로 배포합니다.
- 사용자 페이지 저장소(`username.github.io`)와 프로젝트 페이지 저장소 둘 다 대응합니다.

## SEO

- 페이지 메타데이터
- 포스트별 Open Graph
- `public/sitemap.xml`
- `public/robots.txt`
- `public/feed.xml`
