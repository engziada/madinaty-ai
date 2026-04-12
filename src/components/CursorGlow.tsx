"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a custom magnetic cursor glow that follows mouse movement.
 * Works only on pointer devices (desktop). Skips on touch.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let animId: number;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot!.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring!.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      animId = requestAnimationFrame(loop);
    }

    function onEnterLink() {
      dot!.classList.add("cursor-dot--hover");
      ring!.classList.add("cursor-ring--hover");
    }

    function onLeaveLink() {
      dot!.classList.remove("cursor-dot--hover");
      ring!.classList.remove("cursor-ring--hover");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    loop();

    const links = document.querySelectorAll("a, button");
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
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
