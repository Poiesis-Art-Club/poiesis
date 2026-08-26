import { describe, expect, it } from "vitest";
import { echoesRouter } from "./echoes";

describe("echoes router", () => {
  it("refuses archive access without an authenticated member", async () => {
    const caller = echoesRouter.createCaller({ user: null } as never);
    await expect(caller.list()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
