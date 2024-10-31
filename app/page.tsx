'use client'
import { useState } from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import ProjectList from '@/components/ProjectList'
import ProjectForm from '@/components/ProjectForm'

export default function Home() {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Proyecto A', user: { name: 'Juan Pérez', avatar: '/avatar1.jpg' }, createdAt: '2023-05-15' },
    { id: 2, name: 'Proyecto B', user: { name: 'Ana García', avatar: '/avatar2.jpg' }, createdAt: '2023-05-20' },
  ])
  const [editingProject, setEditingProject] = useState(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleCreateProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: Date.now() }])
    setIsFormOpen(false)
  }

  const handleEditProject = (updatedProject) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p))
    setEditingProject(null)
    setIsFormOpen(false)
  }

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Head>
        <title>Gestión de Proyectos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header onNewProject={() => setIsFormOpen(true)} />

      <section className="container mx-auto px-4 py-8">
        {isFormOpen ? (
          <ProjectForm
            project={editingProject}
            onSubmit={editingProject ? handleEditProject : handleCreateProject}
            onCancel={() => {
              setIsFormOpen(false)
              setEditingProject(null)
            }}
          />
        ) : (
          <ProjectList
            projects={projects}
            onEdit={(project) => {
              setEditingProject(project)
              setIsFormOpen(true)
            }}
            onDelete={handleDeleteProject}
          />
        )}
      </section>
    </main>
  )
}