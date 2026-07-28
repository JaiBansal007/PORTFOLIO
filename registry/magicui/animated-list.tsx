"use client";

import { cn } from "@/lib/utils";
import React, {
  Children,
  useEffect,
  useMemo,
  useState,
  ReactElement,
  ReactNode,
} from "react";

export interface AnimatedListProps {
  children?: ReactNode;
  className?: string;
  delay?: number; // ms between each item
}

export function AnimatedList({
  children,
  className,
  delay = 1000,
}: AnimatedListProps) {
  const childrenArr = useMemo(
    () => Children.toArray(children) as ReactElement[],
    [children]
  );

  const [visible, setVisible] = useState<number>(1);

  useEffect(() => {
    if (visible >= childrenArr.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), delay);
    return () => clearTimeout(t);
  }, [visible, childrenArr.length, delay]);

  // Show items newest-first (reverse), limited to what has appeared so far
  const visibleItems = useMemo(
    () => childrenArr.slice(0, visible).reverse(),
    [childrenArr, visible]
  );

  return (
    <div
      className={cn("flex flex-col-reverse items-center gap-2", className)}
    >
      {visibleItems.map((item, i) => (
        <AnimatedListItem key={(item as ReactElement).key ?? i}>
          {item}
        </AnimatedListItem>
      ))}
    </div>
  );
}

function AnimatedListItem({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        animation: "slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      {children}
      <style>{`
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-24px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
