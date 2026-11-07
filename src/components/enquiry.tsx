 'use client';

import {useRef, useState, type FormEvent} from 'react';
import s from './site.module.css';

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

export function Enquiry({initialJourney}:{initialJourney:string}) {
  const sending = useRef(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [receipt, setReceipt] = useState<{name:string;email:string;city:string;journey:string;message:string}|null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessKey || sending.current) return;
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const sent = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      city: String(data.get('city') ?? ''),
      journey: String(data.get('journey') ?? ''),
      message: String(data.get('message') ?? ''),
    };
    data.set('access_key', accessKey);
    sending.current = true;
    setStatus('sending');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: {Accept: 'application/json'},
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) throw new Error('Submission not confirmed');
      form.reset();
      setReceipt(sent);
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <form className={s.form} onSubmit={submit} onChange={() => {if (status !== 'sending') {setReceipt(null); setStatus('idle');}}} aria-busy={status === 'sending'}>
      <input type="hidden" name="subject" value="New Veqo website enquiry" />
      <input type="hidden" name="from_name" value="Veqo website" />
      <input type="checkbox" name="botcheck" style={{display:'none'}} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <h2>Put your idea into words.</h2>
      <p id="form-note">{accessKey ? <>Your details are sent through Web3Forms to Veqo so we can respond to your enquiry. <a href="/privacy-policy">Privacy details</a>.</> : <>The enquiry form is being connected. Please email <a href="mailto:helloveqo@gmail.com">helloveqo@gmail.com</a> for now.</>}</p>
      <fieldset disabled={!accessKey || status === 'sending'} style={{display:'grid', gap:22, border:0, padding:0, margin:0, minWidth:0}}>
        <legend style={{position:'absolute', width:1, height:1, overflow:'hidden', clipPath:'inset(50%)'}}>Your enquiry</legend>
      <label htmlFor="enquiry-journey"><span id="journey-label">I’m interested in</span><select aria-labelledby="journey-label" id="enquiry-journey" name="journey" defaultValue={initialJourney}><option value="student">Student project guidance</option><option value="business">SaaS / business development</option><option value="other">Something else</option></select></label><label htmlFor="enquiry-name">Your name<input id="enquiry-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="enquiry-email">Email<input id="enquiry-email" name="email" type="email" inputMode="email" autoCapitalize="none" autoComplete="email" spellCheck={false} required maxLength={254} aria-describedby="email-hint"/><small id="email-hint">Enter a valid email address, such as name@example.com.</small></label><label htmlFor="enquiry-city"><span id="city-label">City</span><select aria-labelledby="city-label" id="enquiry-city" name="city" defaultValue="" required><option value="" disabled>Select your city</option>{['Bengaluru','Chennai','Coimbatore','Other'].map(c=><option key={c}>{c}</option>)}</select></label><label htmlFor="enquiry-message">What would you like to explore?<textarea id="enquiry-message" name="message" required minLength={20} maxLength={3000} rows={5} placeholder="Tell us about your idea, goals, and any important dates." aria-describedby="message-hint"/></label><small id="message-hint">20–3,000 characters. Please leave out confidential or sensitive information.</small>
<button className={s.button} type="submit" aria-describedby="form-note">{status === 'sending' ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <div className={s.formStatus} data-state={status} role={status === 'error' ? 'alert' : 'status'} aria-live={status === 'error' ? 'assertive' : 'polite'}>
        {status === 'success' && receipt && <><strong>Enquiry submitted successfully.</strong><p>Web3Forms accepted it for delivery to Veqo. We’ll reply to <b>{receipt.email}</b>.</p><details><summary>Review what you sent</summary><dl><dt>Name</dt><dd>{receipt.name}</dd><dt>Email</dt><dd>{receipt.email}</dd><dt>Interested in</dt><dd>{receipt.journey === 'student' ? 'Student project guidance' : receipt.journey === 'business' ? 'SaaS / business development' : 'Something else'}</dd><dt>City</dt><dd>{receipt.city}</dd><dt>Message</dt><dd>{receipt.message}</dd></dl></details></>}
        {status === 'error' && <p>We couldn’t confirm your enquiry was sent. Your details are still here. Please try again or email helloveqo@gmail.com. If the connection timed out, your message may still have reached us.</p>}
      </div>
      <noscript><p>Please enable JavaScript to use this form, or email us directly.</p></noscript>
      <p>Prefer email, or having trouble with the form? <a href="mailto:helloveqo@gmail.com">Email helloveqo@gmail.com</a>.</p>
    </form>
  );
}
