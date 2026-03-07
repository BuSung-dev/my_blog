import fs from "node:fs";
import path from "node:path";

import { listCategories, listPosts, listTags } from "../lib/posts.js";
import { getAbsoluteUrl, getSiteMetadata } from "../lib/site-config.js";

const publicDirectory = path.join(process.cwd(), "public");

function ensurePublicDirectory() {
  fs.mkdirSync(publicDirectory, { recursive: true });
}

function writeFile(fileName, contents) {
  fs.writeFileSync(path.join(publicDirectory, fileName), contents, "utf8");
}

function createSitemap() {
  const posts = listPosts();
  const categories = listCategories();
  const tags = listTags();
  const routes = [
    { path: "/", lastModified: posts[0]?.date ?? new Date().toISOString() },
    { path: "/about", lastModified: new Date().toISOString() },
    { path: "/categories", lastModified: new Date().toISOString() },
    { path: "/tags", lastModified: new Date().toISOString() },
    ...posts.map((post) => ({ path: `/posts/${post.slug}`, lastModified: post.date })),
    ...categories.map((category) => ({ path: `/categories/${category.slug}`, lastModified: new Date().toISOString() })),
    ...tags.map((tag) => ({ path: `/tags/${tag.slug}`, lastModified: new Date().toISOString() }))
  ];

  const urlSet = routes
    .map(
      (route) => `
  <url>
    <loc>${getAbsoluteUrl(route.path)}</loc>
    <lastmod>${new Date(route.lastModified).toISOString()}</lastmod>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}
</urlset>
`;
}

function createRobots() {
  const site = getSiteMetadata();

  return `User-agent: *
Allow: /

Sitemap: ${site.siteUrl}/sitemap.xml
`;
}

function createFeed() {
  const site = getSiteMetadata();
  const posts = listPosts();
  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${getAbsoluteUrl(`/posts/${post.slug}`)}</link>
      <guid>${getAbsoluteUrl(`/posts/${post.slug}`)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
      <category><![CDATA[${post.category}]]></category>
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title><![CDATA[${site.title}]]></title>
    <link>${site.siteUrl}</link>
    <description><![CDATA[${site.description}]]></description>
    <language>ko-KR</language>${items}
  </channel>
</rss>
`;
}

ensurePublicDirectory();
writeFile("sitemap.xml", createSitemap());
writeFile("robots.txt", createRobots());
writeFile("feed.xml", createFeed());
