import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

import { slugify } from "./site-config.js";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function getFallbackIcon(category) {
  return category === "Design System" ? "arrow" : "book";
}

function getExcerpt(content) {
  return content
    .replace(/^#{1,6}\s+/gm, "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ")
    .slice(0, 156);
}

function getReadingStats(content) {
  const plainText = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/\[[^\]]*]\([^)]+\)/g, " ")
    .replace(/[#>*_\-\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.round(words / 220));

  return {
    words,
    minutes
  };
}

function readPostFile(slug) {
  const normalizedSlug = slug.normalize("NFC");
  const fullPath = path.join(postsDirectory, `${normalizedSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  return fs.readFileSync(fullPath, "utf8");
}

function parsePost(slug, fileContents) {
  const { data, content } = matter(fileContents);
  const normalizedSlug = slug.normalize("NFC");
  const category = data.category ?? "Uncategorized";
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const readingStats = getReadingStats(content);
  const tagSlugs = tags.reduce((result, tag) => {
    result[tag] = slugify(tag);
    return result;
  }, {});

  return {
    slug: normalizedSlug,
    title: data.title ?? normalizedSlug,
    date: data.date ?? new Date().toISOString(),
    category,
    categorySlug: slugify(category),
    tags,
    tagSlugs,
    excerpt: data.excerpt ?? getExcerpt(content),
    coverImage: data.coverImage ?? null,
    fallbackIcon: data.fallbackIcon ?? getFallbackIcon(category),
    wordCount: readingStats.words,
    readingMinutes: readingStats.minutes,
    content
  };
}

export function listPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return parsePost(slug, fs.readFileSync(path.join(postsDirectory, fileName), "utf8"));
    })
    .sort((left, right) => new Date(right.date).getTime() - new Date(left.date).getTime())
    .map(({ content, ...post }) => post);
}

export async function getPostBySlug(slug) {
  const fileContents = readPostFile(slug);

  if (!fileContents) {
    return null;
  }

  const parsedPost = parsePost(slug, fileContents);
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight, { ignoreMissing: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(parsedPost.content);

  return {
    ...parsedPost,
    contentHtml: processed.toString()
  };
}

export function listCategories() {
  const categories = new Map();

  listPosts().forEach((post) => {
    const existing = categories.get(post.categorySlug);

    categories.set(post.categorySlug, {
      slug: post.categorySlug,
      name: post.category,
      count: existing ? existing.count + 1 : 1
    });
  });

  return Array.from(categories.values()).sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
}

export function listTags() {
  const tags = new Map();

  listPosts().forEach((post) => {
    post.tags.forEach((tag) => {
      const tagSlug = slugify(tag);
      const existing = tags.get(tagSlug);

      tags.set(tagSlug, {
        slug: tagSlug,
        name: tag,
        count: existing ? existing.count + 1 : 1
      });
    });
  });

  return Array.from(tags.values()).sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
}

export function getCategoryBySlug(slug) {
  return listCategories().find((category) => category.slug === slug) ?? null;
}

export function getTagBySlug(slug) {
  return listTags().find((tag) => tag.slug === slug) ?? null;
}

export function getPostsByCategorySlug(slug) {
  return listPosts().filter((post) => post.categorySlug === slug);
}

export function getPostsByTagSlug(slug) {
  return listPosts().filter((post) => post.tags.some((tag) => slugify(tag) === slug));
}

export function listRecentPosts(limit, excludedSlug) {
  return listPosts()
    .filter((post) => post.slug !== excludedSlug)
    .slice(0, limit);
}

export function formatDisplayDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}

export function formatTimelineDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}

export function listTimelineGroups() {
  const groups = new Map();

  listPosts().forEach((post) => {
    const year = new Date(post.date).getFullYear().toString();
    const group = groups.get(year);

    if (group) {
      group.posts.push(post);
      group.count += 1;
      return;
    }

    groups.set(year, {
      year,
      count: 1,
      posts: [post]
    });
  });

  return Array.from(groups.values()).sort((left, right) => Number(right.year) - Number(left.year));
}
