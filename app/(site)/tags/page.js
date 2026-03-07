import Link from "next/link";

import { PageContent } from "@/components/page-content";
import { listTags } from "@/lib/posts";
import { getTagPath } from "@/lib/routes";

export const metadata = {
  title: "Tags",
  description: "Browse posts by tag.",
  alternates: {
    canonical: "/tags"
  }
};

export default function TagsPage() {
  const tags = listTags();

  return (
    <PageContent title="Tags" description="Explore related posts grouped by tag.">
      <section className="content-section">
        <div className="md-card content-card">
          <div className="chip-grid">
            {tags.map((tag) => (
              <Link key={tag.slug} href={getTagPath(tag.slug)} className="md-chip tag-link">
                <span>{tag.name} - {tag.count}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageContent>
  );
}
