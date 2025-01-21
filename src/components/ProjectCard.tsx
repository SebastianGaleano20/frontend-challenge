'use client'

import { useEffect, useState } from 'react'
import { MoreVertical, Edit2, Trash2, User } from 'lucide-react'
import type { ProjectCardProps } from '@/types/components/index'
import { Developers } from '@/types/db'

export default function ProjectCard({ project, onEdit, onDelete }: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => setMenuOpen(!menuOpen)
  const [developers, setDevelopers] = useState<Developers[]>([])
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch('/api/developers');
        const data: Developers[] = await response.json();
        setDevelopers(data);
      } catch (error) {
        console.error('Error al cargar los Developers:', error);
      }
    };
    fetchDevelopers(); 
  }, []);

  const assignedDeveloper = developers.find(dev => dev.name === project.assignedDev);
  
  return (
    <section className="bg-white rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{project.name}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <section className="flex items-center mb-4">
      {/* Si se encuentra el desarrollador, mostramos su imagen */}
      {assignedDeveloper && assignedDeveloper.img? (
        <img src={assignedDeveloper.img} alt={assignedDeveloper.name} className="w-8 h-8 rounded-full mr-2" />
      ) : (
        <User size={20} className="text-gray-500 mr-2" />
      )}
      <span className="text-gray-600">{assignedDeveloper ? assignedDeveloper.name : 'Desarrollador no asignado'}</span>
    </section>
      <p className="text-sm text-gray-500">Project Manager: {project.projectManager}</p>
      <p className="text-sm text-gray-500 mt-2">
        Estado: <span className={project.status === 'enabled' ? 'text-green-500' : 'text-red-500'}>
          {project.status === 'enabled' ? 'Habilitado' : 'Deshabilitado'}
        </span>
      </p>
      
      <section className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <section className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                onEdit()
                setMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit2 size={16} className="inline mr-2" />
              Editar
            </button>
            <button
              onClick={() => {
                onDelete()
                setMenuOpen(false)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 size={16} className="inline mr-2" />
              Borrar
            </button>
          </section>
        )}
      </section>
    </section>
  )
}