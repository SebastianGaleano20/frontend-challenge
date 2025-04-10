export type Role = "DEVELOPER" | "MANAGER";
type idDev = {
  devId: number;
  role?: Role;
};

export type Developer = {
  id: number;
  name: string;
  email: string;
  image: string;
  role: Role;
};

export type Project = {
  id?: number;
  name: string;
  description: string;
  developers: idDev[];
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELED";
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
