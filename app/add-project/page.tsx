'use client'

import { useRouter } from 'next/navigation'
import { ProjectForm } from '@/components/ui/form/project-form'

export default function AgregarProyecto() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // Aquí iría la lógica para guardar el proyecto en la base de datos
    console.log('Nuevo proyecto:', data)
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Agregar Nuevo Proyecto</h2>
      <ProjectForm onSubmit={handleSubmit} submitLabel="Crear Proyecto" />
    </div>
  )
}