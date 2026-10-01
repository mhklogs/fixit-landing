import { createClient } from '@supabase/supabase-js';

// Server-only admin client. NEVER exposed to the browser.
export function createServerSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}