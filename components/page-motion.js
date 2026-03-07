"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const MAIN_SELECTORS = [
  ".main-content .content-header",
  ".main-content .post-list > *",
  ".main-content .post-detail > *",
  ".main-content .content-section > .md-card",
  ".main-content .collection-grid > *",
  ".main-content .chip-grid > *",
  ".main-content .about-grid > *"
];

const GLOBAL_SELECTORS = [
  ".global-header",
  ".sidebar > .md-card",
  ".sidebar .sticky-wrapper > .md-card"
];

function collectTargets(selectors) {
  const seen = new Set();
  const targets = [];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (!seen.has(element)) {
        seen.add(element);
        targets.push(element);
      }
    });
  });

  return targets;
}

function runMotion(targets) {
  return targets.map((target, index) => {
    target.getAnimations().forEach((animation) => animation.cancel());

    const isHeader = target.classList.contains("global-header");
    const animation = target.animate(
      [
        {
          opacity: 0,
          transform: isHeader ? "translateY(-20px)" : "translateY(16px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ],
      {
        duration: isHeader ? 600 : 800,
        delay: Math.min(index, 8) * 80,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "both"
      }
    );

    animation.finished
      .then(() => {
        animation.cancel();
      })
      .catch(() => {});

    return animation;
  });
}

export function PageMotion() {
  const pathname = usePathname();
  const hasPlayedInitialMotion = useRef(false);

  useLayoutEffect(() => {
    const shouldAnimateAll = !hasPlayedInitialMotion.current;
    const targets = collectTargets(shouldAnimateAll ? [...GLOBAL_SELECTORS, ...MAIN_SELECTORS] : MAIN_SELECTORS);

    const frameId = window.requestAnimationFrame(() => {
      runMotion(targets);
      hasPlayedInitialMotion.current = true;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      targets.forEach((target) => {
        target.getAnimations().forEach((animation) => animation.cancel());
      });
    };
  }, [pathname]);

  return null;
}
