import { notFound } from "next/navigation";

import { PageContent } from "@/components/page-content";
import { PostCard } from "@/components/post-card";
import { getPostsByTagSlug, getTagBySlug, listTags } from "@/lib/posts";
import { getTagPath } from "@/lib/routes";

function getStaticSlugs(slug) {
  const nfc = slug.normalize("NFC");
  const nfd = slug.normalize("NFD");

  return Array.from(new Set([nfc, nfd]));
}

export function generateStaticParams() {
  return listTags().flatMap((tag) =>
    getStaticSlugs(tag.slug).map((slug) => ({
      slug
    }))
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const tag = getTagBySlug(decodedSlug);

  if (!tag) {
    return {};
  }

  return {
    title: `#${tag.name}`,
    description: `Posts tagged with ${tag.name}.`,
    alternates: {
      canonical: getTagPath(tag.slug)
    }
  };
}

export default async function TagDetailPage({ params }) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).normalize("NFC");
  const tag = getTagBySlug(decodedSlug);

  if (!tag) {
    notFound();
  }

  const posts = getPostsByTagSlug(decodedSlug);

  return (
    <PageContent title={`#${tag.name}`} description={`${tag.count} posts are connected to this tag.`}>
      <div className="post-list">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </PageContent>
  );
}
