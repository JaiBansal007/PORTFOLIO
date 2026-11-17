"use client";

import { cn } from "@/lib/utils";
import React, { useRef } from "react";

interface InteractiveHoverButtonProps extends React.AriaAttributes {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  id?: string;
  target?: string;
  rel?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export function InteractiveHoverButton({
  children = "Button",
  className,
  href,
  id,
  target,
  rel,
  type,
  onClick,
  ...ariaProps
}: InteractiveHoverButtonProps) {
  const dotRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const dot = dotRef.current;
    if (!dot) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    dot.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
  };

  const content = (
    <>
      <span className="ihb-dot" ref={dotRef} />
      <span className="ihb-default">{children}</span>
      <span className="ihb-hover" aria-hidden="true">{children}</span>
    </>
  );

  if (href) {
    return (
      <>
        <a
          href={href}
          id={id}
          target={target}
          rel={rel}
          className={cn("interactive-hover-btn", className)}
          onMouseMove={handleMouseMove}
          onClick={onClick}
          {...ariaProps}
        >
          {content}
        </a>
        <ButtonStyles />
      </>
    );
  }

  return (
    <>
      <button
        id={id}
        type={type ?? "button"}
        className={cn("interactive-hover-btn", className)}
        onMouseMove={handleMouseMove}
        onClick={onClick}
        {...ariaProps}
      >
        {content}
      </button>
      <ButtonStyles />
    </>
  );
}

function ButtonStyles() {
  return (
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
      .interactive-hover-btn:hover .ihb-dot,
      .interactive-hover-btn:focus-visible .ihb-dot {
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
      .interactive-hover-btn:hover .ihb-default,
      .interactive-hover-btn:focus-visible .ihb-default {
        opacity: 0;
        transform: translateY(-8px);
      }
      .interactive-hover-btn:hover .ihb-hover,
      .interactive-hover-btn:focus-visible .ihb-hover {
        opacity: 1;
        transform: translateY(0);
      }
    `}</style>
  );
}
