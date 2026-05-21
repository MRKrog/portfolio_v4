import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const CONTACT_ENDPOINT =
  process.env.GATSBY_CONTACT_ENDPOINT ||
  'https://q6gzuzpcyk.execute-api.us-east-1.amazonaws.com/prod/confirm';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledForm = styled.form`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;

  .field {
    margin-bottom: 1em;
  }

  label {
    display: block;
    font-size: 14px;
    margin-bottom: 6px;
    color: var(--m-medium-black);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.6em 0.75em;
    border: 1px solid #ccc;
    font-size: 16px;
    border-radius: 4px;
    background-color: #eeeeee;
    font-family: inherit;
    color: var(--m-black);

    &:focus-visible {
      border-color: var(--m-blue);
    }
  }

  textarea {
    height: 140px;
    resize: vertical;
  }

  .honey {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .submit {
    padding: 0.75em 1.5em;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.6em;

    &[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 3px solid rgba(255, 255, 255, 0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }

  .status {
    margin-top: 1em;
    padding: 0.75em 1em;
    border-radius: 4px;
    font-size: 14px;

    &.success {
      background: rgba(0, 136, 204, 0.12);
      color: var(--m-blue);
      border-left: 3px solid var(--m-blue);
    }
    &.error {
      background: rgba(220, 53, 69, 0.1);
      color: #b02a37;
      border-left: 3px solid #b02a37;
    }
  }
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({ email: '', message: '', website: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.website) {
      setStatus({ state: 'success', message: 'Thanks! Your message is on its way.' });
      return;
    }

    if (!formData.email.trim() || !formData.message.trim()) {
      setStatus({ state: 'error', message: 'Please add your email and a message.' });
      return;
    }

    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, message: formData.message }),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      setFormData({ email: '', message: '', website: '' });
      setStatus({
        state: 'success',
        message: 'Thanks! Your message is on its way — I&apos;ll reply soon.',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message: 'Something went wrong. Email me directly at michaelryankrog@gmail.com.',
      });
    }
  };

  const isLoading = status.state === 'loading';

  return (
    <StyledForm onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="email">Your Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>

      <div className="honey" aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex="-1"
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="email-link submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true" />
            <span>Sending…</span>
          </>
        ) : (
          'Send Message'
        )}
      </button>

      {status.state === 'success' && (
        <div className="status success" role="status">
          {status.message}
        </div>
      )}
      {status.state === 'error' && (
        <div className="status error" role="alert">
          {status.message}
        </div>
      )}
    </StyledForm>
  );
};

export default ContactForm;
