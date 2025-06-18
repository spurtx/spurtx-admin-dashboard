import { ProjectStatus } from "../types/sync";

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.CLOSED]: "COMPLETED",
  [ProjectStatus.DRAFT]: "DRAFT",
  [ProjectStatus.IN_PROGRESS]: "IN PROGRESS",
};