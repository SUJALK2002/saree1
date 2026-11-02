import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
export const adminLoginEmail = (import.meta.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();

export const supabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  adminLoginEmail &&
  !supabaseUrl.includes("your-project") &&
  !supabaseAnonKey.includes("your-public")
);

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    })
  : null;
