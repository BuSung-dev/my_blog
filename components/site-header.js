"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { MaterialIcon } from "@/components/material-icon";
import { SearchOverlay } from "@/components/search-overlay";
import { ThemeControls } from "@/components/theme-controls";
import { profile } from "@/lib/site-config";

function isActive(pathname, href) {
  if (href === "/") {
    return pathname === "/" || pathname.startsWith("/posts/");
  }

  return pathname.startsWith(href);
}

export function SiteHeader({ searchItems }) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [
    { href: "/", label: "Posts" },
    { href: "/timeline", label: "Timeline" },
    { href: "/categories", label: "Series" },
    { href: "/tags", label: "Tags" }
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 16) {
        setIsVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`global-header ${isVisible ? "" : "is-hidden"}`.trim()}>
        <Link href="/" className="header-brand ripple" aria-label="Go to home">
          <MaterialIcon name="menu_book" />
          <span>{profile.name}</span>
        </Link>

        <nav className="header-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ripple ${isActive(pathname, item.href) ? "active" : ""}`}
            >
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <SearchOverlay items={searchItems} />
          <ThemeControls />
          <button
            type="button"
            className="icon-btn ripple mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <MaterialIcon name={isMenuOpen ? "close" : "menu"} />
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-overlay ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav className={`mobile-nav ${isMenuOpen ? "open" : ""}`} aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ripple ${isActive(pathname, item.href) ? "active" : ""}`}
          >
            <span>{item.label}</span>
            <MaterialIcon name="east" style={{ fontSize: 18 }} />
          </Link>
        ))}
      </nav>
    </>
  );
}
