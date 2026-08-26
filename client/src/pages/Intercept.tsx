/** Le Cloître des pratiques — salle d’échange multidisciplinaire, sans contenu de membre fictif. */
import { useState } from "react";
import { ArrowLeft, MessageCircleHeart } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";

export default function Intercept() {
  const [sent, setSent] = useState(false);
  return <SiteShell><section className="echo-page"><a className="back-link" href="/create"><ArrowLeft size={15} />Back to the studios</a><div className="intercept-layout"><article className="received-echo"><p className="section-tag"><span />The exchange room</p><h1>Meet a work<br />with care.</h1><blockquote>When member contributions are connected, this room can present a sculpture, an image, a film note, a score, a performance proposal, a text or a cultural question for response.</blockquote><footer>Open to every medium · no contribution is displayed yet</footer></article><aside className="response-card">{!sent ? <><MessageCircleHeart size={20} /><h2>Offer a response.</h2><p>Respond to the work, not the person. Observation, association, question and constructive critique are all welcome.</p><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><textarea required rows={6} placeholder="What would you like to contribute to the exchange?" /><InkButton type="submit">Add a response</InkButton></form></> : <div className="success-panel"><span>✦</span><h2>Your response is ready for the exchange.</h2><p>This local prototype does not store responses. Connect storage to preserve real member contributions.</p><InkButton href="/create" tone="ink">Return to the studios</InkButton></div>}</aside></div></section></SiteShell>;
}
