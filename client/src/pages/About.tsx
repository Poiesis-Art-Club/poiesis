/** Le Cloître des pratiques — registre clair des disciplines, principes et usages du club. */
import { Aperture, BookOpenText, Box, Drama, Landmark, Music2, Palette, ScrollText } from "lucide-react";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

const rooms = [
  { icon: Box, title: "The Material Room", items: "Sculpture · ceramics · drawing · painting · installation · craft" },
  { icon: Aperture, title: "The Image Room", items: "Photography · film · animation · print · visual research · design" },
  { icon: Music2, title: "The Sound & Stage", items: "Music · sound art · dance · theatre · performance · live work" },
  { icon: BookOpenText, title: "The Reading Table", items: "Writing · philosophy · history · culture · criticism · debate" },
];

export default function About() {
  return <SiteShell><section className="cloister-page" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
    <img className="cloister-vine" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <header className="folio-header"><p className="folio-label">The houses of Poiesis</p><h1>Every practice<br />has a seat.</h1><p>Poiesis is not a school and not a single-medium collective. It is a shared structure for artistic practice, cultural curiosity and serious conversation.</p></header>
    <div className="room-register">{rooms.map(({ icon: Icon, title, items }, index) => <article className="room-entry" key={title}><span>0{index + 1}</span><Icon size={25}/><h2>{title}</h2><p>{items}</p></article>)}</div>
    <section className="cloister-principles"><div><ScrollText size={21}/><h2>What happens here</h2><p>Members organise sessions, share work, invite guests, screen films, listen together, build projects and host discussions.</p></div><div><Landmark size={21}/><h2>Culture is part of the work</h2><p>We welcome perspectives, traditions, questions and histories from different places — with care, context and curiosity.</p></div><div><Drama size={21}/><h2>Debate has a place</h2><p>Philosophy, criticism and disagreement are welcome when they help people think more clearly and treat each other well.</p></div></section>
    <div className="cloister-join"><p>Do you want to attend, propose a session or help shape a house?</p><InkButton href="/join">Join Poiesis</InkButton></div>
  </section></SiteShell>;
}
