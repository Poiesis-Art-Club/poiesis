import { describe, expect, it } from "vitest";
import { memberAuthRedirect, memberGoogleAuthOptions } from "./memberAuth";

describe("memberAuthRedirect", () => {
  it("returns the private Echoes route on the active origin", () => {
    expect(memberAuthRedirect("https://poiesis.example")).toBe("https://poiesis.example/echoes");
  });

  it("forces an explicit Google account choice on the active origin", () => {
    expect(memberGoogleAuthOptions("https://poiesis.example")).toEqual({
      redirectTo: "https://poiesis.example/echoes",
      queryParams: { prompt: "select_account" },
    });
  });
});
