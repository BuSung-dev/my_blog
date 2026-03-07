export const profile = {
  name: "BuSung",
  avatar: "B",
  shortBio: "Security researcher focused on offensive security!",
  bio: "I study offensive security with an emphasis on reverse engineering, system internals, web exploitation, and practical vulnerability research. This blog is where I organize technical findings, write-ups, and notes that are worth revisiting.",
  focus: "Reverse engineering, vulnerability research, web security, system internals, and technical write-ups",
  writingPrinciples: "I prefer clear technical notes, reproducible analysis, and write-ups that preserve both the reasoning process and the final result.",
  education: [
    "2022.03-present | Gimhae Suman High School",
    "2023.07-present | Best of the Best 12th, Vulnerability Analysis Track",
    "2024.04-present | Daegu University Information Security Gifted Program, Advanced High School Course"
  ],
  hallOfFame: [
    "NAVER Bug Bounty 2023, 2024 Hall of Fame (busung)",
    "KAKAO Bug Bounty 2024 Hall of Fame",
    "Find The Gap Hall of Fame (kikim090)"
  ],
  awards: [
    {
      year: "2025",
      entries: ["2025.07.17 | Hacksium Busan 2025 - Excellence Award (3rd)"]
    },
    {
      year: "2024",
      entries: [
        "2024.02.17 | Hacking Camp 28th - Presenter, How to Find Bugs in Websites",
        "2024.02.17 | Hacking Camp CTF - 1st Place",
        "2024.06.02 | CodeGate 2024 - Finalist",
        "2024.08.03 | CCE 2024 - Finalist",
        "2024.08.23 | Soonchunhyang University Information Security Festival (YISF) - 3rd Place, KISA President Award",
        "2024.10.15 | Yeongnam Information Security Gifted Program Phishing Mail Competition - Grand Prize, Korea Industrial Complex Corporation President Award",
        "2024.10.22 | KOSPO and Information Security Gifted Program Security Contest - KOSPO President Award",
        "2024.10.26 | Yeongnam Information Security Gifted Program Individual Security Contest - Excellence Award (3rd)",
        "2024.10.26 | 6th Korea Code Fair Hackathon - Excellence Award (4th)",
        "2024.11.02 | Information Security Gifted Program 2024 Team Security Contest - Merit Award (5th)"
      ]
    },
    {
      year: "2023",
      entries: [
        "2023.08.29 | KOSPO and Information Security Gifted Program Security Contest - KOSPO President Award",
        "2023.10.25 | KEPCO Eleccon 2023 - 4th Place",
        "2023.10.31 | Joongbu University JBUCTF - Joongbu University President Award",
        "2023.11.11 | Daegu ABB Hackathon Security Contest - Kyungpook National University President Award",
        "2023.12.06 | KISA and CJ Whitehat Together 2nd, Student Solo Division - Excellence Award"
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

const DEFAULT_SITE_URL = "https://example.com";

export function getSiteMetadata() {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/$/, "");

  return {
    title: profile.name,
    tagline: "Modern Material Blog",
    description: "A personal tech blog built with Next.js, Markdown, and GitHub Pages.",
    keywords: [
      "Next.js blog",
      "GitHub Pages",
      "Markdown blog",
      "frontend blog",
      "personal tech blog",
      "SEO blog"
    ],
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
