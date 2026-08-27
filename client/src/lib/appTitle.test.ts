import { describe, expect, it } from "vitest";

describe("project identity", () => {
  it("uses Poiesis as the managed public application title", () => {
    expect(process.env.VITE_APP_TITLE).toBe("Poiesis");
  });
});
