/** Retour du lien magique Supabase : confirme la session et donne une sortie claire vers l’archive Échos. */
import "./email-confirmed.css";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, CircleAlert, Loader2, MailCheck } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ASSETS, SiteShell } from "@/components/PoiesisUI";

type Status = "checking" | "confirmed" | "error";

export default function EmailConfirmed() {
  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState("Confirming your member ledger…");
  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const errorDescription = fragment.get("error_description");
    if (errorDescription) { setStatus("error"); setMessage(errorDescription); return; }
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) { setStatus("error"); setMessage(error.message); return; }
      if (data.session) { setStatus("confirmed"); setMessage("Your email is confirmed and your member session is open."); }
      else { setStatus("error"); setMessage("This link did not create a session. Request a new secure link from the member portal."); }
    };
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) { setStatus("confirmed"); setMessage("Your email is confirmed and your member session is open."); }
    });
    void checkSession();
    return () => listener.subscription.unsubscribe();
  }, []);
  const icon = status === "checking" ? <Loader2 size={34}/> : status === "confirmed" ? <CheckCircle2 size={36}/> : <CircleAlert size={36}/>;
  return <SiteShell><section className="email-confirmed-page" style={{ backgroundImage: `url(${ASSETS.parchment})` }}><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo"/><div className={`email-confirmed-card email-confirmed-card--${status}`}><div className="email-confirmed-icon">{icon}</div><p className="folio-label">Members’ ledger</p><h1>{status === "confirmed" ? "Email confirmed." : status === "checking" ? "Opening your ledger…" : "The link needs care."}</h1><p>{message}</p>{status === "confirmed" ? <Link href="/echoes" className="member-submit">Enter Echoes <ArrowRight size={16}/></Link> : status === "error" ? <Link href="/login" className="member-submit">Request a new link <MailCheck size={16}/></Link> : null}</div></section></SiteShell>;
}
