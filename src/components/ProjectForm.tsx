'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import type { Project, ProjectFormProps} from '@/types/components/index';

//Componente para crear un nuevo proyecto
export default function ProjectForm({ project, onSubmit, isSubmitting }: ProjectFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<Project>({
    id: project ? project.id : 0,
    name: '',
    description: '',
    projectManager: '',
    assignedUser: '',
    status: 'enabled'
  })

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        alert('Proyecto guardado correctamente');
        router.push('/');
      } else {
        alert('Error al guardar el proyecto');
      }
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      alert('Error al guardar el proyecto');
    }
  };
  
  // Simulacion de api
  const managers = ['Manager 1', 'Manager 2', 'Manager 3']
  const users = ['Usuario 1', 'Usuario 2', 'Usuario 3']

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Nombre del Proyecto
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </section>
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        ></textarea>
      </section>
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectManager">
          Project Manager
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="projectManager"
          name="projectManager"
          value={formData.projectManager}
          onChange={handleChange}
        >
          <option value="">Seleccionar Project Manager</option>
          {managers.map((manager, index) => (
            <option key={index} value={manager}>{manager}</option>
          ))}
        </select>
      </section>
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedUser">
          Usuario Asignado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="assignedUser"
          name="assignedUser"
          value={formData.assignedUser}
          onChange={handleChange}
        >
          <option value="">Seleccionar Usuario</option>
          {users.map((user, index) => (
            <option key={index} value={user}>{user}</option>
          ))}
        </select>
      </section>
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Estado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="enabled">Habilitado</option>
          <option value="disabled">Deshabilitado</option>
        </select>
      </section>
      <section className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : (project ? 'Actualizar' : 'Crear') + ' Proyecto'}
        </button>
      </section>
    </form>
  )
}