import React, { useState } from 'react';
import { site } from '../../data/site.js';
import styles from './ContactForm.module.css';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: ''
};

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!values.email.trim() && !values.phone.trim()) errors.contact = 'Add an email address or phone number.';
  if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.';
  if (values.subject.trim().length < 3) errors.subject = 'Tell me briefly what you would like to discuss.';
  if (values.message.trim().length < 10) errors.message = 'Please add a little more detail to your message.';
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.email}`;

  function onChange(event) {
    const next = { ...values, [event.target.name]: event.target.value };
    setValues(next);
    if (Object.keys(errors).length) setErrors(validate(next));
  }

  async function onSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (values.website) {
      setValues(initialForm);
      setState('success');
      setStatusMessage('Thank you. Your message was received.');
      return;
    }

    setState('sending');
    setStatusMessage('Sending your message…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
          _replyto: values.email.trim(),
          _subject: `Portfolio contact — ${values.subject.trim()}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.success === 'false' || payload.success === false) {
        throw new Error(payload.message || 'The form service could not accept the message.');
      }

      setValues(initialForm);
      setErrors({});
      setState('success');
      setStatusMessage('Message sent. Thank you — I will get back to you as soon as possible.');
    } catch (error) {
      setState('error');
      setStatusMessage(`I could not send the form right now. You can email me directly at ${site.email}.`);
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.twoColumns}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
          <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={onChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'contact-name-error' : undefined} />
          {errors.name && <small id="contact-name-error" className={styles.error}>{errors.name}</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" name="email" autoComplete="email" value={values.email} onChange={onChange} aria-invalid={Boolean(errors.email || errors.contact)} />
          {errors.email && <small className={styles.error}>{errors.email}</small>}
        </div>
      </div>

      <div className={styles.twoColumns}>
        <div className={styles.field}>
          <label htmlFor="contact-phone">Phone</label>
          <input id="contact-phone" type="tel" name="phone" autoComplete="tel" value={values.phone} onChange={onChange} aria-invalid={Boolean(errors.contact)} />
          {errors.contact && <small className={styles.error}>{errors.contact}</small>}
        </div>
        <div className={styles.field}>
          <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
          <input id="contact-subject" name="subject" value={values.subject} onChange={onChange} aria-invalid={Boolean(errors.subject)} />
          {errors.subject && <small className={styles.error}>{errors.subject}</small>}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
        <textarea id="contact-message" name="message" rows="7" value={values.message} onChange={onChange} aria-invalid={Boolean(errors.message)} />
        {errors.message && <small className={styles.error}>{errors.message}</small>}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex="-1" autoComplete="off" value={values.website} onChange={onChange} />
      </div>

      <div className={styles.submitRow}>
        <button className="button button-primary" type="submit" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p className={`${styles.status} ${state === 'error' ? styles.statusError : ''}`} aria-live="polite">{statusMessage}</p>
      </div>
    </form>
  );
}
