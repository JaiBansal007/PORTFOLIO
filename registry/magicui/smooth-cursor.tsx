"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface SmoothCursorProps {
  cursor?: React.ReactNode;
}

export function SmoothCursor({ cursor }: SmoothCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef<Point>({ x: -100, y: -100 });
  const smoothPos = useRef<Point>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const visible = useRef(false);

  useEffect(() => {
    // Hide default cursor
    document.documentElement.style.cursor = "none";

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        smoothPos.current = { x: e.clientX, y: e.clientY };
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
      }
    };

    const onMouseLeave = () => {
      visible.current = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      smoothPos.current.x = lerp(smoothPos.current.x, pos.current.x, 0.12);
      smoothPos.current.y = lerp(smoothPos.current.y, pos.current.y, 0.12);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${smoothPos.current.x}px, ${smoothPos.current.y}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        transition: "opacity 0.3s",
        willChange: "transform",
        transform: "translate(-100px, -100px)",
      }}
    >
      {cursor ?? (
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 2px 12px rgba(99,102,241,0.4), 0 0 0 3px rgba(99,102,241,0.12)",
            transform: "translate(-50%, -50%)",
            transition: "width 0.2s, height 0.2s",
          }}
        />
      )}
    </div>
  );
}
