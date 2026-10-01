import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const runtime = 'nodejs';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('job');

  const admin = createServerSupabaseAdmin();
  const me = user.id;

  if (jobId) {
    const { data: chat } = await admin
      .from('chats')
      .select('*')
      .eq('job_id', jobId)
      .maybeSingle();
    if (chat) {
      if (chat.homeowner_id !== me && chat.contractor_id !== me) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }
    const { data: messages } = await admin
      .from('chat_messages')
      .select('*')
      .eq('chat_id', chat?.id ?? '')
      .order('created_at', { ascending: true })
      .limit(200);
    void undefined;
    return NextResponse.json({ chat, messages: messages ?? [], me: user.id });
  }

  const { data: chats } = await admin
    .from('chats')
    .select('*, job:jobs(title, category, is_urgent, status)')
    .or(`homeowner_id.eq.${me},contractor_id.eq.${me}`)
    .order('created_at', { ascending: false })
    .limit(50);

  return NextResponse.json({ chats: chats ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { jobId, body } = (await req.json()) as { jobId?: string; body?: string };
  if (!jobId || !body?.trim()) {
    return NextResponse.json({ error: 'Missing jobId or body.' }, { status: 400 });
  }

  const admin = createServerSupabaseAdmin();
  const me = user.id;

  const { data: job } = await admin
    .from('jobs')
    .select('homeowner_id, contractor_id')
    .eq('id', jobId)
    .single();
  if (!job) return NextResponse.json({ error: 'Job not found.' }, { status: 404 });

  const isHomeowner = job.homeowner_id === me;
  const isContractor = job.contractor_id === me;
  if (!isHomeowner && !isContractor) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const homeownerId = job.homeowner_id;
  const contractorId = isHomeowner ? job.contractor_id! : me;

  let { data: chat } = await admin.from('chats').select('*').eq('job_id', jobId).maybeSingle();
  if (!chat) {
    const { data: inserted } = await admin
      .from('chats')
      .insert({ job_id: jobId, homeowner_id: homeownerId, contractor_id: contractorId, type: 'job' })
      .select('*')
      .single();
    chat = inserted;
  }

  if (!chat) return NextResponse.json({ error: 'Could not start conversation.' }, { status: 500 });

  const { data: message, error: insertError } = await admin
    .from('chat_messages')
    .insert({ chat_id: chat.id, sender_id: me, body: body.trim() })
    .select('*')
    .single();

  if (insertError || !message) {
    return NextResponse.json({ error: insertError?.message ?? 'Failed to send.' }, { status: 500 });
  }

  const { error: notifError } = await admin.from('notifications').insert({
    user_id: isHomeowner ? contractorId : homeownerId,
    type: 'chat',
    title: 'New message',
    body: body.trim().slice(0, 140),
    payload: { job_id: jobId },
  });
  void notifError;

  return NextResponse.json({ chat, message });
}