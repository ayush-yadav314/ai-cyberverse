import { ArrowUpRight } from 'lucide-react'
import { projectIcons } from './projectIcons'

function MiniProjectCard({ project }) {
  const Icon = projectIcons[project.icon]

  return (
    <article className="mini" style={{ '--c': project.color }}>
      <div className="mini__top">
        {Icon && (
          <span className="mini__icon">
            <Icon size={22} aria-hidden="true" />
          </span>
        )}
        <span className="mini__label">{project.label}</span>
      </div>

      <h4>{project.title}</h4>
      <p className="mini__tagline">{project.tagline}</p>
      <p>{project.description}</p>

      <ul className="project__stack" aria-label="Technology stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <p className="mini__note">{project.note}</p>

      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--ghost"
      >
        GitHub <ArrowUpRight size={16} />
      </a>
    </article>
  )
}

export default MiniProjectCard