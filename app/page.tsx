import Link from 'next/link'
import { Button } from '@/components/ui/button/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card/card'

// Simulación de datos de proyectos
const projects = [
  { id: 1, name: 'Proyecto A', description: 'Descripción del Proyecto A', manager: 'Juan Pérez', assignee: 'Ana García', status: 'En progreso' },
  { id: 2, name: 'Proyecto B', description: 'Descripción del Proyecto B', manager: 'María López', assignee: 'Carlos Rodríguez', status: 'Completado' },
] || [];

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h2 className="text-2xl sm:text-3xl font-bold">Proyectos</h2>
        <Link href="/add-project">
          <Button className="w-full sm:w-auto">Agregar Proyecto</Button>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{project.name}</CardTitle>
                <CardDescription className="text-sm">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm"><strong>Manager:</strong> {project.manager}</p>
                <p className="text-sm"><strong>Asignado a:</strong> {project.assignee}</p>
                <p className="text-sm"><strong>Estado:</strong> {project.status}</p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0">
                <Link href={`/editar/${project.id}`} className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">Editar</Button>
                </Link>
                <Button variant="destructive" className="w-full sm:w-auto">Eliminar</Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-lg">No hay proyectos disponibles.</p>
        )}
      </div>
    </div>
  )
}