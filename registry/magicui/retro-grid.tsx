import { cn } from "@/lib/utils";

interface RetroGridProps {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  lightColor?: string;
  darkColor?: string;
}

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.55,
  lightColor = "rgba(99,102,241,0.18)",
  darkColor = "rgba(139,92,246,0.12)",
}: RetroGridProps) {
  const gridStyle = {
    "--grid-angle": `${angle}deg`,
    "--cell-size": `${cellSize}px`,
    "--opacity": opacity,
    "--light-color": lightColor,
    "--dark-color": darkColor,
  } as React.CSSProperties;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={gridStyle}
      aria-hidden="true"
    >
      {/* Perspective grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `perspective(600px) rotateX(var(--grid-angle))`,
          transformOrigin: "center bottom",
          backgroundImage: `
            linear-gradient(var(--dark-color) 1px, transparent 1px),
            linear-gradient(90deg, var(--dark-color) 1px, transparent 1px)
          `,
          backgroundSize: `var(--cell-size) var(--cell-size)`,
          opacity: "var(--opacity)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 85%)",
        }}
      />
      {/* Scanline glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 40% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
