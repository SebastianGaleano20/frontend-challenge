import { NextResponse } from 'next/server'
import projectsData from '@/db/projects.json'

export async function GET() {
  return NextResponse.json(projectsData)
}
