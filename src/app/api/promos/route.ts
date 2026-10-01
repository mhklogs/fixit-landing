import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createServerSupabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

function routeClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    },
  );
}

export async function POST(req: Request) {
  try {
    const supabase = routeClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 });
    }

    const body = await req.json();
    const {
      code,
      type,
      benefitBps,
      maxUses,
      referrerId,
      referrerBonusCreditsCents,
      expiresAt,
    } = body;

    if (!code || !['homeowner_discount', 'contractor_bonus'].includes(type)) {
      return NextResponse.json({ error: 'Code and valid type required' }, { status: 400 });
    }
    const bps = Number(benefitBps) || 0;
    if (bps < 0 || bps > 10000) {
      return NextResponse.json({ error: 'Benefit must be 0–10000 bps (0–100%)' }, { status: 400 });
    }

    const admin = createServerSupabaseAdmin();
    const { data, error } = await admin
      .from('promo_codes')
      .insert({
        code: code.toUpperCase().trim(),
        type,
        discount_bps: type === 'homeowner_discount' ? bps : 0,
        bonus_bps: type === 'contractor_bonus' ? bps : 0,
        max_uses: Math.max(1, Number(maxUses) || 100),
        referrer_id: referrerId || null,
        referrer_bonus_credits_cents: Math.max(0, Number(referrerBonusCreditsCents) || 0),
        expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
        created_by: user.id,
      })
      .select('code')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'That code already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('admin/promos error', err);
    return NextResponse.json({ error: 'Failed to create promo' }, { status: 500 });
  }
}