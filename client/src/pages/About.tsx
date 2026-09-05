/** About Poiesis: a clear club introduction and the people who make the house possible. */
import { BookOpenText, CalendarDays, Camera, Cat, CookingPot, Dumbbell, Gamepad2, Guitar, HeartHandshake, Landmark, Leaf, Map, Mountain, Music2, Palette, PencilLine, Search, UsersRound } from "lucide-react";
import { ASSETS, InkButton, SiteShell } from "@/components/PoiesisUI";

const values = [
  { icon: Palette, title: "Every practice belongs", text: "Painting, sculpture, photography, design, music, dance, film, performance, writing, craft and digital work all have a place here." },
  { icon: BookOpenText, title: "Culture is part of the work", text: "Poiesis makes room for references, histories, questions, reading, philosophy and debate alongside making." },
  { icon: HeartHandshake, title: "People build the programme", text: "Members and volunteers bring sessions, works-in-progress, guests, screenings, listening rooms and conversations into the house." },
];

export const teamMembers = [
  { name: "Hiba", role: "Founder", image: "/manus-storage/Hiba_founder_f423ee61.png", optimizedImage: "/manus-storage/Hiba_founder-card_22d8bfb3.webp", portraitWidth: 299, description: "A dark-academic heart with a soft centre: reading, sketching, writing, anime, metal, rock and jazz.", tags: ["Reading", "Sketching", "Writing"], motifImage: "/manus-storage/hiba-ines-quill_76a98b44.jpg", motifImageAlt: "Public-domain quill and ink illustration", motifs: [{ icon: BookOpenText, label: "Reading" }, { icon: PencilLine, label: "Sketching" }, { icon: Music2, label: "Jazz" }] },
  { name: "Chama", role: "Video Editor", image: "/manus-storage/Chama_videoeditorpng_9f205213.png", optimizedImage: "/manus-storage/Chama_videoeditor-card_f1c140b6.webp", portraitWidth: 235, description: "A keychain collector with a restless eye for video, photography, music, theatre and drawing.", tags: ["Video", "Photography", "Theatre"], motifImage: "/manus-storage/chama-camera-obscura_64ce7e4c.jpg", motifImageAlt: "Public-domain camera obscura illustration", motifs: [{ icon: Camera, label: "Photography" }, { icon: Music2, label: "Music" }, { icon: PencilLine, label: "Drawing" }] },
  { name: "Alae", role: "Logistics Coordinator", image: "/manus-storage/Alae_logisticspng_0e1d9b30.png", optimizedImage: "/manus-storage/Alae_logistics-card_4b1c9b99.webp", portraitWidth: 208, description: "The planner behind the scenes, bringing travel, sport, reading and music into the work of gathering people.", tags: ["Planning", "Travel", "Music"], motifImage: "/manus-storage/alae-world-map_46958d8b.jpg", motifImageAlt: "Public-domain seventeenth-century world map", motifs: [{ icon: CalendarDays, label: "Planning" }, { icon: Map, label: "Travel" }, { icon: Dumbbell, label: "Sport" }] },
  { name: "Adam", role: "Graphic Designer", image: "/manus-storage/Adam_graphicdesignerpng_dd9b4b54.png", optimizedImage: "/manus-storage/Adam_graphicdesigner-card_1aaf129c.webp", portraitWidth: 212, description: "A guitar player and visual maker who knows sign language and still draws in MS Paint.", tags: ["Design", "Guitar", "Visual play"], motifImage: "/manus-storage/adam-harp-guitar_8c8c3f73.jpg", motifImageAlt: "Public-domain harp-guitar patent drawing", motifs: [{ icon: Guitar, label: "Guitar" }, { icon: PencilLine, label: "Drawing" }, { icon: Palette, label: "Design" }] },
  { name: "Ines", role: "Photographer", image: "/manus-storage/Ines_photographer_92214f66.png", optimizedImage: "/manus-storage/Ines_photographer-card_5818effc.webp", portraitWidth: 254, description: "A curious collector of mystery stories, details and ideas worth following all the way down.", tags: ["Photography", "Research", "Stories"], motifImage: "/manus-storage/hiba-ines-quill_76a98b44.jpg", motifImageAlt: "Public-domain quill and ink illustration", motifs: [{ icon: Camera, label: "Photography" }, { icon: Search, label: "Research" }, { icon: Music2, label: "Music" }] },
  { name: "Sara", role: "Illustrator", image: "/manus-storage/Sara_illustratorpng_c78ed546.png", optimizedImage: "/manus-storage/Sara_illustrator-card_2508297d.webp", portraitWidth: 226, description: "A thoughtful illustrator who wants to create a manga and draws energy from J-pop, anime and games.", tags: ["Illustration", "Manga", "J-pop"], motifImage: "/manus-storage/sara-cat-fiddle_c267547a.jpg", motifImageAlt: "Public-domain cat and fiddle illustration", motifs: [{ icon: PencilLine, label: "Drawing" }, { icon: Gamepad2, label: "Games" }, { icon: Cat, label: "Cats" }] },
  { name: "Malak", role: "Poiesis Member", image: "/manus-storage/Malakpng_33d37f16.png", optimizedImage: "/manus-storage/Malak-card_b9a4dc09.webp", portraitWidth: 229, description: "A many-hobbies person with room for music, digital art, cooking and sport.", tags: ["Digital art", "Music", "Cooking"], motifImage: "/manus-storage/malak-cooking-utensils_04fa0d42.jpg", motifImageAlt: "Public-domain cooking utensils illustration", motifs: [{ icon: Palette, label: "Digital art" }, { icon: CookingPot, label: "Cooking" }, { icon: Dumbbell, label: "Sport" }] },
  { name: "Yasmine", role: "Poiesis Member", image: "/manus-storage/Yasminepng_953e7809.png", optimizedImage: "/manus-storage/Yasmine-card_6a3a1c3a.webp", portraitWidth: 253, description: "A dreamer drawn to nature and landscapes, with a green thread through a love for art.", tags: ["Nature", "Landscapes", "Art"], motifImage: "/manus-storage/yasmine-landscape_9552ca6b.jpg", motifImageAlt: "Public-domain landscape engraving", motifs: [{ icon: Leaf, label: "Nature" }, { icon: Mountain, label: "Landscapes" }, { icon: Palette, label: "Art" }] },
];

