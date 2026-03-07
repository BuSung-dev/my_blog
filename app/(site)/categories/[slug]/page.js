import { notFound } from "next/navigation";

import { PageContent } from "@/components/page-content";
import { PostCard } from "@/components/post-card";
import { getCategoryBySlug, getPostsByCategorySlug, listCategories } from "@/lib/posts";
import { getCategoryPath } from "@/lib/routes";

function getStaticSlugs(slug) {
  const nfc = slug.normalize("NFC");
  const nfd = slug.normalize("NFD");

  return Array.from(new Set([nfc, nfd]));
}

export function generateStaticParams() {
  return listCategories().flatMap((category) =>
    getStaticSlugs(category.slug).map((slug) => ({
      slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const category = getCategoryBySlug(decodedSlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} Posts`,
    description: `Posts filed under ${category.name}.`,
    alternates: {
      canonical: getCategoryPath(category.slug)
    }
  };
}

export default async function CategoryDetailPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const category = getCategoryBySlug(decodedSlug);

  if (!category) {
    notFound();
  }

  const posts = getPostsByCategorySlug(decodedSlug);

  return (
    <PageContent title={category.name} description={`${category.count} posts are filed under this category.`}>
      <div className="post-list">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </PageContent>
  );
}
