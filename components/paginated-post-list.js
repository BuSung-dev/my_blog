"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PostCard } from "@/components/post-card";

const PAGE_SIZE = 6;

function getPageHref(page) {
  return page <= 1 ? "/" : `/?page=${page}`;
}

function PaginatedPostListContent({ posts, currentPage }) {
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const safePage = Number.isFinite(currentPage) ? Math.min(Math.max(currentPage, 1), totalPages) : 1;
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const visiblePosts = posts.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <>
      <div className="post-list">
        {visiblePosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav className="pagination-nav" aria-label="Post pages">
          {safePage > 1 ? (
            <Link href={getPageHref(safePage - 1)} className="pagination-link ripple">
              Prev
            </Link>
          ) : null}

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={getPageHref(page)}
                className={`pagination-link ripple ${page === safePage ? "active" : ""}`}
                aria-current={page === safePage ? "page" : undefined}
              >
                {page}
              </Link>
            ))}
          </div>

          {safePage < totalPages ? (
            <Link href={getPageHref(safePage + 1)} className="pagination-link ripple">
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}

function SearchParamPaginatedPostList({ posts }) {
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get("page") || "1");

  return <PaginatedPostListContent posts={posts} currentPage={rawPage} />;
}

export function PaginatedPostList({ posts }) {
  return (
    <Suspense fallback={<PaginatedPostListContent posts={posts} currentPage={1} />}>
      <SearchParamPaginatedPostList posts={posts} />
    </Suspense>
  );
}
