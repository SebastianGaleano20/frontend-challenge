'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectCard from './ProjectCard'

type Project = {
  id: number
  name: string
  description: string
  projectManager: string
  assignedUser: string
  status: 'enabled' | 'disabled'
}

export default function ProjectList() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Simular la carga de proyectos desde una API
    const fetchProjects = async () => {
      // Simula una llamada a la API
      const mockProjects: Project[] = [
        { id: 1, name: 'Proyecto A', description: 'Descripción del Proyecto A', projectManager: 'Manager 1', assignedUser: 'Usuario 1', status: 'enabled' },
        { id: 2, name: 'Proyecto B', description: 'Descripción del Proyecto B', projectManager: 'Manager 2', assignedUser: 'Usuario 2', status: 'disabled' },
      ]
      setProjects(mockProjects)
    }

    fetchProjects()
  }, [])

  const handleDeleteProject = async (projectId: number) => {
    // Aca la logica para eliminar el proyecto en la API
    setProjects(projects.filter(p => p.id !== projectId))
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => router.push(`/edit-project/${project.id}`)}
          onDelete={() => handleDeleteProject(project.id)}
        />
      ))}
    </section>
  )
}