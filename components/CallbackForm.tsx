'use client';

import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { captureLandingAttribution, submitLead, type HelpFor, type Lead } from '@/lib/lead';
import { ArrowIcon, CheckIcon } from './Actions';

/**
 * The callback form from go.summitestate.com/outpatient (Nov 23 2026, Sergei):
 * name and phone, then "yourself or a loved one". "Myself" reveals the three
 * insurance-card fields as required; "Loved one" reveals the same three as
 * optional, sent as separately labelled loved_ones_* fields. Fields are kept out
 * of the DOM until revealed, so nothing hidden is tabbable or submitted.
 * The visitor is confirmed at once; delivery to CTM is best-effort.
 */
export type CallbackFormCopy = {
  name: string;
  phone: string;
  helpForLegend: string;
  myself: string;
  lovedOne: string;
  myselfNote: string;
  lovedOneNote: string;
  dob: string;
  provider: string;
  memberId: string;
  lovedOneDob: string;
  lovedOneProvider: string;
  lovedOnePolicyId: string;
  submitVerify: string;
  submitCallback: string;
  smallPrint: string;
  successTitle: string;
  successTextBefore: string;
  again: string;
};

const fieldClass =
  'w-full rounded-xl border border-se-field bg-se-paper px-4 py-3 text-base text-se-ink placeholder:text-[#9aa19f] focus:border-se-green-700';
const labelClass = 'mb-1.5 block font-medium text-se-ink';

