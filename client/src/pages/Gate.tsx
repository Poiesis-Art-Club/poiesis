/** Manuscrit de Minuit — portail gothique de référence : parchemin, arcades, végétal et mot de passe rituel. */
import { useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, KeyRound } from "lucide-react";
import { ASSETS } from "@/components/PoiesisUI";

const OWNER_PAPER_TEXTURE = "/manus-storage/poiesis-owner-paper-texture_d7c7e5bf.png";
const GOTHIC_LETTER_FRAME = "/manus-storage/poiesis-gothic-code-frame-clean_dee7cba1.png";
const POIESIS_WORDMARK = "/manus-storage/poiesis-wordmark-owner_76e2dcf5.png";

export default function Gate() {
  const [, setLocation] = useLocation();
  const [runes, setRunes] = useState(Array(7).fill(""));
  const [notice, setNotice] = useState("Enter the name of the guild to cross the threshold.");
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const enter = () => {
    localStorage.setItem("poiesis-unlocked", "true");
    setLocation("/home");
  };
  const updateRune = (index: number, value: string) => {
    const next = [...runes];
    next[index] = value.slice(-1).toUpperCase();
    setRunes(next);
    if (value && index < 6) inputs.current[index + 1]?.focus();
  };
  const checkRunes = () => {
    if (runes.join("") === "POIESIS") enter();
    else setNotice("The glyphs do not align. The word is POIESIS.");
  };
  return (
    <div className="gate-page gate-page--portal" style={{ backgroundImage: `linear-gradient(rgba(239, 219, 184, .6), rgba(188, 139, 95, .2)), url(${OWNER_PAPER_TEXTURE})` }}>
      <div className="portal-paper-grain" />
      <img className="portal-arch portal-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="portal-arch portal-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="portal-vine portal-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
      <img className="portal-vine portal-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />
      <section className="portal-centre" aria-labelledby="portal-title">
        <p className="portal-kicker">An illuminated manuscript for the living</p>
        <h1 id="portal-title" className="portal-title"><span className="sr-only">Poiesis</span><img src={POIESIS_WORDMARK} alt="Poiesis" /></h1>
        <p className="portal-instruction">Name the guild to open the hall.</p>
        <div className="rune-frame"><div className="rune-row" aria-label="Seven-letter guild word">
          {runes.map((rune, index) => <div className="rune-slot" key={index}><img className="rune-slot__frame" src={GOTHIC_LETTER_FRAME} alt="" aria-hidden="true" /><input ref={(node) => { inputs.current[index] = node; }} className="rune-input" value={rune} onChange={(event) => updateRune(index, event.target.value)} onKeyDown={(event) => { if (event.key === "Backspace" && !runes[index] && index > 0) inputs.current[index - 1]?.focus(); if (event.key === "Enter") checkRunes(); }} inputMode="text" maxLength={1} aria-label={`Letter ${index + 1} of POIESIS`} /></div>)}
        </div></div>
        <p className="portal-notice" role="status">{notice}</p>
        <button className="portal-enter" onClick={checkRunes}>Open the guildhall <ArrowRight size={15} /></button>
        <div className="portal-actions portal-actions--inline">
          <button className="portal-seal-action portal-seal-action--hint" onClick={() => setNotice("The word is POIESIS — seven letters, one threshold.")}><img src={ASSETS.hintSeal} alt="" /><span>Hint</span></button>
          <button className="portal-seal-action" onClick={enter}><img src={ASSETS.skipSeal} alt="" /><span>Skip the word</span></button>
        </div>
      </section>
      <Link href="/login" className="portal-login"><KeyRound size={14} />Already a member? Log in</Link>
    </div>
  );
}
