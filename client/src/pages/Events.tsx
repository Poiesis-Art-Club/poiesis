/** Manuscrit de Minuit — proclamations en feuillets, onglets accessibles et inscription par sceau. */
import { useState } from "react";
import { CalendarDays, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChapterTitle, InkButton, SiteShell } from "@/components/PoiesisUI";

const events = {
  upcoming: [
    { title: "The Midnight Salon", date: "04 September 2026", place: "Springcrush Hall, Casablanca", text: "An evening of shared sketching, candlelight and the Echo read aloud." },
    { title: "The Illumination Workshop", date: "20 September 2026", place: "The Scriptorium · Online", text: "A working session on drop caps, gilding and manuscript borders." },
  ],
  past: [
    { title: "Founding Gathering", date: "12 May 2026", place: "Springcrush Hall, Casablanca", text: "The first meeting of the guild — a reading of the founding scrolls." },
  ],
};

function EventList({ kind, select }: { kind: "upcoming" | "past"; select: (name: string) => void }) {
  return <div className="events-stack">{events[kind].map((event, index) => <article className="event-leaf" key={event.title}>
    <div className="event-index">0{index + 1}</div><div className="event-main"><h2>{event.title}</h2><p>{event.text}</p><div className="event-meta"><span><CalendarDays size={14} />{event.date}</span><span><MapPin size={14} />{event.place}</span></div></div>
    {kind === "upcoming" ? <InkButton onClick={() => select(event.title)}>Reserve a seat</InkButton> : <p className="event-past">Entered in the archive</p>}
  </article>)}</div>;
}

export default function Events() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const close = () => { setSelected(null); setSubmitted(false); };
  return <SiteShell>
    <section className="event-page">
      <ChapterTitle eyebrow="Proclamations & gatherings" title="Meet where the work is warm." text="Gatherings that make room for a sketchbook, a half-formed idea and the people willing to see it begin." />
      <Tabs defaultValue="upcoming" className="event-tabs">
        <TabsList className="event-tab-list"><TabsTrigger value="upcoming">Open proclamations</TabsTrigger><TabsTrigger value="past">In the archive</TabsTrigger></TabsList>
        <TabsContent value="upcoming"><EventList kind="upcoming" select={setSelected} /></TabsContent>
        <TabsContent value="past"><EventList kind="past" select={setSelected} /></TabsContent>
      </Tabs>
    </section>
    <Dialog open={Boolean(selected)} onOpenChange={(value) => !value && close()}>
      <DialogContent className="seal-dialog" showCloseButton>
        {!submitted ? <><DialogHeader><p className="section-tag"><span />Claim your chair</p><DialogTitle>Reserve: {selected}</DialogTitle><DialogDescription>Leave your name and email. This prototype confirms your place in the interface only.</DialogDescription></DialogHeader><form className="seal-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="name@email.com" /></label><InkButton type="submit">Seal my place</InkButton></form></> : <div className="success-panel"><span>✓</span><h2>Your seat is provisionally sealed.</h2><p>This visual prototype does not send data yet. Connect a form service when you are ready to collect registrations.</p><InkButton onClick={close} tone="ink">Close the letter</InkButton></div>}
      </DialogContent>
    </Dialog>
  </SiteShell>;
}
