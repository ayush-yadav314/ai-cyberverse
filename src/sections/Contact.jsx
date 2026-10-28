import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import './Contact.css'

// Paste your form endpoint here (for example a Formspree URL).
// While this is empty, the form stays disabled and says so honestly.
const FORM_ENDPOINT = ''

// Built from two parts so simple bots can't scrape it from the page
const EMAIL = ['ayushyadava9170', 'gmail.com'].join('@')

const links = [
  {
    label: 'GITHUB',
    value: 'ayush-yadav314',
    href: 'https://github.com/ayush-yadav314',
  },
  {
    label: 'LINKEDIN',
    value: 'ayush-yadav-634644321',
    href: 'https://www.linkedin.com/in/ayush-yadav-634644321/',
  },
  {
    label: 'LEETCODE',
    value: 'cseayush',
    href: 'https://leetcode.com/u/cseayush/',
  },
]

function Contact() {
  const reduce = useReducedMotion()
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const connected = FORM_ENDPOINT !== ''

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6 },
      }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!connected) return

    const form = e.currentTarget
    setStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      })

      if (response.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <motion.div {...reveal}>
        <p className="contact__eyebrow">&gt; 06 / CONTACT</p>
        <h2 className="contact__title">
          LET'S BUILD THE NEXT GENERATION OF{' '}
          <span className="gradient-text">INTELLIGENT SYSTEMS.</span>
        </h2>
        <p className="contact__lead">
          I'm a student looking for AI, GenAI and Agentic AI internship
          opportunities. If you are building something in this space, or just
          want to talk about it, I'd love to hear from you.
        </p>
      </motion.div>

      <div className="contact__grid">
        <motion.div {...reveal}>
          <Magnetic>
            <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
              <Mail size={18} /> {EMAIL}
            </a>
          </Magnetic>

          <ul className="contact__links">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <span className="contact__label">{link.label}</span>
                  <span className="contact__value">{link.value}</span>
                  <ArrowUpRight size={20} />
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.form className="contact__form" onSubmit={handleSubmit} {...reveal}>
          <h3>Send a message</h3>

          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" required autoComplete="name" />

          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" />

          <label htmlFor="cf-message">Message</label>
          <textarea id="cf-message" name="message" rows="5" required />

          {/* Honeypot: real people never see or fill this field */}
          <input
            className="contact__trap"
            name="_gotcha"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <button
            type="submit"
            className="btn btn--primary"
            disabled={!connected || status === 'sending'}
          >
            <Send size={16} />
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>

          {!connected && (
            <p className="contact__note">
              This form is not connected to a service yet, so it cannot send
              anything. Please use the email button above.
            </p>
          )}
          {status === 'sent' && (
            <p className="contact__note contact__note--ok" role="status">
              Thanks! Your message was sent.
            </p>
          )}
          {status === 'error' && (
            <p className="contact__note contact__note--bad" role="status">
              Something went wrong. Please email me directly instead.
            </p>
          )}
        </motion.form>
      </div>

      <footer className="contact__footer">
        <span>© 2026 Ayush Yadav · Built with React, Vite and Motion</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  )
}

export default Contact