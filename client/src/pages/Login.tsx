/** Portail membre Poiesis — inscription et connexion par lien magique Supabase. */
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, CheckCircle2, KeyRound, LogIn, Mail, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ASSETS } from "@/components/PoiesisUI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/echoes` },
    });
    setSending(false);
    setMessage(error ? error.message : "Your secure link is on its way. Open it from your inbox to enter Echoes.");
  };

  return <div className="login-page member-gate" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
    <img className="member-arch member-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-arch member-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <img className="member-vine member-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <header className="member-topline"><Link href="/" className="member-back"><ArrowLeft size={14} />Portal</Link><span>Poiesis members’ ledger</span><Link href="/join" className="member-join-link">Request a seat <ArrowRight size={14} /></Link></header>
    <main className="member-stage"><aside className="member-welcome"><p className="member-eyebrow">Members’ entrance</p><div className="member-emblem"><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo" /></div><h1>Return to<br /><em>the house.</em></h1><p className="member-intro">Your member space holds the private Echo archive. Dates, invitations and registration continue on Instagram.</p><div className="member-perks"><span>Private Echoes</span><span>Member practice</span><span>Instagram updates</span></div><div className="member-crest"><ShieldCheck size={17}/><p>Your work, questions and practice have a place here.</p></div></aside>
      <section className="member-ledger" aria-labelledby="sign-in-title"><img className="member-owl" src={ASSETS.owl} alt="" aria-hidden="true"/><img className="member-numberpad" src={ASSETS.numberPad} alt="" aria-hidden="true"/><div className="ledger-corners"><i/><i/><i/><i/></div><p className="member-ledger__chapter">Ledger · 01</p><h2 id="sign-in-title">{signedIn ? "Your ledger" : "Sign in"}</h2>{signedIn ? <><p className="member-ledger__text">Your secure member session is active. You can now enter the private Echo archive.</p><Link href="/echoes" className="member-submit">Open Echoes <ArrowRight size={16}/></Link></> : <><p className="member-ledger__text">Enter your email to receive a one-time secure link. New members are registered automatically after following the link.</p><form onSubmit={submit} className="member-form"><label><span><Mail size={14}/>Member email</span><input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="name@email.com" autoComplete="email" /></label><button className="member-submit" type="submit" disabled={sending}>{sending ? "Sending secure link…" : <>Send secure link <LogIn size={16}/></>}</button></form>{message && <p className="member-message" role="status"><CheckCircle2 size={14}/>{message}</p>}<p className="member-access-note"><KeyRound size={14}/>Poiesis never stores a password. This secure link creates or resumes your member account.</p></>}<div className="member-seal-row"><Link href="/echoes"><img src={ASSETS.hintSeal} alt=""/><span>About Echoes</span></Link><Link href="/join"><img src={ASSETS.skipSeal} alt=""/><span>Not a member?</span></Link></div></section>
    </main><footer className="member-footnote">Secure access is managed by Supabase. Instagram remains the club desk for registration and announcements.</footer>
  </div>;
}
