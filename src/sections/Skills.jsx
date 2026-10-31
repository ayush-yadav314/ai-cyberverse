import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { clusters, projects, skills } from '../data/skills'
import './Skills.css'

const ORBIT = 90

// Place every skill on a ring around its cluster, and decide where its label goes
const nodes = clusters.flatMap((cluster) => {
  const group = skills.filter((s) => s.cluster === cluster.id)
  return group.map((skill, i) => {
    const angle = -Math.PI / 2 + (i / group.length) * Math.PI * 2
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    const x = cluster.cx + ORBIT * cos
    const y = cluster.cy + ORBIT * sin

    let lx = x
    let ly = y
    let anchor = 'middle'
        if (cos > 0.3) {
      anchor = 'start'
      lx = x + 24
    } else if (cos < -0.3) {
      anchor = 'end'
      lx = x - 24
    } else if (sin < 0) {
      ly = y - 26
    } else {
      ly = y + 34
    }

    return { ...skill, color: cluster.color, x, y, lx, ly, anchor }
  })
})

function Skills() {
  const [selectedId, setSelectedId] = useState('langgraph')
  const reduce = useReducedMotion()

  const selectedProject = projects.find((p) => p.id === selectedId)
  const selectedSkill = nodes.find((n) => n.id === selectedId)

  // Which skills are "lit" and which lines to draw
  const litSkillIds = selectedProject
    ? nodes.filter((n) => n.projects.includes(selectedId)).map((n) => n.id)
    : [selectedId]

  const links = selectedProject
    ? litSkillIds.map((skillId) => ({ skillId, projectId: selectedId }))
    : selectedSkill.projects.map((projectId) => ({
        skillId: selectedId,
        projectId,
      }))

  const litProjectIds = links.map((l) => l.projectId)

  // Shared props so mouse, touch and keyboard all select things
  const interact = (id) => ({
    role: 'button',
    tabIndex: 0,
    onClick: () => setSelectedId(id),
    onMouseEnter: () => setSelectedId(id),
    onFocus: () => setSelectedId(id),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setSelectedId(id)
      }
    },
  })

  const statusLabel = (status) =>
    status === 'learning' ? 'LEARNING' : 'HANDS-ON'

  return (
    <section id="skills" className="skills">
      <header className="skills__header">
        <p className="skills__eyebrow">&gt; 05 / SKILLS</p>
        <h2 className="skills__title">
          Skills <span className="gradient-text">Universe</span>
        </h2>
        <p className="skills__lead">
          No percentage bars. This is a map of what I have used and what I am
          still learning. Select a skill to see which project it connects to,
          or select a project to light up its skills.
        </p>
        <p className="skills__legend">
          <span className="skills__key skills__key--hands" /> Hands-on
          <span className="skills__key skills__key--learning" /> Learning
        </p>
      </header>

      <div className="skills__layout">
        <div>
          {/* Desktop: constellation */}
          <svg
            className="skills__svg"
            viewBox="0 0 1000 620"
            role="group"
            aria-label="Skills constellation. Select a skill or project to see connections."
          >
            {clusters.map((c) => (
              <g key={c.id} style={{ '--c': c.color }}>
                <circle
                  className="skills__ring"
                  cx={c.cx}
                  cy={c.cy}
                  r={ORBIT}
                />
                <text
                  className="skills__hub"
                  x={c.cx}
                  y={c.cy}
                  dy=".35em"
                  textAnchor="middle"
                >
                  {c.title}
                </text>
              </g>
            ))}

            {links.map((link) => {
              const skill = nodes.find((n) => n.id === link.skillId)
              const project = projects.find((p) => p.id === link.projectId)
              return (
                <line
                  key={`${link.skillId}-${link.projectId}`}
                  className="skills__link"
                  style={{ '--c': skill.color }}
                  x1={skill.x}
                  y1={skill.y}
                  x2={project.x}
                  y2={project.y}
                />
              )
            })}

            {projects.map((p) => (
              <g
                key={p.id}
                className={`skills__project ${
                  p.id === selectedId ? 'is-active' : ''
                } ${litProjectIds.includes(p.id) ? 'is-lit' : ''}`}
                aria-pressed={p.id === selectedId}
                aria-label={`Project: ${p.name}`}
                {...interact(p.id)}
              >
                <rect x={p.x - 100} y={p.y - 20} width="200" height="40" rx="20" />
                <text x={p.x} y={p.y} dy=".35em" textAnchor="middle">
                  {p.short}
                </text>
              </g>
            ))}

            {nodes.map((n) => {
              const lit = litSkillIds.includes(n.id)
              return (
                <g
                  key={n.id}
                  className={`skills__node ${
                    n.id === selectedId ? 'is-active' : ''
                  } ${lit ? 'is-lit' : ''} ${
                    n.status === 'learning' ? 'is-learning' : ''
                  }`}
                  style={{ '--c': n.color }}
                  aria-pressed={n.id === selectedId}
                  aria-label={`${n.name}, ${statusLabel(n.status).toLowerCase()}`}
                  {...interact(n.id)}
                >
                  <circle cx={n.x} cy={n.y} r="9" />
                  <text
                    x={n.lx}
                    y={n.ly}
                    dy=".35em"
                    textAnchor={n.anchor}
                  >
                    {n.name}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Mobile: simple chip list (same selection) */}
          <div className="skills__list">
            {clusters.map((c) => (
              <div key={c.id} style={{ '--c': c.color }}>
                <h3>{c.title}</h3>
                <div className="skills__chips">
                  {nodes
                    .filter((n) => n.cluster === c.id)
                    .map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        className={`skills__chip ${
                          n.id === selectedId ? 'is-active' : ''
                        } ${litSkillIds.includes(n.id) ? 'is-lit' : ''} ${
                          n.status === 'learning' ? 'is-learning' : ''
                        }`}
                        onClick={() => setSelectedId(n.id)}
                      >
                        {n.name}
                      </button>
                    ))}
                </div>
              </div>
            ))}
            <div style={{ '--c': '#ffffff' }}>
              <h3>PROJECTS</h3>
              <div className="skills__chips">
                {projects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`skills__chip ${
                      p.id === selectedId ? 'is-active' : ''
                    }`}
                    onClick={() => setSelectedId(p.id)}
                  >
                    {p.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details panel */}
        <div aria-live="polite">
          <motion.article
            key={selectedId}
            className="skills__panel"
            style={{
              '--c': selectedProject
                ? '#ffffff'
                : selectedSkill.color,
            }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {selectedProject ? (
              <>
                <p className="skills__kind">PROJECT</p>
                <h3>{selectedProject.name}</h3>
                <p>{selectedProject.blurb}</p>
                <p className="skills__kind">SKILLS USED</p>
                <div className="skills__chips">
                  {nodes
                    .filter((n) => n.projects.includes(selectedProject.id))
                    .map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        className="skills__chip"
                        style={{ '--c': n.color }}
                        onClick={() => setSelectedId(n.id)}
                      >
                        {n.name}
                      </button>
                    ))}
                </div>
              </>
            ) : (
              <>
                <p className="skills__kind">
                  {clusters.find((c) => c.id === selectedSkill.cluster).title}
                </p>
                <h3>{selectedSkill.name}</h3>
                <p
                  className={`skills__status ${
                    selectedSkill.status === 'learning' ? 'is-learning' : ''
                  }`}
                >
                  {statusLabel(selectedSkill.status)}
                </p>
                <p>{selectedSkill.note}</p>
                <p className="skills__kind">USED IN</p>
                {selectedSkill.projects.length > 0 ? (
                  <div className="skills__chips">
                    {selectedSkill.projects.map((pid) => (
                      <button
                        key={pid}
                        type="button"
                        className="skills__chip"
                        onClick={() => setSelectedId(pid)}
                      >
                        {projects.find((p) => p.id === pid).short}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="skills__none">
                    Not tied to one of the two featured projects.
                  </p>
                )}
              </>
            )}
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default Skills