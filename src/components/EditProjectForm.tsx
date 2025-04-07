"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProjectForm from "./ProjectForm";
import { EditProjectFormProps, Project } from "@/types/components";
import { useToast } from "@/context/ToastContext";

export default function EditProjectForm({ projectId }: EditProjectFormProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      try {
        //Obtención de datos
        const response = await fetch(
          `https://pj-managament-api.up.railway.app/api/projects/${projectId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await response.json();
        //Actualizamos data
        setProject(data);
      } catch (error) {
        showToast("Error al actualizar datos", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectId, showToast]);

  const handleEditProject = async (updatedProject: Project) => {
    setIsSubmitting(true);
    try {
      //Enviamos la data actualizada
      const response = await fetch(
        `https://pj-managament-api.up.railway.app/api/projects/${projectId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProject),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      showToast("Proyecto actualizado correctamente", "success");
      router.push("/projects");
      router.refresh();
    } catch (error) {
      showToast("Error al actualizar el proyecto", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!project) {
    return <div>No se pudo cargar el proyecto.</div>;
  }

  return (
    <ProjectForm
      project={project}
      onSubmit={handleEditProject}
      isSubmitting={isSubmitting}
    />
  );
}
