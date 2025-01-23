'use client'
import { Suspense } from 'react'
import Header from '@/components/Header'
import ProjectList from '@/components/ProjectList'
import { ThemeSwitch } from '@/components/ToggleTheme';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white">
      <Suspense fallback={<div>Cargando...</div>}>
        <Header view="landing" />
        <section className="container mx-auto px-4 py-8 bg-white dark:bg-gray-800 text-black dark:text-white">
          <ThemeSwitch />
          <ProjectList />
        </section>
      </Suspense>
    </main>
  )
}