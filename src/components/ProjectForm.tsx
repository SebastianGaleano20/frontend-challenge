'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import type { Project, ProjectFormProps } from '@/types/components/index';
import type { ProjectManagers, Developers } from '@/types/db';

//Componente para crear un nuevo proyecto
export default function ProjectForm({ project, onSubmit, isSubmitting }: ProjectFormProps) {
  const router = useRouter()
  const [projectManagers, setProjectManagers] = useState<ProjectManagers[]>([])
  const [developers, setDevelopers] = useState<Developers[]>([])
  const [formData, setFormData] = useState<Project>({
    id: project ? project.id : 0,
    name: '',
    description: '',
    projectManager: '',
    assignedDev: '',
    status: 'enabled'
  })

  useEffect(() => {
    if (project) {
      setFormData(project)
    }
  }, [project])

  useEffect(() => {
    // Función para obtener los datos de Project Managers
    const fetchProjectManagers = async () => {
      try {
        const response = await fetch('/api/projectManagers');
        const data: ProjectManagers[] = await response.json();
        setProjectManagers(data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al cargar los Project Managers:', error);
      }
    };

    fetchProjectManagers();
  }, []);

  useEffect(() => {
    // Función para obtener los datos de Developers
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('/api/developers');
        const data: Developers[] = await response.json();
        setDevelopers(data); // Guarda los datos en el estado
      } catch (error) {
        console.error('Error al cargar los Developers:', error);
      }
    };

    fetchDevelopers(); // Llama a la función de carga de datos
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //Operador ternario para consultar si actualizar la data o crearla.
      const response = await fetch(project ? `/api/projects/${project.id}` : '/api/projects', {
        method: project ? 'PUT' : 'POST', // Usar PUT si hay proyecto, de lo contrario POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(project ? 'Proyecto actualizado correctamente' : 'Proyecto guardado correctamente');
        router.push('/');  // Redirigir a la página de inicio u otra página
      } else {
        alert('Error al guardar el proyecto');
      }
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      alert('Error al guardar el proyecto');
    }
  };

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
          {projectManagers.map((projectManager: ProjectManagers) => (
            <option key={projectManager.id} value={projectManager.name}>{projectManager.name}</option>
          ))}
        </select>
      </section>
      <section className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedDev">
          Programador Asignado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="assignedDev"
          name="assignedDev"
          value={formData.assignedDev}
          onChange={handleChange}
        >
          <option value="">Seleccionar Programador</option>
          {developers.map((developer: Developers) => (
            <option key={developer.id} value={developer.name}>{developer.name}</option>
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