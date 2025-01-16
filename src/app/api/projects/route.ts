import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'projects.json')

export async function GET() {
  const projects = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const newProject = await request.json()
  const projects = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  
  newProject.id = Math.max(...projects.map((p: any) => p.id)) + 1
  projects.push(newProject)
  
  await fs.writeFile(dataFilePath, JSON.stringify(projects, null, 2))
  return NextResponse.json(newProject, { status: 201 })
}