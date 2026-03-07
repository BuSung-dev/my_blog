import Link from "next/link";

import { PageContent } from "@/components/page-content";
import { formatTimelineDate, listTimelineGroups } from "@/lib/posts";
import { getPostPath } from "@/lib/routes";

export const metadata = {
  title: "Timeline",
  description: "Browse your posts grouped by year in a timeline view.",
  alternates: {
    canonical: "/timeline"
  }
};

export default function TimelinePage() {
  const groups = listTimelineGroups();

  return (
    <PageContent showContentHeader={false}>
      <section className="content-section">
        <div className="md-card content-card timeline-shell">
          {groups.map((group) => (
            <section key={group.year} className="timeline-year-group">
              <header className="timeline-year-header">
                <h2 className="timeline-year">{group.year}</h2>
                <span className="timeline-count">{group.count} posts</span>
              </header>

              <div className="timeline-list">
                {group.posts.map((post) => (
                  <Link key={post.slug} href={getPostPath(post.slug)} className="timeline-row ripple">
                    <span className="timeline-date">{formatTimelineDate(post.date)}</span>
                    <span className="timeline-marker" aria-hidden="true" />
                    <span className="timeline-title">{post.title}</span>
                    <span className="timeline-tags">
                      {post.tags.length ? post.tags.map((tag) => `#${tag}`).join(" ") : `#${post.category}`}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </PageContent>
  );
}