function Label({ htmlFor, children, optional = false }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label className={labelClass} htmlFor={htmlFor}>
      {children}
      {optional ? (
        <span className="sr-only"> (optional)</span>
      ) : (
        <span className="ml-0.5 text-red-700" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export default function CallbackForm({
  copy,
  endpoint,
  phone,
  phoneHref,
}: {
  copy: CallbackFormCopy;
  endpoint: string;
  phone: string;
  phoneHref: string;
}) {
  const [sent, setSent] = useState(false);
  const [helpFor, setHelpFor] = useState<HelpFor | null>(null);
  const needsInsurance = helpFor === 'Myself';
  const forLovedOne = helpFor === 'Loved one';

  useEffect(() => {
    captureLandingAttribution();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setSent(true);
    const opt = (v?: string) => (v?.trim() ? v.trim() : undefined);
    const lead: Lead = {
      name: data.name ?? '',
      phone: data.phone ?? '',
      helpFor: (data.helpFor as HelpFor) ?? 'Myself',
      ...(needsInsurance ? { dob: data.dob, provider: data.provider, memberid: data.memberid } : {}),
      ...(forLovedOne
        ? Object.fromEntries(
            Object.entries({
              lovedOneDob: opt(data.lovedOneDob),
              lovedOneProvider: opt(data.lovedOneProvider),
              lovedOnePolicyId: opt(data.lovedOnePolicyId),
            }).filter(([, v]) => v),
          )
        : {}),
    };
    const result = await submitLead(endpoint, lead);
    if (!result.delivered) console.error('[lead] not delivered to CTM:', result.reason);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-se-line bg-se-paper p-8 text-center shadow-se-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-se-accent-600 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-se-green-700">{copy.successTitle}</h3>
        <p className="mt-2 leading-relaxed text-se-ink">
          {copy.successTextBefore}{' '}
          <a href={phoneHref} className="font-semibold text-se-green-700">
            {phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setHelpFor(null);
          }}
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full border-2 border-se-accent-600 bg-se-paper px-6 py-3 font-semibold text-se-green-700 transition-colors hover:bg-se-accent-100"
        >
          {copy.again}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-se-line bg-se-paper p-5 shadow-se-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="cb-name">{copy.name}</Label>
          <input id="cb-name" name="name" autoComplete="name" required className={fieldClass} placeholder="Jane Doe" />
        </div>
        <div>
          <Label htmlFor="cb-phone">{copy.phone}</Label>
          <input
            id="cb-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            required
            className={fieldClass}
            placeholder="(555) 555-5555"
          />
        </div>
      </div>

      <fieldset className="mt-5 min-w-0 border-0 p-0">
        <legend className={`${labelClass} p-0`}>
          {copy.helpForLegend}
          <span className="ml-0.5 text-red-700" aria-hidden="true">
            *
          </span>
        </legend>
        <div className="mt-1 grid grid-cols-2 gap-3">
          {(['Myself', 'Loved one'] as const).map((option) => {
            const active = helpFor === option;
            return (
              <label
                key={option}
                className={`flex min-h-12 cursor-pointer min-w-0 items-center justify-center gap-1.5 rounded-xl border px-1.5 py-3 text-left font-semibold leading-tight transition-colors min-[400px]:gap-2 min-[400px]:px-2 ${
                  active
                    ? 'border-se-accent-600 bg-se-accent-600 text-white'
                    : 'border-se-field bg-se-paper text-se-ink hover:border-se-green-600'
                }`}
              >
                <input
                  type="radio"
                  name="helpFor"
                  value={option}
                  required
                  checked={active}
                  onChange={() => setHelpFor(option)}
                  className="sr-only"
                />
                <ChoiceIcon pair={option === 'Loved one'} />
                {option === 'Myself' ? copy.myself : copy.lovedOne}
              </label>
            );
          })}
        </div>
      </fieldset>

      {needsInsurance && (
        <div className="mt-5 rounded-2xl border border-se-line bg-se-cream p-5">
          <p className="leading-relaxed text-se-ink">{copy.myselfNote}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="cb-dob">{copy.dob}</Label>
              <input id="cb-dob" name="dob" autoComplete="bday" inputMode="numeric" required className={fieldClass} placeholder="MM/DD/YYYY" />
            </div>
            <div>
              <Label htmlFor="cb-provider">{copy.provider}</Label>
              <input id="cb-provider" name="provider" required className={fieldClass} placeholder="e.g. Anthem, Aetna" />
            </div>
            <div>
              <Label htmlFor="cb-memberid">{copy.memberId}</Label>
              <input
                id="cb-memberid"
                name="memberid"
                autoCapitalize="characters"
                spellCheck={false}
                required
                className={fieldClass}
                placeholder="From the card"
              />
            </div>
          </div>
        </div>
      )}

      {forLovedOne && (
        <div className="mt-5 rounded-2xl border border-se-line bg-se-cream p-5">
          <p className="leading-relaxed text-se-ink">{copy.lovedOneNote}</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="cb-lo-dob" optional>
                {copy.lovedOneDob}
              </Label>
              <input id="cb-lo-dob" name="lovedOneDob" autoComplete="off" inputMode="numeric" className={fieldClass} placeholder="MM/DD/YYYY" />
            </div>
            <div>
              <Label htmlFor="cb-lo-provider" optional>
                {copy.lovedOneProvider}
              </Label>
              <input id="cb-lo-provider" name="lovedOneProvider" autoComplete="off" className={fieldClass} placeholder="e.g. Anthem, Aetna" />
            </div>
            <div>
              <Label htmlFor="cb-lo-policy" optional>
                {copy.lovedOnePolicyId}
              </Label>
              <input
                id="cb-lo-policy"
                name="lovedOnePolicyId"
                autoComplete="off"
                autoCapitalize="characters"
                spellCheck={false}
                className={fieldClass}
                placeholder="From their card"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-se-accent-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-se-green-900"
      >
        {needsInsurance ? copy.submitVerify : copy.submitCallback}
        <ArrowIcon />
      </button>
      <p className="mt-4 text-center leading-relaxed text-se-ink-muted">{copy.smallPrint}</p>
    </form>
  );
}

/** The two icons from the outpatient page's form: one person, or two people. */
function ChoiceIcon({ pair }: { pair: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0">
      {pair ? (
        <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.3a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8" />
      ) : (
        <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM5.5 20a6.5 6.5 0 0 1 13 0" />
      )}
    </svg>
  );
}
