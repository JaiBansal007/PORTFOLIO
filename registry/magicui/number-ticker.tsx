"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  className?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          setTimeout(() => animate(el, value, direction, decimalPlaces), delay * 1000);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, direction, delay, decimalPlaces]);

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {direction === "down" ? value : 0}
    </span>
  );
}

function animate(
  el: HTMLSpanElement,
  target: number,
  direction: "up" | "down",
  decimalPlaces: number
) {
  const duration = 1800;
  const start = performance.now();
  const from = direction === "up" ? 0 : target;
  const to = direction === "up" ? target : 0;

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = from + (to - from) * easeOut(progress);
    el.textContent = current.toFixed(decimalPlaces);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(decimalPlaces);
  };

  requestAnimationFrame(tick);
}
