import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../../../components/Header'
import ProjectForm from '../../../components/ProjectForm'

export default function EditProject() {
  const router = useRouter()
  const { id } = router.query
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (id) {
      // Por ahora datos de ejemplo
      setProject({
        id: Number(id),
        name: `Proyecto ${id}`,
        description: `Descripción del Proyecto ${id}`,
        projectManager: 'Manager 1',
        assignedUser: 'Usuario 1',
        status: 'enabled'
      })
    }
  }, [id])

  const handleEditProject = (updatedProject) => {
    //lógica para actualizar el proyecto
    console.log('Proyecto actualizado:', updatedProject)
    router.push('/')
  }

  if (!project) {
    return <div>Cargando...</div>
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Head>
        <title>Editar Proyecto | Gestión de Proyectos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header 
        view="edit"
        onBack={() => router.push('/')}
      />

      <section className="container mx-auto px-4 py-8">
        <ProjectForm
          project={project}
          onSubmit={handleEditProject}
        />
      </section>
    </main>
  )
}