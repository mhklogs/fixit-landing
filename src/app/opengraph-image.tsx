import { ImageResponse } from 'next/og';

export const alt = 'FixIt Home — post a job, watch local pros bid live';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          padding: 72,
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 18,
              background: '#C2410C',
              color: '#FFFFFF',
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: '#1C1917' }}>FixIt Home</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 66, fontWeight: 800, color: '#1C1917', lineHeight: 1.1 }}>
            Post a job. Watch local pros bid live.
          </div>
          <div style={{ fontSize: 30, color: '#57534E', lineHeight: 1.4 }}>
            Free for homeowners · Escrow protected · Pay only when the work is done
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {['Plumbing', 'Electrical', 'HVAC', 'Roofing', 'Handyman'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '12px 22px',
                borderRadius: 999,
                background: '#FFF1E0',
                color: '#9A3412',
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}