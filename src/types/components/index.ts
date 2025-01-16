export type Project = {
    id?: number
    name: string
    description: string
    projectManager: string
    assignedUser: string
    status: 'enabled' | 'disabled'
}

export type ProjectFormProps = {
    project?: Project
    onSubmit: (project: Project) => void
    isSubmitting: boolean
}

export type EditProjectFormProps = {
    projectId: string
}

export type ProjectCardProps = {
    project: Project
    onEdit: () => void
    onDelete: () => void
}