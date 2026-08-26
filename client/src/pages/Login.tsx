/** Manuscrit de Minuit — connexion locale mise en scène comme une lettre de guilde, sans authentification distante simulée. */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, KeyRound } from "lucide-react";
import { ASSETS, InkButton } from "@/components/PoiesisUI";

export default function Login() {
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    localStorage.setItem("poiesis-unlocked", "true");
    localStorage.setItem("poiesis-member-name", String(form.get("name") || "Guild member"));
    setMessage("Your letter has been recognised. Opening the guildhall…");
    window.setTimeout(() => setLocation("/home"), 520);
  };
  return <div className="login-page" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
    <img className="login-arch login-arch--left" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="login-arch login-arch--right" src={ASSETS.archways} alt="" aria-hidden="true" />
    <img className="login-vine" src={ASSETS.birdvine} alt="" aria-hidden="true" />
    <main className="login-sheet">
      <Link href="/" className="login-back"><ArrowLeft size={14} />Return to the threshold</Link>
      <img className="login-owl" src={ASSETS.owl} alt="" aria-hidden="true" />
      <p className="login-kicker">The Guildhall</p>
      <h1>Welcome back,<br /><em>maker.</em></h1>
      <p className="login-lede">Sign the margin to resume your place at the table. This is a local prototype; no password is transmitted or stored remotely.</p>
      <form onSubmit={login} className="login-form">
        <label>Guild name or email<input name="name" required placeholder="Your name or email" autoComplete="username" /></label>
        <label>Password<input name="password" required type="password" placeholder="Your password" autoComplete="current-password" /></label>
        <div className="login-options"><label className="remember"><input type="checkbox" />Remember this letter</label><button type="button" onClick={() => setMessage("Password recovery will be available when member accounts are connected.")}>Forgot the word?</button></div>
        <InkButton type="submit">Enter the Guildhall</InkButton>
      </form>
      {message && <p className="login-message" role="status"><KeyRound size={14} />{message}</p>}
      <p className="login-footnote">Not yet a member? <Link href="/join">Find your way into the guild ↗</Link></p>
    </main>
  </div>;
}
