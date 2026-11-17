import type { Personal } from "@/types/portfolio";
import { SocialLinks } from "@/components/SocialLinks";
import { MorphingText } from "@/registry/magicui/morphing-text";
import { OrbitingCircles } from "@/registry/magicui/orbiting-circles";
import { RetroGrid } from "@/registry/magicui/retro-grid";
import { InteractiveHoverButton } from "@/registry/magicui/interactive-hover-button";
import { isUsableHref } from "@/lib/utils";

const MORPH_TEXTS = [
  "Full-Stack Developer",
  "Competitive Programmer",
  "Computer Science Student",
  "Problem Setter",
  "Software Engineer",
];

const TechMark = ({ label }: { label: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <rect width="24" height="24" rx="4" fill="#334155" />
    <text x="12" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="white">
      {label}
    </text>
  </svg>
);

const TechIcons = {
  Next: () => (
    <svg viewBox="0 0 24 24" fill="#0f172a" width="22" height="22">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.052.54-.052.479 0 .558.019.683.155a466.83 466.83 0 012.895 4.361c1.558 2.362 3.687 5.587 4.734 7.171l1.9 2.878.096-.063a12.317 12.317 0 002.465-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.529 5.12 21.617 2.517 18.86.94 17.18.075 15.317-.208 13.498.07c-.264.039-.929.168-1.162.221-.087.02-.17.042-.252.063L11.572 0z"/>
    </svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 24 24" width="22" height="22">
      <rect width="24" height="24" rx="2" fill="#3178C6"/>
      <path d="M13.4 12.9h2.1v.5c0 .8-.6 1.3-1.5 1.3-.9 0-1.5-.6-1.5-1.5v-2.4c0-.9.6-1.5 1.5-1.5.9 0 1.5.5 1.5 1.3v.3h2.1v-.4c0-1.9-1.5-3.2-3.6-3.2-2.2 0-3.7 1.4-3.7 3.6v2.3c0 2.2 1.5 3.6 3.7 3.6 2.1 0 3.6-1.3 3.6-3.2v-2.2h-4.2v1.5zm-4.7-5.4H6.4V17h2.3V7.5z" fill="white"/>
    </svg>
  ),
  Node: () => (
    <svg viewBox="0 0 24 24" fill="#339933" width="22" height="22">
      <path d="M11.998 24a1.362 1.362 0 01-.681-.18l-2.164-1.28c-.323-.181-.165-.245-.059-.282.431-.15.518-.184 1.078-.501l.052-.03a.299.299 0 01.293.031l1.664.987c.06.033.144.033.2 0l6.486-3.744a.202.202 0 00.097-.174V7.835a.202.202 0 00-.098-.175l-6.484-3.743a.2.2 0 00-.2 0L5.738 7.66a.203.203 0 00-.098.175v7.487c0 .072.038.137.099.173l1.777 1.026c.964.482 1.554-.086 1.554-.657V8.428c0-.105.084-.188.188-.188h.82c.1 0 .187.083.187.188v7.436c0 1.288-.701 2.026-1.921 2.026-.375 0-.671 0-1.494-.406l-1.702-.979a1.364 1.364 0 01-.681-1.18V7.835c0-.487.26-.94.681-1.181l6.487-3.744a1.414 1.414 0 011.361 0l6.486 3.744c.421.241.681.694.681 1.181v7.487c0 .487-.26.94-.681 1.181L12.68 23.82a1.358 1.358 0 01-.682.18z"/>
    </svg>
  ),
  MongoDB: () => <TechMark label="DB" />,
  Cpp: () => <TechMark label="C++" />,
  Java: () => <TechMark label="Java" />,
  Firebase: () => <TechMark label="Fb" />,
};

export default function Hero({ personal }: { personal: Personal }) {
  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* RetroGrid background */}
      <RetroGrid />

      <div className="hero">
        {/* Left — Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            <span>B.Tech CSE · NSUT 2027</span>
          </div>

          <h1 className="hero-name" id="hero-heading">{personal.name}</h1>

          {/* MorphingText for title */}
          <h2 className="hero-title" aria-label={personal.title}>
            <MorphingText
              texts={MORPH_TEXTS}
              morphDuration={1}
              cooldown={2.2}
            />
          </h2>

          <p className="hero-tagline">{personal.tagline}</p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary" id="btn-view-work">
              View My Work
            </a>
            {isUsableHref(personal.resumeUrl) && (
              <InteractiveHoverButton href={personal.resumeUrl} id="btn-resume">
                Download CV
              </InteractiveHoverButton>
            )}
          </div>

          <SocialLinks social={personal.social} className="hero-socials" />
        </div>

        {/* Right — Avatar with OrbitingCircles */}
        <div className="hero-visual">
          <div className="avatar-wrap">
            <div className="avatar-ring" aria-hidden="true" />
            <div className="avatar-inner">
              {personal.avatar ? (
                <img src={personal.avatar} alt="" decoding="async" />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Inner orbit — faster */}
            <OrbitingCircles
              className="hero-orbit"
              iconSize={32}
              radius={148}
              duration={16}
              path
            >
              <TechIcons.Next />
              <TechIcons.TypeScript />
              <TechIcons.Node />
              <TechIcons.MongoDB />
            </OrbitingCircles>

            {/* Outer orbit — reverse */}
            <OrbitingCircles
              className="hero-orbit"
              iconSize={26}
              radius={186}
              duration={24}
              reverse
              path={false}
            >
              <TechIcons.Cpp />
              <TechIcons.Java />
              <TechIcons.Firebase />
            </OrbitingCircles>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </div>
    </section>
  );
}
