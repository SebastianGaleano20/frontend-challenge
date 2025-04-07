export type Developer = {
  id: number;
  name: string;
  email: string;
  image: string;
  role: "DEVELOPER" | "MANAGER";
};

export type Project = {
  id: number;
  name: string;
  description: string;
  developers: Developer[];
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
  developer: Developer;

  onEdit: () => void;
  onDelete: () => void;
};
