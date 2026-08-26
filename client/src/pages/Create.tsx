/** Le Cloître des pratiques — studios multi-médias : créer, croiser les disciplines et partager des travaux. */
import { useState } from "react";
import { Box, Dices, Film, MessageCircleMore, Music2, Palette, Send, Sparkles } from "lucide-react";
import { InkButton, INSTAGRAM_URL, SiteShell } from "@/components/PoiesisUI";

const practices = ["Sculpture", "Photography", "Music", "Film", "Dance", "Drawing", "Writing", "Performance", "Design", "Philosophy through art"];
const startingPoints = ["Start from a material you found this week", "Begin with a sound you cannot forget", "Work from a memory of a place", "Choose a work from another culture and research its context", "Translate an idea from one medium into another", "Make something that asks a question rather than giving an answer"];
const invitations = ["Invite a person from another discipline to respond", "Show the process, not only the result", "Leave a question for a future discussion", "Use one constraint that comes from your medium", "Bring it to the next open studio"];
const choose = (list: string[]) => list[Math.floor(Math.random() * list.length)];

export default function Create() {
  const [prompt, setPrompt] = useState<{ practice: string; start: string; invitation: string } | null>(null);
  const draw = () => setPrompt({ practice: choose(practices), start: choose(startingPoints), invitation: choose(invitations) });
  return <SiteShell><section className="studio-page">
    <header className="studio-header"><p className="folio-label">The studios</p><h1>Make in your medium.<br /><em>Meet another.</em></h1><p>The studios are for every practice: work alone, work together, test an idea, or start a conversation across forms.</p></header>
    <section className="studio-wheel"><div className="studio-wheel__copy"><Sparkles size={20}/><p className="folio-label">A starting point</p><h2>Choose a practice,<br />a question, a next step.</h2><p>Use this draw when you need movement, not a rulebook.</p><button className="draw-prompt" onClick={draw}><Dices size={18}/>{prompt ? "Draw again" : "Draw a studio prompt"}</button></div><div className="studio-cards">{prompt ? <><article><p>Practice</p><strong>{prompt.practice}</strong></article><article><p>Starting point</p><strong>{prompt.start}</strong></article><article><p>Invitation</p><strong>{prompt.invitation}</strong></article></> : <><article><p>Practice</p><strong>Any medium</strong></article><article><p>Starting point</p><strong>One question</strong></article><article><p>Invitation</p><strong>One exchange</strong></article></>}</div></section>
    <section className="studio-doors"><article><Box size={24}/><h2>Open a work</h2><p>Share an image, a link, a score, a film note, a fragment, a proposal or a question for the other members.</p><InkButton href="/echoes" tone="ink">Share in Echoes</InkButton></article><article><MessageCircleMore size={24}/><h2>Respond to a work</h2><p>Meet another member’s contribution and offer an attentive response from your own practice or point of view.</p><InkButton href="/echoes">Open Echoes</InkButton></article><article><Film size={24}/><h2>Bring it to the hall</h2><p>For a screening, an open rehearsal, a critique circle or a discussion, send the club a message on Instagram.</p><InkButton href={INSTAGRAM_URL}>Message on Instagram</InkButton></article></section>
  </section></SiteShell>;
}
