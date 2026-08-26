/** Manuscrit de Minuit — apothicaire de prompts, tirage cérémoniel et échange d’Échos. */
import { useState } from "react";
import { Dices, Send, Telescope } from "lucide-react";
import { ChapterTitle, InkButton, ManuscriptCard, Ornament, SiteShell } from "@/components/PoiesisUI";

const objects = ["Tarnished mirror", "Sacred relic", "Golden feather", "Broken hourglass", "Forgotten crown", "Sealed letter", "Moth-eaten banner", "Iron key"];
const emotions = ["Yearning", "Melancholy", "Euphoria", "Reverence", "Dread", "Nostalgia", "Defiance", "Wonder"];
const rules = ["Use only sky blue and gold", "Write in four lines", "Include a bird motif", "No straight lines", "Let a shadow of the past appear", "Tell it backwards", "Use only three colours", "Leave an unfinished edge"];
const choose = (list: string[]) => list[Math.floor(Math.random() * list.length)];

export default function Create() {
  const [prompt, setPrompt] = useState<{ object: string; emotion: string; rule: string } | null>(null);
  const draw = () => setPrompt({ object: choose(objects), emotion: choose(emotions), rule: choose(rules) });
  return <SiteShell><section className="create-page">
    <ChapterTitle eyebrow="The Scriptorium" title="Make something from the first spark." text="A small apothecary of prompts, echoes and unfinished works — all ready for the next person who needs a beginning." />
    <section className="prompt-stage"><div className="prompt-stage__copy"><p className="section-tag"><span />Make me create</p><h2>Draw three cards<br />from the cabinet.</h2><p>An object. An emotion. A constraint. Not a recipe — just enough friction to begin.</p><button className="draw-prompt" onClick={draw}><Dices size={18} /><span>{prompt ? "Draw again" : "Draw a prompt"}</span></button></div><div className="prompt-cards">{prompt ? <><div className="prompt-card"><p>Object</p><strong>{prompt.object}</strong></div><div className="prompt-card prompt-card--shift"><p>Emotion</p><strong>{prompt.emotion}</strong></div><div className="prompt-card prompt-card--small"><p>Rule</p><strong>{prompt.rule}</strong></div></> : <><div className="prompt-card prompt-card--blank">Object</div><div className="prompt-card prompt-card--blank prompt-card--shift">Emotion</div><div className="prompt-card prompt-card--blank prompt-card--small">Rule</div></>}</div></section>
    <section className="echo-section"><div className="echo-title"><Ornament /><p className="section-tag"><span />The community exchange</p><h2>Pass a small work<br />between strangers.</h2></div><div className="echo-options"><ManuscriptCard><Telescope size={21} /><h3>Intercept an Echo</h3><p>Receive a stranger’s work and offer your attentive reading of it.</p><InkButton href="/create/intercept" tone="ink">Open an Echo</InkButton></ManuscriptCard><ManuscriptCard className="echo-submit"><Send size={21} /><h3>Create an Echo</h3><p>Send an image, a line or a fragment into the current for someone else to find.</p><InkButton href="/create/submit">Release a work</InkButton></ManuscriptCard></div></section>
    <div className="after-dark-line"><span />The Night Gallery opens after dark. <a href="/night-gallery">Go softly ↗</a></div>
  </section></SiteShell>;
}
