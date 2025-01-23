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
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white">
      <section className="container mx-auto px-4 py-6 flex items-center justify-between">
        <section className="flex items-center">
          <Image src="/icons/logo.svg" alt="Logo" width={40} height={40} />
          {view === 'landing' ? (
            <h1 className="ml-4 text-lg font-bold md:text-2xl">Gestión de Proyectos</h1>
          ) : (
            <section className="flex items-center ml-4">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center hover:text-gray-400"
              >
                <ArrowLeft size={24} />
                <span className="ml-2">Volver atrás</span>
              </button>
              <h2 className="ml-4 text-xl font-semibold">
                {view === 'create' ? 'Crear Proyecto' : 'Editar Proyecto'}
              </h2>
            </section>
          )}
        </section>
        {view === 'landing' && (
          <button
            onClick={() => router.push('/create-project')}
            className="bg-blue-500 hover:bg-blue-600 font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus size={20} />
            <span className="ml-2 text-sm md:text-lg">Agregar Proyecto</span>
          </button>
        )}
      </section>
    </header>
  )
}