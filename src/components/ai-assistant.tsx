'use client';

import { useEffect, useRef, useState } from 'react';

interface Msg {
  from: 'user' | 'ai';
  text: string;
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [available, setAvailable] = useState(true);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setMessages((m) => [...m, { from: 'user', text }]);
    setBusy(true);
    try {
      const res = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.filter((m) => m.from === 'user').map((m) => m.text),
          triage: messages.length === 0,
        }),
      });
      const data = await res.json();
      if (!data.enabled) {
        setAvailable(false);
        setMessages((m) => [
          ...m,
          {
            from: 'ai',
            text: 'AI assistant is warming up (not configured yet). Drop your problem below or pick a trade to post a job.',
          },
        ]);
      } else {
        const triageLine = data.triage?.category
          ? `\n\n🏷️ I\u2019d route this to: ${data.triage.category} · urgency: ${data.triage.urgency}.`
          : '';
        setMessages((m) => [...m, { from: 'ai', text: (data.reply ?? 'Thinking…') + triageLine }]);
      }
    } catch {
      setMessages((m) => [...m, { from: 'ai', text: 'Something went wrong. Try again in a moment.' }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[26rem] w-[20rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:right-6 sm:w-[22rem]">
          <div className="flex items-center justify-between bg-gradient-to-r from-brand to-brand-dark px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/20 text-sm">🤖</span>
              <div>
                <p className="text-sm font-bold">FixIt AI Assistant</p>
                <p className="text-[11px] text-white/80">Tells you the trade · urgency · what to do</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white" aria-label="Close">
              ✕
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto bg-canvas p-4">
            {messages.length === 0 && (
              <p className="rounded-xl bg-white p-3 text-sm text-ink-muted shadow-sm">
                Hi! What&apos;s going on at home? e.g. “water dripping from the ceiling” or “AC stopped cooling.”
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${
                  m.from === 'user'
                    ? 'ml-auto bg-brand text-white'
                    : 'mr-auto bg-white text-ink shadow-sm border border-slate-100'
                }`}
              >
                {m.text}
              </div>
            ))}
            {busy && <p className="text-xs text-ink-muted">Typing…</p>}
            <div ref={endRef} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-slate-100 bg-white p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe the problem…"
              className="field flex-1 !py-2"
              disabled={busy}
            />
            <button type="submit" className="btn-primary !px-4 !py-2" disabled={busy}>
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-dark text-2xl text-white shadow-xl hover:scale-105 transition-transform sm:right-6"
        aria-label="Open AI assistant"
      >
        {open ? '✕' : '🤖'}
      </button>
    </>
  );
}