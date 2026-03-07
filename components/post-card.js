import Link from "next/link";

import { MaterialIcon } from "@/components/material-icon";
import { formatDisplayDate } from "@/lib/date-utils";
import { getPostPath } from "@/lib/routes";

export function PostCard({ post }) {
  return (
    <Link href={getPostPath(post.slug)} className="md-card interactive post-card ripple">
      <div className="post-content">
        <h2 className="post-title">{post.title}</h2>
        <div className="post-meta">
          <span className="article-stat">
            <MaterialIcon name="calendar_today" style={{ fontSize: 16 }} />
            <span>{formatDisplayDate(post.date)}</span>
          </span>
          <span className="article-stat">
            <span>{post.category}</span>
          </span>
        </div>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-stats">
          <span>{post.wordCount} words</span>
          <span className="post-stats-divider" aria-hidden="true" />
          <span>{post.readingMinutes} minutes</span>
        </div>
      </div>

      {post.coverImage ? (
        <div className="post-thumbnail">
          <img src={post.coverImage} alt={post.title} />
        </div>
      ) : (
        <div className="post-fallback" aria-hidden="true">
          <MaterialIcon name="east" style={{ fontSize: 24 }} />
        </div>
      )}
    </Link>
  );
}
