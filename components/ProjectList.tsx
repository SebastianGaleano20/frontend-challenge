'use client'

import { useState } from 'react'
import ProjectCard from './ProjectCard'
import { useAppNavigation } from './navigation'

export default function ProjectList() {
  const navigation = useAppNavigation()
  const [projects, setProjects] = useState([
    { id: 1, name: 'Proyecto A', description: 'Descripción del Proyecto A', projectManager: 'Manager 1', assignedUser: 'Usuario 1', status: 'enabled' },
    { id: 2, name: 'Proyecto B', description: 'Descripción del Proyecto B', projectManager: 'Manager 2', assignedUser: 'Usuario 2', status: 'disabled' },
  ])

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => navigation.goToEditProject(project.id)}
          onDelete={() => handleDeleteProject(project.id)}
        />
      ))}
    </section>
  )
}