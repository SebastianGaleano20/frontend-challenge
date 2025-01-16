import EditProjectForm from '@/components/EditProjectForm'

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Proyecto</h1>
      <EditProjectForm projectId={params.id} />
    </div>
  )
}
