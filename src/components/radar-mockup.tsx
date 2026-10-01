'use client';

import { useEffect, useState } from 'react';

interface BidPill {
  id: number;
  contractor: string;
  price: number;
  eta: number;
  rating: number;
  x: number;
  y: number;
}

const INITIAL_BIDS: BidPill[] = [
  { id: 1, contractor: 'Marcus \u2014 HVAC Pro', price: 349, eta: 14, rating: 4.9, x: -70, y: -18 },
  { id: 2, contractor: 'Green Line Plumbing', price: 395, eta: 22, rating: 4.7, x: 66, y: 26 },
];

const INCOMING = [
  { contractor: 'Statewide Electrical', price: 318, eta: 30, rating: 4.8, x: 30, y: -62 },
  { contractor: 'Ace Handyman Co.', price: 275, eta: 45, rating: 4.5, x: -40, y: 58 },
  { contractor: 'Brighton HVAC', price: 335, eta: 18, rating: 4.9, x: 78, y: -34 },
];

export default function RadarMockup() {
  const [bids, setBids] = useState<BidPill[]>(INITIAL_BIDS);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setPulse((p) => (p + 1) % 4);
      if (i < INCOMING.length) {
        const next = { ...INCOMING[i]!, id: bids.length + i + 1 };
        setBids((prev) => [...prev, next]);
        i++;
      }
    }, 1800);
    return () => clearInterval(timer);
  }, [bids.length]);

  return (
    <div className="relative aspect-square w-full max-w-lg mx-auto">
      <div className="absolute inset-0 rounded-full bg-brand/5" />
      <div className="absolute inset-[18%] rounded-full bg-brand/5" />
      <div className="absolute inset-[36%] rounded-full bg-brand/5" />
      <div className="absolute left-1/2 top-1/2 h-[2px] w-[120%] -translate-x-1/2 -translate-y-1/2 bg-brand/10" />
      <div className="absolute left-1/2 top-1/2 h-[120%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-brand/10" />

      {/* Sweeping beam */}
      <div
        className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-bottom-left"
        style={{
          transform: `rotate(${pulse * 90}deg)`,
          background:
            'conic-gradient(from 0deg, rgba(194,65,12,0.07), rgba(194,65,12,0) 60deg)',
          transition: 'transform 1400ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Center job pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/30">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-2xl bg-brand opacity-40" />
          <svg className="relative h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M20.23 15.36a9 9 0 10-16.46 0L9 21h6l5.23-5.64z" />
          </svg>
        </div>
        <p className="mt-2 text-center text-sm font-bold text-ink">
          Water heater
          <span className="block font-normal text-ink-muted">leaking · live now</span>
        </p>
      </div>

      {/* Incoming bid pills */}
      {bids.map((b, idx) => (
        <div
          key={b.id}
          className="absolute w-40"
          style={{ left: `calc(50% + ${b.x}px)`, top: `calc(50% + ${b.y}px)` }}
        >
          <div
            className="rounded-xl border border-line bg-white p-3 shadow-card"
            style={{ animation: `fadeIn 500ms ease both`, animationDelay: `${(bids.length - idx) * -1 * 0}ms` }}
          >
            <p className="truncate text-xs font-semibold text-ink">{b.contractor}</p>
            <div className="mt-1 flex items-end justify-between">
              <span className="text-sm font-bold text-brand">${b.price}</span>
              <span className="text-xs text-ink-muted">arrives in {b.eta} min</span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-ink-muted">
              <span className="text-amber-500">★</span>
              {b.rating.toFixed(1)}
              <span className="rounded-full bg-brand-soft px-2 py-px font-semibold text-brand-dark">Verified</span>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}