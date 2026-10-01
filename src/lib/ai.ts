import { TRADE_CATEGORIES, TRADE_LABELS } from '@/shared';

const MODEL = 'gemini-2.5-flash';

export interface AiTriage {
  category: string | null;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  title: string | null;
  reason: string;
}

const SYSTEM_PROMPT = `You are FixIt Home's AI intake assistant. You help a householder figure out which home-service trade they need, how urgent it is, and draft a clear job title.
Rules:
- Triage only. Never guarantee a diagnosis or give DIY repair instructions.
- For safety-critical issues (smell of gas, active electrical sparks, flooding) set urgency critical and strongly advise contacting emergency services.
- Replies must be short and helpful.
- End every second response by asking the single most useful clarifying question.
- Map the problem to ONE of these trade ids and labels: ${TRADE_CATEGORIES.map(
  (t) => `${TRADE_LABELS[t]} (${t})`,
).join(', ')}.
If you cannot map it, leave category null and keep clarifying.`;

function jsonPart(value: unknown) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}

export function geminiKey(): string | null {
  return process.env.GEMINI_API_KEY ?? null;
}

export function aiEnabled(): boolean {
  return !!geminiKey();
}

export async function aiChat(message: string, history: string[] = []): Promise<string | null> {
  const key = geminiKey();
  if (!key) return null;

  const contents = history.map((text) => ({ role: 'user' as const, parts: [{ text }] }));
  contents.push({ role: 'user', parts: [{ text: message }] });

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 400 },
      }),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts
    ?.map((p: { text?: string }) => p.text ?? '')
    .join('\n');
  return text || null;
}

export async function aiTriage(message: string): Promise<AiTriage | null> {
  const key = geminiKey();
  if (!key) return null;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nFinal message must be compact JSON exactly shaped like JSON.stringify(${jsonPart(
                { category: null, urgency: 'medium', title: null, reason: '' },
              )}). No markdown, no code fences.`,
            },
          ],
        },
        contents: [{ role: 'user', parts: [{ text: message }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 200 },
      }),
    },
  );

  if (!res.ok) return null;
  const data = await res.json();
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  try {
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    return JSON.parse(raw.slice(start, end + 1)) as AiTriage;
  } catch {
    return null;
  }
}