import Link from "next/link";
import { notFound } from "next/navigation";

import { MaterialIcon } from "@/components/material-icon";
import { GiscusComments } from "@/components/giscus-comments";
import { PageContent } from "@/components/page-content";
import { formatDisplayDate, getPostBySlug, listPosts } from "@/lib/posts";
import { getPostPath, getTagPath } from "@/lib/routes";
import { getAbsoluteUrl, getCommentsConfig } from "@/lib/site-config";

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

function getStaticSlugs(slug) {
  const nfc = slug.normalize("NFC");
  const nfd = slug.normalize("NFD");

  return Array.from(new Set([nfc, nfd]));
}

export function generateStaticParams() {
  return listPosts().flatMap((post) =>
    getStaticSlugs(post.slug).map((slug) => ({
      slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: getPostPath(post.slug)
    },
    openGraph: {
      type: "article",
      url: getAbsoluteUrl(getPostPath(post.slug)),
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.title }] : undefined
    }
  };
}

export default async function PostDetailPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const post = await getPostBySlug(decodedSlug);

  if (!post) {
    notFound();
  }

  const posts = listPosts();
  const currentIndex = posts.findIndex((item) => item.slug === post.slug);
  const previousPost = currentIndex >= 0 ? posts[currentIndex + 1] ?? null : null;
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] ?? null : null;
  const stats = getReadingStats(post.content);
  const commentsConfig = getCommentsConfig();
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.excerpt,
    url: getAbsoluteUrl(getPostPath(post.slug)),
    articleSection: post.category,
    keywords: post.tags.join(", "),
    image: post.coverImage ? [post.coverImage] : undefined
  };

  return (
    <PageContent title={post.title} description={post.excerpt} showContentHeader={false}>
      <article className="post-detail">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

        <section className="md-card article-shell">
          <header className="article-hero">
            <div className="article-stats">
              <span className="article-stat">
                <MaterialIcon name="notes" style={{ fontSize: 16 }} />
                <span>{stats.words} words</span>
              </span>
              <span className="article-stat">
                <MaterialIcon name="schedule" style={{ fontSize: 16 }} />
                <span>{stats.minutes} minutes</span>
              </span>
            </div>

            <h1 className="article-title">{post.title}</h1>

            <div className="post-meta article-meta">
              <span className="article-stat">
                <MaterialIcon name="calendar_today" style={{ fontSize: 16 }} />
                <span>{formatDisplayDate(post.date)}</span>
              </span>
              <span className="article-stat">
                <MaterialIcon name="menu" style={{ fontSize: 16 }} />
                <span>{post.category}</span>
              </span>
            </div>

            {post.tags.length ? (
              <div className="article-tagline">
                <span className="article-badge article-tag-icon">
                  <MaterialIcon name="tag" style={{ fontSize: 16 }} />
                </span>
                <div className="article-taglist">
                  {post.tags.map((tag, index) => (
                    <span key={tag}>
                      <Link href={getTagPath(post.tagSlugs[tag])} className="article-tag-link">
                        {tag}
                      </Link>
                      {index < post.tags.length - 1 ? " / " : ""}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            {post.coverImage ? (
              <div className="article-cover">
                <img src={post.coverImage} alt={post.title} />
              </div>
            ) : null}
          </header>

          <div className="article-body">
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          </div>
        </section>

        <GiscusComments config={commentsConfig} />

        {previousPost || nextPost ? (
          <nav className="post-pagination" aria-label="Post navigation">
            {previousPost ? (
              <Link href={getPostPath(previousPost.slug)} className="md-card post-pagination-card ripple">
                <strong className="post-pagination-title">
                  <MaterialIcon name="west" className="post-pagination-arrow" style={{ fontSize: 18 }} />
                  <span>{previousPost.title}</span>
                </strong>
              </Link>
            ) : null}

            {nextPost ? (
              <Link href={getPostPath(nextPost.slug)} className="md-card post-pagination-card ripple">
                <strong className="post-pagination-title is-next">
                  <span>{nextPost.title}</span>
                  <MaterialIcon name="east" className="post-pagination-arrow" style={{ fontSize: 18 }} />
                </strong>
              </Link>
            ) : null}
          </nav>
        ) : null}
      </article>
    </PageContent>
  );
}
