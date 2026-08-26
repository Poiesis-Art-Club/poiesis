/** Manuscrit de Minuit — rencontre lente avec un Écho anonyme, mise en page de feuillet annoté. */
import { useState } from "react";
import { ArrowLeft, MessageCircleHeart } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";

export default function Intercept() {
  const [sent, setSent] = useState(false);
  return <SiteShell><section className="echo-page"><a className="back-link" href="/create"><ArrowLeft size={15} />Back to the Scriptorium</a><div className="intercept-layout"><article className="received-echo"><p className="section-tag"><span />Received in the current</p><h1>Echo No. 07</h1><blockquote>“I keep a small blue door in every drawing. No one has opened one yet, but I leave a key under the shadow.”</blockquote><footer>Anonymous · words / unfinished</footer></article><aside className="response-card">{!sent ? <><MessageCircleHeart size={20} /><h2>Leave a reading.</h2><p>Answer the work, not the person. A generous observation is enough.</p><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><textarea required rows={6} placeholder="What did the work make you notice?" /><InkButton type="submit">Send this reading</InkButton></form></> : <div className="success-panel"><span>✦</span><h2>Your reading has joined the margin.</h2><p>It is displayed as a local prototype only; connect storage to preserve real responses.</p><InkButton href="/create" tone="ink">Return to the archive</InkButton></div>}</aside></div></section></SiteShell>;
}
