export const profile = {
  name: "BuSung",
  avatar: "B",
  shortBio: "A place to record information you wanted to know",
  bio: "A place to record information you wanted to know",
  focus: "I’m highly interested in web vulnerabilities, but I also enjoy other fields. Recently, I’ve developed an interest in AI.",
  writingPrinciples: "I aim to write records that enable reproducible analysis, document the process of understanding, and can be easily picked up and continued even when revisited later.",
  education: [
    "2023.07-2024.03 | Best of the Best 12기 취약점 분석 트랙",
    "2024.04-2025.01 | 대구대학교 정보보호영재교육원 고등전문 과정",
    "2025.03-present | 숭실대학교 정보보호학과"
  ],
  hallOfFame: [
    "NAVER Bug Bounty 2023, 2024 Hall of Fame (busung)",
    "KAKAO Bug Bounty 2024 Hall of Fame",
    "Find The Gap Hall of Fame (kikim090)"
  ],
  cves: [],
  kves: [],
  disclosures: {
    naver: ["NBB-2768", "NBB-2815", "NBB-2816", "NBB-2757", "NBB-2756", "NBB-2777", "NBB-2889", "NBB-2817", "NBB-2781"],
    kakao: ["KV-2024-136"],
    kisa: ["KVE-2023-6177"],
    etc: ["CVE-2023-49965", "CVE-2023-52235", "FVE-2024-410c-66367"]
  },
  awards: [
    {
      year: "2025",
      entries: [
        "2025.12.12 | AI Security Defense Competition Students 3위",
        "2025.11.14 | SecureX Challenge - COSS 협의회장상",
        "2025.11.23 | 2025 LISAthon: Mobility Competition - 장려상",
        "2025.11.21 | 화이트햇 콘테스트 2025 - 장려상 (Team. 다이아몬드 100개 캐기)",
        "2025.11.14 | POC CTF 2025 - 2등",
        "2025.09.23 | 제5회 WooriCON 모의해킹 경진대회 - 최우수상(2등, Team. 숭카이)",
        "2025.09.18 | 제6회 호남 사이버보안 컨퍼런스 웹 취약점 경진대회 - 최우수상(1등)",
        "2025.07.17 | 핵시움 부산 2025 - 우수상(3등)"
      ]
    },
    {
      year: "2024",
      entries: [
        "2024.02.17 | 해킹캠프 28회 - 발표, 웹 사이트에서 버그 찾는 법",
        "2024.02.17 | 해킹캠프 CTF - 1위",
        "2024.06.02 | CodeGate 2024 - 본선 진출",
        "2024.08.03 | CCE 2024 - 본선 진출",
        "2024.08.23 | 순천향대학교 정보보호 페스티벌(YISF) - 3등, 한국인터넷진흥원 원장상",
        "2024.10.15 | 정보보호영재교육원(영남) 해킹메일 경진대회 - 최우수상, 한국산업단지공단 이사장상",
        "2024.10.22 | KOSPO 및 정보보호영재교육원 정보보안 경진대회 - 한국남부발전 사장상",
        "2024.10.26 | 정보보호영재교육원(영남) 개인 정보보안 경진대회 - 우수상(3등)",
        "2024.10.26 | 제6회 한국코드페어 해커톤 - 우수상(4등)",
        "2024.11.02 | 정보보호영재교육원 정보보안 경진대회 2024 단체전 - 노력상(5등)"
      ]
    },
    {
      year: "2023",
      entries: [
        "2023.08.29 | KOSPO 및 정보보호영재교육원 정보보안 경진대회 - 한국남부발전 사장상",
        "2023.10.25 | KEPCO Eleccon 2023 - 4등",
        "2023.10.31 | 중부대학교 JBUCTF - 중부대학교 총장상",
        "2023.11.11 | 대구 ABB 해커톤 정보보안 경진대회 - 경북대학교 총장상",
        "2023.12.06 | KISA & CJ 화이트햇 투게더 2기 학생부 개인전 - 우수상"
      ]
    }
  ]
};

export const navigation = [
  { href: "/", label: "Posts" },
  { href: "/categories", label: "Categories" },
  { href: "/tags", label: "Tags" },
  { href: "/about", label: "Whoami" }
];

const DEFAULT_SITE_URL = "https://blog.buseu.ng";

export function getSiteMetadata() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");

  return {
    title: profile.name,
    tagline: "개인 보안 블로그",
    description: "분석 기록과 실험 메모를 정리하는 개인 보안 블로그입니다.",
    keywords: [],
    siteUrl
  };
}

export function getAbsoluteUrl(pathname = "/") {
  const normalizedPath = pathname === "/" ? "" : pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteMetadata().siteUrl}${normalizedPath}`;
}

export function getCommentsConfig() {
  return {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "BuSung-dev/giscus",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "R_kgDORgyYpA",
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "Polls",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "DIC_kwDORgyYpM4C34eY"
  };
}

export function slugify(value) {
  return encodeURIComponent(
    value
      .normalize("NFC")
      .toLowerCase()
      .trim()
  )
    .toLowerCase()
    .replace(/%/g, "-")
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
