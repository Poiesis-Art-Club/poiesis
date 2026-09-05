/** A public participation page that routes interest to the club's real community desk. */
import { CalendarPlus, HeartHandshake, Instagram, Lightbulb, Palette } from "lucide-react";
import { InkButton, INSTAGRAM_URL, SiteShell } from "@/components/PoiesisUI";

const routes = [
  { number: "01", icon: CalendarPlus, title: "Attend", text: "Find current sessions, locations and registration details on Instagram.", action: "See current posts", tone: "" },
  { number: "02", icon: Lightbulb, title: "Propose", text: "Suggest a workshop, screening, exhibition, guest, listening room or cultural conversation by direct message.", action: "Send a proposal", tone: "join-card--dark" },
  { number: "03", icon: Palette, title: "Contribute", text: "Offer a practice, production skill, point of view or form of support directly to the club.", action: "Message the club", tone: "join-card--vermilion" },
];

export const volunteerRoles = ["Session support", "Visual & media support", "Hospitality", "Logistics", "Documentation"];

export default function Join() {
  return <SiteShell><section className="membership-page">
    <header className="membership-header"><p className="folio-label">Join Poiesis</p><h1>Choose your<br /><em>way in.</em></h1><p>Attend, bring an idea, offer a skill or help make a gathering happen.</p></header>
    <div className="join-paths">{routes.map(({number, icon: Icon, title, text, action, tone}) => <article className={`manuscript-card join-card ${tone}`} key={title}><span className="join-number">{number}</span><Icon size={23}/><h2>{title}</h2><p>{text}</p><InkButton href={INSTAGRAM_URL} tone={tone === "join-card--vermilion" ? "ghost" : "ink"}>{action}</InkButton></article>)}</div>
    <section className="volunteer-panel"><div><p className="folio-label">Volunteer with the house</p><h2>Help make it<br />happen.</h2><p>Give a little time, a practical skill or an attentive presence.</p></div><div className="volunteer-panel__content"><HeartHandshake size={29}/><h3>Where you could help</h3><details className="volunteer-details"><summary>See volunteering roles <span>Open</span></summary><div className="volunteer-roles">{volunteerRoles.map(role => <span key={role}>{role}</span>)}</div></details><InkButton href={INSTAGRAM_URL}>I want to volunteer</InkButton></div></section>
  </section></SiteShell>;
}
