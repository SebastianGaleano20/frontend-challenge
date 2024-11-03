'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectForm from './ProjectForm'

export default function CreateProjectForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateProject = async (newProject) => {
    setIsSubmitting(true)
    try {
      //lógica para guardar el nuevo proyecto
      console.log('Nuevo proyecto:', newProject)
      // Simula una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/')
    } catch (error) {
      console.error('Error al crear el proyecto:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Crear Nuevo Proyecto</h1>
      <ProjectForm
        onSubmit={handleCreateProject}
        isSubmitting={isSubmitting}
      />
    </>
  )
}