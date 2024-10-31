import ProjectCard from './ProjectCard'

export default function ProjectList() {
  // Aquí obtendría los proyectos de la API - mientras ejemplos para poder ver la vista
  const projects = [
    { id: 1, name: 'Proyecto A', user: { name: 'Juan Pérez', avatar: '/avatar1.jpg' }, createdAt: '2023-05-15' },
    { id: 2, name: 'Proyecto B', user: { name: 'Ana García', avatar: '/avatar2.jpg' }, createdAt: '2023-05-20' },
  ]

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </section>
  )
}