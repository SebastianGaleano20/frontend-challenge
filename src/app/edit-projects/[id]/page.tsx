import EditProjectForm from '@/components/EditProjectForm'
import Header from '@/components/Header'
export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header view="edit" />
    <section className="container mx-auto px-4 py-8">
      <EditProjectForm projectId={params.id} />
    </section>
    </main>
  )
}