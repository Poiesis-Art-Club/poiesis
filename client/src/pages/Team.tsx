import { UsersRound } from "lucide-react";
import { InkButton, SiteShell } from "@/components/PoiesisUI";
import { TeamCard, teamMembers } from "./About";

export default function Team() {
  return <SiteShell>
    <section className="team-page">
      <header className="team-page__intro">
        <div>
          <p className="folio-label">Meet the team</p>
          <h1>Keeping the house<br /><em>in motion.</em></h1>
        </div>
        <p>Makers, organisers and storytellers with different ways of seeing. Meet the people who give Poiesis its shape.</p>
      </header>
      <div className="team-grid" aria-label="The full Poiesis team">{teamMembers.map((member, index) => <TeamCard member={member} index={index} key={member.name} />)}</div>
      <div className="team-section__footer"><UsersRound size={21} /><p>Want to help the collective grow?</p><InkButton href="/join" tone="ink">Join the house</InkButton></div>
    </section>
  </SiteShell>;
}
