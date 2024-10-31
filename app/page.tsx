import Head from 'next/head'
import Header from '../components/Header'
import ProjectList from '../components/ProjectList'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Head>
        <title>Gestión de Proyectos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <section className="container mx-auto px-4 py-8">
        <ProjectList />
      </section>
    </main>
  )
}