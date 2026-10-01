import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export default async function MessagesPage({ searchParams }: { searchParams: { job?: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  if (searchParams.job) redirect(`/messages/${searchParams.job}`);

  const admin = createServerSupabaseAdmin();
  const me = user.id;
  const { data: chats } = await admin
    .from('chats')
    .select('id, job_id, created_at, job:jobs(title, is_urgent, status)')
    .or(`homeowner_id.eq.${me},contractor_id.eq.${me}`)
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <div className="mx-auto max-w-3xl py-10">
      <h1 className="text-2xl font-extrabold tracking-tight">Messages</h1>
      <p className="mt-1 text-sm text-ink-muted">Job chats between you and the contractor.</p>

      {(!chats || chats.length === 0) ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-14 text-center">
          <p className="text-3xl">💬</p>
          <p className="mt-3 font-semibold">No conversations yet</p>
          <p className="mt-1 text-sm text-ink-muted">
            Once you accept a bid (or get hired), messaging unlocks right here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {chats.map((c: any) => (
            <li key={c.id}>
              <Link
                href={`/messages/${c.job_id}`}
                className="card flex items-center justify-between p-4 transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="font-semibold">{c.job?.title ?? 'Job chat'}</p>
                  <p className="text-xs text-ink-muted">
                    {c.job?.status} · started {new Date(c.created_at).toLocaleString()}
                  </p>
                </div>
                <span className="text-brand">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}