/** Studios Poiesis — générateur d’impulsions et répertoire concret de pratiques à croiser. */
import { useState } from "react";
import { Aperture, Box, ChefHat, Clapperboard, Dices, Drum, Hammer, Layers3, MessageCircleMore, Music2, Palette, Printer, Sparkles, Theater, WandSparkles } from "lucide-react";
import { InkButton, INSTAGRAM_URL, SiteShell } from "@/components/PoiesisUI";

const practices = ["Ceramics / sculpture", "Photography", "Film / montage", "Music / sound", "Dance / movement", "Drawing / painting", "Print / bookmaking", "Costume / textiles", "Digital / 3D", "Design / objects", "Food and cultural memory", "Architecture / space"];
const startingPoints = ["Start from a material you found this week", "Record the sound of a familiar room", "Turn one photograph into an object", "Make a small edition that can be exchanged", "Research a local craft technique and try one gesture", "Build a five-minute performance from an everyday task", "Cook or map a memory connected to place and culture", "Make a poster for an imaginary screening or concert", "Create a colour study from a street, fabric or market", "Repair, alter or transform a discarded object"];
const invitations = ["Invite someone from another medium to answer", "Show the process, not only the result", "Bring one material or tool to the open studio", "Make a version that can fit in a pocket", "Document the piece in three images or thirty seconds", "Ask a collaborator to change one decision", "Write a caption that explains the context, not the outcome", "Propose it as a workshop for the next gathering"];
const choose = (list: string[]) => list[Math.floor(Math.random() * list.length)];
const studioIdeas = [
  { icon: Hammer, title: "Matter table", text: "Clay, plaster, wire, found objects, paper pulp and small repairs." },
  { icon: Aperture, title: "Image walk", text: "A shared photo route, contact sheet exchange or one-minute documentary." },
  { icon: Drum, title: "Sound room", text: "Field recording, listening session, score, beat-making or oral history." },
  { icon: Theater, title: "Body & stage", text: "Movement scores, costume tests, rehearsals and small performances." },
  { icon: Printer, title: "Print & publish", text: "Zines, posters, risograph experiments, artist books and archives." },
  { icon: Layers3, title: "Digital atelier", text: "3D forms, animation, game scenes, projections and interactive pieces." },
  { icon: ChefHat, title: "Culture at the table", text: "Recipes, rituals, craft histories and food as a shared research material." },
  { icon: Clapperboard, title: "Screening club", text: "Short films, music videos, documentaries and post-screening conversations." },
];

export default function Create() {
  const [studioInvitation, setStudioInvitation] = useState<{ practice: string; start: string; invitation: string } | null>(null);
  const drawInvitation = () => setStudioInvitation({ practice: choose(practices), start: choose(startingPoints), invitation: choose(invitations) });
  return <SiteShell><section className="studio-page"><header className="studio-header"><p className="folio-label">The studios</p><h1>Make in your medium.<br /><em>Meet another.</em></h1><p>Poiesis is a practical space for objects, images, sound, movement, craft, publishing, culture and digital work. Bring a tool, a draft, a material or a skill to share.</p></header>
    <section className="studio-wheel"><div className="studio-wheel__copy"><Sparkles size={20}/><p className="folio-label">A creative invitation</p><h2>Choose a practice,<br />a next step.</h2><p>Reveal a creative invitation when you want a concrete way into the work.</p><button className="draw-invitation" onClick={drawInvitation}><Dices size={18}/>{studioInvitation ? "Choose another invitation" : "Reveal an invitation"}</button></div><div className="studio-cards">{studioInvitation ? <><article><p>Medium</p><strong>{studioInvitation.practice}</strong></article><article><p>First move</p><strong>{studioInvitation.start}</strong></article><article><p>Invitation</p><strong>{studioInvitation.invitation}</strong></article></> : <><article><p>Medium</p><strong>Any medium</strong></article><article><p>First move</p><strong>One material</strong></article><article><p>Invitation</p><strong>One collaboration</strong></article></>}</div></section>
    <section className="studio-ideas"><div className="studio-ideas__heading"><p className="folio-label">Ways to use the house</p><h2>More than one kind<br />of studio.</h2><p>These are invitations, not fixed departments. Mix them, reshape them, or bring an idea we have not named yet.</p></div><div className="studio-ideas__grid">{studioIdeas.map(({ icon: Icon, title, text }) => <article key={title}><Icon size={21}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="studio-doors"><article><Box size={24}/><h2>Open a work</h2><p>Share an image, a link, a score, a film note, a fragment, a proposal or a question for the other members.</p><InkButton href="/echoes" tone="ink">Share in Echoes</InkButton></article><article><MessageCircleMore size={24}/><h2>Respond to a work</h2><p>Meet another member’s contribution and offer a useful response from your own practice or point of view.</p><InkButton href="/echoes">Open Echoes</InkButton></article><article><WandSparkles size={24}/><h2>Start a session</h2><p>For a material table, workshop, screening, sound session or collaboration, send the club a message on Instagram.</p><InkButton href={INSTAGRAM_URL}>Message on Instagram</InkButton></article></section>
  </section></SiteShell>;
}
