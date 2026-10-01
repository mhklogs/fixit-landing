'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const ROLE_DESCRIPTIONS = {
  homeowner: 'I need to hire local pros for home repairs.',
  contractor: "I'm a verified professional who wants to earn from live job bids.",
} as const;

export default function SignupPage() {
  const [role, setRole] = useState<'homeowner' | 'contractor'>('homeowner');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role, full_name: fullName },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!data.user) {
      setError('Sign up failed. Please try again.');
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      role,
      full_name: fullName,
      account_status: role === 'homeowner' ? 'active' : 'pending',
    });

    if (profileError) {
      setError('Failed to create profile. Please try again.');
      setLoading(false);
      return;
    }

    router.push(role === 'contractor' ? '/onboarding' : '/dashboard');
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white font-bold">F</span>
          <span className="text-lg font-bold">FixIt</span>
        </Link>
        <div className="card p-8">
          <h1 className="text-xl font-bold">Join FixIt</h1>
          <p className="mt-1 text-sm text-ink-muted">Create your free account.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {(['homeowner', 'contractor'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-xl border-2 p-3 text-left transition-colors ${
                  role === r
                    ? 'border-brand bg-brand-soft'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <p className="font-semibold capitalize text-ink">{r}</p>
                <p className="mt-1 text-xs text-ink-muted">{ROLE_DESCRIPTIONS[r]}</p>
              </button>
            ))}
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label" htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="input"
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account…' : 'Create account'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-ink-muted">
            Have an account?{' '}
            <Link href="/login" className="font-semibold text-brand hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}