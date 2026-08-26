/** Manuscrit de Minuit — dépôt d’un fragment, formulaire feuilleté et retour local explicite. */
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";

export default function SubmitEcho() {
  const [sent, setSent] = useState(false);
  return <SiteShell><section className="echo-page"><a className="back-link" href="/create"><ArrowLeft size={15} />Back to the Scriptorium</a><div className="submit-leaf">{!sent ? <><div className="submit-leaf__intro"><p className="section-tag"><span />Create an Echo</p><h1>Release a small<br />unfinished thing.</h1><p>It can be a visual memory, a line of writing, a question or an image that needs another pair of eyes.</p><Send size={30} /></div><form onSubmit={(e) => { e.preventDefault(); setSent(true); }}><label>Title or first line<input required placeholder="Name the fragment" /></label><label>Medium<select defaultValue="words"><option value="words">Words</option><option value="image">Image</option><option value="drawing">Drawing</option><option value="mixed">Mixed media</option></select></label><label>The fragment<textarea required rows={7} placeholder="Leave the work here…" /></label><label className="check-label"><input type="checkbox" required /> I’m ready to let someone meet this work with care.</label><InkButton type="submit">Release into the current</InkButton></form></> : <div className="success-panel submit-success"><span>✦</span><h2>Your Echo has left the table.</h2><p>It is a local confirmation for now. Connect a database or submission service to place real works into the community current.</p><InkButton href="/create" tone="ink">Return to the Scriptorium</InkButton></div>}</div></section></SiteShell>;
}
