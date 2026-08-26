/** Manuscrit de Minuit — page d’accueil : table de scriptorium asymétrique, clair-obscur et artefacts vivants. */
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight, Feather, MapPin, PenLine } from "lucide-react";
import { ASSETS, InkButton, ManuscriptCard, Ornament, SectionTag, Seal3D, SiteShell } from "@/components/PoiesisUI";

const pathways = [
  { number: "I", title: "The Chronicle", text: "How a scattering of sketches became a guild with room for beginnings.", href: "/about" },
  { number: "II", title: "Gatherings", text: "Candlelit salons, working tables and online craft sessions.", href: "/events" },
  { number: "III", title: "The Guildhall", text: "Three ways to come closer to the table — on your own terms.", href: "/join" },
];

export default function Home() {
  return (
    <SiteShell>
      <section className="home-hero" style={{ backgroundImage: `url(${ASSETS.hero})` }}>
        <div className="hero-overlay" />
        <div className="hero-copy">
          <SectionTag>An illuminated manuscript for the living</SectionTag>
          <h1>Bring your <em>unfinished</em><br />work to the table.</h1>
          <p>Poiesis is a guild of makers: drawing, writing and answering the prompts that arrive like sealed letters from an unseen hand.</p>
          <div className="hero-actions">
            <InkButton href="/create">Enter the Scriptorium</InkButton>
            <InkButton href="/about" tone="ghost">Read our Chronicle</InkButton>
          </div>
        </div>
        <div className="hero-side-note"><span>01</span><p>Thought<br />into form</p></div>
        <Seal3D className="hero-seal" />
        <a href="#paths" className="hero-scroll">Scroll to enter <ArrowDownRight size={17} /></a>
      </section>

      <section className="paths-section" id="paths">
        <div className="section-rail"><span>CHAPTER ONE</span><i /></div>
        <div className="paths-intro">
          <SectionTag>Choose a path</SectionTag>
          <h2>Every maker begins<br />somewhere different.</h2>
          <p>Move through the guild as you would an old house — from its history, to its gatherings, to the shared work left on the table.</p>
        </div>
        <div className="path-list">
          {pathways.map((path) => (
            <Link href={path.href} className="pathway" key={path.number}>
              <span className="pathway-number">{path.number}</span>
              <div><h3>{path.title}</h3><p>{path.text}</p></div>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </section>

      <section className="home-scriptorium">
        <div className="scriptorium-visual" style={{ backgroundImage: `url(${ASSETS.workshop})` }}>
          <div className="visual-stamp"><Feather size={18} /><span>Made by hand</span></div>
        </div>
        <div className="scriptorium-copy">
          <SectionTag>The apothecary of prompts</SectionTag>
          <h2>A small beginning<br />can make a world.</h2>
          <p>Draw a prompt, compose a reply to a stranger’s Echo, or send an unfinished fragment into the current.</p>
          <div className="mini-principles"><span><PenLine size={15} />No polished answer required</span><span><MapPin size={15} />A shared table, online & in person</span></div>
          <InkButton href="/create" tone="ink">Draw a prompt</InkButton>
        </div>
      </section>

      <section className="night-promo" style={{ backgroundImage: `url(${ASSETS.gallery})` }}>
        <div className="night-promo__shade" />
        <div className="night-promo__content">
          <Ornament />
          <SectionTag>The doors after nine</SectionTag>
          <h2>Some work only speaks<br />when the gallery sleeps.</h2>
          <p>The Night Gallery protects the strange, the tentative and the unfinished from the tidy light of day.</p>
          <InkButton href="/night-gallery" tone="ghost">Enter after dark</InkButton>
        </div>
      </section>
    </SiteShell>
  );
}
