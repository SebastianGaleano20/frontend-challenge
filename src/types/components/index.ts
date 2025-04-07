type Role = "DEVELOPER" | "MANAGER";

export type Developer = {
  id: number;
  name: string;
  email: string;
  image: string;
  role: Role;
};

interface ObjectDevData {
  id: number;
  devId: number;
  projectId: number;
  developer: Developer;
}

export type Project = {
  id: number;
  name: string;
  description: string;
  developers: ObjectDevData[];
  startDate: string;
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
};

export type ProjectFormProps = {
  project?: Project;
  onSubmit?: (project: Project) => void;
  isSubmitting?: boolean;
};

export type EditProjectFormProps = {
  projectId: string;
};

export type ProjectCardProps = {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
};
