'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectCard from './ProjectCard'
import type { Project } from '@/types/components/index'
import { useToast } from '@/context/ToastContext'

export default function ProjectList() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showToast } = useToast()

  useEffect(() => {
    //fetch para obtener los datos
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        showToast('Error al cargar los proyectos', 'error')
      }finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [showToast])

  const handleDeleteProject = async (projectId: number) => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete project')
      }

      setProjects(projects.filter(p => p.id !== projectId))
      showToast('Proyecto eliminado correctamente', 'success')
    } catch (error) {
      showToast('Error al eliminar el proyecto', 'error')
    }
  }
  
  if (isLoading) {
    return <div className='text-black dark:text-white'>Cargando proyectos...</div>
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => router.push(`/edit-projects/${project.id}`)}
          onDelete={() => handleDeleteProject(project.id)}
        />
      ))}
    </section>
  )
}