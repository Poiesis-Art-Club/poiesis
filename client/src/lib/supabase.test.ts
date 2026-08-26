import { describe, expect, it } from "vitest";
import { hasSupabaseConfig } from "./supabase";

describe("hasSupabaseConfig", () => {
  it("requires both public browser values", () => {
    expect(hasSupabaseConfig("https://project.supabase.co", "public-key")).toBe(true);
    expect(hasSupabaseConfig("https://project.supabase.co", undefined)).toBe(false);
    expect(hasSupabaseConfig(undefined, "public-key")).toBe(false);
  });
});
