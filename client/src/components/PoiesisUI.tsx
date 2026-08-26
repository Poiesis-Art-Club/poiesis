/**
 * Manuscrit de Minuit — primitives partagées : encre profonde, parchemin éditorial,
 * vermeil de sceau et gestes d’atelier. Chaque élément doit renforcer ce rituel de création.
 */
import { Link, useLocation } from "wouter";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const ASSETS = {
  hero: "/manus-storage/poiesis-hero-manuscript_8948e97e.jpg",
  seal: "/manus-storage/poiesis-seal-sculpture_5d2e74bf.png",
  gallery: "/manus-storage/poiesis-gallery-vision_137feff4.jpg",
  workshop: "/manus-storage/poiesis-workshop-stilllife_56216ad7.jpg",
  mark: "/manus-storage/poiesis-mark_4fee9962.png",
  portal: "/manus-storage/ambleme-alpha_75fb67b3.png",
  archways: "/manus-storage/Archways-alpha_c73509cb.png",
  parchment: "/manus-storage/Background_403b37be.png",
  birdvine: "/manus-storage/birdvine-alpha_24daebf6.png",
  hintSeal: "/manus-storage/hintseal-alpha_f05d7ab0.png",
  numberPad: "/manus-storage/numberspad-alpha_379c0c80.png",
  owl: "/manus-storage/owl-alpha_86ebde45.png",
  skipSeal: "/manus-storage/skipseal-alpha_07bafdde.png",
};

const navigation = [
  ["/about", "The Houses"],
  ["/events", "Programme"],
  ["/create", "Studios"],
  ["/join", "Join"],
];

export function Mark({ small = false }: { small?: boolean }) {
  return (
    <img
      className={small ? "brand-mark brand-mark--small" : "brand-mark"}
      src={ASSETS.mark}
      alt="Poiesis mark"
    />
  );
}

export function Seal3D({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    ref.current?.style.setProperty("--rx", `${-y * 16}deg`);
    ref.current?.style.setProperty("--ry", `${x * 18}deg`);
  };
  const reset = () => {
    ref.current?.style.setProperty("--rx", "-5deg");
    ref.current?.style.setProperty("--ry", "10deg");
  };
  return (
    <div
      ref={ref}
      className={`seal-3d ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      aria-hidden="true"
    >
      <span className="seal-3d__halo" />
      <img src={ASSETS.seal} alt="" />
    </div>
  );
}

export function SectionTag({ children }: { children: React.ReactNode }) {
  return <p className="section-tag"><span />{children}</p>;
}

export function ChapterTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="chapter-title reveal">
      <SectionTag>{eyebrow}</SectionTag>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export function InkButton({
  href,
  children,
  tone = "vermilion",
  onClick,
  type = "button",
}: {
  href?: string;
  children: React.ReactNode;
  tone?: "vermilion" | "ink" | "ghost";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}) {
  const classes = `ink-button ink-button--${tone}`;
  if (href) return <Link href={href} className={classes}>{children}<span aria-hidden="true">↗</span></Link>;
  return <button type={type} className={classes} onClick={onClick}>{children}<span aria-hidden="true">↗</span></button>;
}

export function ManuscriptCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <article className={`manuscript-card ${className}`}>{children}</article>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  useEffect(() => setOpen(false), [location]);
  return (
    <div className="site-shell">
      <header className="site-nav">
        <Link href="/home" className="brand-lockup" aria-label="Poiesis home">
          <Mark small />
          <span>Poiesis</span>
        </Link>
        <nav className={open ? "nav-links nav-links--open" : "nav-links"} aria-label="Primary navigation">
          {navigation.map(([href, label]) => (
            <Link key={href} href={href} className={location === href ? "nav-link nav-link--active" : "nav-link"}>{label}</Link>
          ))}
          <Link href="/night-gallery" className="nav-link nav-link--night">After dark</Link>
        </nav>
        <div className="nav-tools">
          <button className="torch-control" onClick={toggleTheme} aria-label="Toggle night setting" title="Change the light">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button className="menu-control" onClick={() => setOpen(!open)} aria-label="Open navigation">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="footer-symbol"><Mark small /></div>
        <p>Poiesis — arts, culture and inquiry.</p>
        <p className="footer-note">A house for making, meeting and thinking.</p>
      </footer>
    </div>
  );
}

export function Ornament() {
  return <span className="ornament" aria-hidden="true"><Sparkles size={13} /><i /><Sparkles size={13} /></span>;
}
