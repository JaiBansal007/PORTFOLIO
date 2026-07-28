"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

export function InteractiveHoverButton({
  children = "Button",
  className,
  href,
  onClick,
  ...props
}: InteractiveHoverButtonProps) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = btnRef.current;
    const dot = dotRef.current;
    if (!btn || !dot) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dot.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
  };

  const inner = (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn("interactive-hover-btn", className)}
      {...props}
    >
      <span className="ihb-dot" ref={dotRef} />
      <span className="ihb-default">{children}</span>
      <span className="ihb-hover">{children}</span>
      <style>{`
        .interactive-hover-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 13px 28px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          overflow: hidden;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.14);
          color: #e2e8f0;
          transition: color 0.35s ease, border-color 0.35s ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .interactive-hover-btn:hover {
          border-color: #00f5ff;
          color: #07090f;
        }
        .ihb-dot {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00f5ff, #a855f7);
          opacity: 0;
          pointer-events: none;
          transition: transform 0s, width 0.4s ease, height 0.4s ease, opacity 0.35s ease;
          will-change: transform, width, height;
          z-index: 0;
        }
        .interactive-hover-btn:hover .ihb-dot {
          opacity: 1;
          width: 400px;
          height: 400px;
          transform: translate(-190px, -190px) !important;
        }
        .ihb-default, .ihb-hover {
          position: relative;
          z-index: 1;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .ihb-hover {
          position: absolute;
          opacity: 0;
          transform: translateY(8px);
          color: #07090f;
          font-weight: 700;
        }
        .interactive-hover-btn:hover .ihb-default {
          opacity: 0;
          transform: translateY(-8px);
        }
        .interactive-hover-btn:hover .ihb-hover {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </button>
  );

  if (href) {
    return (
      <a href={href} style={{ textDecoration: "none" }}>
        {inner}
      </a>
    );
  }

  return inner;
}
