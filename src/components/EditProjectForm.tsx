'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from './ProjectForm'
import { EditProjectFormProps, Project } from '@/types/components'

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true)
      try {
        //Obtención de datos
        const response = await fetch(`/api/projects/${projectId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch project')
        }
        const data = await response.json()
        //Actualizamos data
        setProject(data)
      } catch (error) {
        console.error('Error fetching project:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProject()
  }, [projectId])

  const handleEditProject = async (updatedProject: Project) => {
    setIsSubmitting(true)
    try {
      //Enviamos la data actualizada
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      })
      if (!response.ok) {
        throw new Error('Failed to update project')
      }
      router.push('/projects')
      router.refresh()
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (!project) {
    return <div>No se pudo cargar el proyecto.</div>
  }

  return (
    <ProjectForm
      project={project}
      onSubmit={handleEditProject}
      isSubmitting={isSubmitting}
    />
  )
}
