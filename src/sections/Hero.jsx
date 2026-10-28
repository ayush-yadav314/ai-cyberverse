import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import NeuralOrb from '../components/NeuralOrb'
import HeroTerminal from '../components/HeroTerminal'
import './Hero.css'

const line1 = ['BUILDING', 'INTELLIGENCE.']
const line2 = ['AUTOMATING', 'THE', 'IMPOSSIBLE.']

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const word = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Hero() {
  const reduce = useReducedMotion()

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <p className="hero__eyebrow">
          &gt; B.TECH CSE (AI) · ASPIRING AGENTIC AI DEVELOPER
        </p>

        <motion.h1
          className="hero__title"
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
        >
          <span className="hero__line">
            {line1.map((w) => (
              <motion.span key={w} variants={word} className="hero__word">
                {w}
              </motion.span>
            ))}
          </span>
          <span className="hero__line gradient-text">
            {line2.map((w) => (
              <motion.span key={w} variants={word} className="hero__word">
                {w}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="hero__intro"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          I'm Ayush — an aspiring Agentic AI Developer exploring autonomous
          systems, intelligent agents, and the future of AI.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <a href="#projects" className="btn btn--primary">
            Explore My Projects <ArrowRight size={18} />
          </a>
          <a href="#contact" className="btn btn--ghost">
            Let's Connect
          </a>
        </motion.div>
      </div>

        <div className="hero__visual">
        <NeuralOrb />
        <HeroTerminal />
      </div>
      <a href="#about" className="hero__scroll" aria-label="Scroll to About">
        <span>SCROLL</span>
        <ChevronDown size={20} />
      </a>
    </section>
  )
}

export default Hero