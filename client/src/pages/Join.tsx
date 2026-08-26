/** Le Cloître des pratiques — participation concrète : assister, proposer une pratique, aider à faire vivre une maison. */
import { useState } from "react";
import { CalendarPlus, HandHeart, Lightbulb, UsersRound } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";

export default function Join() {
  const [sent, setSent] = useState(false);
  return <SiteShell><section className="membership-page">
    <header className="membership-header"><p className="folio-label">Membership & participation</p><h1>Join the house.<br />Bring a practice.</h1><p>You can come to a session, propose an activity, contribute a skill or simply meet the members before choosing your place.</p></header>
    <div className="membership-routes"><article><span>01</span><CalendarPlus size={23}/><h2>Attend</h2><p>Join an open studio, a screening, a listening room, a discussion or a cultural salon.</p><InkButton href="/events" tone="ink">See the programme</InkButton></article><article><span>02</span><Lightbulb size={23}/><h2>Propose</h2><p>Bring a workshop, a work session, a guest, an exhibition idea, a film or a question for debate.</p><a href="#proposal">Send a proposal ↓</a></article><article><span>03</span><HandHeart size={23}/><h2>Contribute</h2><p>Help host a house through your knowledge, practice, care, production skills or cultural perspective.</p><a href="#proposal">Tell us how ↓</a></article></div>
    <section className="proposal-sheet" id="proposal">{!sent ? <><div><UsersRound size={23}/><p className="folio-label">A note for the house</p><h2>What would you like to bring?</h2><p>Tell us about your practice, a session you want to propose, or a way you would like to support the club.</p></div><form onSubmit={(event) => { event.preventDefault(); setSent(true); }}><label>Name<input required placeholder="Your name"/></label><label>Practice or interest<input placeholder="Sculpture, music, philosophy, film, design…"/></label><label>Proposal<textarea rows={5} placeholder="What would you like to make, show, discuss or organise?"/></label><InkButton type="submit">Send a note</InkButton></form></> : <div className="volunteer-success"><span>✦</span><h2>Your note is ready for the house.</h2><p>This is a local confirmation only. Connect a form destination when you are ready to receive real member proposals.</p><InkButton onClick={() => setSent(false)} tone="ink">Write another note</InkButton></div>}</section>
  </section></SiteShell>;
}
