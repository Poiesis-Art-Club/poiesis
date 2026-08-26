/** Le Cloître des pratiques — accueil concret pour une maison de tous les arts, cultures et idées. */
import { ArrowUpRight, Brush, Drama, Globe2, Music2, Palette, ScanLine, Shapes, UsersRound } from "lucide-react";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

const houses = [
  { icon: Shapes, numeral: "I", title: "Image & Matter", text: "Sculpture, drawing, painting, installation, photography and design." },
  { icon: Music2, numeral: "II", title: "Sound & Stage", text: "Music, dance, theatre, film, performance and live experiment." },
  { icon: Globe2, numeral: "III", title: "Cultures & Thought", text: "Literature, philosophy, cultural exchange, reading groups and debate." },
  { icon: ScanLine, numeral: "IV", title: "Craft & New Forms", text: "Print, digital practice, architecture, fashion and projects between disciplines." },
];

export default function Home() {
  return <SiteShell>
    <section className="great-hall" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
      <img className="hall-arch hall-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="hall-arch hall-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="hall-vine hall-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
      <img className="hall-vine hall-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />
      <div className="great-hall__copy">
        <p className="folio-label">Poiesis · House of art, culture & inquiry</p>
        <h1>A meeting place<br />for <em>every</em> art.</h1>
        <p>Poiesis is a member-led club for people who make, study, perform, collect, question and discuss. Bring a sculpture, a film, a sound, a photograph, a text, a question — or simply attention.</p>
        <div className="great-hall__actions"><InkButton href="/about">Explore the houses</InkButton><InkButton href="/events" tone="ink">See the programme</InkButton></div>
      </div>
      <div className="hall-seal"><img src={ASSETS.portal} alt="Poiesis emblem" /><span>Open to all practices</span></div>
    </section>

    <section className="houses-ledger">
      <div className="ledger-heading"><p className="folio-label">The four houses</p><h2>Different practices.<br />One common table.</h2><p>We do not separate art from culture or making from thinking. The houses are starting points, not limits.</p></div>
      <div className="houses-grid">{houses.map(({ icon: Icon, numeral, title, text }) => <article className="house-folio" key={title}><span>{numeral}</span><Icon size={22} /><h3>{title}</h3><p>{text}</p><ArrowUpRight size={17} /></article>)}</div>
    </section>

    <section className="assembly-banner" style={{ backgroundImage: `url(${ASSETS.gallery})` }}>
      <div className="assembly-banner__shade" /><div className="assembly-banner__copy"><UsersRound size={23} /><p className="folio-label">The common room</p><h2>Make, show,<br />listen, debate.</h2><p>Open studios, screenings, listening rooms, critique circles, cultural conversations and philosophy salons share the same hall.</p><InkButton href="/events" tone="ghost">View the programme</InkButton></div>
    </section>

    <section className="home-studio-note"><div><Brush size={20} /><p className="folio-label">Need a starting point?</p><h2>The studios welcome work in any medium.</h2></div><p>Use a prompt, share a work in progress, or start a cross-disciplinary conversation.</p><InkButton href="/create" tone="ink">Enter the studios</InkButton></section>
  </SiteShell>;
}
