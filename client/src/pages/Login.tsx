/** Portail membre de Poiesis — double feuillet gothique, emblème, chouette et sceaux fournis ; la connexion reste locale. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { ASSETS } from "@/components/PoiesisUI";

export default function Login() {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    localStorage.setItem("poiesis-unlocked", "true");
    localStorage.setItem("poiesis-member-name", String(form.get("name") || "Member"));
    setMessage("Your member ledger is recognised. Opening the house…");
    window.setTimeout(() => setLocation("/home"), 560);
  };
  return <div className="login-page member-gate" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
    <img className="member-arch member-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-arch member-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <header className="member-topline"><Link href="/" className="member-back"><ArrowLeft size={14} />Portal</Link><span>Poiesis members’ ledger</span><Link href="/join" className="member-join-link">Request a seat <ArrowRight size={14} /></Link></header>
    <main className="member-stage">
      <aside className="member-welcome">
        <p className="member-eyebrow">Members’ entrance</p>
        <div className="member-emblem"><img src={ASSETS.portal} alt="Poiesis member emblem" /></div>
        <h1>Return to<br /><em>the house.</em></h1>
        <p className="member-intro">The member ledger opens the club’s programme, studios, proposals and shared rooms.</p>
        <div className="member-perks"><span>Open studios</span><span>Programme notes</span><span>Member proposals</span></div>
        <div className="member-crest"><ShieldCheck size={17} /><p>Your work, questions and practice have a place here.</p></div>
      </aside>
      <section className="member-ledger" aria-labelledby="sign-in-title">
        <img className="member-owl" src={ASSETS.owl} alt="" aria-hidden="true" />
        <img className="member-numberpad" src={ASSETS.numberPad} alt="" aria-hidden="true" />
        <div className="ledger-corners"><i /><i /><i /><i /></div>
        <p className="member-ledger__chapter">Ledger · 01</p>
        <h2 id="sign-in-title">Sign in</h2>
        <p className="member-ledger__text">Use the details associated with your Poiesis membership.</p>
        <form onSubmit={login} className="member-form">
          <label><span><Mail size={14} />Member email or name</span><input name="name" required placeholder="name@email.com" autoComplete="username" /></label>
          <label><span><LockKeyhole size={14} />Password</span><input name="password" required type="password" placeholder="Your password" autoComplete="current-password" /></label>
          <div className="member-form__options"><label className="member-remember"><input type="checkbox" />Keep this ledger open</label><button type="button" onClick={() => setMessage("Password recovery will be connected when member accounts are activated.")}>Need access?</button></div>
          <button className="member-submit" type="submit">Enter the house <ArrowRight size={16} /></button>
        </form>
        {message && <p className="member-message" role="status"><KeyRound size={14} />{message}</p>}
        <div className="member-seal-row"><button type="button" onClick={() => setMessage("This local demo recognises form completion only; connect member accounts for secure access.")}><img src={ASSETS.hintSeal} alt="" /><span>About access</span></button><Link href="/join"><img src={ASSETS.skipSeal} alt="" /><span>Not a member?</span></Link></div>
      </section>
    </main>
    <footer className="member-footnote">This page currently demonstrates a local sign-in flow only. Real authentication requires a connected account system.</footer>
  </div>;
}
