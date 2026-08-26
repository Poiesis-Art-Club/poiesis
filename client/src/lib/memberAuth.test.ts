import { describe, expect, it } from "vitest";
import { memberAuthRedirect } from "./memberAuth";

describe("memberAuthRedirect", () => {
  it("returns the private Echoes route on the active origin", () => {
    expect(memberAuthRedirect("https://poiesis.example")).toBe("https://poiesis.example/echoes");
  });
});
