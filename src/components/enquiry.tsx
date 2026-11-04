 'use client';

import {useRef, useState, type FormEvent} from 'react';
import s from './site.module.css';

const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();

export function Enquiry({initialJourney}:{initialJourney:string}) {
  const sending = useRef(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessKey || sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
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
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  return (
    <form className={s.form} onSubmit={submit} aria-busy={status === 'sending'}>
      <input type="hidden" name="subject" value="New Veqo website enquiry" />
      <input type="hidden" name="from_name" value="Veqo website" />
      <input type="checkbox" name="botcheck" style={{display:'none'}} tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <h2>Put your idea into words.</h2>
      <p id="form-note">{accessKey ? <>Your details are sent through Web3Forms to Veqo so we can respond to your enquiry. <a href="/privacy-policy">Privacy details</a>.</> : <>The enquiry form is being connected. Please email <a href="mailto:helloveqo@gmail.com">helloveqo@gmail.com</a> for now.</>}</p>
      <fieldset disabled={!accessKey || status === 'sending'} style={{display:'grid', gap:22, border:0, padding:0, margin:0, minWidth:0}}>
        <legend style={{position:'absolute', width:1, height:1, overflow:'hidden', clipPath:'inset(50%)'}}>Your enquiry</legend>
      <label htmlFor="enquiry-journey"><span id="journey-label">I’m interested in</span><select aria-labelledby="journey-label" id="enquiry-journey" name="journey" defaultValue={initialJourney}><option value="student">Student project guidance</option><option value="business">SaaS / business development</option><option value="other">Something else</option></select></label><label htmlFor="enquiry-name">Your name<input id="enquiry-name" name="name" autoComplete="name" required maxLength={100}/></label><label htmlFor="enquiry-email">Email<input id="enquiry-email" name="email" type="email" autoComplete="email" required maxLength={254}/></label><label htmlFor="enquiry-city"><span id="city-label">City</span><select aria-labelledby="city-label" id="enquiry-city" name="city" defaultValue="" required><option value="" disabled>Select your city</option>{['Bengaluru','Chennai','Coimbatore','Other'].map(c=><option key={c}>{c}</option>)}</select></label><label htmlFor="enquiry-message">What would you like to explore?<textarea id="enquiry-message" name="message" required minLength={20} maxLength={3000} rows={5} placeholder="Tell us about your idea, goals, and any important dates." aria-describedby="message-hint"/></label><small id="message-hint">20–3,000 characters. Please leave out confidential or sensitive information.</small>
<button className={s.button} type="submit" aria-describedby="form-note">{status === 'sending' ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <div role="status" aria-live="polite">
        {status === 'success' && <p>Thank you. Your enquiry has been submitted successfully.</p>}
        {status === 'error' && <p>We couldn’t confirm your enquiry was sent. Your details are still here. Please try again or email helloveqo@gmail.com. If the connection timed out, your message may still have reached us.</p>}
      </div>
      <noscript><p>Please enable JavaScript to use this form, or email us directly.</p></noscript>
      <p>Prefer email, or having trouble with the form? <a href="mailto:helloveqo@gmail.com">Email helloveqo@gmail.com</a>.</p>
    </form>
  );
}
