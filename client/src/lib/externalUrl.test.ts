import { describe, expect, it } from "vitest";
import { toSafeExternalUrl } from "./externalUrl";

describe("toSafeExternalUrl", () => {
  it("accepts normalized HTTP(S) URLs only", () => {
    expect(toSafeExternalUrl(" https://poiesis.art/work ")).toBe("https://poiesis.art/work");
    expect(toSafeExternalUrl("http://example.test/archive")).toBe("http://example.test/archive");
  });

  it("rejects script, data and malformed URL values", () => {
    expect(toSafeExternalUrl("javascript:alert(1)")).toBeNull();
    expect(toSafeExternalUrl("data:text/html,<script>alert(1)</script>")).toBeNull();
    expect(toSafeExternalUrl("//untrusted.test/path")).toBeNull();
    expect(toSafeExternalUrl("not a url")).toBeNull();
  });
});
