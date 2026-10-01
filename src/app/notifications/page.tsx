import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import MarkAllRead from './mark-all-read';

export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(50);

  const unread = (notifications ?? []).filter((n: any) => !n.read).length;

  return (
    <div className="mx-auto max-w-2xl py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Notifications</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {unread > 0 ? `${unread} unread` : 'You’re all caught up'}
          </p>
        </div>
        {unread > 0 && <MarkAllRead />}
      </div>

      {(!notifications || notifications.length === 0) ? (
        <div className="mt-8 rounded-2xl border-2 border-dashed border-slate-200 p-14 text-center">
          <p className="text-3xl">🔔</p>
          <p className="mt-3 font-semibold">Nothing here yet</p>
          <p className="mt-1 text-sm text-ink-muted">
            New bids, messages, and job updates will land here.
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {notifications.map((n: any) => (
            <li key={n.id} className={`card flex items-start gap-3 p-4 ${!n.read ? 'border-brand/30 bg-brand-soft/40' : ''}`}>
              <span className="text-xl">{!n.read ? '🟠' : '⚪'}</span>
              <div className="flex-1">
                <p className="font-semibold">{n.title}</p>
                {n.body && <p className="mt-0.5 text-sm text-ink-muted">{n.body}</p>}
                {n.payload?.job_id && (
                  <a href={`/dashboard/homeowner/jobs/${n.payload.job_id}`} className="mt-1 inline-block text-xs font-medium text-brand hover:underline">
                    View job →
                  </a>
                )}
              </div>
              <span className="shrink-0 text-xs text-ink-muted">{new Date(n.created_at).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}