"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface OrbitingCirclesProps {
  children?: React.ReactNode;
  className?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  speed?: number;
  iconSize?: number;
  path?: boolean;
}

export function OrbitingCircles({
  children,
  className,
  reverse = false,
  duration = 20,
  radius = 160,
  speed = 1,
  iconSize = 30,
  path = true,
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  const items = React.Children.toArray(children);
  const count = items.length;

  return (
    <div
      className={cn("absolute inset-0 flex items-center justify-center", className)}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      {/* Orbit path circle */}
      {path && (
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ pointerEvents: "none" }}
          viewBox="-200 -200 400 400"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {items.map((child, i) => {
        const delayFraction = -(calculatedDuration / count) * i;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: iconSize,
              height: iconSize,
              animation: `orbit ${calculatedDuration}s linear ${delayFraction}s infinite${reverse ? " reverse" : ""}`,
              "--radius": `${radius}px`,
            } as React.CSSProperties}
          >
            <div
              style={{
                width: iconSize,
                height: iconSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(4px)",
                padding: 6,
              }}
            >
              {child}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(var(--radius)) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(var(--radius)) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
