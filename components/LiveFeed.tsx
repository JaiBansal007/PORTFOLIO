"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/registry/magicui/animated-list";

interface FeedItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
}

const FEED_ITEMS: FeedItem[] = [
  { name: "Project Deployed", description: "E-commerce Platform v2.0 live", icon: "🚀", color: "#00C9A7", time: "Just now" },
  { name: "New Client", description: "Onboarded a SaaS startup", icon: "🤝", color: "#FFB800", time: "2h ago" },
  { name: "PR Merged", description: "Auth module — 1.2k lines", icon: "✅", color: "#7C3AED", time: "5h ago" },
  { name: "Award", description: "Top Contributor on GitHub", icon: "🏆", color: "#FF6B35", time: "1d ago" },
  { name: "API Released", description: "REST API with 99.9% uptime", icon: "⚡", color: "#1E86FF", time: "2d ago" },
  { name: "Design Done", description: "Dashboard UI system shipped", icon: "🎨", color: "#FF3D71", time: "3d ago" },
  { name: "Performance", description: "Cut load time by 60%", icon: "📈", color: "#00C9A7", time: "4d ago" },
  { name: "Open Source", description: "React lib hit 500 ⭐", icon: "⭐", color: "#FFB800", time: "5d ago" },
];

// Loop items so the list keeps refreshing
const ITEMS = Array.from({ length: 3 }, () => FEED_ITEMS).flat();

const FeedCard = ({ name, description, icon, color, time }: FeedItem) => (
  <figure
    className="feed-card"
    style={{ "--accent": color } as React.CSSProperties}
  >
    <div className="feed-icon" style={{ background: color }}>
      <span>{icon}</span>
    </div>
    <div className="feed-body">
      <div className="feed-title">
        <span className="feed-name">{name}</span>
        <span className="feed-dot">·</span>
        <span className="feed-time">{time}</span>
      </div>
      <p className="feed-desc">{description}</p>
    </div>
  </figure>
);

export function LiveFeed({ className }: { className?: string }) {
  return (
    <div className={cn("live-feed-wrap", className)}>
      <div className="live-feed-header">
        <span className="live-badge">
          <span className="live-dot" />
          Live Activity
        </span>
      </div>
      <div className="live-feed-scroll">
        <AnimatedList delay={1400}>
          {ITEMS.map((item, i) => (
            <FeedCard {...item} key={i} />
          ))}
        </AnimatedList>
        {/* Fade-out gradient at bottom */}
        <div className="live-fade" />
      </div>
    </div>
  );
}
