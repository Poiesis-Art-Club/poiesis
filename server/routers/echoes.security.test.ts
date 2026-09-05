import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ createEcho: vi.fn() }));

vi.mock("../db", () => ({
  createEcho: mocks.createEcho,
  createEchoComment: vi.fn(),
  listEchoes: vi.fn(),
  listEchoComments: vi.fn(),
}));

import { echoesRouter } from "./echoes";

const member = { id: 1, openId: "security-test-member", role: "user" };
const input = {
  title: "A study in charcoal",
  practice: "Drawing",
  description: "A deliberately ordinary description long enough to pass the validation gate.",
};

describe("echoes external-link boundary", () => {
  it.each(["javascript:alert(1)", "data:text/html,<script>alert(1)</script>", "file:///etc/passwd"]) (
    "rejects unsafe URL protocol %s before storage",
    async (externalUrl) => {
      const caller = echoesRouter.createCaller({ user: member } as never);
      await expect(caller.create({ ...input, externalUrl })).rejects.toMatchObject({ code: "BAD_REQUEST" });
      expect(mocks.createEcho).not.toHaveBeenCalled();
    },
  );

  it("keeps a valid HTTPS URL available to the procedure", async () => {
    mocks.createEcho.mockResolvedValue({ id: 1 });
    const caller = echoesRouter.createCaller({ user: member } as never);
    await expect(caller.create({ ...input, externalUrl: "https://example.test/work" })).resolves.toEqual({ id: 1 });
  });
});
