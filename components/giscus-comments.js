"use client";

import { useEffect, useMemo, useRef } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function getGiscusThemeHref() {
  const isDark = document.documentElement.classList.contains("dark-theme");
  const themeFile = isDark ? "giscus-dark.css" : "giscus-light.css";
  return `${window.location.origin}${BASE_PATH}/${themeFile}`.replace(/([^:]\/)\/+/g, "$1");
}

function updateGiscusTheme() {
  const iframe = document.querySelector("iframe.giscus-frame");

  if (!iframe?.contentWindow) {
    return;
  }

  iframe.contentWindow.postMessage(
    {
      giscus: {
        setConfig: {
          theme: getGiscusThemeHref()
        }
      }
    },
    "https://giscus.app"
  );
}

export function GiscusComments({ config }) {
  const containerRef = useRef(null);
  const isConfigured = useMemo(() => {
    return Boolean(config.repo && config.repoId && config.category && config.categoryId);
  }, [config.category, config.categoryId, config.repo, config.repoId]);

  useEffect(() => {
    if (!isConfigured || !containerRef.current) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", config.repo);
    script.setAttribute("data-repo-id", config.repoId);
    script.setAttribute("data-category", config.category);
    script.setAttribute("data-category-id", config.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", getGiscusThemeHref());
    script.setAttribute("data-lang", "ko");

    container.appendChild(script);

    const observer = new MutationObserver(() => {
      updateGiscusTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    return () => {
      observer.disconnect();
      container.innerHTML = "";
    };
  }, [config, isConfigured]);

  if (!isConfigured) {
    return null;
  }

  return (
    <section className="md-card comments-shell">
      <div ref={containerRef} className="giscus" />
    </section>
  );
}
