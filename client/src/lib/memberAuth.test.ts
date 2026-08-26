import { describe, expect, it } from "vitest";
import { memberAuthRedirect, memberEmailConfirmationRedirect, memberGoogleAuthOptions, memberRoute } from "./memberAuth";

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

  it("keeps member routes inside a GitHub Pages repository prefix", () => {
    expect(memberRoute("/echoes", "/poiesis-medieval/")).toBe("/poiesis-medieval/echoes");
    expect(memberAuthRedirect("https://godofcode1.github.io", "/poiesis-medieval/")).toBe("https://godofcode1.github.io/poiesis-medieval/echoes");
    expect(memberEmailConfirmationRedirect("https://godofcode1.github.io", "/poiesis-medieval/")).toBe("https://godofcode1.github.io/poiesis-medieval/email-confirmed");
  });
});
