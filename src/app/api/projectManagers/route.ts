import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src', 'db', 'projectManagers.json')

export async function GET() {
  const projectManagers = JSON.parse(await fs.readFile(dataFilePath, 'utf8'))
  return NextResponse.json(projectManagers)
}
