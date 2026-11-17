"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MorphingTextProps {
  texts: string[];
  className?: string;
  morphDuration?: number;
  cooldown?: number;
}

export function MorphingText({
  texts,
  className,
  morphDuration = 1.2,
  cooldown = 2.5,
}: MorphingTextProps) {
  const [index, setIndex] = useState(0);
  const [next, setNext] = useState(1 % texts.length);
  const [morphing, setMorphing] = useState(false);

  useEffect(() => {
    if (texts.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cooldownMs = cooldown * 1000;
    const morphMs = morphDuration * 1000;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      setMorphing(true);
      timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setNext((i) => (i + 2) % texts.length);
        setMorphing(false);
      }, morphMs);
    }, cooldownMs + morphMs);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [texts.length, cooldown, morphDuration]);

  return (
    <span
      className={cn("relative inline-block", className)}
      aria-hidden="true"
    >
      {/* Current text fading out */}
      <span
        style={{
          position: morphing ? "absolute" : "relative",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: `opacity ${morphDuration}s ease, filter ${morphDuration}s ease`,
          opacity: morphing ? 0 : 1,
          filter: morphing ? "blur(8px)" : "blur(0px)",
          pointerEvents: "none",
        }}
      >
        {texts[index]}
      </span>
      {/* Next text fading in */}
      {morphing && (
        <span
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: `morphIn ${morphDuration}s ease forwards`,
          }}
        >
          {texts[next]}
        </span>
      )}
      <style>{`
        @keyframes morphIn {
          from { opacity: 0; filter: blur(8px); }
          to   { opacity: 1; filter: blur(0px); }
        }
      `}</style>
    </span>
  );
}
