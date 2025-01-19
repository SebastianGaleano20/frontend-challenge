import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'projects.json')

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const projects = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  const project = projects.find((p: any) => p.id === parseInt(params.id))
  if (project) {
    return NextResponse.json(project)
  } else {
    return new NextResponse('Project not found', { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const updatedProject = await request.json()
  const projects = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  const index = projects.findIndex((p: any) => p.id === parseInt(params.id))

  if (index !== -1) {
    projects[index] = { ...projects[index], ...updatedProject }
    await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2))
    return NextResponse.json(projects[index])
  } else {
    return new NextResponse('Project not found', { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const projects = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  const filteredProjects = projects.filter((p: any) => p.id !== parseInt(params.id))

  if (filteredProjects.length < projects.length) {
    await fs.writeFile(dataFilePath, JSON.stringify(filteredProjects, null, 2))
    return new NextResponse(null, { status: 204 })
  } else {
    return new NextResponse('Project not found', { status: 404 })
  }
}

