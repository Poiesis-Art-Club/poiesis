/** Archive Échos — publication et commentaires privés via Supabase, sans contenu fictif. */
import { FormEvent, useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, BookOpenCheck, CheckCircle2, Loader2, LogIn, MessageCircleMore, Plus, Send, Sparkles } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

type Echo = { id: string; author_id: string; title: string; practice: string; description: string; external_url: string | null; created_at: string };
type EchoComment = { id: string; echo_id: string; author_id: string; content: string; created_at: string };
const practices = ["Sculpture / visual art", "Photography / film", "Music / sound", "Dance / performance", "Writing / publishing", "Culture / philosophy", "Design / digital / craft"];

export default function Echoes() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [echoes, setEchoes] = useState<Echo[]>([]);
  const [archiveError, setArchiveError] = useState("");
  const [title, setTitle] = useState("");
  const [practice, setPractice] = useState(practices[0]);
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [posting, setPosting] = useState(false);
  const [activeEchoId, setActiveEchoId] = useState<string | null>(null);
  const [comments, setComments] = useState<EchoComment[]>([]);
  const [comment, setComment] = useState("");
  const [responding, setResponding] = useState(false);

  const loadEchoes = async () => {
    const { data, error } = await supabase.from("echoes").select("id, author_id, title, practice, description, external_url, created_at").order("created_at", { ascending: false });
    if (error) setArchiveError(error.message); else { setEchoes(data as Echo[]); setArchiveError(""); }
  };
  const loadComments = async (echoId: string) => {
    const { data, error } = await supabase.from("echo_comments").select("id, echo_id, author_id, content, created_at").eq("echo_id", echoId).order("created_at", { ascending: false });
    if (!error) setComments(data as EchoComment[]);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener.subscription.unsubscribe();
  }, []);
  useEffect(() => { if (session) void loadEchoes(); }, [session]);
  useEffect(() => {
    if (!session) return;
    const displayName = session.user.email?.split("@")[0] || "Poiesis member";
    void supabase.from("profiles").upsert({ id: session.user.id, display_name: displayName }, { onConflict: "id" });
  }, [session]);

  const publish = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;
    setPosting(true); setArchiveError("");
    const { error } = await supabase.from("echoes").insert({ author_id: session.user.id, title, practice, description, external_url: externalUrl || null });
    setPosting(false);
    if (error) { setArchiveError(error.message); return; }
    setTitle(""); setDescription(""); setExternalUrl(""); await loadEchoes();
  };
  const submitComment = async (event: FormEvent<HTMLFormElement>, echoId: string) => {
    event.preventDefault(); if (!session) return;
    setResponding(true); setArchiveError("");
    const { error } = await supabase.from("echo_comments").insert({ echo_id: echoId, author_id: session.user.id, content: comment });
    setResponding(false); if (error) { setArchiveError(error.message); return; }
    setComment(""); await loadComments(echoId);
  };
  const openComments = async (echoId: string) => { const next = activeEchoId === echoId ? null : echoId; setActiveEchoId(next); if (next) await loadComments(next); };

  if (loading) return <SiteShell><section className="echo-loading"><Loader2 size={28}/><p>Opening the members’ archive…</p></section></SiteShell>;
  if (!session) return <SiteShell><section className="echo-guest" style={{ backgroundImage: `url(${ASSETS.parchment})` }}><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo"/><p className="folio-label">The member archive</p><h1>Echoes belong<br/>to the members.</h1><p>Sign in to share a work, a proposition or a cultural question — and to leave thoughtful responses for the other members.</p><Link href="/login" className="member-submit echo-login">Sign in to enter <LogIn size={16}/></Link><Link href="/join" className="echo-guest-link">Not a member yet? Write to Poiesis on Instagram ↗</Link></section></SiteShell>;
  return <SiteShell><section className="echo-archive"><header className="echo-header"><div><p className="folio-label">The member archive</p><h1>Echoes from<br/>the house.</h1><p>Share a work in progress, an external link, an invitation or a question. The archive is visible to Poiesis members only.</p></div><div className="echo-member-chip"><Sparkles size={16}/><span>Signed in as<br/><strong>{session.user.email || "Poiesis member"}</strong></span></div></header>
    <section className="echo-compose"><div><p className="folio-label">Add an Echo</p><h2>Put a practice<br/>into the room.</h2><p>A post can be an artwork, a link, a score, a proposal or a question for discussion.</p></div><form onSubmit={publish}><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} required minLength={2} maxLength={180} placeholder="Give the work or idea a title"/></label><label>Practice<select value={practice} onChange={(event) => setPractice(event.target.value)}>{practices.map((item) => <option key={item}>{item}</option>)}</select></label><label>Text, proposal or context<textarea value={description} onChange={(event) => setDescription(event.target.value)} required minLength={10} maxLength={5000} rows={5} placeholder="Describe what you are sharing or asking."/></label><label>External link <span className="field-optional">optional</span><input value={externalUrl} onChange={(event) => setExternalUrl(event.target.value)} type="url" placeholder="https://…"/></label><button className="member-submit" type="submit" disabled={posting}>{posting ? "Placing your Echo…" : <>Publish to Echoes <Send size={16}/></>}</button></form></section>
    <section className="echo-list"><div className="echo-list-title"><BookOpenCheck size={20}/><h2>Recent contributions</h2></div>{archiveError && <p className="echo-state echo-state--error">{archiveError}</p>}{echoes.length === 0 ? <div className="echo-empty"><Plus size={23}/><h3>The archive is waiting.</h3><p>No member contribution has been published yet. The first Echo can be a work, a proposal or a question.</p></div> : <div className="echo-grid">{echoes.map((echo) => <article className="echo-entry" key={echo.id}><p>{echo.practice}</p><h3>{echo.title}</h3><span>{echo.description}</span>{echo.external_url && <a href={echo.external_url} target="_blank" rel="noreferrer">Open linked work <ArrowUpRight size={14}/></a>}<footer><button onClick={() => void openComments(echo.id)}><MessageCircleMore size={15}/>Responses</button><time>{new Date(echo.created_at).toLocaleDateString()}</time></footer>{activeEchoId === echo.id && <div className="echo-comments"><div>{comments.length ? comments.map((entry) => <p key={entry.id}>{entry.content}</p>) : <p>No response yet. Leave the first careful reading.</p>}</div><form onSubmit={(event) => submitComment(event, echo.id)}><textarea value={comment} onChange={(event) => setComment(event.target.value)} minLength={2} maxLength={2000} required rows={3} placeholder="Write a response to the work, not the person."/><button type="submit" disabled={responding}>{responding ? "Adding…" : "Add response"}</button></form></div>}</article>)}</div>}</section>
  </section></SiteShell>;
}
