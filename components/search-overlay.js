"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { MaterialIcon } from "@/components/material-icon";

function getScore(item, query) {
  const normalizedTitle = item.title.toLowerCase();
  const normalizedText = item.searchText.toLowerCase();

  if (normalizedTitle === query) {
    return 0;
  }

  if (normalizedTitle.startsWith(query)) {
    return 1;
  }

  if (normalizedText.startsWith(query)) {
    return 2;
  }

  if (normalizedTitle.includes(query)) {
    return 3;
  }

  if (normalizedText.includes(query)) {
    return 4;
  }

  return 99;
}

export function SearchOverlay({ items }) {
  const pathname = usePathname();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const results = normalizedQuery
    ? items
        .map((item) => ({
          ...item,
          score: getScore(item, normalizedQuery)
        }))
        .filter((item) => item.score < 99)
        .sort((left, right) => left.score - right.score || left.priority - right.priority || left.title.localeCompare(right.title))
        .slice(0, 8)
    : [];

  useEffect(() => {
    setIsOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    function handleKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
      }

      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <button type="button" className="icon-btn ripple" aria-label="Search" onClick={() => setIsOpen(true)}>
        <MaterialIcon name="search" />
      </button>

      <div className={`search-overlay ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(false)} />

      <div className={`search-dialog ${isOpen ? "open" : ""}`} role="dialog" aria-modal="true" aria-label="Search">
        <div className="search-shell">
          <div className="search-input-row">
            <MaterialIcon name="search" className="search-input-icon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="search-input"
              placeholder="Search posts, tags, categories"
              placeholder="Search posts"
            />
            <span className="search-shortcut">ESC</span>
          </div>

          {normalizedQuery ? (
            <div className="search-result-list">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link key={item.id} href={item.href} className="search-result ripple" onClick={() => setIsOpen(false)}>
                    <div className="search-result-copy">
                      <div className="search-result-head">
                        <span className="search-result-type">{item.type}</span>
                        <h2 className="search-result-title">{item.title}</h2>
                      </div>
                      <p className="search-result-meta">{item.meta}</p>
                      {item.description ? <p className="search-result-description">{item.description}</p> : null}
                    </div>
                    <MaterialIcon name="north_east" className="search-result-arrow" />
                  </Link>
                ))
              ) : (
                <div className="search-empty">
                  <MaterialIcon name="search_off" />
                  <p>No results found.</p>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
