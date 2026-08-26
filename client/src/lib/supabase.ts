import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export function hasSupabaseConfig(candidateUrl?: string, candidateKey?: string) {
  return Boolean(candidateUrl && candidateKey);
}

export const isSupabaseConfigured = hasSupabaseConfig(url, publishableKey);

// A static build can still present Poiesis’ public pages before its host has
// received the two browser-safe Supabase variables. Auth actions are disabled
// by the missing deployment configuration, but the application must not fail
// before React has had a chance to render an explicit notice.
const clientUrl = url || "https://configuration-required.supabase.co";
const clientKey = publishableKey || "configuration-required";

export const supabase = createClient(clientUrl, clientKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
