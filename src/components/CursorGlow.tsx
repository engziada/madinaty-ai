"use client";

import { useEffect, useRef } from "react";

/**
 * Futuristic arrow cursor with light underlay glow.
 * Works only on pointer devices (desktop). Skips on touch.
 */
export function CursorGlow() {
  const arrowRef = useRef<HTMLDivElement>(null);
  const underlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const arrow = arrowRef.current;
    const underlay = underlayRef.current;
    if (!arrow || !underlay) return;

    let mouseX = 0;
    let mouseY = 0;
    let underlayX = 0;
    let underlayY = 0;
    let arrowX = 0;
    let arrowY = 0;
    let animId: number;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function loop() {
      // Arrow snaps quickly (0.35) for responsiveness
      arrowX += (mouseX - arrowX) * 0.35;
      arrowY += (mouseY - arrowY) * 0.35;
      arrow!.style.transform = `translate3d(${arrowX}px, ${arrowY}px, 0) translate(-50%, -50%)`;

      // Underlay trails lightly (0.18) for smooth glow
      underlayX += (mouseX - underlayX) * 0.18;
      underlayY += (mouseY - underlayY) * 0.18;
      underlay!.style.transform = `translate3d(${underlayX}px, ${underlayY}px, 0) translate(-50%, -50%)`;

      animId = requestAnimationFrame(loop);
    }

    function onEnterLink() {
      arrow!.classList.add("cursor-arrow--hover");
      underlay!.classList.add("cursor-underlay--hover");
    }

    function onLeaveLink() {
      arrow!.classList.remove("cursor-arrow--hover");
      underlay!.classList.remove("cursor-underlay--hover");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();

    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMove);
      links.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={underlayRef} className="cursor-underlay" aria-hidden="true" />
      <div ref={arrowRef} className="cursor-arrow" aria-hidden="true">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="arrowGrad" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#00d2d2" />
              <stop offset="100%" stopColor="#2b6eff" />
            </linearGradient>
          </defs>
          <path
            d="M4 4L12 28L16 18L26 14L4 4Z"
            fill="url(#arrowGrad)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="6" cy="6" r="1.5" fill="#ffffff" opacity="0.9" />
        </svg>
      </div>
    </>
  );
}
