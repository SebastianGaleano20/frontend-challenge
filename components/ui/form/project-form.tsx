'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button/button'
import { Input } from '@/components/ui/input/input'
import { Textarea } from '@/components/ui/textarea/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select/select'

type ProjectFormProps = {
  initialData?: {
    name: string
    description: string
    manager: string
    assignee: string
    status: string
  }
  onSubmit: (data: any) => void
  submitLabel: string
}

export function ProjectForm({ initialData, onSubmit, submitLabel }: ProjectFormProps) {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    manager: '',
    assignee: '',
    status: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Proyecto</label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full" />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required className="w-full" />
      </div>
      <div>
        <label htmlFor="manager" className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
        <Select name="manager" value={formData.manager} onValueChange={handleSelectChange('manager')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar manager" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Juan Pérez">Juan Pérez</SelectItem>
            <SelectItem value="María López">María López</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">Asignado a</label>
        <Select name="assignee" value={formData.assignee} onValueChange={handleSelectChange('assignee')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar persona asignada" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Ana García">Ana García</SelectItem>
            <SelectItem value="Carlos Rodríguez">Carlos Rodríguez</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
        <Select name="status" value={formData.status} onValueChange={handleSelectChange('status')}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccionar estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En progreso">En progreso</SelectItem>
            <SelectItem value="Completado">Completado</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full sm:w-auto">{submitLabel}</Button>
    </form>
  )
}