'use client'

import { useRouter } from 'next/navigation'
import { ProjectForm } from '@/components/ui/form/project-form'

// Simulación de obtención de datos del proyecto
const getProjectData = (id: string) => {
  return {
    name: 'Proyecto de Ejemplo',
    description: 'Esta es una descripción de ejemplo',
    manager: 'Juan Pérez',
    assignee: 'Ana García',
    status: 'En progreso'
  }
}

export default function EditarProyecto({ params }: { params: { id: string } }) {
  const router = useRouter()
  const projectData = getProjectData(params.id)

  const handleSubmit = (data: any) => {
    // Aquí iría la lógica para actualizar el proyecto en la base de datos
    console.log('Proyecto actualizado:', data)
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Editar Proyecto</h2>
      <ProjectForm initialData={projectData} onSubmit={handleSubmit} submitLabel="Actualizar Proyecto" />
    </div>
  )
}