import Link from "next/link";

import { MaterialIcon } from "@/components/material-icon";
import { SiteHeader } from "@/components/site-header";
import { formatDisplayDate, listCategories, listPosts, listTags } from "@/lib/posts";
import { getCategoryPath, getPostPath, getTagPath } from "@/lib/routes";
import { profile } from "@/lib/site-config";

export function SiteShell({ title, description, children, showContentHeader = true }) {
  const posts = listPosts();
  const categories = listCategories();
  const visibleCategories = categories.slice(0, 4);
  const allTags = listTags();
  const tags = allTags.slice(0, 8);
  const searchItems = posts.map((post) => ({
    id: `post-${post.slug}`,
    type: "Post",
    title: post.title,
    meta: `${post.category} - ${formatDisplayDate(post.date)}`,
    description: post.excerpt,
    href: getPostPath(post.slug),
    searchText: `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(" ")}`,
    priority: 0
  }));

  return (
    <>
      <SiteHeader searchItems={searchItems} />
      <div className="app-container">
        <aside className="sidebar">
          <div className="md-card">
            <div className="profile-header">
              <div className="profile-avatar">{profile.avatar}</div>
              <div className="profile-info">
                <h2>{profile.name}</h2>
                <p className="profile-copy">{profile.shortBio}</p>
              </div>
            </div>
            <Link href="/about" className="md-btn md-btn-tonal ripple">
              <MaterialIcon name="person" style={{ fontSize: 18 }} />
              <span>whoami</span>
            </Link>
          </div>

          <div className="sticky-wrapper">
            <div className="md-card">
              <h2 className="card-title">
                <MaterialIcon name="folder" />
                <span>Categories</span>
              </h2>
              <div className="list-stack">
                {visibleCategories.map((category) => (
                  <Link key={category.slug} href={getCategoryPath(category.slug)} className="list-item ripple">
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </Link>
                ))}
              </div>
              {categories.length > visibleCategories.length ? (
                <Link href="/categories" className="sidebar-more-link ripple">
                  <span>More</span>
                  <MaterialIcon name="east" style={{ fontSize: 18 }} />
                </Link>
              ) : null}
            </div>

            <div className="md-card">
              <h2 className="card-title">
                <MaterialIcon name="tag" />
                <span>Tags</span>
              </h2>
              <div className="chip-group">
                {tags.map((tag) => (
                  <Link key={tag.slug} href={getTagPath(tag.slug)} className="md-chip ripple">
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="main-content">
          {showContentHeader ? (
            <div className="content-header">
              <h1 className="content-title">{title}</h1>
              {description ? <p className="content-description">{description}</p> : null}
            </div>
          ) : null}
          {children}
        </main>
      </div>
    </>
  );
}
