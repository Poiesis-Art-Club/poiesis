import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ImagePlus, Loader2, LogIn, MessageCircleMore, Send, Sparkles, X } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { toSafeExternalUrl } from "@/lib/externalUrl";
import { ASSETS, SiteShell } from "@/components/PoiesisUI";

type Post = { id:string; author_id:string; kind:"prompt"|"artwork"; title:string; practice:string; description:string; external_url:string|null; media_path:string|null; media_type:"image"|"video"|null; response_to_id:string|null; created_at:string; mediaUrl?:string|null; authorName?:string; responseTitle?:string|null };
type Comment = { id:string; echo_id:string; author_id:string; content:string; created_at:string; authorName?:string };
const practices=["Visual art / sculpture","Photography / film","Music / sound","Dance / performance","Writing / publishing","Culture / philosophy","Design / digital / craft"];
const displayDate=(value:string)=>new Date(value).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
const displayName=(email?:string|null)=>email?.split("@")[0]?.replace(/[._-]/g," ")||"Poiesis member";

export default function Echoes(){
 const [location]=useLocation(); const galleryOnly=location==="/gallery";
 const composerRef=useRef<HTMLElement|null>(null);
 const [session,setSession]=useState<Session|null>(null),[loading,setLoading]=useState(true),[posts,setPosts]=useState<Post[]>([]),[error,setError]=useState("");
 const [kind,setKind]=useState<"prompt"|"artwork">("artwork"),[title,setTitle]=useState(""),[practice,setPractice]=useState(practices[0]),[description,setDescription]=useState(""),[externalUrl,setExternalUrl]=useState(""),[responseToId,setResponseToId]=useState(""),[media,setMedia]=useState<File|null>(null),[posting,setPosting]=useState(false);
 const [active,setActive]=useState<string|null>(null),[comments,setComments]=useState<Comment[]>([]),[comment,setComment]=useState(""),[responding,setResponding]=useState(false);
 const preview=useMemo(()=>media?URL.createObjectURL(media):"",[media]); useEffect(()=>()=>{if(preview)URL.revokeObjectURL(preview)},[preview]);
 useEffect(()=>{supabase.auth.getSession().then(({data})=>{setSession(data.session);setLoading(false)});const {data:listener}=supabase.auth.onAuthStateChange((_e,s)=>setSession(s));return()=>listener.subscription.unsubscribe()},[]);
 useEffect(()=>{if(session)void supabase.from("profiles").upsert({id:session.user.id,display_name:displayName(session.user.email)},{onConflict:"id",ignoreDuplicates:true})},[session]);
 const loadPosts=async()=>{
  let query=supabase.from("echoes").select("id,author_id,kind,title,practice,description,external_url,media_path,media_type,response_to_id,created_at").order("created_at",{ascending:false}).limit(100);
  if(galleryOnly)query=query.eq("kind","artwork");
  const {data,error}=await query;
  if(error){setError(error.message);return}
  const rows=(data||[]) as Post[],ids=[...new Set(rows.map(x=>x.author_id))];
  const {data:profiles}=ids.length?await supabase.from("profiles").select("id,display_name").in("id",ids):{data:[] as {id:string;display_name:string|null}[]};
  const names=new Map((profiles||[]).map(x=>[x.id,x.display_name||"Poiesis member"]));
  const feed=await Promise.all(rows.map(async row=>{const {data:signed}=row.media_path?await supabase.storage.from("echo-media").createSignedUrl(row.media_path,3600):{data:null};return {...row,mediaUrl:signed?.signedUrl||null,authorName:names.get(row.author_id)||"Poiesis member"}}));
  const responseIds=[...new Set(rows.flatMap(x=>x.response_to_id?[x.response_to_id]:[]))];
  const {data:prompts}=responseIds.length?await supabase.from("echoes").select("id,title").in("id",responseIds):{data:[] as {id:string;title:string}[]};
  const titles=new Map((prompts||[]).map(x=>[x.id,x.title]));
  setPosts(feed.map(post=>({...post,responseTitle:post.response_to_id?titles.get(post.response_to_id)||"an Echo prompt":null})));setError("");
 };
 useEffect(()=>{if(session)void loadPosts()},[session,galleryOnly]);
 const loadComments=async(id:string)=>{
  const {data,error}=await supabase.from("echo_comments").select("id,echo_id,author_id,content,created_at").eq("echo_id",id).order("created_at");
  if(error){setError(error.message);return} const rows=(data||[]) as Comment[],ids=[...new Set(rows.map(x=>x.author_id))];
  const {data:profiles}=ids.length?await supabase.from("profiles").select("id,display_name").in("id",ids):{data:[] as {id:string;display_name:string|null}[]};
  const names=new Map((profiles||[]).map(x=>[x.id,x.display_name||"Poiesis member"]));setComments(rows.map(x=>({...x,authorName:names.get(x.author_id)||"Poiesis member"})));
 };
 const publish=async(e:FormEvent<HTMLFormElement>)=>{
  e.preventDefault();if(!session)return;const safeUrl=toSafeExternalUrl(externalUrl);
  if(externalUrl.trim()&&!safeUrl){setError("Links must begin with http:// or https://.");return}
  if(media&&(!media.type.startsWith("image/")&&!media.type.startsWith("video/"))){setError("Choose an image or video file.");return}
  if(media&&media.size>50*1024*1024){setError("Choose a file smaller than 50 MB.");return}
  setPosting(true);setError("");let mediaPath:string|null=null;const mediaType=media?(media.type.startsWith("video/")?"video":"image"):null;
  if(media){const ext=media.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g,"")||(mediaType==="video"?"mp4":"jpg");mediaPath=session.user.id+"/"+crypto.randomUUID()+"."+ext;
   const {error}=await supabase.storage.from("echo-media").upload(mediaPath,media,{contentType:media.type});if(error){setPosting(false);setError(error.message);return}
  }
  const {error}=await supabase.from("echoes").insert({author_id:session.user.id,kind,title:title.trim(),practice,description:description.trim(),external_url:safeUrl,media_path:mediaPath,media_type:mediaType,response_to_id:kind==="artwork"&&responseToId?responseToId:null});
  if(error){if(mediaPath)await supabase.storage.from("echo-media").remove([mediaPath]);setPosting(false);setError(error.message);return}
  setTitle("");setDescription("");setExternalUrl("");setResponseToId("");setMedia(null);await loadPosts();setPosting(false);
 };
 const sendComment=async(e:FormEvent<HTMLFormElement>,id:string)=>{e.preventDefault();if(!session)return;setResponding(true);setError("");const {error}=await supabase.from("echo_comments").insert({echo_id:id,author_id:session.user.id,content:comment.trim()});if(error)setError(error.message);else{setComment("");await loadComments(id)}setResponding(false)};
 const toggle=async(id:string)=>{const next=active===id?null:id;setActive(next);if(next)await loadComments(next)};
 const respondToEcho=(post:Post)=>{setKind("artwork");setResponseToId(post.id);setError("");composerRef.current?.scrollIntoView({behavior:"smooth",block:"start"})};
 if(loading)return <SiteShell><section className="echo-loading"><Loader2 size={28}/><p>Opening the members’ studio…</p></section></SiteShell>;
 if(!session)return <SiteShell><section className="echo-guest" style={{backgroundImage:"url("+ASSETS.parchment+")"}}><img src={ASSETS.officialLogo} alt="Poiesis Art Club logo"/><p className="folio-label">The members’ studio</p><h1>Art meets<br/>conversation.</h1><p>Sign in to share work, offer a creative prompt, and respond to other members.</p><Link href="/login" className="member-submit echo-login">Sign in to enter <LogIn size={16}/></Link><Link href="/join" className="echo-guest-link">Not a member yet? Write to Poiesis on Instagram ↗</Link></section></SiteShell>;
 return <SiteShell><section className="echo-archive studio-feed">
  <header className="echo-header"><div><p className="folio-label">{galleryOnly?"The members’ gallery":"Studio · members only"}</p><h1>{galleryOnly?<>Works made<br/>in response.</>:<>Works in<br/>conversation.</>}</h1><p>{galleryOnly?"Published artworks gather here, including pieces made in response to another artist’s Echo.":"Share a piece of art or leave a prompt for another artist. Look closely, respond generously, and let the work open a conversation."}</p><Link href={galleryOnly?"/echoes":"/gallery"} className="studio-gallery-link">{galleryOnly?"Return to Echoes and prompts →":"Visit the art gallery →"}</Link></div><div className="echo-member-chip"><Sparkles size={16}/><span>In the studio<br/><strong>{session.user.email||"Poiesis member"}</strong></span></div></header>
  {!galleryOnly&&<section ref={composerRef} className="echo-compose studio-compose"><div><p className="folio-label">Bring something in</p><h2>Share work.<br/>Start a conversation.</h2><p>Post an artwork for the room, or offer a prompt that invites another artist to make, notice or imagine something.</p></div>
   <form onSubmit={publish}><fieldset className="studio-kind"><legend>What are you sharing?</legend><label><input type="radio" name="kind" checked={kind==="artwork"} onChange={()=>setKind("artwork")}/> Artwork</label><label><input type="radio" name="kind" checked={kind==="prompt"} onChange={()=>setKind("prompt")}/> Echo prompt</label></fieldset>
    <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} required minLength={2} maxLength={180} placeholder={kind==="prompt"?"Give your prompt a name":"Name your artwork"}/></label>
    <label>Practice<select value={practice} onChange={e=>setPractice(e.target.value)}>{practices.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>{kind==="prompt"?"Your prompt":"About this work"}<textarea value={description} onChange={e=>setDescription(e.target.value)} required minLength={10} maxLength={5000} rows={4} placeholder={kind==="prompt"?"What could another artist try, notice or respond to?":"Share the story, process or context behind this piece."}/></label>
    {kind==="artwork"&&<label>In response to an Echo <span className="field-optional">optional</span><select value={responseToId} onChange={e=>setResponseToId(e.target.value)}><option value="">Standalone artwork</option>{posts.filter(post=>post.kind==="prompt").map(prompt=><option key={prompt.id} value={prompt.id}>{prompt.title}</option>)}</select></label>}
    <label className="studio-upload">Image or video <span className="field-optional">optional · up to 50 MB</span><span className="studio-upload__control"><ImagePlus size={17}/><span>{media?media.name:"Choose an image or video"}</span><input type="file" accept="image/*,video/*" onChange={e=>{const f=e.target.files?.[0];if(f){setError("");setMedia(f)}}}/></span></label>
    {preview&&<div className="studio-preview">{media?.type.startsWith("video/")?<video src={preview} controls/>:<img src={preview} alt="Selected artwork preview"/>}<button type="button" aria-label="Remove selected media" onClick={()=>setMedia(null)}><X size={16}/></button></div>}
    <label>External link <span className="field-optional">optional</span><input value={externalUrl} onChange={e=>setExternalUrl(e.target.value)} type="url" placeholder="https://…"/></label>
    <button className="member-submit" type="submit" disabled={posting}>{posting?"Sharing with the studio…":<>Publish to Studio <Send size={16}/></>}</button>
   </form>
  </section>}
  <section className="echo-list"><div className="echo-list-title"><ImagePlus size={20}/><h2>{galleryOnly?"Published artworks":"From the studio"}</h2></div>{error&&<p className="echo-state echo-state--error" role="alert">{error}</p>}
   {posts.length===0?<div className="echo-empty"><Sparkles size={23}/><h3>{galleryOnly?"The gallery is waiting.":"The studio is ready."}</h3><p>{galleryOnly?"Published artworks and Echo responses will appear here.":"Share the first artwork or offer a prompt to begin the conversation."}</p></div>:<div className="echo-grid studio-feed__grid">{posts.map(post=><article className="echo-entry studio-post" key={post.id}>
    <p className="studio-post__kind"><Sparkles size={14}/>{post.kind==="prompt"?"Echo prompt":"Artwork"} · {post.practice}</p><h3>{post.title}</h3><p className="studio-post__author">Shared by {post.authorName} · {displayDate(post.created_at)}</p>
    {post.mediaUrl&&(post.media_type==="video"?<video className="studio-post__media" src={post.mediaUrl} controls playsInline preload="metadata"/>:<img className="studio-post__media" src={post.mediaUrl} alt={post.title} loading="lazy"/>)}
    {post.responseTitle&&<p className="studio-post__response">Made in response to <strong>{post.responseTitle}</strong></p>}<p className="studio-post__description">{post.description}</p>{toSafeExternalUrl(post.external_url)&&<a className="studio-post__link" href={toSafeExternalUrl(post.external_url)!} target="_blank" rel="noreferrer">Open linked work <ArrowUpRight size={14}/></a>}
    <footer>{post.kind==="prompt"&&!galleryOnly&&<button type="button" className="studio-respond-button" onClick={()=>respondToEcho(post)}><ImagePlus size={15}/>Respond with artwork</button>}<button onClick={()=>void toggle(post.id)} aria-expanded={active===post.id}><MessageCircleMore size={15}/>{active===post.id?"Hide comments":"Comments"}</button></footer>
    {active===post.id&&<div className="echo-comments"><div>{comments.length?comments.map(c=><article className="studio-comment" key={c.id}><strong>{c.authorName}</strong><time>{displayDate(c.created_at)}</time><p>{c.content}</p></article>):<p>No comments yet. Be the first to meet this work.</p>}</div><form onSubmit={e=>void sendComment(e,post.id)}><textarea value={comment} onChange={e=>setComment(e.target.value)} minLength={2} maxLength={2000} required rows={3} placeholder="What do you notice, wonder or want to ask?"/><button type="submit" disabled={responding}>{responding?"Adding…":"Add comment"}</button></form></div>}
   </article>)}</div>}
  </section>
 </section></SiteShell>;
}
