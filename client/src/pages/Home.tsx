/** Public-facing orientation page: make Poiesis legible before inviting people further in. */
import { ArrowRight, Compass, HeartHandshake, Images, Lightbulb } from "lucide-react";
import { ASSETS, InkButton, INSTAGRAM_URL, SiteShell } from "@/components/PoiesisUI";

const pathways = [
  { number: "01", icon: Compass, title: "Discover the house", text: "Understand what Poiesis is, what it values and the people who shape it.", href: "/about", action: "Get to know us" },
  { number: "02", icon: Lightbulb, title: "Make something", text: "Use Studios for practical creative invitations and cross-disciplinary ideas.", href: "/create", action: "Enter Studios" },
  { number: "03", icon: Images, title: "Share an Echo", text: "Members can bring a work, a question or a useful reference into the private archive.", href: "/echoes", action: "Open Echoes" },
  { number: "04", icon: HeartHandshake, title: "Take part", text: "Attend, propose a project or volunteer with the people keeping the house open.", href: "/join", action: "Join the house" },
];

export default function Home() {
  return <SiteShell>
    <section className="great-hall" style={{ backgroundImage: `url(${ASSETS.romanDeLaRose})` }}>
      <img className="hall-arch hall-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img className="hall-arch hall-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img className="hall-vine hall-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <img className="hall-vine hall-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" loading="lazy" decoding="async" />

      <div className="great-hall__copy">
        <p className="folio-label">Poiesis · an art club for curious people</p>
        <h1>Make room<br />for <em>what moves you.</em></h1>
        <p>Poiesis brings art, culture and inquiry into one shared house. Start with the practice you love.</p>
        <div className="great-hall__actions"><InkButton href="/about">Discover Poiesis</InkButton><InkButton href="/join" tone="ink">Find your way in</InkButton><InkButton href={INSTAGRAM_URL} tone="ghost">Instagram</InkButton></div>
      </div>
      <div className="hall-seal"><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo" decoding="async" /><span>Art · culture · inquiry</span></div>
    </section>

    <section className="orientation-section">
      <div className="orientation-section__intro">
        <p className="folio-label">Start here</p>
        <h2>Choose a<br />door.</h2>
        <p>One clear next step, whether you are new or returning with an idea.</p>
      </div>
      <div className="orientation-paths">
        {pathways.map(({ number, icon: Icon, title, text, href, action }) => <article className="orientation-path" key={title}>
          <span className="orientation-path__number">{number}</span><Icon size={20} aria-hidden="true" />
          <div><h3>{title}</h3><p>{text}</p><a href={href}>{action}<ArrowRight size={15} /></a></div>
        </article>)}
      </div>
    </section>
    <section className="home-signpost"><p>Sessions, open calls and volunteer needs are shared on Instagram.</p><div><InkButton href={INSTAGRAM_URL}>See what is on</InkButton><a href="/echoes">Member archive <ArrowRight size={14}/></a></div></section>
  </SiteShell>;
}
