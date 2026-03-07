import { Suspense } from "react";

import { PageContent } from "@/components/page-content";
import { PaginatedPostList } from "@/components/paginated-post-list";
import { listPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = listPosts();

  return (
    <PageContent showContentHeader={false}>
      <Suspense fallback={<PaginatedPostList posts={posts} />}>
        <PaginatedPostList posts={posts} />
      </Suspense>
    </PageContent>
  );
}
