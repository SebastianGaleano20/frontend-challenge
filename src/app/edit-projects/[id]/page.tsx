import EditProjectForm from '@/components/EditProjectForm'
import Header from '@/components/Header'
export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Header view="edit" />
    <section className="container mx-auto px-4 py-8">
      <EditProjectForm projectId={params.id} />
    </section>
    </main>
  )
}