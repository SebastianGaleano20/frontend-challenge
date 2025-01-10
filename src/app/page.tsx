'use client'
import { Suspense } from 'react'
import Header from '@/components/Header'
import ProjectList from '@/components/ProjectList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Suspense fallback={<div>Cargando...</div>}>
        <Header view="landing" />
        <section className="container mx-auto px-4 py-8">
          <ProjectList />
        </section>
      </Suspense>
    </main>
  )
}