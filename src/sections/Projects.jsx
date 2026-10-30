import ProjectCard from '../components/ProjectCard'
import MiniProjectCard from '../components/MiniProjectCard'
import { featuredProjects, moreProjects } from '../data/projects'
import './Projects.css'

function Projects() {
  return (
    <section id="projects" className="projects">
      <header className="projects__header">
        <p className="projects__eyebrow">&gt; 04 / PROJECTS</p>
        <h2 className="projects__title">
          Real <span className="gradient-text">AI work</span>
        </h2>
        <p className="projects__lead">
          Four projects I built to learn by doing, plus two smaller ones. Each
          featured project shows the problem, my approach, how it works, and
          what it cannot do yet.
        </p>
      </header>

      {featuredProjects.map((project, i) => (
        <ProjectCard key={project.id} project={project} flip={i % 2 === 1} />
      ))}

      <div className="projects__more">
        <h3 className="projects__more-title">MORE PROJECTS</h3>
        <div className="projects__more-grid">
          {moreProjects.map((project) => (
            <MiniProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects