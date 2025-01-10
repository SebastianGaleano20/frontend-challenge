'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from './ProjectForm'

type EditProjectFormProps = {
  projectId: string
}

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter()
  const [project, setProject] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simular la carga del proyecto desde una API
    const fetchProject = async () => {
      // En una aplicación real, esto sería una llamada a la API
      const mockProject = {
        id: Number(projectId),
        name: `Proyecto ${projectId}`,
        description: `Descripción del Proyecto ${projectId}`,
        projectManager: 'Manager 1',
        assignedUser: 'Usuario 1',
        status: 'enabled'
      }
      setProject(mockProject)
    }

    fetchProject()
  }, [projectId])

  const handleEditProject = async (updatedProject) => {
    setIsSubmitting(true)
    try {
      // Aquí iría la lógica para actualizar el proyecto
      console.log('Proyecto actualizado:', updatedProject)
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/')
    } catch (error) {
      console.error('Error al actualizar el proyecto:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!project) {
    return <div>Cargando...</div>
  }

  return (
    <ProjectForm
      project={project}
      onSubmit={handleEditProject}
      isSubmitting={isSubmitting}
    />
  )
}