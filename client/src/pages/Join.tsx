/** Participation Poiesis — les annonces, inscriptions et propositions passent directement par Instagram. */
import { CalendarPlus, HandHeart, Instagram, Lightbulb } from "lucide-react";
import { InkButton, INSTAGRAM_URL, SiteShell } from "@/components/PoiesisUI";

export default function Join() {
  return <SiteShell><section className="membership-page">
    <header className="membership-header"><p className="folio-label">Join Poiesis</p><h1>One house.<br />One meeting point.</h1><p>Poiesis uses Instagram for dates, registrations, guest announcements and project proposals. Follow the account or send a direct message to take part.</p></header>
    <div className="membership-routes"><article><span>01</span><CalendarPlus size={23}/><h2>Attend</h2><p>Find current sessions, locations and registration details on Instagram.</p><InkButton href={INSTAGRAM_URL} tone="ink">See current posts</InkButton></article><article><span>02</span><Lightbulb size={23}/><h2>Propose</h2><p>Suggest a workshop, screening, exhibition idea, listening room, guest or cultural conversation by direct message.</p><InkButton href={INSTAGRAM_URL}>Send a proposal</InkButton></article><article><span>03</span><HandHeart size={23}/><h2>Contribute</h2><p>Offer a practice, production skill, point of view or form of support directly to the club.</p><InkButton href={INSTAGRAM_URL} tone="ink">Message the club</InkButton></article></div>
    <section className="instagram-desk"><Instagram size={30}/><div><p className="folio-label">The club desk</p><h2>Instagram is where<br />the house gathers.</h2><p>Event dates, registration, open calls and new proposals are shared there so the programme stays with the community.</p></div><InkButton href={INSTAGRAM_URL}>Open Instagram</InkButton></section>
  </section></SiteShell>;
}
