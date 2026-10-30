import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Check, Mail, Send } from 'lucide-react'
import Magnetic from '../components/Magnetic'
import './Contact.css'

// Paste your Formspree endpoint here, for example
// 'https://formspree.io/f/xxxxxxxx'
// While this is empty, the form stays disabled and says so honestly.
const FORM_ENDPOINT = 'https://formspree.io/f/xrpplnwq'

// Built from two parts so simple bots can't scrape it from the page
const EMAIL = ['ayushyadava9170', 'gmail.com'].join('@')

const MAX_LENGTH = 1000

const topics = [
  'Internship opportunity',
  'Project collaboration',
  'Just saying hi',
]

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
  const [sentName, setSentName] = useState('')
  const [length, setLength] = useState(0)
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
    if (!connected || status === 'sending') return

    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSentName(String(data.name || '').trim().split(' ')[0])
        setLength(0)
        setStatus('sent')
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

        <motion.div {...reveal}>
          {status === 'sent' ? (
            <div className="contact__sent" role="status">
              <span className="contact__check">
                <Check size={30} aria-hidden="true" />
              </span>
              <h3>Thanks{sentName ? `, ${sentName}` : ''}!</h3>
              <p>
                Your message was sent to my inbox. If you left a valid email
                address, I can reply to it directly.
              </p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => setStatus('idle')}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit}>
              <h3>Send a message</h3>
              <p className="contact__sub">
                Internship opportunities and project ideas are welcome.
              </p>

              <fieldset className="contact__topics">
                <legend>What is this about?</legend>
                <div>
                  {topics.map((topic, i) => (
                    <label key={topic} className="contact__topic">
                      <input
                        type="radio"
                        name="topic"
                        value={topic}
                        defaultChecked={i === 0}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label htmlFor="cf-name">Name</label>
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                maxLength={80}
                autoComplete="name"
              />

              <label htmlFor="cf-email">Email</label>
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
              />

              <label htmlFor="cf-message">Message</label>
              <textarea
                id="cf-message"
                name="message"
                rows="5"
                required
                minLength={10}
                maxLength={MAX_LENGTH}
                onChange={(e) => setLength(e.target.value.length)}
              />
              <p className="contact__count">
                {length} / {MAX_LENGTH}
              </p>

              <input
                type="hidden"
                name="_subject"
                defaultValue="New message from the AI CYBERVERSE portfolio"
              />

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
                  This form is not connected to a service yet, so it cannot
                  send anything. Please use the email button instead.
                </p>
              )}
              {connected && status !== 'error' && (
                <p className="contact__note">
                  Your message is sent through Formspree to my inbox, and I
                  will only use your details to reply.
                </p>
              )}
              {status === 'error' && (
                <p className="contact__note contact__note--bad" role="alert">
                  Something went wrong, so your message was not sent. Please
                  email me directly at{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </p>
              )}
            </form>
          )}
        </motion.div>
      </div>

      <footer className="contact__footer">
        <span>© 2026 Ayush Yadav · Built with React, Vite and Motion</span>
        <a href="#home">Back to top ↑</a>
      </footer>
    </section>
  )
}

export default Contact