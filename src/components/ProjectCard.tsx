"use client";

import { useEffect, useState } from "react";
import { MoreVertical, Edit2, Trash2, User } from "lucide-react";
import type { ProjectCardProps, Developer } from "@/types/components/index";
import Image from "next/image";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const allDevs = project.developers.map((d) => d.developer);
  const manager = allDevs.find((dev) => dev.role === "MANAGER");
  const developer = allDevs.find((dev) => dev.role === "DEVELOPER");

  return (
    <section className="bg-white dark:bg-gray-800 text-black dark:text-white dark:border-2 dark:border-gray-400 rounded-lg shadow-md p-6 relative">
      <h2 className="text-xl font-semibold mb-4">{project.name}</h2>
      <p className="mb-4">{project.description}</p>
      <section className="flex items-center mb-4">
        {/* Si se encuentra el desarrollador, mostramos su imagen */}
        {developer && developer.image ? (
          <Image
            src={developer.image}
            alt={developer.name}
            width={32}
            height={32}
            className="rounded-full mr-2"
          />
        ) : (
          <User size={20} className="mr-2" />
        )}
        <span>{developer ? developer.name : "Desarrollador no asignado"}</span>
      </section>
      <p className="text-sm ">
        Project Manager: {manager ? manager.name : "Sin manager"}
      </p>
      <p className="text-sm  mt-2">
        Estado:{" "}
        <span
          className={
            project.status === "IN_PROGRESS" ? "text-green-500" : "text-red-500"
          }
        >
          {project.status === "IN_PROGRESS" ? "Habilitado" : "Deshabilitado"}
        </span>
      </p>
      {/* Button Settings */}
      <section className="absolute top-4 right-4">
        <button onClick={toggleMenu} className=" hover:text-gray-700">
          <MoreVertical size={20} />
        </button>
        {menuOpen && (
          <section className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                onEdit();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <Edit2 size={16} className="inline mr-2" />
              Editar
            </button>
            <button
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <Trash2 size={16} className="inline mr-2" />
              Borrar
            </button>
          </section>
        )}
      </section>
    </section>
  );
}
