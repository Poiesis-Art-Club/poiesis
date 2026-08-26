/** Espace Échos — publication et réponses réservées aux membres connectés, sans contenu de démonstration fictif. */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, BookOpenCheck, Loader2, LogIn, MessageCircleMore, Plus, Send, Sparkles } from "lucide-react";
import { startLogin } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";
import { trpc } from "@/lib/trpc";

const practices = ["Sculpture / visual art", "Photography / film", "Music / sound", "Dance / performance", "Writing / publishing", "Culture / philosophy", "Design / digital / craft"];

export default function Echoes() {
  const { user, loading, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [title, setTitle] = useState("");
  const [practice, setPractice] = useState(practices[0]);
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [activeEchoId, setActiveEchoId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const echoes = trpc.echoes.list.useQuery(undefined, { enabled: isAuthenticated });
  const comments = trpc.echoes.comments.useQuery({ echoId: activeEchoId ?? 0 }, { enabled: isAuthenticated && activeEchoId !== null });
  const createEcho = trpc.echoes.create.useMutation({
    onSuccess: async () => { setTitle(""); setDescription(""); setExternalUrl(""); await utils.echoes.list.invalidate(); },
  });
  const addComment = trpc.echoes.addComment.useMutation({
    onSuccess: async () => { setComment(""); await utils.echoes.comments.invalidate(); },
  });

  if (loading) return <SiteShell><section className="echo-loading"><Loader2 size={28} /><p>Opening the members’ archive…</p></section></SiteShell>;
  if (!isAuthenticated) return <SiteShell><section className="echo-guest" style={{ backgroundImage: `url(${ASSETS.parchment})` }}><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo" /><p className="folio-label">The member archive</p><h1>Echoes belong<br />to the members.</h1><p>Sign in to share a work, a proposition or a cultural question — and to leave thoughtful responses for the other members.</p><button className="member-submit echo-login" onClick={() => startLogin()}>Sign in to enter <LogIn size={16} /></button><Link href="/join" className="echo-guest-link">Not a member yet? Write to Poiesis on Instagram ↗</Link></section></SiteShell>;

  return <SiteShell><section className="echo-archive">
    <header className="echo-header"><div><p className="folio-label">The member archive</p><h1>Echoes from<br />the house.</h1><p>Share a work in progress, an external link, an invitation or a question. The archive is visible to Poiesis members only.</p></div><div className="echo-member-chip"><Sparkles size={16}/><span>Signed in as<br /><strong>{user?.name || user?.email || "Poiesis member"}</strong></span></div></header>
    <section className="echo-compose"><div><p className="folio-label">Add an Echo</p><h2>Put a practice<br />into the room.</h2><p>A post can be an artwork, a link, a score, a proposal or a question for discussion.</p></div><form onSubmit={(event) => { event.preventDefault(); createEcho.mutate({ title, practice, description, externalUrl: externalUrl || undefined }); }}><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} required minLength={2} maxLength={180} placeholder="Give the work or idea a title" /></label><label>Practice<select value={practice} onChange={(event) => setPractice(event.target.value)}>{practices.map((item) => <option key={item}>{item}</option>)}</select></label><label>Text, proposal or context<textarea value={description} onChange={(event) => setDescription(event.target.value)} required minLength={10} maxLength={5000} rows={5} placeholder="Describe what you are sharing or asking." /></label><label>External link <span className="field-optional">optional</span><input value={externalUrl} onChange={(event) => setExternalUrl(event.target.value)} type="url" placeholder="https://…" /></label><button className="member-submit" type="submit" disabled={createEcho.isPending}>{createEcho.isPending ? "Placing your Echo…" : <>Publish to Echoes <Send size={16}/></>}</button>{createEcho.error && <p className="form-error">{createEcho.error.message}</p>}</form></section>
    <section className="echo-list"><div className="echo-list-title"><BookOpenCheck size={20}/><h2>Recent contributions</h2></div>{echoes.isLoading ? <p className="echo-state"><Loader2 size={19}/>Opening the archive…</p> : echoes.error ? <p className="echo-state echo-state--error">{echoes.error.message}</p> : echoes.data?.length === 0 ? <div className="echo-empty"><Plus size={23}/><h3>The archive is waiting.</h3><p>No member contribution has been published yet. The first Echo can be a work, a proposal or a question.</p></div> : <div className="echo-grid">{echoes.data?.map((echo) => <article className="echo-entry" key={echo.id}><p>{echo.practice}</p><h3>{echo.title}</h3><span>{echo.description}</span>{echo.externalUrl && <a href={echo.externalUrl} target="_blank" rel="noreferrer">Open linked work <ArrowUpRight size={14}/></a>}<footer><button onClick={() => setActiveEchoId(activeEchoId === echo.id ? null : echo.id)}><MessageCircleMore size={15}/>Responses</button><time>{new Date(echo.createdAt).toLocaleDateString()}</time></footer>{activeEchoId === echo.id && <div className="echo-comments"><div>{comments.isLoading ? <p>Opening responses…</p> : comments.data?.length ? comments.data.map((entry) => <p key={entry.id}>{entry.content}</p>) : <p>No response yet. Leave the first careful reading.</p>}</div><form onSubmit={(event) => { event.preventDefault(); addComment.mutate({ echoId: echo.id, content: comment }); }}><textarea value={comment} onChange={(event) => setComment(event.target.value)} minLength={2} maxLength={2000} required rows={3} placeholder="Write a response to the work, not the person."/><button type="submit" disabled={addComment.isPending}>Add response</button></form></div>}</article>)}</div>}</section>
  </section></SiteShell>;
}
