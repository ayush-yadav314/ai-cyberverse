import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { agentStages } from '../data/agentStages'
import './AIUniverse.css'

const CX = 320
const CY = 310
const R = 215
const NODE_R = 36
const COUNT = agentStages.length

// Place every stage on a circle, and decide where its label goes
const nodes = agentStages.map((stage, i) => {
  const angle = -Math.PI / 2 + (i / COUNT) * Math.PI * 2
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const x = CX + R * cos
  const y = CY + R * sin

  let lx = x
  let ly = y
  let anchor = 'middle'

  if (cos > 0.5) {
    anchor = 'start'
    lx = x + NODE_R + 14
  } else if (cos < -0.5) {
    anchor = 'end'
    lx = x - NODE_R - 14
  } else if (sin < 0) {
    ly = y - NODE_R - 16
  } else {
    ly = y + NODE_R + 24
  }

  return { ...stage, x, y, lx, ly, anchor }
})

// Arrow from each node to the next one, trimmed so it doesn't touch the circles
const edges = nodes.map((from, i) => {
  const to = nodes[(i + 1) % COUNT]
  const dx = to.x - from.x
  const dy = to.y - from.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return {
    id: `${from.id}-${to.id}`,
    x1: from.x + ux * (NODE_R + 4),
    y1: from.y + uy * (NODE_R + 4),
    x2: to.x - ux * (NODE_R + 10),
    y2: to.y - uy * (NODE_R + 10),
  }
})

function AIUniverse() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduce = useReducedMotion()
  const active = nodes[activeIndex]

  return (
    <section id="universe" className="universe">
      <header className="universe__header">
        <p className="universe__eyebrow">&gt; 03 / AI UNIVERSE</p>
        <h2 className="universe__title">
          The <span className="gradient-text">Agent Loop</span>
        </h2>
        <p className="universe__lead">
          A chatbot answers once. An agent keeps going: it perceives, reasons,
          plans, uses tools, acts, observes the result, and loops until the
          goal is met. Select a stage to explore it.
        </p>
        <p className="universe__note">
          Concept diagram. The moving dashes are illustrative; this is not a
          live AI system.
        </p>
      </header>

      <div className="universe__layout">
        <svg
          className="universe__svg"
          viewBox="0 0 640 620"
          role="group"
          aria-label="Agent lifecycle diagram. Select a stage to read about it."
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto"
            >
              <path d="M0 0 L10 5 L0 10 z" fill="#8b5cf6" />
            </marker>
          </defs>

          {edges.map((edge, i) => (
            <line
              key={edge.id}
              className={`universe__edge ${i === activeIndex ? 'is-active' : ''}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              markerEnd="url(#arrow)"
            />
          ))}

          <text className="universe__center" x={CX} y={CY - 4} textAnchor="middle">
            AGENT LOOP
          </text>
          <text className="universe__center-sub" x={CX} y={CY + 24} textAnchor="middle">
            {active.label}
          </text>

          {nodes.map((node, i) => (
            <g
              key={node.id}
              className={`universe__node ${i === activeIndex ? 'is-active' : ''}`}
              style={{ '--c': node.color }}
              role="button"
              tabIndex={0}
              aria-pressed={i === activeIndex}
              aria-label={`Stage ${i + 1}: ${node.title}`}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveIndex(i)
                }
              }}
            >
              <circle cx={node.x} cy={node.y} r={NODE_R} />
              <text
                className="universe__num"
                x={node.x}
                y={node.y}
                dy=".35em"
                textAnchor="middle"
              >
                {String(i + 1).padStart(2, '0')}
              </text>
              <text
                className="universe__label"
                x={node.lx}
                y={node.ly}
                dy=".35em"
                textAnchor={node.anchor}
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>

        <div aria-live="polite">
          <motion.article
            key={active.id}
            className="universe__panel"
            style={{ '--c': active.color }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="universe__step">
              STAGE {activeIndex + 1} / {COUNT}
            </p>
            <h3>{active.title}</h3>
            <p className="universe__summary">{active.summary}</p>
            <p>{active.detail}</p>
            <p className="universe__example">
              <span>EXAMPLE</span> {active.example}
            </p>
          </motion.article>

          <p className="universe__memory">
            Memory and context sit underneath every stage: the agent carries
            what it has learned into the next step.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AIUniverse