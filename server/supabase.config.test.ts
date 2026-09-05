import { describe, expect, it } from "vitest";

describe("Supabase configuration", () => {
  it("exposes the configured project URL and publishable key", () => {
    expect(process.env.VITE_SUPABASE_URL).toBeTruthy();
    expect(process.env.VITE_SUPABASE_PUBLISHABLE_KEY).toBeTruthy();
  });

  it.skipIf(process.env.RUN_EXTERNAL_INTEGRATION !== "1")(
    "reaches the project auth settings with the configured publishable key",
    async () => {
      const url = process.env.VITE_SUPABASE_URL!;
      const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY!;
      const response = await fetch(`${url}/auth/v1/settings`, {
        headers: { apikey: key },
      });
      expect(response.ok).toBe(true);
    },
  );
});
