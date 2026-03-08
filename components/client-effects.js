"use client";

import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    function createRipple(event) {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const target = event.target.closest(".ripple");

      if (!target) {
        return;
      }

      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rect = target.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${event.clientX - rect.left - radius}px`;
      circle.style.top = `${event.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-effect");

      const existingRipple = target.querySelector(".ripple-effect");
      if (existingRipple) {
        existingRipple.remove();
      }

      target.appendChild(circle);
      window.setTimeout(() => {
        circle.remove();
      }, 600);
    }

    document.addEventListener("pointerdown", createRipple);

    return () => {
      document.removeEventListener("pointerdown", createRipple);
    };
  }, []);

  return null;
}
