import Header from '@/components/Header'
import ProjectForm from '@/components/ProjectForm'

export default function CreateProjectPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Header view="create" />
      <section className="container mx-auto px-4 py-8">
        <ProjectForm />
      </section>
    </main>
  )
}