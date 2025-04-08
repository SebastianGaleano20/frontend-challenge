"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Developer,
  type Project,
  type ProjectFormProps,
} from "@/types/components/index";
import { useToast } from "@/context/ToastContext";

export default function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [developer, setDevelopers] = useState<Developer[]>([]);
  const [manager, setManager] = useState<Developer[]>([]);
  const [formData, setFormData] = useState<Project>({
    id: project ? project.id : 0,
    name: "",
    description: "",
    developers: [],
    status: "IN_PROGRESS",
  });

  // Si se pasa un proyecto en modo edición, actualizamos el formulario
  useEffect(() => {
    if (project) {
      const cleanedDevelopers = project.developers.map((dev) => ({
        devId: dev.devId,
        role: dev.role,
      }));
  
      setFormData({
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        developers: cleanedDevelopers,
      });
    }
  }, [project]);

  // Cargamos los developers y managers desde el API
  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(
          "https://pj-managament-api.up.railway.app/api/dev"
        );
        const data = await response.json();
        const allData = data.data;
        const devs = allData.filter((dev: Developer) => dev.role === "DEVELOPER");
        const mgrs = allData.filter((dev: Developer) => dev.role === "MANAGER");
        setDevelopers(devs);
        setManager(mgrs);
      } catch (error) {
        showToast("Error al cargar los Project Managers", "error");
      }
    };

    fetchDevelopers();
  }, [showToast]);

  // Manejo de cambios en inputs y selects
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedDev" || name === "projectManager") {
      const devId = parseInt(value);
      // Definimos el role según el select: "MANAGER" para projectManager, "DEVELOPER" para assignedDev
      const role = name === "projectManager" ? "MANAGER" : "DEVELOPER";
     
      setFormData((prev) => {
        // Remover cualquier developer que ya tenga el mismo rol para evitar duplicados
        const filtered = prev.developers.filter((dev) => dev.role !== role);
        return {
          ...prev,
          developers: [...filtered, { devId, role }],
        };
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Manejo del submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Eliminamos "id" y nos aseguramos de transformar cada objeto developer para solo conservar devId y role
      const { id, ...dataToSend } = formData;
      if (dataToSend.developers && Array.isArray(dataToSend.developers)) {
        dataToSend.developers = dataToSend.developers.map((dev: any) => ({
          devId: dev.devId,
          role: dev.role,
        }));
      }
      console.log("Data a enviar:", dataToSend);

      const response = await fetch(
        project
          ? `https://pj-managament-api.up.railway.app/api/projects/${project.id}`
          : "https://pj-managament-api.up.railway.app/api/projects",
        {
          method: project ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const result = await response.json();
        showToast("Proyecto guardado correctamente", "success");
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("Error en response:", errorData);
        showToast("Error al guardar el proyecto", "error");
      }
    } catch (error) {
      console.error("Error en el catch:", error);
      showToast("Error al guardar el proyecto", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 text-black dark:text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:border-2 dark:border-gray-400"
    >
      <section className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Nombre del Proyecto
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </section>

      <section className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="description">
          Descripción
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        ></textarea>
      </section>

      <section className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="projectManager">
          Project Manager
        </label>
        <select
          id="projectManager"
          name="projectManager"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={
            formData.developers.find((d) => d.role === "MANAGER")?.devId ?? ""
          }
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Project Manager</option>
          {manager.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))}
        </select>
      </section>

      <section className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="assignedDev">
          Programador Asignado
        </label>
        <select
          id="assignedDev"
          name="assignedDev"
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          value={
            formData.developers.find((d) => d.role === "DEVELOPER")?.devId ?? ""
          }
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar Programador</option>
          {developer.map((dev) => (
            <option key={dev.id} value={dev.id}>
              {dev.name}
            </option>
          ))}
        </select>
      </section>

      <section className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="status">
          Estado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="IN_PROGRESS">En Progreso</option>
          <option value="COMPLETED">Completado</option>
          <option value="CANCELED">Cancelado</option>
        </select>
      </section>

      <section className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Guardando..."
            : (project ? "Actualizar" : "Crear") + " Proyecto"}
        </button>
      </section>
    </form>
  );
}
