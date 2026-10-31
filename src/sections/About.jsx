import { motion, useReducedMotion } from 'motion/react'
import Tilt from '../components/Tilt'
import DsaLab from '../components/DsaLab'
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
  ['Also practising', 'DSA in Java'],
]

const learning = [
  'Agentic AI',
  'Multi-agent systems',
  'RAG',
  'LLM applications',
  'Java DSA',
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
        <motion.div className="about__side" {...reveal}>
          <Tilt className="about__card" max={6}>
            <div className="about__avatar">
              {PHOTO ? (
                <img src={PHOTO} alt="Ayush Yadav" />
              ) : (
                <span aria-hidden="true">AY</span>
              )}
            </div>
            <h3>Ayush Yadav</h3>
            <p className="about__role">AI Developer</p>
            <p className="about__status">
              <span aria-hidden="true" />
              Looking for internships
            </p>
            <dl className="about__facts">
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Tilt>
        </motion.div>

        <div className="about__main">
          <motion.header {...reveal}>
            <p className="about__eyebrow">&gt; 02 / ABOUT</p>
            <h2 className="about__title">
              My journey into <span className="gradient-text">AI</span>
            </h2>
            <div className="about__bio">
              <p>
                I'm a third-year B.Tech CSE (AI) student who learns by
                building. My focus is Generative AI, Agentic AI and LLM-based
                applications. I work mainly in Python and practise data
                structures and algorithms in Java.
              </p>
              <p>
                So far I've built an autonomous browser agent that runs on a
                local LLM, a multi-agent financial research assistant with
                LangGraph, and a full-stack workout tracker with an AI coach.
                Next, I want to go deeper into multi-agent systems and RAG.
              </p>
            </div>
          </motion.header>

          <motion.section
            className="about__learning"
            aria-labelledby="learning-title"
            {...reveal}
          >
            <h3 id="learning-title">CURRENTLY LEARNING</h3>
            <ul>
              {learning.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.section>

          <motion.div {...reveal}>
            <DsaLab />
          </motion.div>

          <h3 className="about__subhead">MY JOURNEY</h3>
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
                {item.tags?.length > 0 && (
                  <ul className="timeline__tags" aria-label="Technologies">
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default About