import { NextRequest, NextResponse } from 'next/server';
import { aiChat, aiEnabled, aiTriage } from '@/lib/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const { message, history, triage } = (await req.json().catch(() => ({}))) as {
    message?: string;
    history?: string[];
    triage?: boolean;
  };

  if (!message || !message.trim()) {
    return NextResponse.json({ error: 'Missing message.' }, { status: 400 });
  }

  if (!aiEnabled()) {
    return NextResponse.json({ enabled: false, reply: null });
  }

  if (triage) {
    const result = await aiTriage(message);
    const reply = await aiChat(message, history ?? []);
    return NextResponse.json({ enabled: true, reply, triage: result });
  }

  const reply = await aiChat(message, history ?? []);
  return NextResponse.json({ enabled: true, reply });
}