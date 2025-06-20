import { ProjectStatus, MilestoneStatus } from "../types/sync";

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
  [ProjectStatus.CLOSED]: "COMPLETED",
  [ProjectStatus.DRAFT]: "DRAFT",
  [ProjectStatus.IN_PROGRESS]: "IN PROGRESS",
};

export const MilestoneStatusLabels: Record<MilestoneStatus, String> = {
  [MilestoneStatus.UNDER_REVIEW]: "Under Review",
  [MilestoneStatus.COMPLETED]: "Completed",
  [MilestoneStatus.NOT_ASSIGNED]: "Not Assigned",
  [MilestoneStatus.REJECTED]: "Rejected",
  [MilestoneStatus.NOT_STARTED]: "Not Started",
  [MilestoneStatus.IN_PROGRESS]: "In Progress"
}