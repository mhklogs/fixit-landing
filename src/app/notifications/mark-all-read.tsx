'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function MarkAllRead() {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function markAll() {
    setBusy(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('notifications').update({ read: true }).eq('user_id', user.id).eq('read', false);
    setBusy(false);
    router.refresh();
  }

  return (
    <button onClick={markAll} disabled={busy} className="btn-secondary px-4 py-2 text-sm">
      {busy ? 'Marking…' : 'Mark all read'}
    </button>
  );
}