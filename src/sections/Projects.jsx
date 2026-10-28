import ProjectCard from '../components/ProjectCard'
import { featuredProjects } from '../data/projects'
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
          Two projects I built to learn by doing. Each one shows the problem,
          my approach, how it works, and what it cannot do yet.
        </p>
      </header>

      {featuredProjects.map((project, i) => (
        <ProjectCard key={project.id} project={project} flip={i % 2 === 1} />
      ))}
    </section>
  )
}

export default Projects