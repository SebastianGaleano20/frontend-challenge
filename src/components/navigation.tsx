'use client'

import { useRouter } from 'next/navigation'

export function useAppNavigation() {
  const router = useRouter()

  return {
    goToCreateProject: () => router.push('/create-project'),
    goToEditProject: (id: number) => router.push(`/edit-project/${id}`),
    goToHome: () => router.push('/'),
  }
}