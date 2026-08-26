import { Link } from "wouter";
import { ArrowLeft, MailCheck, Scale, ShieldCheck } from "lucide-react";
import { ASSETS, Ornament, SiteShell } from "@/components/PoiesisUI";

type PolicyKind = "privacy" | "terms";

const policyCopy: Record<PolicyKind, { eyebrow: string; title: string; icon: typeof ShieldCheck; lead: string; sections: Array<{ heading: string; body: string }> }> = {
  privacy: {
    eyebrow: "Public notice · Privacy",
    title: "How member data is held",
    icon: ShieldCheck,
    lead: "Poiesis keeps only the information needed to let members enter, use the private Echoes archive and take part in the club’s shared practice.",
    sections: [
      { heading: "What is collected", body: "When you create a member account, Poiesis processes your e-mail address and an authentication identifier. If you choose Google sign-in, Google confirms the e-mail address used for that sign-in. Your profile details, Echoes and comments are stored only when you choose to add them." },
      { heading: "Why it is used", body: "This information is used to authenticate members, protect the private archive, display the authorship you choose for an Echo and keep the conversation around a work understandable and safe." },
      { heading: "Where it is processed", body: "Authentication and the member archive are provided through Supabase. Google OAuth is used only when you choose the “Continue with Google” route. Poiesis does not receive or store your Google password." },
      { heading: "Retention and removal", body: "Account and archive information remains while your membership is active or until deletion is requested. To request access, correction or deletion of a Poiesis account, contact the club through its official Instagram account and include the e-mail used for the account." },
      { heading: "Updates", body: "If the way Poiesis handles member information changes materially, this page will be updated before the new practice is used." },
    ],
  },
  terms: {
    eyebrow: "Public notice · Terms",
    title: "A shared house, clear terms",
    icon: Scale,
    lead: "Poiesis is a member space for artistic practice, cultures, debate and inquiry. These terms explain the care expected when using its private member archive.",
    sections: [
      { heading: "Member access", body: "Use a real, reachable e-mail address or a Google account you control. Keep your password private. The club may suspend access that appears compromised, deceptive or harmful to other members." },
      { heading: "Your work", body: "You retain the rights to the work and words you publish. By posting an Echo or comment, you allow Poiesis to display it inside the private archive for other authenticated members and to preserve the discussion attached to it." },
      { heading: "Shared practice", body: "Do not publish unlawful content, material that infringes another person’s rights, targeted harassment, threats or content intended to make the archive unsafe. Respond to work with the same care you would ask of a studio, screening or table conversation." },
      { heading: "Moderation", body: "Poiesis may remove content or limit an account when it reasonably believes these terms or the safety of the member space are being compromised. The club’s Instagram account remains the practical point of contact for membership, events and concerns." },
      { heading: "Changes", body: "The member archive and these terms may evolve as the club grows. Continued use after a clearly posted update means the member accepts the updated terms." },
    ],
  },
};

function PolicyPage({ kind }: { kind: PolicyKind }) {
  const copy = policyCopy[kind];
  const Icon = copy.icon;

  return (
    <SiteShell>
      <section className="policy-page" style={{ backgroundImage: `url(${ASSETS.parchment})` }}>
        <div className="policy-page__wash" aria-hidden="true" />
        <div className="policy-page__folio">
          <Link href="/home" className="policy-page__back"><ArrowLeft size={15} />Back to Poiesis</Link>
          <div className="policy-page__stamp"><Icon size={18} /><span>Poiesis Art Club</span></div>
          <p className="folio-label">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="policy-page__lead">{copy.lead}</p>
          <Ornament />
          <div className="policy-page__sections">
            {copy.sections.map((section, index) => (
              <article key={section.heading}>
                <span className="policy-page__number">0{index + 1}</span>
                <div><h2>{section.heading}</h2><p>{section.body}</p></div>
              </article>
            ))}
          </div>
          <footer className="policy-page__foot">Last updated: 26 August 2026 · <Link href={kind === "privacy" ? "/terms" : "/privacy"}>{kind === "privacy" ? "Read the terms" : "Read the privacy notice"}</Link></footer>
        </div>
      </section>
    </SiteShell>
  );
}

export function Privacy() { return <PolicyPage kind="privacy" />; }

export function Terms() { return <PolicyPage kind="terms" />; }
