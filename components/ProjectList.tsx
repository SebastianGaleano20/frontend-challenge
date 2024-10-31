import ProjectCard from './ProjectCard'

export default function ProjectList({ projects, onEdit, onDelete }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
        />
      ))}
    </section>
  )
}