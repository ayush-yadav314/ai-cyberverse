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
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 600], [0, 90])

  return (
    <section id="home" className="hero">
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__content">
        <motion.div
          className="hero__identity"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="hero__name">
            <span>AYUSH</span>{' '}
            <span className="hero__name-accent">YADAV</span>
          </h1>
          <p className="hero__subtitle">
            <span>AI DEVELOPER</span>
            <span className="hero__sep" aria-hidden="true">|</span>
            <span>ARTIFICIAL INTELLIGENCE</span>
            <span className="hero__sep" aria-hidden="true">|</span>
            <span>JAVA &amp; DSA</span>
          </p>
        </motion.div>

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