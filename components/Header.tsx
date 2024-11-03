'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus } from 'lucide-react'

type HeaderProps = {
  view: 'landing' | 'create' | 'edit'
}

export default function Header({ view }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="bg-white shadow">
      <section className="container mx-auto px-4 py-6 flex items-center justify-between">
        <section className="flex items-center">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          {view === 'landing' ? (
            <h1 className="ml-4 text-2xl font-bold text-gray-800">Gestión de Proyectos</h1>
          ) : (
            <section className="flex items-center ml-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={24} />
                <span className="ml-2">Volver atrás</span>
              </button>
              <h2 className="ml-4 text-xl font-semibold text-gray-800">
                {view === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}
              </h2>
            </section>
          )}
        </section>
        {view === 'landing' && (
          <button
            onClick={() => router.push('/create-project')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus size={20} />
            <span className="ml-2">Agregar Proyecto</span>
          </button>
        )}
      </section>
    </header>
  )
}