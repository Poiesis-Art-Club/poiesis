/** Manuscrit de Minuit — chronique éditoriale, marges de manuscrit et hiérarchie de guilde. */
import { BookOpenText, Palette, ShieldCheck } from "lucide-react";
import { ChapterTitle, ManuscriptCard, Ornament, SiteShell } from "@/components/PoiesisUI";

const guild = [
  { icon: Palette, title: "The Illuminator", eyebrow: "Visual direction", text: "Keeper of the palette, the frame and the quiet pleasure of a well-placed line." },
  { icon: BookOpenText, title: "The Scribe", eyebrow: "Words & archive", text: "Keeper of the chronicle, the Echo and every generous annotation left in the margin." },
  { icon: ShieldCheck, title: "The Wardens", eyebrow: "Community", text: "Keepers of the gate, the invitation and the shared conditions for making." },
];

export default function About() {
  return <SiteShell>
    <section className="paper-page">
      <div className="paper-margin">I · CHRONICLE</div>
      <ChapterTitle eyebrow="The Chronicle" title="A shared table for brave beginnings." text="Poiesis began with drawings passed between friends — sketches in notebooks, poems on receipts and a stubborn wish to keep making together." />
      <div className="chronicle-layout">
        <p className="drop-cap">What started as a private ritual of making grew into a guild: a shared table where anyone can bring an unfinished thought and leave with a prompt, a companion, or simply the nerve to keep going.</p>
        <div className="chronicle-aside"><Ornament /><p>Nothing made in earnest is wasted — a draft is a room the finished work will eventually move into.</p></div>
      </div>
      <div className="manifesto-grid">
        <article><span>01</span><h2>Our mission</h2><p>We lower the cost of starting. The Scriptorium hands out a prompt in seconds; the Echo turns a lonely piece into a conversation.</p></article>
        <article><span>02</span><h2>Our promise</h2><p>The Night Gallery makes space for the odd and the unfinished, before a piece is ready to be seen in daylight.</p></article>
      </div>
      <section className="guild-section">
        <p className="section-tag"><span />The people who tend the table</p>
        <h2>Three quiet roles<br />keep the room open.</h2>
        <div className="guild-grid">
          {guild.map(({ icon: Icon, title, eyebrow, text }) => <ManuscriptCard key={title} className="guild-card"><Icon size={22} /><p>{eyebrow}</p><h3>{title}</h3><span>{text}</span></ManuscriptCard>)}
        </div>
      </section>
    </section>
  </SiteShell>;
}
