/** Le Cloître des pratiques — salle tardive pour projections, écoutes, lectures et présentations en toute discipline. */
import { MoonStar } from "lucide-react";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

export default function NightGallery() {
  return <SiteShell><section className="night-gallery-page" style={{ backgroundImage: `url(${ASSETS.gallery})` }}><div className="gallery-veil" /><div className="night-gallery-copy"><p className="section-tag"><span />The doors after nine</p><h1>Late viewings.<br /><em>Open ears.</em></h1><p>The Night Gallery is a quieter room for projection, listening, reading, performance notes and work that benefits from a slower conversation.</p><InkButton href="/create" tone="ghost">Bring work to the studios</InkButton></div><div className="gallery-plaque"><MoonStar size={18} /><span>Night Gallery<br />For looking, listening and discussing</span></div><div className="gallery-strip"><article><span>01</span><h2>Viewings & listenings</h2><p>Short films, image sequences, sound work, documentation and selected material from the houses.</p></article><article><span>02</span><h2>Late conversations</h2><p>Small discussions around culture, ideas, performance and work still taking shape.</p></article></div></section></SiteShell>;
}
