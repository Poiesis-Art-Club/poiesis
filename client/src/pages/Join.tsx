/** Manuscrit de Minuit — guilde hospitalière, trois chemins et formulaire traité comme une offrande. */
import { useState } from "react";
import { ArrowUpRight, HandHeart, MessagesSquare, Tickets } from "lucide-react";
import { ChapterTitle, InkButton, ManuscriptCard, SiteShell } from "@/components/PoiesisUI";

export default function Join() {
  const [sent, setSent] = useState(false);
  return <SiteShell><section className="join-page">
    <ChapterTitle eyebrow="The Guildhall" title="Three paths into the guild." text="Choose one, or follow all three. There is no single correct way to arrive at the table." />
    <div className="join-paths">
      <ManuscriptCard className="join-card"><span className="join-number">I</span><Tickets size={22} /><h2>Claim a chair</h2><p>See the open proclamations and join a working room, salon or online workshop.</p><InkButton href="/events">View open events</InkButton></ManuscriptCard>
      <ManuscriptCard className="join-card join-card--dark"><span className="join-number">II</span><MessagesSquare size={22} /><h2>Find your corner</h2><p>Follow the conversations that keep moving between gatherings, sketches and late notes.</p><div className="social-actions"><a href="https://discord.com" target="_blank" rel="noreferrer">Discord <ArrowUpRight size={14} /></a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a></div></ManuscriptCard>
      <ManuscriptCard className="join-card join-card--vermilion"><span className="join-number">III</span><HandHeart size={22} /><h2>Offer your craft</h2><p>Illustration, verse, code, hospitality or organising — the guild grows through its people.</p></ManuscriptCard>
    </div>
    <section className="volunteer-panel">
      {!sent ? <><div><p className="section-tag"><span />Make an offering</p><h2>Leave your note<br />with the Wardens.</h2><p>Tell us what you’d like to make or help make. The page is ready for a form service when you are.</p></div><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name" /></label><label>Craft<input placeholder="Illustration, verse, code, organising…" /></label><label>Message<textarea rows={4} placeholder="A note for the guild" /></label><InkButton type="submit">Send my offer</InkButton></form></> : <div className="volunteer-success"><span>✦</span><h2>Your offer has been sealed.</h2><p>This prototype has displayed the confirmation locally. Connect the form to a destination when you are ready to receive offers.</p><InkButton onClick={() => setSent(false)} tone="ink">Write another note</InkButton></div>}
    </section>
  </section></SiteShell>;
}
