import Link from "next/link";

import { PageContent } from "@/components/page-content";
import { listCategories } from "@/lib/posts";
import { getCategoryPath } from "@/lib/routes";

export const metadata = {
  title: "Categories",
  description: "Browse posts by category.",
  alternates: {
    canonical: "/categories"
  }
};

export default function CategoriesPage() {
  const categories = listCategories();

  return (
    <PageContent title="Categories" description="Browse posts grouped by topic for quicker discovery.">
      <section className="content-section">
        <div className="md-card content-card category-shell">
          <div className="category-list">
            {categories.map((category) => (
              <Link key={category.slug} href={getCategoryPath(category.slug)} className="category-row ripple">
                <span>{category.name} - {category.count} posts</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageContent>
  );
}
