import Image from 'next/image'

export default function Header({ onNewProject }) {
  return (
    <header className="bg-white shadow">
      <section className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between">
        <section className="flex items-center mb-4 sm:mb-0">
          <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          <h1 className="ml-4 text-2xl font-bold text-gray-800">Gestión de Proyectos</h1>
        </section>
        <button
          onClick={onNewProject}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Nuevo Proyecto
        </button>
      </section>
    </header>
  )
}