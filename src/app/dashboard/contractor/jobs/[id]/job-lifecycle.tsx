'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function JobLifecycle({ jobId, status }: { jobId: string; status: string }) {
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function advance(next: string) {
    setBusy(true);
    const supabase = createClient();
    const { error } = await supabase.from('jobs').update({ status: next }).eq('id', jobId);
    setBusy(false);
    if (error) alert(error.message);
    else router.refresh();
  }

  if (status === 'accepted') {
    return (
      <button onClick={() => advance('in_progress')} disabled={busy} className="btn-pro w-full">
        🚧 Start job now
      </button>
    );
  }

  if (status === 'in_progress') {
    return (
      <div className="card border-pro/20 bg-pro-soft p-5">
        <p className="font-bold text-pro">Job in progress</p>
        <p className="mt-1 text-sm text-pro/80">
          Work is underway. Mark it complete for the homeowner to review and release escrow.
        </p>
        <button onClick={() => advance('awaiting_confirmation')} disabled={busy} className="btn-primary mt-4 w-full">
          ✓ Mark complete — request homeowner sign-off
        </button>
      </div>
    );
  }

  if (status === 'awaiting_confirmation') {
    return (
      <div className="card border-amber-200 bg-amber-50 p-5">
        <p className="font-bold text-amber-700">Awaiting homeowner confirmation</p>
        <p className="mt-1 text-sm text-amber-700/80">
          Escrow releases once the homeowner confirms the job on their side.
        </p>
      </div>
    );
  }

  return null;
}