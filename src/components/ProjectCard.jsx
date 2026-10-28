import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const kindLabel = {
  user: 'YOU',
  code: 'CODE',
  tool: 'TOOL',
  ai: 'AI',
  data: 'DATA',
  ui: 'UI',
}

function ProjectCard({ project, flip }) {
  const [step, setStep] = useState(0)
  const reduce = useReducedMotion()

  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-100px' },
        transition: { duration: 0.7 },
      }

  return (
    <motion.article
      className={`project ${flip ? 'project--flip' : ''}`}
      style={{ '--c': project.color }}
      {...reveal}
    >
      <div className="project__visual">
        {project.screenshot ? (
          <img
            src={project.screenshot}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
          />
        ) : (
          <div className="project__art" aria-hidden="true">
            <span className="project__num">{project.index}</span>
            <span className="project__art-tag">{project.year}</span>
          </div>
        )}
      </div>

      <div className="project__body">
        <p className="project__year">{project.year}</p>
        <h3 className="project__title">{project.title}</h3>
        <p className="project__tagline">{project.tagline}</p>

        <h4>PROBLEM</h4>
        <p>{project.problem}</p>

        <h4>APPROACH</h4>
        <p>{project.approach}</p>

        <h4>KEY FEATURES</h4>
        <ul className="project__features">
          {project.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>

        <ul className="project__stack" aria-label="Technology stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="flow">
          <h4>HOW IT WORKS · SELECT A STEP</h4>
          <ol className="flow__list">
            {project.flow.map((node, i) => (
              <li key={node.label}>
                <button
                  type="button"
                  className={`flow__node ${i === step ? 'is-active' : ''}`}
                  data-kind={node.kind}
                  aria-pressed={i === step}
                  onClick={() => setStep(i)}
                  onMouseEnter={() => setStep(i)}
                  onFocus={() => setStep(i)}
                >
                  <span className="flow__kind">{kindLabel[node.kind]}</span>
                  <span>{node.label}</span>
                </button>
              </li>
            ))}
          </ol>
          <p className="flow__desc" aria-live="polite">
            {project.flow[step].desc}
          </p>
          {project.flowNote && (
            <p className="flow__note">{project.flowNote}</p>
          )}
        </div>

        {project.disclaimer && (
          <p className="project__disclaimer">{project.disclaimer}</p>
        )}

        <div className="project__links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            GitHub <ArrowUpRight size={16} />
          </a>
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Live demo <ArrowUpRight size={16} />
            </a>
          ) : (
            <span className="project__nodemo">Live demo: not available</span>
          )}
        </div>
        {project.demoNote && (
          <p className="project__hint">{project.demoNote}</p>
        )}

        <details className="project__details">
          <summary>Technical details and limitations</summary>
          {project.details.map((d) => (
            <div key={d.q}>
              <h5>{d.q}</h5>
              <p>{d.a}</p>
            </div>
          ))}
          <h5>Limitations</h5>
          <ul>
            {project.limitations.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </details>
      </div>
    </motion.article>
  )
}

export default ProjectCard