export const aboutManifesto = `« Je vous parle d'un temps que les moins de vingt ans ne peuvent pas connaître. »

And perhaps that is the strange thing about Aznavour's words:
we are not twenty.
We were not there.
We never walked those streets,
never watched those lilacs from those windows.

And yet… somehow, we understand.

Because perhaps you do not have to have lived a time
to recognize its longing.
You only have to be young enough
to believe that a little corner of the world
could still become everything.

Montmartre.

A name that still seems to carry
the sound of brushes against canvas,
the murmur of cafés,
the voices of young artists
trying to remake the world
with nothing but a poem,
a painting,
an unfinished thought,
and the courage to make it real.

There was a corner of the world
where one could arrive with almost nothing
and leave having made something.

And that is what we hear beneath Aznavour's Montmartre:
not only a place…
but a feeling…
the feeling of being young,
of being surrounded by others who create,
of having very little except an idea,
and believing, fiercely,
that it might be enough.

We have always dreamed
of a place like that.

Not Montmartre.
Not Paris.

Ours.

A room,
a courtyard,
a square,
a street corner,
or simply a door
behind which a teenager could walk in
with an idea cupped in their hands.

A place where someone could paint
without having to explain the color,
where a poem could be spoken
without being asked why,
where theatre could spill into the streets,
where a language could be sung,
where a story carried for years
could finally find a voice.

A place where culture would not sit
behind glass,
silent and untouchable,
but breathe among us…
in our languages,
our gestures,
our stories,
our symbols,
our memories,
and in everything we choose to create from them.

So we called this place…
POIESIS.

Not to recreate Montmartre,
but to carry its spirit forward:
the gathering,
the making,
the restless youth,

the freedom to search,

and that beautiful belief

that an idea, once shared,

can become a world.

Perhaps one day,

someone will speak of POIESIS

the way Aznavour spoke of Montmartre.

Not because we became famous,

but because somewhere here,

young people found a place
where their ideas were allowed to breathe.

And perhaps that will be

our bohème.

Our little corner of the world.

Our Montmartre.
POIESIS`;

export default function About() {
  return <SiteShell>
    <section className="about-intro">
      <div><p className="folio-label">Get to know us</p><div className="about-manifesto" aria-label="Poiesis manifesto">{aboutManifesto}</div><div className="about-intro__actions"><InkButton href="/join">Find your place</InkButton><InkButton href="/create" tone="ink">Explore Studios</InkButton></div></div>
      <aside><Landmark size={23}/><p>Built through the energy of its members, not around a single discipline.</p><span>Poiesis · 01</span></aside>
    </section>
    <section className="about-values"><header><p className="folio-label">What we make space for</p><h2>Art, culture<br />and care.</h2></header><div>{values.map(({icon: Icon, title, text}, index) => <article key={title}><span>0{index + 1}</span><Icon size={21}/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="team-section" id="team"><header className="team-section__heading"><div><p className="folio-label">Meet the team</p><h2>Keeping the house<br />in motion.</h2></div><p>Makers, organisers and storytellers with different ways of seeing.</p></header>
      <div className="team-grid" aria-label="The full Poiesis team">{teamMembers.map((member, index) => <TeamCard member={member} index={index} key={member.name} />)}</div>
      <div className="team-section__footer"><UsersRound size={21}/><p>Want to help the collective grow?</p><InkButton href="/join" tone="ink">Join the house</InkButton></div>
    </section>
  </SiteShell>;
}

function TeamCard({ member, index }: { member: (typeof teamMembers)[number]; index: number }) {
  return <article className={`team-card ${index === 0 ? "team-card--founder" : ""}`}><div className="team-card__portrait"><span>{String(index + 1).padStart(2, "0")}</span><div className="team-card__motifs" aria-label={`${member.name}'s interests`}>{member.motifs.map(({ icon: Icon, label }) => <span key={label}><Icon size={12} aria-hidden="true" /><small>{label}</small></span>)}</div><picture><source srcSet={member.optimizedImage} type="image/webp" /><img src={member.image} width={member.portraitWidth} height={760} alt={`${member.name}, ${member.role} at Poiesis`} loading="lazy" decoding="async" /></picture></div><div className="team-card__body"><div className="team-card__artifact"><img src={member.motifImage} alt={member.motifImageAlt} loading="lazy" decoding="async" width="160" height="120" /></div><p className="team-card__role">{member.role}</p><h3>{member.name}</h3><p>{member.description}</p><div className="team-card__tags">{member.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></article>;
}
