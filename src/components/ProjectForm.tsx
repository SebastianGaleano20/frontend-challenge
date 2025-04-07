"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Developer,
  type Project,
  type ProjectFormProps,
} from "@/types/components/index";
import { useToast } from "@/context/ToastContext";

//Componente para crear un nuevo proyecto
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

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  useEffect(() => {
    // Función para obtener los datos desarrolladores
    const fetchDevelopers = async () => {
      try {
        const response = await fetch(
          "https://pj-managament-api.up.railway.app/api/dev"
        ); //Obtenemos los datos
        const data = await response.json(); //Convertimos a JSON
        const allData = data.data;
        const developers = allData.filter(
          (dev: Developer) => dev.role === "DEVELOPER"
        );
        const managers = allData.filter(
          (dev: Developer) => dev.role === "MANAGER"
        );
        setDevelopers(developers); // Guarda los datos en el estado
        setManager(managers);
      } catch (error) {
        showToast("Error al cargar los Project Managers", "error"); //Mostramos un mensaje de error
      }
    };

    fetchDevelopers(); // Llama a la función de carga de datos
  }, [showToast]); //Dependencias

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "assignedDev" || name === "projectManager") {
      const devId = parseInt(value);
      const role = name === "projectManager" ? "MANAGER" : "DEVELOPER";

      setFormData((prev) => {
        // Remover cualquier dev anterior con ese rol
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { id, ...dataToSend } = formData; // 👈 eliminamos 'id' del body

      const response = await fetch(
        project
          ? `https://pj-managament-api.up.railway.app/api/projects/${project.id}`
          : "https://pj-managament-api.up.railway.app/api/projects",
        {
          method: project ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend), // 👈 enviamos sin id
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
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="projectManager"
        >
          Project Manager
        </label>
        <select
          id="projectManager"
          name="projectManager"
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
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
          className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
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
          <option value="IN_PROGRESS">Habilitado</option>
          <option value="CANCELLED">Deshabilitado</option>
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
          {/* expresion ternaria para mostrar el texto de actualizar o crear */}
        </button>
      </section>
    </form>
  );
}
