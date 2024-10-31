'use client'
import Image from 'next/image'
import { useState } from 'react'
import { MoreVertical, Edit2, Trash2, User } from 'lucide-react'

export default function ProjectCard({ project }) {
  //useState para editar/eliminar proyecto (Insertar ENDpoints de API)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleEdit = () => {
    //ENDpoint editproject
    console.log('Editar proyecto', project.id)
  }

  const handleDelete = () => {
    //ENDpoint deleteproject 
    console.log('Borrar proyecto', project.id)
  }

  return (
    <section className="bg-white rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{project.name || 'Proyecto sin nombre'}</h2>
      <section className="flex items-center mb-4">
        {project.user && project.user.avatar ? (
          <Image
            src={project.user.avatar}
            alt={project.user.name || 'Usuario'}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <section className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={20} className="text-gray-500" />
          </section>
        )}
        <span className="ml-2 text-gray-600">{project.user?.name || 'Usuario no asignado'}</span>
      </section>
      <p className="text-sm text-gray-500">Creado el: {project.createdAt || 'Fecha desconocida'}</p>

      <section className="absolute top-4 right-4">
        <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-700">
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <section className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={handleEdit}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit2 size={16} className="inline mr-2" />
              Editar
            </button>
            <button
              onClick={handleDelete}
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