'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface Message {
  id: string;
  sender_id: string;
  body: string;
  created_at: string;
}

export default function JobThread({ jobId }: { jobId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [meId, setMeId] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  async function load() {
    const res = await fetch(`/api/messages?job=${jobId}`);
    const data = await res.json();
    if (!res.ok) {
      setLoadError(data.error ?? 'Could not load the conversation.');
      return;
    }
    setMessages(data.messages ?? []);
    setMeId(data.me ?? null);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const body = input.trim();
    if (!body || busy) return;
    setInput('');
    setBusy(true);
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobId, body }),
    });
    setBusy(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      alert(d.error ?? 'Failed to send.');
      return;
    }
    await load();
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col py-6">
      <Link href="/messages" className="mb-4 inline-block text-sm font-medium text-brand hover:underline">
        ← Back to conversations
      </Link>
      <div className="card flex h-[65vh] flex-col overflow-hidden">
        <div className="border-b border-slate-100 bg-canvas px-5 py-3">
          <p className="text-sm font-bold">Job conversation</p>
          <p className="text-xs text-ink-muted">Direct line between homeowner and contractor</p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-canvas p-5">
          {loadError && <p className="text-sm text-red-600">{loadError}</p>}
          {messages.length === 0 && !loadError && (
            <p className="text-sm text-ink-muted">Say hello — start the conversation about this job.</p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                m.sender_id === meId
                  ? 'ml-auto bg-brand text-white'
                  : 'mr-auto border border-slate-100 bg-white text-ink shadow-sm'
              }`}
            >
              {m.body}
              <p className={`mt-1 text-[10px] ${m.sender_id === meId ? 'text-white/70' : 'text-ink-muted'}`}>
                {new Date(m.created_at).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <form onSubmit={send} className="flex gap-2 border-t border-slate-100 bg-white p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message…"
            className="field flex-1 !py-2"
            disabled={busy}
          />
          <button type="submit" className="btn-primary !px-4 !py-2" disabled={busy}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}