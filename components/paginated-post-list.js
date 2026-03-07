"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PostCard } from "@/components/post-card";

const PAGE_SIZE = 10;

function getPageHref(page) {
  return page <= 1 ? "/" : `/?page=${page}`;
}

export function PaginatedPostList({ posts }) {
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get("page") || "1");
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const currentPage = Number.isFinite(rawPage) ? Math.min(Math.max(rawPage, 1), totalPages) : 1;
  const startIndex = (currentPage - 1) * PAGE_SIZE;
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
          {currentPage > 1 ? (
            <Link href={getPageHref(currentPage - 1)} className="pagination-link ripple">
              Prev
            </Link>
          ) : null}

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={getPageHref(page)}
                className={`pagination-link ripple ${page === currentPage ? "active" : ""}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            ))}
          </div>

          {currentPage < totalPages ? (
            <Link href={getPageHref(currentPage + 1)} className="pagination-link ripple">
              Next
            </Link>
          ) : null}
        </nav>
      ) : null}
    </>
  );
}
