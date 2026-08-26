import { describe, expect, it } from "vitest";

describe("Supabase configuration", () => {
  it("reaches the project auth settings with the configured publishable key", async () => {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    expect(url).toBeTruthy();
    expect(key).toBeTruthy();

    const response = await fetch(`${url}/auth/v1/settings`, {
      headers: { apikey: key! },
    });

    expect(response.ok).toBe(true);
  });
});
