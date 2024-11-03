import Header from '@/components/Header'
import CreateProjectForm from '@/components/CreateProjectForm'

export default function CreateProjectPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header view="create" />
      <section className="container mx-auto px-4 py-8">
        <CreateProjectForm />
      </section>
    </main>
  )
}