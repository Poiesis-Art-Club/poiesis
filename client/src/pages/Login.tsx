/** Portail membre Poiesis — authentification réelle via le fournisseur sécurisé du projet. */
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, KeyRound, LogIn, ShieldCheck } from "lucide-react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { ASSETS } from "@/components/PoiesisUI";

export default function Login() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  return <div className="login-page member-gate" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
    <img className="member-arch member-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-arch member-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <header className="member-topline"><Link href="/" className="member-back"><ArrowLeft size={14} />Portal</Link><span>Poiesis members’ ledger</span><Link href="/join" className="member-join-link">Request a seat <ArrowRight size={14} /></Link></header>
    <main className="member-stage"><aside className="member-welcome"><p className="member-eyebrow">Members’ entrance</p><div className="member-emblem"><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo" /></div><h1>Return to<br /><em>the house.</em></h1><p className="member-intro">Your member space holds the private Echo archive. Dates, invitations and registration continue on Instagram.</p><div className="member-perks"><span>Private Echoes</span><span>Member practice</span><span>Instagram updates</span></div><div className="member-crest"><ShieldCheck size={17}/><p>Your work, questions and practice have a place here.</p></div></aside>
      <section className="member-ledger" aria-labelledby="sign-in-title"><img className="member-owl" src={ASSETS.owl} alt="" aria-hidden="true"/><img className="member-numberpad" src={ASSETS.numberPad} alt="" aria-hidden="true"/><div className="ledger-corners"><i/><i/><i/><i/></div><p className="member-ledger__chapter">Ledger · 01</p><h2 id="sign-in-title">{isAuthenticated ? "Your ledger" : "Sign in"}</h2>{loading ? <p className="member-ledger__text">Checking your member ledger…</p> : isAuthenticated ? <><p className="member-ledger__text">Welcome back, <strong>{user?.name || user?.email || "member"}</strong>. Your authenticated session gives you access to the Echo archive.</p><Link href="/echoes" className="member-submit">Open Echoes <ArrowRight size={16}/></Link><button className="member-secondary" onClick={() => logout()}>Sign out</button></> : <><p className="member-ledger__text">Use the secure member sign-in to access the private Echo archive and publish your work.</p><button className="member-submit" onClick={() => startLogin()}>Continue securely <LogIn size={16}/></button><p className="member-access-note"><KeyRound size={14}/>Poiesis does not collect or store a password in this site.</p></>}<div className="member-seal-row"><Link href="/echoes"><img src={ASSETS.hintSeal} alt=""/><span>About Echoes</span></Link><Link href="/join"><img src={ASSETS.skipSeal} alt=""/><span>Not a member?</span></Link></div></section>
    </main><footer className="member-footnote">Secure sign-in is handled by the project’s member system. Instagram remains the club desk for registration and announcements.</footer>
  </div>;
}
