import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import NeuralOrb from '../components/NeuralOrb'
import HeroTerminal from '../components/HeroTerminal'
import Magnetic from '../components/Magnetic'
import './Hero.css'

const line1 = ['BUILDING', 'INTELLIGENCE.']
const line2 = ['AUTOMATING', 'THE', 'IMPOSSIBLE.']

// Headline words come in after the name has finished animating
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } },
}

const word = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

// Name: one animated span per letter
const FIRST = 'AYUSH'.split('')
const LAST = 'YADAV'.split('')

const nameContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const letter = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const hoverLift = {
  y: -8,
  transition: { type: 'spring', stiffness: 400, damping: 12 },
}

function Hero() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 600], [0, 90])

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__identity">
          <motion.h1
            className="hero__name"
            variants={nameContainer}
            initial={reduce ? false : 'hidden'}
            animate="show"
          >
            <span className="sr-only">Ayush Yadav</span>

            <span className="hero__name-word" aria-hidden="true">
              {FIRST.map((ch, i) => (
                <motion.span
                  key={i}
                  className="hero__letter"
                  variants={letter}
                  whileHover={reduce ? undefined : hoverLift}
                >
                  {ch}
                </motion.span>
              ))}
            </span>

            <span
              className="hero__name-word hero__name-word--accent"
              aria-hidden="true"
            >
              {LAST.map((ch, i) => (
                <motion.span
                  key={i}
                  className="hero__letter hero__letter--accent"
                  style={{
                    backgroundPosition: `${(i / (LAST.length - 1)) * 100}% 0`,
                  }}
                  variants={letter}
                  whileHover={reduce ? undefined : hoverLift}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <span>AI DEVELOPER</span>
            <span className="hero__sep" aria-hidden="true">
              |
            </span>
            <span>ARTIFICIAL INTELLIGENCE</span>
            <span className="hero__sep" aria-hidden="true">
              |
            </span>
            <span>JAVA &amp; DSA</span>
          </motion.p>
        </div>

        <motion.h2
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
        </motion.h2>

        <motion.p
          className="hero__intro"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          I'm Ayush — an aspiring Agentic AI Developer exploring autonomous
          systems, intelligent agents, and the future of AI.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <Magnetic>
            <a href="#projects" className="btn btn--primary">
              Explore My Projects <ArrowRight size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn--ghost">
              Let's Connect
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className="hero__visual"
        style={reduce ? undefined : { y: orbY }}
      >
        <NeuralOrb />
        <HeroTerminal />
      </motion.div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to About">
        <span>SCROLL</span>
        <ChevronDown size={20} />
      </a>
    </section>
  )
}

export default Hero