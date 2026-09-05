import { describe, expect, it } from "vitest";
import { aboutManifesto, teamMembers } from "./About";
import { volunteerRoles } from "./Join";

describe("public Poiesis experience", () => {
  it("presents the eight supplied team members with English roles and portrait assets", () => {
    expect(teamMembers).toHaveLength(8);
    expect(teamMembers.map(member => member.role)).toEqual([
      "Founder",
      "Video Editor",
      "Logistics Coordinator",
      "Graphic Designer",
      "Photographer",
      "Illustrator",
      "Poiesis Member",
      "Poiesis Member",
    ]);
    expect(teamMembers.every(member => member.image.startsWith("/manus-storage/"))).toBe(true);
    expect(teamMembers.every(member => member.description.length > 30)).toBe(true);
    expect(teamMembers.every(member => member.motifs.length === 3)).toBe(true);
  });

  it("preserves the supplied About manifesto with its closing signature", () => {
    expect(aboutManifesto).toContain("« Je vous parle d'un temps que les moins de vingt ans ne peuvent pas connaître. »");
    expect(aboutManifesto).toContain("So we called this place…\nPOIESIS.");
    expect(aboutManifesto).toContain("the restless youth,");
    expect(aboutManifesto).toContain("young people found a place\nwhere their ideas were allowed to breathe.");
    expect(aboutManifesto.endsWith("Our Montmartre.\nPOIESIS")).toBe(true);
  });

  it("keeps volunteer opportunities concrete without inventing an application form", () => {
    expect(volunteerRoles).toEqual([
      "Session support",
      "Visual & media support",
      "Hospitality",
      "Logistics",
      "Documentation",
    ]);
  });
});
