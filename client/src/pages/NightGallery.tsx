/** Manuscrit de Minuit — galerie crépusculaire, contraste lapis-or et invitation aux œuvres non finies. */
import { MoonStar } from "lucide-react";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

export default function NightGallery() {
  return <SiteShell><section className="night-gallery-page" style={{ backgroundImage: `url(${ASSETS.gallery})` }}><div className="gallery-veil" /><div className="night-gallery-copy"><p className="section-tag"><span />The doors after nine</p><h1>The gallery<br /><em>sleeps</em> softly.</h1><p>Here, the half-seen receives more care than the finished. A collection of nocturnal prompts, odd fragments and work still finding its shape.</p><InkButton href="/create" tone="ghost">Leave a nocturnal work</InkButton></div><div className="gallery-plaque"><MoonStar size={18} /><span>Night Gallery<br />Open while the lamps are low</span></div><div className="gallery-strip"><article><span>01</span><h2>Nocturnal prompts</h2><p>A line of light, a moth at the threshold, the feeling of returning too late.</p></article><article><span>02</span><h2>Unfinished works</h2><p>Fragments allowed to remain tender, strange and unresolved.</p></article></div></section></SiteShell>;
}
