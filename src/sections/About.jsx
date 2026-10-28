import { motion, useReducedMotion } from 'motion/react'
import { timeline } from '../data/timeline'
import './About.css'

// To show your photo: put the file in the public folder (for example
// public/profile.jpg) and set PHOTO = '/profile.jpg'
const PHOTO = null

const facts = [
  ['Degree', 'B.Tech CSE (Artificial Intelligence)'],
  ['College', 'Galgotias College of Engineering and Technology'],
  ['Years', '2024 – 2028 (currently 3rd year)'],
  ['Focus', 'Generative AI · Agentic AI · LLM apps'],
  ['Looking for', 'AI / GenAI / Agentic AI internships'],
]

function About() {
  const reduce = useReducedMotion()

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6 },
      }

  return (
    <section id="about" className="about">
      <div className="about__layout">
        <motion.aside className="about__card" {...reveal}>
          <div className="about__avatar">
            {PHOTO ? (
              <img src={PHOTO} alt="Ayush Yadav" />
            ) : (
              <span aria-hidden="true">AY</span>
            )}
          </div>
          <h3>Ayush Yadav</h3>
          <p className="about__role">Aspiring Agentic AI Developer</p>
          <dl className="about__facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>

        <div className="about__main">
          <motion.div {...reveal}>
            <p className="about__eyebrow">&gt; 02 / ABOUT</p>
            <h2 className="about__title">
              My journey into <span className="gradient-text">AI</span>
            </h2>
            <p className="about__bio">
              I'm a third-year B.Tech CSE (AI) student who learns by building.
              My focus is Generative AI, Agentic AI and LLM-based applications.
              So far I've built an autonomous browser agent that runs on a
              local LLM, and a multi-agent financial research assistant with
              LangGraph. Next, I want to go deeper into multi-agent systems
              and RAG.
            </p>
          </motion.div>

          <ol className="timeline">
            {timeline.map((item) => (
              <motion.li
                key={item.title}
                className="timeline__item"
                style={{ '--c': item.color }}
                {...reveal}
              >
                <span className="timeline__year">{item.year}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default About