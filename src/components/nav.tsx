import { createClient } from '@/lib/supabase/server';
import NavShell from '@/components/nav-shell';

export default async function Nav() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const authed = !!user;

  return <NavShell authed={authed} />;
}