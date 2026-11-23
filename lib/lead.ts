/**
 * Callback form delivery, ported from go.summitestate.com/outpatient
 * (Summit-Landing-Pages Astro/src/lib/ctm.ts, Nov 2026).
 *
 * The browser posts the lead as JSON to settings.leadEndpoint; that server
 * route is the only thing that talks to CallTrackingMetrics (FormReactor), so
 * the FormReactor key never reaches the browser. On Summit's staging copy the
 * endpoint is go.summitestate.com's own /api/ctm-lead. For LGTC's own CTM
 * account, point leadEndpoint at LGTC's route (see README).
 */

const ATTRIBUTION_KEY = 'summit_attribution';

const ATTRIBUTION_PARAMS = [
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
  'campaign_id', 'adgroup_id', 'creative_id',
] as const;

export type HelpFor = 'Myself' | 'Loved one';

export type Lead = {
  name: string;
  phone: string;
  helpFor: HelpFor;
  dob?: string;
  provider?: string;
  memberid?: string;
  lovedOneDob?: string;
  lovedOneProvider?: string;
  lovedOnePolicyId?: string;
};

export type LeadResult = { delivered: boolean; ctmRefId?: number; reason?: string };

/** Snapshot ad params from the landing URL on first view (first write wins). */
export function captureLandingAttribution(): void {
  if (typeof window === 'undefined') return;
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of ATTRIBUTION_PARAMS) {
      const value = params.get(key);
      if (value) found[key] = value;
    }
    if (Object.keys(found).length === 0) return;
    found.landing_page = window.location.href;
    if (document.referrer) found.referrer = document.referrer;
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
  } catch {
    // Private browsing can throw on sessionStorage. Attribution is optional.
  }
}

function getAttribution(): Record<string, string> {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

declare global {
  interface Window {
    __ctm?: { config?: { sid?: string } };
  }
}

/** CTM's visitor session id, set by CTM's t.js when the host page loads it. */
function getVisitorSid(): string {
  try {
    const fromTracker = window.__ctm?.config?.sid;
    if (fromTracker) return fromTracker;
    const cookie = document.cookie.split(';').map((c) => c.trim()).find((c) => c.startsWith('__ctmid='));
    return cookie ? decodeURIComponent(cookie.slice('__ctmid='.length)) : '';
  } catch {
    return '';
  }
}

/** Resolves with the outcome rather than throwing; the visitor is never shown a failure. */
export async function submitLead(endpoint: string, lead: Lead): Promise<LeadResult> {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, visitor_sid: getVisitorSid(), attribution: getAttribution() }),
      keepalive: true,
    });
    return (await res.json()) as LeadResult;
  } catch {
    return { delivered: false, reason: 'network' };
  }
}
