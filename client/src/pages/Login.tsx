/** Portail membre Poiesis — inscription e-mail + mot de passe et connexion Google via Supabase. */
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  KeyRound,
  LockKeyhole,
  LogIn,
  Mail,
  ShieldCheck,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { memberGoogleAuthOptions } from "@/lib/memberAuth";
import { ASSETS } from "@/components/PoiesisUI";

type Mode = "sign-in" | "sign-up";

export default function Login() {
  const [mode, setMode] = useState<Mode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSignedIn(Boolean(data.session)));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedIn(Boolean(session));
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (mode === "sign-up" && password !== confirmation) {
      setError("The two passwords do not match.");
      return;
    }

    setBusy(true);
    if (mode === "sign-in") {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) setError(authError.message);
      else setMessage("Your member session is open. You can now enter Echoes.");
    } else {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/email-confirmed` },
      });
      if (authError) setError(authError.message);
      else if (data.session) setMessage("Your member session is open. Welcome to Poiesis.");
      else setMessage("Your account is created. Confirm your email once, then return with this password whenever you like.");
    }
    setBusy(false);
  };

  const signInWithGoogle = async () => {
    setError("");
    setMessage("");
    setBusy(true);
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: memberGoogleAuthOptions(window.location.origin),
    });
    if (authError) setError(authError.message);
    else setMessage("Opening Google’s secure sign-in…");
    setBusy(false);
  };

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (newPassword.length < 8) {
      setError("Choose at least 8 characters for your password.");
      return;
    }

    setBusy(true);
    const { error: authError } = await supabase.auth.updateUser({ password: newPassword });
    setBusy(false);
    if (authError) setError(authError.message);
    else {
      setNewPassword("");
      setMessage("Password saved. You can return with your email and password next time.");
    }
  };

  return (
    <div className="login-page member-gate" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
      <img className="member-arch member-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="member-arch member-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
      <img className="member-vine member-vine--left" src={ASSETS.birdvine} alt="" aria-hidden="true" />
      <img className="member-vine member-vine--right" src={ASSETS.birdvine} alt="" aria-hidden="true" />

      <header className="member-topline">
        <Link href="/" className="member-back"><ArrowLeft size={14} />Portal</Link>
        <span>Poiesis members’ ledger</span>
        <Link href="/join" className="member-join-link">Request a seat <ArrowRight size={14} /></Link>
      </header>

      <main className="member-stage">
        <aside className="member-welcome">
          <p className="member-eyebrow">Members’ entrance</p>
          <div className="member-emblem"><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo" /></div>
          <h1>Return to<br /><em>the house.</em></h1>
          <p className="member-intro">Your member space holds the private Echo archive. Use your e-mail and password to come back whenever you wish.</p>
          <div className="member-perks"><span>Private Echoes</span><span>Saved session</span><span>Member practice</span></div>
          <div className="member-crest"><ShieldCheck size={17} /><p>Your work, questions and practice have a place here.</p></div>
        </aside>

        <section className="member-ledger" aria-labelledby="sign-in-title">
          <img className="member-owl" src={ASSETS.owl} alt="" aria-hidden="true" />
          <img className="member-numberpad" src={ASSETS.numberPad} alt="" aria-hidden="true" />
          <div className="ledger-corners"><i /><i /><i /><i /></div>
          <p className="member-ledger__chapter">Ledger · 01</p>
          <h2 id="sign-in-title">{signedIn ? "Your ledger" : mode === "sign-in" ? "Sign in" : "Join Poiesis"}</h2>

          {signedIn ? (
            <>
              <p className="member-ledger__text">Your secure member session is active. Set a password now if you previously joined with a magic link, or open the archive.</p>
              <Link href="/echoes" className="member-submit">Open Echoes <ArrowRight size={16} /></Link>
              <form className="member-password-set" onSubmit={savePassword}>
                <label>
                  <span><LockKeyhole size={14} />Set or change password</span>
                  <input value={newPassword} onChange={(event) => setNewPassword(event.target.value)} type="password" minLength={8} required placeholder="At least 8 characters" autoComplete="new-password" />
                </label>
                <button type="submit" disabled={busy}>{busy ? "Saving…" : "Save password"}</button>
              </form>
            </>
          ) : (
            <>
              <div className="member-auth-tabs">
                <button className={mode === "sign-in" ? "is-active" : ""} onClick={() => { setMode("sign-in"); setError(""); setMessage(""); }}>Sign in</button>
                <button className={mode === "sign-up" ? "is-active" : ""} onClick={() => { setMode("sign-up"); setError(""); setMessage(""); }}>Create account</button>
              </div>
              <p className="member-ledger__text">
                {mode === "sign-in"
                  ? "Use your member email and password. Your session stays on this device until you sign out."
                  : "Create a member account with your email and a password. Email confirmation is needed only once."}
              </p>

              <button className="member-oauth" type="button" onClick={signInWithGoogle} disabled={busy}>
                <span className="member-oauth__mark" aria-hidden="true"><img src={ASSETS.officialLogo} alt="" /></span>
                {busy ? "Opening the secure gate…" : "Continue with Google"}
              </button>
              <p className="member-oauth__note">Google verifies the e-mail with Google first, so no Supabase confirmation message is needed for this route.</p>
              <div className="member-divider" aria-hidden="true"><span>or use a password</span></div>

              <form onSubmit={submit} className="member-form">
                <label>
                  <span><Mail size={14} />Member email</span>
                  <input value={email} onChange={(event) => setEmail(event.target.value)} required type="email" placeholder="name@email.com" autoComplete="email" />
                </label>
                <label>
                  <span><LockKeyhole size={14} />Password</span>
                  <input value={password} onChange={(event) => setPassword(event.target.value)} required type="password" minLength={8} placeholder="At least 8 characters" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} />
                </label>
                {mode === "sign-up" && (
                  <label>
                    <span><KeyRound size={14} />Repeat password</span>
                    <input value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required type="password" minLength={8} placeholder="Repeat your password" autoComplete="new-password" />
                  </label>
                )}
                <button className="member-submit" type="submit" disabled={busy}>
                  {busy ? "Opening the ledger…" : mode === "sign-in" ? <>Sign in <LogIn size={16} /></> : <>Create member account <UserPlus size={16} /></>}
                </button>
              </form>

              {message && <p className="member-message" role="status"><CheckCircle2 size={14} />{message}</p>}
              {error && <p className="member-message member-message--error" role="alert"><CircleAlert size={14} />{error}</p>}
              <p className="member-access-note"><KeyRound size={14} />Passwords are protected by Supabase Auth and are never stored in this website.</p>
            </>
          )}

          <div className="member-seal-row">
            <Link href="/echoes"><img src={ASSETS.hintSeal} alt="" /><span>About Echoes</span></Link>
            <Link href="/join"><img src={ASSETS.skipSeal} alt="" /><span>Not a member?</span></Link>
          </div>
        </section>
      </main>
      <footer className="member-footnote">Member access is managed by Supabase. Instagram remains the club desk for registration and announcements.</footer>
    </div>
  );
}
