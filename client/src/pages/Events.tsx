/** Le Cloître des pratiques — programme lisible de sessions artistiques et d’assemblées culturelles. */
import { CalendarDays, CircleHelp, Film, Hand, Mic2, Palette, Scale, UsersRound } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";

const programme = [
  { icon: Hand, type: "Open studio", title: "Material & Form", text: "A shared working session for sculpture, drawing, painting, textile, object making and installation. Bring a project or come to observe." },
  { icon: Film, type: "Screening & listening room", title: "Image, Sound & Performance", text: "A place for films, music, sound pieces, documentation, movement research and conversation after the work." },
  { icon: Scale, type: "Culture & philosophy salon", title: "Ideas in common", text: "A moderated discussion around a text, an artwork, a cultural question or a philosophical problem chosen by the members." },
];

export default function Events() {
  return <SiteShell><section className="programme-page">
    <header className="programme-header"><p className="folio-label">The programme</p><h1>Sessions for<br />making and thinking.</h1><p>Poiesis hosts formats rather than a single discipline. The programme can hold a workshop, a screening, a critique, a performance, a cultural conversation or a debate.</p></header>
    <div className="programme-notice"><CalendarDays size={17}/><span>Dates, venues and hosts are announced by the club. Use this page to understand the kinds of sessions you can join or propose.</span></div>
    <div className="programme-list">{programme.map(({ icon: Icon, type, title, text }, index) => <article className="proclamation" key={title}><span>0{index + 1}</span><Icon size={26}/><div><p>{type}</p><h2>{title}</h2><p className="proclamation-text">{text}</p></div><InkButton href="/join" tone="ink">Propose or attend</InkButton></article>)}</div>
    <section className="programme-foot"><Mic2 size={21}/><div><h2>Have an idea for the programme?</h2><p>Suggest a guest, a work session, a screening, a listening room or a question worth discussing.</p></div><InkButton href="/join">Send a proposal</InkButton></section>
  </section></SiteShell>;
}
