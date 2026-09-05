import { describe, expect, it } from "vitest";
import { teamMembers } from "./About";

describe("team archival motifs", () => {
  it("keeps a real motif and accessible alt text for every member", () => {
    expect(teamMembers).toHaveLength(9);
    expect(teamMembers.every(member => member.motifImage.startsWith("/manus-storage/"))).toBe(true);
    expect(teamMembers.every(member => member.motifImageAlt.length > 10)).toBe(true);
  });
});
